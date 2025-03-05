import { NextResponse } from "next/server";
import pool from "../../config/route";
import { uuid } from "uuidv4";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, password, email, phoneNumber, fullname } =
      await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    const userId = uuid();
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO user(id, username, password, flag) 
      VALUES(?, ?, ?, 1)
    `;

    const response = await pool.query(query, [
      userId,
      username,
      hashedPassword,
    ]);

    if (response) {
      const queryTwo = `INSERT INTO user_details(id,user_id,fullname,email,phone_number) VALUES(?,?,?,?,?)`;

      await pool.query(queryTwo, [
        uuid(),
        userId,
        fullname,
        email,
        phoneNumber,
      ]);
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
