import { connectToDatabase } from '@/lib/ConnectDb';
import Recipe from '@/models/Recipe';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;

    console.log("Fetching recipe with ID:", id);

    if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, error: "Invalid recipe ID" }, { status: 400 });
    }

    try {
        await connectToDatabase();
        
        const recipe = await Recipe.findById(id);
        
        if (!recipe) {
            return NextResponse.json({ success: false, error: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: recipe });
    } catch (error: any) {
        console.error("Error fetching recipe:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}