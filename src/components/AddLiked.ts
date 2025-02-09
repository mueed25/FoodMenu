"use server";

import Recipe from "@/models/Recipe";
import {connectToDatabase}  from '@/lib/ConnectDb';
import { revalidatePath } from "next/cache";

interface Liked {
    userId?: string,
    recipeId: string,
  }

export async function addLiked(param : Liked ) {

const {recipeId , userId} = param

  if (!recipeId) return;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipe/liked`, {
    method: 'POST',
    body: JSON.stringify({ recipeId: recipeId , userId: userId}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }

  console.log('ok')
}
