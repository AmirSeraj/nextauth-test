import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { FormError } from "../Form/form-error";
import { FormSuccess } from "../Form/form-success";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import clsx from "clsx";
import Loading from "@/components/loading/page";

interface FormRegisterProps {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const RegisterFormServerSide = ({
  form,
  onSubmit,
  isPending,
  error,
  success,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  locale,
  loading,
}: {
  form: UseFormReturn<FormRegisterProps, any, undefined>;
  onSubmit: (values: z.infer<typeof RegisterSchema>) => void;
  isPending: boolean;
  error?: string | false;
  success?: string | false;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  locale: string;
  loading: boolean;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="John Doe"
                    type="text"
                  />
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
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormMessage />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={clsx(
                    "absolute bottom-2 cursor-pointer",
                    locale === "fa" ? "left-7" : "right-7"
                  )}
                >
                  {showPassword ? <IoEye size={22} /> : <IoEyeOff size={22} />}
                </span>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormMessage />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={clsx(
                    "absolute bottom-2 cursor-pointer",
                    locale === "fa" ? "left-7" : "right-7"
                  )}
                >
                  {showConfirmPassword ? (
                    <IoEye size={22} />
                  ) : (
                    <IoEyeOff size={22} />
                  )}
                </span>
              </FormItem>
            )}
          />
        </div>

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Button type="submit" disabled={isPending} className="w-full">
          {loading ? <Loading /> : "Create an account"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterFormServerSide;
