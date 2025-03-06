import { NextResponse } from "next/server";
import pool from "../../config/route";

export async function GET() {
  try {
    const query = `SELECT * FROM category`;

    // Promisify the pool query to work with async/await
    const results = await new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
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
