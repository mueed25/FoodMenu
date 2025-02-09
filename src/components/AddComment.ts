"use server";

import Recipe from "@/models/Recipe";
import {connectToDatabase}  from '@/lib/ConnectDb';
import { revalidatePath } from "next/cache";


export async function addComment(recipeId: string, comment: string) {
  if (!recipeId || !comment) return;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipe`, {
    method: 'POST',
    body: JSON.stringify({ comment: comment , id: recipeId}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }

  console.log('ok')
}
