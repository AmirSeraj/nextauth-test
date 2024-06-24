"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginFormServerSide from "./LoginFormServerSide";
import { login } from "@/lib/actions/auth/login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = ({ locale }: { locale: string }) => {
  const [error, setError] = useState<string | false | undefined>("");
  const [success, setSuccess] = useState<string | false | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);

    startTransition(async () => {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      console.log('res',response);
      if (response?.status === 'error') {
        router.push('/settings')
      }
      // login(values).then((data) => {
      //   setError(data?.error);
      //   setSuccess(data?.success);
      //   setLoading(false);
      // });
    });
  };

  return (
    <CardWrapper
      headerTitle="Sign in Admin"
      headerLabel="Welcome back!"
      backButtonHref="/register"
      backButtonLabel="Don`t have an account? SignUp"
      showSocial
    >
      <LoginFormServerSide
        onSubmit={onSubmit}
        error={error}
        success={success}
        isPending={isPending}
        form={form}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loading={loading}
        locale={locale}
      />
    </CardWrapper>
  );
};

export default LoginForm;
