import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import pool from "../../config/route";

export async function POST(req) {
  try {
    const { name, price, stock, category, supplier } = await req.json();

    if (!name || !price || !stock || !category || !supplier) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
      return NextResponse.json(
        {
          message:
            "Price must be a positive number and stock must be a non-negative integer",
        },
        { status: 400 }
      );
    }

    const productId = uuidv4(); 

    const query = `
      INSERT INTO product(id, product_name, price, stock_in, flag)
      VALUES (?, ?, ?, ?, 1)
    `;
    const response = await pool.query(query, [productId, name, price, stock]);

    const queryTwo = `
      INSERT INTO product_details(id, product_id, supplier_id, category_id)
      VALUES (?, ?, ?, ?)
    `;
    const responseTwo = await pool.query(queryTwo, [
      uuidv4(), 
      productId,
      supplier,
      category,
    ]);

    if (response && responseTwo) {
      return NextResponse.json(
        { message: "Stock successfully added." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal server error.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Product already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
