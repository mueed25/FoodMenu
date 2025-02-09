import { NextResponse } from "next/server";
import Recipe from "@/models/Recipe"; // Adjust path if needed
import { connectToDatabase } from "@/lib/ConnectDb"; // Ensure your MongoDB connection is set up

export async function GET(req: Request) {
  try {
    await connectToDatabase(); // Ensure DB is connected

    // Get search query from the request URL
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { cuisine: { $regex: search, $options: "i" } },
          { cooking_time: { $regex: `^${search}$`, $options: "i" } } // Exact match for cooking time
        ],
      };
    }

    const recipes = await Recipe.find(query).select("-__v"); // Exclude unwanted fields

    return NextResponse.json({ results: recipes, count: recipes.length });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching recipes", error },
      { status: 500 }
    );
  }
}
