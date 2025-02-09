'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import  Link  from 'next/link'
import { fallbackModeToStaticPathsResult } from 'next/dist/lib/fallback';
import { ObjectId } from 'mongoose';
import { addLiked } from './AddLiked';

interface Recipe {
  _id: string;
  name: string;
  image: string;
  desc: string;
  cookingTime: string;
  ingredients: string[];
  instructions: string[];
  comment : string[];
}

interface Liked {
  userId?: string,
  recipeId: string,
}
const HomePage = ( {recipes, _id}: {recipes: Recipe[], _id: string} ) => {

  const [liked, setLiked] = useState<Liked[]>([]);
  const [like, setlike] = useState<string[]>([])
  const [visible, setVisible] = useState(8);

  const toggleLike = (id: string) => {

    setlike( prev => {
      if (like.includes(id)) {
        return prev.filter( recipe => recipe !== id )
      } else {
        addLiked({
          userId: _id? _id : '',
          recipeId: id,
        })
        return [...prev, id]
      }
    })
  };

  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Most Favorite Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.slice(0, 4).map((recipe) => (
          <motion.div key={recipe._id} whileHover={{ scale: 1.05 }}>
            {/* <Link href={`/recipes/${recipe._id}`}> */}
            <Card className="rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-48">
                <Image src={recipe.image} alt={recipe.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{recipe.name}</h3>
                <p className="text-sm text-gray-600">{recipe.desc.slice(0,30)}..</p>
                <div className='flex justify-between items-center'>
                <button
                  className={`mt-2 flex items-center gap-2 text-x  ${ like.includes(recipe._id)? 'text-orange-500 ' : 'text-gray-400'}`}
                  onClick={() => toggleLike(recipe._id)}
                >
                  <Heart className='text-xs'/> <span className='text-xs'>Like</span>
                </button>
                <button
                  className={`mt-2 flex items-center gap-1 text-x text-gray-400`}
                >
                  <MessageCircle className='text-xs'/> <span className='text-xs'>{recipe.comment.length}</span>
                </button>
                </div>
              </CardContent>
            </Card>
            {/* </Link> */}
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-bold my-6">Discover More Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.slice(0, visible).map((recipe) => (
          <motion.div key={recipe._id} whileHover={{ scale: 1.05 }}>
            <Link href={`/recipes/${recipe._id}`}>
            <Card className="rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-48">
                <Image src={recipe.image} alt={recipe.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{recipe.name}</h3>
                <p className="text-sm text-gray-600">{recipe.desc.slice(0,30)}..</p>
                <div className='flex justify-between items-center'>
                <button
                  className={`mt-2 flex items-center gap-2 text-x  ${like.includes(recipe._id)? 'text-orange-500 ' : 'text-gray-400'}`}
                  onClick={() => toggleLike(recipe._id)}
                >
                  <Heart className='text-xs'/> <span className='text-xs'>Like</span>
                </button>
                <button
                  className={`mt-2 flex items-center gap-1 text-x text-gray-400`}
                >
                  <MessageCircle className='text-xs'/> <span className='text-xs'>{recipe.comment.length}</span>
                </button>
                </div>
              </CardContent>
            </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      {visible < recipes.length && (
        <div className="text-center mt-6">
          <Button onClick={() => setVisible((prev) => prev + 4)}>Load More</Button>
        </div>
      )}
    </div>
  );
}

export default HomePage