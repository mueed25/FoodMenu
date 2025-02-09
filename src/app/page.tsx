import SignOut from "@/components/SignOut"
import SearchBar from "@/components/Search"
import HomePage from "@/components/Contents"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


const page = async () => {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.statusText}`);
      }
  
      const data = await response.json();

     

      const {getUser, isAuthenticated} = getKindeServerSession();
      const isUserAuthenticated = await isAuthenticated();
      const user = await getUser()
      const id = user?.id
      
  return (
    <div className='min-h-screen sm:px-4 px-8'>
      <SearchBar />
      <HomePage recipes={data} _id={id}/>
    </div>
  )
}

export default page