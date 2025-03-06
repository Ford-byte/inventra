import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "../../config/route";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    const query = `SELECT u.password, ud.fullname, ud.email, ud.phone_number 
FROM user AS u 
LEFT JOIN user_details AS ud 
    ON u.id = ud.user_id 
WHERE username = ?
    AND flag = 1;
`;

    const results = await new Promise((resolve, reject) => {
      pool.query(query, [username], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });

    if (!results || results.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const dbPassword = results[0].password;

    const isMatch = await bcrypt.compare(password, dbPassword);

    if (isMatch) {
      return NextResponse.json(
        { message: "Login successful", data: results[0] },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log("Error during authentication:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
