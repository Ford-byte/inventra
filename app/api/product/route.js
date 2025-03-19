import { NextResponse } from "next/server";
import pool from "../config/route";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

export async function GET() {
  const cacheData = cache.get("product_stock");

  if (cacheData) {
    return NextResponse.json(
      {
        message: "Success from cache",
        data: cacheData,
      },
      { status: 200 }
    );
  }

  try {
    const query = `SELECT id, product_name, price, stock_in FROM product WHERE flag = 1`;

    const results = await queryAsync(query);

    // Cache the results
    cache.set("product_stock", results);

    return NextResponse.json(
      { message: "Success!", data: results },
      { status: 200 }
    );
  } catch (error) {
    console.log("Database query error:", error);
    return NextResponse.json(
      { message: "Internal server error!", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { search } = await req.json();
    const cacheKey = `products_search_${search || ""}`;

    // Check if we already have cache for this specific search term
    const cacheData = cache.get(cacheKey);

    if (cacheData) {
      return NextResponse.json(
        {
          message: "Success from cache",
          data: cacheData,
        },
        { status: 200 }
      );
    }

    const query = `
      SELECT 
        *, 
        (p.stock_in - p.stock_out) AS stock_difference
      FROM product AS p
      LEFT JOIN product_details AS pd ON p.id = pd.product_id
      LEFT JOIN category AS c ON pd.category_id = c.id
      WHERE (c.category LIKE ? OR p.product_name LIKE ?) AND p.flag = 1 ORDER BY p.date ASC;
    `;

    const result =
      search && search.length > 0
        ? await queryAsync(query, [`%${search}%`, `%${search}%`])
        : await queryAsync(query, [`%`, `%`]);

    // Cache the results using the unique cacheKey
    cache.set(cacheKey, result);

    return NextResponse.json({
      message: "Fetch Successful.",
      data: result,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      {
        message: "Internal server error.",
        error: error.message,
        status: "error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const query = `UPDATE product SET flag = 0 WHERE id = ?`;

    // Wait for query execution and check result
    const result = await queryAsync(query, [id]);

    if (result.affectedRows > 0) {
      return NextResponse.json(
        {
          message: "Deleted successfully",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
  try {
    const { product_name, price, stock_in, category_id, id } = await req.json();

    if (!product_name || !price || !stock_in || !category_id || !id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const query1 = `
      UPDATE product 
      SET 
        product_name = ?, 
        price = ?, 
        stock_in = ?
      WHERE id = ?;
    `;

    const query2 = `
      UPDATE product_details 
      SET 
        category_id = ?
      WHERE product_id = ?;
    `;

    // Execute queries sequentially
    await queryAsync(query1, [product_name, price, stock_in, id]);
    await queryAsync(query2, [category_id, id]);

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        message: "Error updating product",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Utility function to handle queries as promises
const queryAsync = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};
