import { NextResponse } from "next/server";
import pool from "../../config/route";

export async function POST(req) {
  try {
    const { offset, limit } = await req.json();

    const query = `SELECT *
    FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY id) AS row_num
    FROM transaction
    ) AS subquery
    WHERE row_num BETWEEN ? AND ?`;

    const results = await new Promise((resolve, reject) => {
      pool.query(query, [offset, limit], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    return NextResponse.json(
      { message: "Success!", data: results },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error!", error: error.message },
      { status: 500 }
    );
  }
}
