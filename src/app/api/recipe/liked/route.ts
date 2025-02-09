import { connectToDatabase } from '@/lib/ConnectDb';
import Recipe from '@/models/Recipe';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';

interface Liked {
    userId?: string,
    recipeId: string,
}

export async function POST(req: Request) {

    const { recipeId, userId } = await req.json();

    console.log(recipeId)
    console.log(userId)

    if (!Types.ObjectId.isValid(recipeId)) {
        return NextResponse.json({ success: false, error: "Invalid recipe ID" }, { status: 400 });
    }

    try {
        if (!recipeId) {
            return NextResponse.json({ success: false, error: "Comment is required" }, { status: 400 });
        }

        // Connect to the database
        await connectToDatabase();

        // Find the recipe by ID and update the comment array
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId,
            { $push : {liked: userId}},
            { new : true }
        )
        .then( (UpdatedRecipes) => console.log('User added to like', UpdatedRecipes))
        .catch( err => console.log(err))



        //

        return NextResponse.json({ success: true});
    } catch (error: any) {
        console.error("Error updating recipe:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}