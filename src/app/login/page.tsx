"use client";
import { Button, Form, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

//TODO Add bypass when already logged in
export default function Login() {
  const router = useRouter();
  const [errors, setErrors] = useState();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    let data = await res.json().catch((error) => console.error(error));
    console.log(data);
    if (data["success"]) {
      router.push("/admin");
    }else{
        setErrors(data["errors"])
    }
  }

  return (
    <div className="mx-10 mt-5">
      <Form
        onSubmit={handleLogin}
        className="flex items-center bg-primary rounded-lg p-5 border-8 border-secondary"
      >
        <Input
          name="username"
          label="Username"
          labelPlacement="inside"
          size="lg"
          validate={() => {
            if(errors != null){
                if(errors['username'] != undefined){
                    return errors['username']
                }
            }
          }}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          labelPlacement="inside"
          size="lg"
          validate={() => {
            if(errors != null){
                if(errors['password'] != undefined){
                    return errors['password']
                }
            }
          }}
        />
        <Button type="submit" size="lg" variant="shadow" color="secondary">
          Submit
        </Button>
      </Form>
    </div>
  );
}
