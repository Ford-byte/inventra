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
  return new Promise((resolve) => {
    pool.getConnection((err, connection) => {
      if (err) {
        resolve(
          NextResponse.json(
            {
              message: "Database connection failed!",
              error: err.message,
            },
            { status: 500 }
          )
        );
      } else {
        connection.release(); 
        resolve(
          NextResponse.json({
            message: "Connected to the database successfully!",
          })
        );
      }
    });
  });
}

export default pool;
