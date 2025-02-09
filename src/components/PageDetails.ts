"use server";

import Recipe from "@/models/Recipe";
import {connectToDatabase}  from '@/lib/ConnectDb';
import { revalidatePath } from "next/cache";

export async function addComment(recipeId: string) {
  if (!recipeId || !comment) return;

  await connectToDatabase();
  await Recipe.findById(recipeId);
 // Refresh the page data
}
