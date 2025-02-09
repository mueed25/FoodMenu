'use server'
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export function LogoutProvider ({children}: {children : any}) {
  return <LogoutLink>{children}</LogoutLink>
}
