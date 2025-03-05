import { NextResponse } from "next/server";
import pool from "../config/route";
export async function GET() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user`;

    pool.query(query, (error, results) => {
      if (error) {
        console.log("Database query error:", error);
        resolve(
          NextResponse.json(
            { message: "Internal server error!", error: error.message },
            { status: 500 }
          )
        );
      } else {
        resolve(
          NextResponse.json(
            { message: "Success!", data: results },
            { status: 200 }
          )
        );
      }
    });
  });
}
