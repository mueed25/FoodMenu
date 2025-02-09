import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CommentsSection from '@/components/CommentsSection';
import Link from 'next/link';
import CommentForm from "@/components/CommentForm";
import Comments from "@/components/Comment";

interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  cookingTime: string;
  ingredients: string[];
  instructions: string;
}


export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const slug = (await params).slug;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipe/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }

  const recipes = await response.json();

  if (!recipes) {
    return <div className="text-center text-xl font-semibold mt-10 ">Recipe not found</div>;
  }
  const recipe = recipes.data
  return (
    <div className="w-full min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        <Image 
          src={recipe.image} 
          alt={recipe.name} 
          fill 
          objectFit="cover" 
          className="brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-bold shadow-lg font-playfair">
            {recipe.name}
          </h1>
        </div>
      </div>

      {/* Recipe Details */}
      <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-lg -mt-12 rounded-lg relative">
        <Link href="/" className="text-gray-600 hover:text-gray-800 flex items-center mb-4 font-poppins">
          ← Back to Recipes
        </Link>

        <p className="text-lg text-gray-600 italic">{recipe.description}</p>

        <div className="mt-4 text-lg font-semibold text-gray-800">
          ⏳ Cooking Time: <span className="text-gray-700">{recipe.cookingTime}</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mt-6 font-merriweather">Ingredients</h2>
        <ul className="list-disc list-inside mt-4 text-lg text-gray-700">
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient} </li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold text-gray-800 mt-8">Instructions</h2>
        <p className="mt-4 text-lg text-gray-700 font-lora whitespace-pre-line leading-relaxed mb-8">
          {recipe.instructions}
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-20 mb-12 shadow-md bg-white p-6 md:p-10 rounded-lg">
      <CommentForm recipeId={slug} comments={recipe.comment}/>
      </div>
    </div>
  );
}
