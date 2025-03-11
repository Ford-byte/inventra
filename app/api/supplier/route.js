import { NextResponse } from "next/server";
import pool from "../config/route";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const query = `SELECT * FROM supplier WHERE flag = 1`;

    const response = await new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    return NextResponse.json(
      {
        message: "Fetch Successfully.",
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { fullname, item_supplied, email, phone_number } = await req.json();

    const query = `INSERT INTO supplier(id, fullname, item_supplied, email,phone_number , flag) VALUES(?,?,?,?,?,1)`;
    pool.query(query, [uuidv4(), fullname, item_supplied, email, phone_number]);

    return NextResponse.json(
      {
        message: "Insert Successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const query = `UPDATE supplier SET flag = 0 WHERE id = ?`;
    
    pool.query(query, [id]);

    return NextResponse.json(
      {
        message: "Delete Successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error,
      },
      { status: 500 }
    );
  }
}
