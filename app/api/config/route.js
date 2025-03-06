import { NextResponse } from "next/server";
import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 10000,
});

const promisePool = pool.promise();

export async function GET() {
  try {
    const [rows] = await promisePool.query("SELECT 1");

    return NextResponse.json({
      message: "Connected to the database successfully!",
      rows,
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    return NextResponse.json(
      {
        message: "Database connection failed!",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export default promisePool;
