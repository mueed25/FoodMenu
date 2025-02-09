// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

interface Recipe {
    name: string;
    image: string;
    desc: string;
    cuisine: string;
    cookingTime: string;
    ingredients: string[];
    instructions: string[];
    comment : string[];
    liked: string[]
  }

const RecipeSchema: Schema<Recipe> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
    },
    cookingTime: {
      type: String,
    },
    ingredients: {
      type:[String],
      required: true
    },
    liked: {
      type: [String],
      default: []
    },
    instructions: { 
      type: [String], 
      required: true 
    },
    comment: {
        type:[String],
        default: []
    },
  }
);

// Creating the model if it doesn't already exist
const Recipe = mongoose.models.Recipe || mongoose.model<Recipe>('Recipe', RecipeSchema);

export default Recipe;
