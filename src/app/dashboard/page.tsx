import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { motion } from 'motion/react';
import Image from "next/image";

export default async function Page() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!isUserAuthenticated) {
    return (
      <div className="text-center bg-white rounded-lg min-h-screen flex justify-center items-center flex-col">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-600 mb-6">Sign up or log in to view your most favorite recipes.</p>
        <Link href="/signup">
          <Button className="text-md">Log In</Button>
        </Link>
      </div>
    );
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test/test1?userId=${user.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch favorite recipes: ${response.statusText}`);
  }

  const data = await response.json();
  const favoriteRecipes = data.data;

  return (
    <div className="min-h-screen sm:px-4 px-8">
      <h1 className="text-2xl font-bold mb-4 mt-2">Your Favorite Recipes</h1>

      {favoriteRecipes.length === 0 ? (
        <p className="text-gray-600">You haven't liked any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe: any) => (
            <Link href={`/recipes/${recipe._id}`}>
              <Card className="rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{recipe.name}</h3>
                  <p className="text-sm text-gray-600">{recipe.desc?.slice(0, 30)}...</p>
                  <div className="flex justify-between items-center mt-2">
                    <button className="flex items-center gap-2 text-gray-400">
                      <Heart className="text-xs" /> <span className="text-xs">Like</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400">
                      <MessageCircle className="text-xs" />{" "}
                      <span className="text-xs">{recipe.comment.length}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
              </Link>
          ))}
        </div>
      )}
    </div>
  );
}
