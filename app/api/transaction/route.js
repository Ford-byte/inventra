import { NextResponse } from "next/server";
import pool from "../config/route";
import { v4 as uuidv4 } from "uuid";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

export async function GET() {
  try {
    // Retrieve cached data
    const cacheData = cache.get("transaction");

    if (cacheData) {
      return NextResponse.json(
        {
          message: "Fetch success from cache",
          data: cacheData,
        },
        { status: 200 }
      );
    }

    // If no cached data, fetch from the database
    const query = `SELECT * from user_transaction as ut LEFT JOIN transaction as t ON t.id = ut.transaction_id WHERE 1`;

    const results = await new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    // Cache the results for future requests
    cache.set("transaction", results);

    return NextResponse.json(
      {
        message: "Fetch Successfully!",
        data: results,
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

export async function POST(req) {
  try {
    const { product_name, price, stock } = await req.json();

    const query = `INSERT INTO transaction(id, product_name, price, stock_out, flag) VALUES (?, ?, ?, ?, 1)`;

    const response = await new Promise((resolve, reject) => {
      pool.query(
        query,
        [uuidv4(), product_name, price, stock],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    return NextResponse.json(
      {
        message: "Successfully Recorded",
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
