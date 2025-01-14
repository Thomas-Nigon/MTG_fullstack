import React, { useState } from "react";
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

import { MdOutlineMailOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import { CREATE_USER } from "@/lib/createUser";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { MutationCreateUserArgs } from "@/lib/graphQL/generated/graphql-types";

export default function RegisterComponent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createUser] = useMutation<MutationCreateUserArgs>(CREATE_USER, {
    onCompleted: () => {
      console.log("user created");
      navigate("/login");
    },
  });

  const formSchema = z
    .object({
      username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
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
      confirmPassword: z.string(),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      {
        message: "Passwords must match!",
        path: ["confirmPassword"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const user = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    createUser({
      variables: { data: user },
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <article>
                    <Input
                      placeholder="Enter your public username..."
                      {...field}
                    />
                  </article>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <article className="flex items-center gap-2 text-2xl">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                    {showPassword ? (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FaEyeSlash />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FaEye />
                      </button>
                    )}
                  </article>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <article className="flex items-center gap-2 text-2xl">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...field}
                    />
                    {showConfirmPassword ? (
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <FaEyeSlash />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <FaEye />
                      </button>
                    )}
                  </article>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
