import { NextResponse } from "next/server";
import mysql from "mysql";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function GET() {
  try {
    const connection = await new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn);
        }
      });
    });

    connection.release();

    return NextResponse.json({
      message: "Connected to the database successfully!",
    });
  } catch (err) {
    console.error("Database connection error:", err.message);

    return NextResponse.json(
      {
        message: "Database connection failed!",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export default pool;
