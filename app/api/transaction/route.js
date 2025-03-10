import { NextResponse } from "next/server";
import pool from "../config/route";

export async function GET(req) {
  try {
    const offset = parseInt(req.nextUrl.searchParams.get("offset") || '0', 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || '5', 10);

    const query = `WITH RowNumCTE AS (
        SELECT 
          ut.id AS ut_id,       
          t.id AS t_id,          
          ut.transaction_id,
          ROW_NUMBER() OVER (ORDER BY ut.id) AS row_num
        FROM 
          user_transaction AS ut
        LEFT JOIN 
          transaction AS t 
        ON 
          t.id = ut.transaction_id
      )
      SELECT * 
      FROM RowNumCTE
      WHERE row_num BETWEEN ? AND ?`;

    const results = pool.query(query, [offset,limit]);

    return NextResponse.json(
      { message: "Success!", data: results.rows },
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
    const { product_name, price, stock } = await req.json();

    const query = `INSERT INTO transaction(id, product_name, price, stock_out, flag) VALUES (?, ?, ?, ?, 1)`;

    const response = await new Promise((resolve, reject) => {
      pool.query(
        query,
        [uuidv4(), product_name, price, stock],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    return NextResponse.json(
      {
        message: "Successfully posted",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
