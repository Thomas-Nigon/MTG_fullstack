import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { LOGIN } from "@/lib/login";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { MutationAuthArgs } from "@/lib/graphQL/generated/graphql-types";
import { getUserFromToken } from "@/lib/getUserFromToken";

export interface ILoginResult {
  auth: string;
}

export default function LoginComponent() {
  const navigate = useNavigate();

  const [loginUser] = useMutation<MutationAuthArgs>(LOGIN, {
    onCompleted: (result) => {
      console.log("result:", result);
      const response = result.auth;
      getUserFromToken(response);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error Logging in:", error);
    },
  });

  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = {
      email: values.email,
      password: values.password,
    };
    console.log("trying to authenticate user:", user);
    loginUser({
      variables: { email: user.email, password: user.password },
    });
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <article className="flex items-center gap-2 text-3xl">
                    <Input
                      type="email"
                      placeholder="Enter your email..."
                      {...field}
                    />
                    <MdOutlineMailOutline />
                  </article>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <article className="flex items-center gap-2 text-3xl">
                    <Input type="password" placeholder="Password" {...field} />
                    <MdLockOutline />
                  </article>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <p className="mt-5">
        Need an account? click
        <Link className="underline text-primary" to="/register">
          here
        </Link>
      </p>
    </>
  );
}
