import { NextResponse } from "next/server";
import pool from "../../config/route";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

export async function GET() {
  try {
    const cachedData = cache.get("categoryData");

    if (cachedData) {
      return NextResponse.json(
        { message: "Success! (from cache data)", data: cachedData },
        { status: 200 }
      );
    }

    const query = `SELECT * FROM category`;

    const results = await new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    cache.set("categoryData", results);

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
