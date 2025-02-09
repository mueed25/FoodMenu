"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SearchBar = () => {
  interface FormData {
    query: string;
    cuisine: string;
    cookingTime: string;
  }

  const { register, control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      query: "",
      cuisine: "",
      cookingTime: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Search Data:", data);
    
    const params = new URLSearchParams();
    if (data.query) params.append("query", data.query);
    if (data.cuisine) params.append("cuisine", data.cuisine);

    const queryString = params.toString() ? `?${params.toString()}` : "";

    // Fetch API
    // const res = await fetch(`/api/recipes${queryString}`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipe/query${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await res.json();
    console.log("API Response:", responseData);
  };

  return (
    <div className="flex w-full pt-2 justify-center max-md:hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-full p-4 space-y-2 md:space-y-0 md:space-x-4 w-full max-w-3xl"
      >
        {/* ✅ Use register for simple input */}
        <Input
          {...register("query")}
          placeholder="Search dish title..."
          className="flex-1 px-4 py-2 border-none focus:ring-0"
        />

        <Controller
          name="cuisine"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="mexican">Mexican</SelectItem>
                <SelectItem value="indian">Indian</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          name="cookingTime"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Cooking Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-30">Under 30 min</SelectItem>
                <SelectItem value="30-60">30-60 min</SelectItem>
                <SelectItem value="above-60">Above 60 min</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Button type="submit" className="px-4 py-4 rounded-full bg-gray-800">
          <Search className="text-white" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
