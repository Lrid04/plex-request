import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const userCook = await cookies();
  const { username, password } = await req
    .json()
    .catch((error) => console.error(error));
  const validUser = process.env.adminUser;
  const validPass = process.env.adminPass;

  if (username == validUser && password == validPass) {
    userCook.set("auth", "true", {maxAge: 86400})
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    if (username != validUser && password != validPass) {
        userCook.set("auth", "false")
      return NextResponse.json(
        {
          errors: {
            username: "Invalid Username",
            password: "Invalid Password",
          },
        },
        { status: 401 }
      );
    } else {
      if (username != validUser) {
        userCook.set("auth", "false")
        return NextResponse.json(
          { errors: { username: "Invalid Username" } },
          { status: 401 }
        );
      } else {
        userCook.set("auth", "false")
        return NextResponse.json(
          { errors: { password: "Invalid Password" } },
          { status: 401 }
        );
      }
    }
  }
}
