import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Login to change and edit your photos</p>
              </div>
              <div className="grid gap-3 pt-15 pb-10">
                <div className="grid gap-3">
                  <Label htmlFor="email-photoport">Email or username</Label>
                  <Input id="email-photoport" type="email" placeholder="" required />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline" tabIndex={1}>
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
              <Button type="submit" className="w-full mb-10">
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
              height={800}
              className="absolute top-0 left-0 w-full h-full object-cover rounded shadow-black shadow-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
