import { connectToDatabase } from '@/lib/ConnectDb';
import Recipe from '@/models/Recipe';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';

export async function POST(req: Request) {

    const { id, comment } = await req.json();

    // Validate the ID
    if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, error: "Invalid recipe ID" }, { status: 400 });
    }

    try {
        if (!comment) {
            return NextResponse.json({ success: false, error: "Comment is required" }, { status: 400 });
        }

        // Connect to the database
        await connectToDatabase();

        // Find the recipe by ID and update the comment array
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { $push: { comment: comment } }, // Add the new comment to the comment array
            { new: true } // Return the updated document
        );

        if (!updatedRecipe) {
            return NextResponse.json({ success: false, error: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedRecipe });
    } catch (error: any) {
        console.error("Error updating recipe:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}