import { connectToDatabase } from "@/lib/ConnectDb";
import { NextResponse } from "next/server";
import Recipe from "@/models/Recipe";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Get the userId from the request query params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    console.log("Received userId:", userId);

    // Query: Find recipes where the 'likes' array contains the userId
    const likedRecipes = await Recipe.find({ liked: { $in: [userId] } });

    console.log("Liked Recipes Found:", likedRecipes);

    return NextResponse.json({ success: true, data: likedRecipes });
  } catch (error: any) {
    console.error("Error fetching favorite recipes:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
