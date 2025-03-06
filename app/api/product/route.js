import { NextResponse } from "next/server";
import pool from "../config/route";

export async function POST(req) {
  try {
    const { search } = await req.json();

    const query = `
      SELECT 
        *
      FROM product AS p
      LEFT JOIN product_details AS pd ON p.id = pd.product_id
      LEFT JOIN category AS c ON pd.category_id = c.id
      WHERE (c.category LIKE ? OR p.product_name LIKE ?) AND p.flag = 1;
    `;

    const queryAsync = (query, params) => {
      return new Promise((resolve, reject) => {
        pool.query(query, params, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    let result = [];
    if (search && search.length > 0) {
      result = await queryAsync(query, [`%${search}%`, `%${search}%`]);
    } else {
      result = await queryAsync(query, [`%`, `%`]);
    }

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
    const response = await pool.query(query, [id]);

    if (response) {
      return NextResponse.json(
        {
          message: "Deleted successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
