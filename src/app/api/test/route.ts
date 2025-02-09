// src/app/api/test/route.ts
import { connectToDatabase } from '@/lib/ConnectDb';
import { NextResponse } from 'next/server';
import Recipe from '@/models/Recipe';

export async function GET() {
  try {
    // Ensure the database is connected
    await connectToDatabase();

    // Fetch all recipes
    const data = await Recipe.find({});
    
    return NextResponse.json( data);

  } catch (error: any) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
