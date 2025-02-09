import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListFilter, User } from "lucide-react";
import Image from "next/image";
import { SignInProvider } from "@/app/auth/signin/page";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


const Navbar = async () => {
    const {getUser, isAuthenticated} = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const userData = await getUser()

  const user = {
    name: "John Doe",
    image: userData?.picture ? userData.picture : "https://randomuser.me/api/portraits/men/75.jpg" 
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800 flex items-center">
        <span className="text-orange-500">Food</span>Menu
      </div>

      {/* Categories */}
      <div className="hidden md:flex space-x-6 text-gray-700">
        <Link href="/dashboard" className="hover:text-orange-500 hover:border-b-2 hover:border-b-orange-500 text-gray-600">Most Favorite</Link>
        <Link href="/dashboard" className="hover:text-orange-500 hover:border-b-2 hover:border-b-orange-500 text-gray-600">Dashboard</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Button className="mx-1 bg-orange-500 max-sm:rounded-full py-1 px-3">
            <ListFilter className="text-white" /> 
            <span className="max-sm:hidden ">Filter</span>
        </Button>
        {!isUserAuthenticated? (<SignInProvider>
        <Button className='bg-gray-800'>Sign Up</Button>
        </SignInProvider>) : null}
        
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
          {user.image ? (
            <Image src={user.image} alt="User" width={40} height={40} />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <User className="text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;