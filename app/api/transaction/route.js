import { NextResponse } from "next/server";
import pool from "../config/route";

export async function GET() {
  try {
    const query = `SELECT * from user_transaction as ut LEFT JOIN transaction as t ON t.id = ut.transaction_id WHERE 1`;

    const result = await pool.query(query);

    return NextResponse.json(
      {
        message: "Fetch Successfully!",
        data: result.rows, 
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
