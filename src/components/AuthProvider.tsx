"use client";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";
import { ReactHTMLElement } from "react";

export const AuthProvider = ({children}: { children : any}) => {
  return <KindeProvider>{children}</KindeProvider>;
};