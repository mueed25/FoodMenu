// import Recipe from "@/models/Recipe";
// import {connectToDatabase}  from '@/lib/ConnectDb';


// export default async function Comments({ recipeId }: { recipeId: string }) {
//   await connectToDatabase();
//   const recipe = await Recipe.findById(recipeId).lean();
//   const comments = recipe?.comment || [];

//   return (
//     <div className="mt-4">
//       <h3 className="font-bold">Comments</h3>
//       {comments.length > 0 ? (
//         comments.map((cmt: string, index: number) => (
//           <p key={index} className="border-b py-2">{cmt}</p>
//         ))
//       ) : (
//         <p>No comments yet.</p>
//       )}
//     </div>
//   );
// }
