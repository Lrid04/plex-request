import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Admin() {
  const userCooks = await cookies();
  if (userCooks.get("auth")?.value != "true") {
    redirect("/")
  }
 
  return (<h1>Wow</h1>)
}
