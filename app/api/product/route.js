import { NextResponse } from "next/server";
import pool from "../config/route";
export async function POST(req) {  
  try {
    const { category, product_name } = await req.json();  

    const query = `
      SELECT 
        *, 
        p.stock_in, 
        p.stock_out, 
        (p.stock_in - p.stock_out) AS stock_difference
      FROM product AS p
      LEFT JOIN product_details AS pd ON p.id = pd.product_id
      LEFT JOIN category AS c ON pd.category_id = c.id
      WHERE c.category LIKE ? OR p.product_name LIKE ?
    `;

    pool.query(query, [product_name, category], (err, rows) => {
      if (err) {
        return NextResponse.json({
          message: "Internal server error.",
          error: err.message,
        }, { status: 500 });
      }

      if (rows.length > 0) {
        return NextResponse.json({
          message: "Fetch Successful.",
          data: rows,
        });
      } else {
        return NextResponse.json({
          message: "No data found.",
        });
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error.",
      error: error.message,
    }, { status: 500 });
  }
}
