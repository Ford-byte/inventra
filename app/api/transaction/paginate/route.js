import { NextResponse } from "next/server";
import pool from "../../config/route";

export async function POST(req) {
  try {
    const { offset, limit } = await req.json();

    const query = `
      WITH CTE AS (
    SELECT 
        *, 
        ROW_NUMBER() OVER (ORDER BY id) AS RowNum
    FROM transaction
)
SELECT *
FROM CTE
WHERE RowNum BETWEEN ? AND ?`;

    const startRow = offset;
    const endRow = limit;

    const results = await new Promise((resolve, reject) => {
      pool.query(query, [startRow, endRow], (error, results) => {
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
