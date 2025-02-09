"use client";

import { useForm } from "react-hook-form";
import { addComment } from "@/components/AddComment";
import { useState, useTransition } from "react";

interface CommentFormData {
  comment: string;
}

const CommentForm = ({ recipeId , comments }: { recipeId: string, comments : string[] }) => {
  const { register, handleSubmit, reset } = useForm<CommentFormData>();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);
  const [comment , setComment] = useState<(string)[]>(comments);

  const onSubmit = (data: CommentFormData) => {
    setStatus("Adding...");
    setComment([...comments, data.comment]);

    startTransition(async () => {
      await addComment(recipeId, data.comment);
      reset();
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("comment", { required: true })}
          placeholder="Add a comment..."
          className="border p-2 w-full rounded"
          disabled={isPending}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2 rounded"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      
      <div className="mt-4">
      <h3 className="font-bold">Comments</h3>
      {comment.length > 0 ? (
        comment?.map((cmt: string, index: number) => (
          <p key={index} className="border-b py-2">{cmt}</p>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
    </div>
  );
};

export default CommentForm;
