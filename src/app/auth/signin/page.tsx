
'use server'
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

export async function SignInProvider ({children}: {children : any}) {
  return <LoginLink className="">{children}</LoginLink>
}
