import { NextResponse } from "next/server";
import pool from "../../config/route";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 });

export async function POST(req) {
  try {
    const { offset, limit } = await req.json();

    if (isNaN(offset) || isNaN(limit) || offset < 0 || limit <= 0) {
      return NextResponse.json(
        { message: "Invalid offset or limit values." },
        { status: 400 }
      );
    }

    const cacheKey = `transactions_${offset}_${limit}`;

    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return NextResponse.json(
        { message: "Success from cache", data: cachedResult },
        { status: 200 }
      );
    }

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

    const startRow = offset + 1;
    const endRow = offset + limit;

    // Execute the query
    const results = await new Promise((resolve, reject) => {
      pool.query(query, [startRow, endRow], (error, results) => {
        if (error) {
          reject(new Error(`Query failed: ${error.message}`)); // Enhanced error message
        } else {
          resolve(results);
        }
      });
    });

    if (!results || results.length === 0) {
      return NextResponse.json({}, { status: 404 });
    }

    // Cache the actual data
    cache.set(cacheKey, results);

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
