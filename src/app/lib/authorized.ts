"use server"
import { cookies } from "next/headers";

export default async function Authorization(){
    const userCook = await cookies();
    if(userCook.get("auth")?.value == "true"){
        return true
    }else{
        return false
    }
}