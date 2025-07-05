/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "./ui/spiiner";

type Credentials = {
  user: string;
  password: string;
};

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({ user: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCredentials((prev) => ({ ...prev, [e.target.name]: value }));
    console.log(credentials);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/auth", credentials);
      if (response.data.success) {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      if (err.response.data.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage("Server Error");
      }
      console.error(err);
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Login to change and edit your photos</p>
              </div>
              <div className="grid gap-3 pt-15 pb-10">
                <div className="grid gap-3">
                  <Label htmlFor="user-photoport">Email or username</Label>
                  <Input
                    id="user-photoport"
                    name="user"
                    type="text"
                    placeholder=""
                    onChange={(e) => handleOnChange(e)}
                    value={credentials.user}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline" tabIndex={1}>
                      Forgot your password?
                    </a> */}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => handleOnChange(e)}
                    value={credentials.password}
                    required
                  />
                </div>
                {message !== "" && <span className="text-red-500 font-inter text-sm">{message}</span>}
              </div>
              <Button
                type="submit"
                className={`"w-full mb-10  ${
                  isLoading ? "bg-primary/90 hover:cursor-not-allowed" : "hover:cursor-pointer"
                }`}
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
                Login
              </Button>
            </div>
            <Link className="underline" href="/">
              Go back to Home
            </Link>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="https://res.cloudinary.com/dqmu0iz24/image/upload/v1751505868/pexels-sulimansallehi-1540977_1_qjftbq.jpg"
              alt="ssss"
              width={800}
              priority
              height={800}
              className="absolute top-0 left-0 w-full h-full object-cover rounded shadow-black shadow-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
