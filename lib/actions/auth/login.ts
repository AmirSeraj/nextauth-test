"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

/**PATH */
const sanctum_path =
  process.env.NEXT_PUBLIC_APP_URL_SANCTUM + "/sanctum/csrf-cookie";
const login_path = process.env.NEXT_PUBLIC_APP_URL_API + "/auth/login";
/**PATH */

/**login */
//@ts-ignore
export const login: (values: z.infer<typeof LoginSchema>) => Promise<{
  error: string | false;
  success: string | false;
  // isLoading: false;
}> = async (values: z.infer<typeof LoginSchema>) => {
  ///data validation
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Credentials!", success: false };
  }

  //destructuring data
  const { password, email } = validatedFields.data;

  const response = await signIn("credentials", {
    email: email,
    password: password,
    redirect: false,
  });

  if (!response?.error) {
    redirect('/settings')
  }

  // const status = await signIn("credentials", {
  //   redirect: false,
  //   email: email,
  //   password: password,
  //   callbackUrl: "/",
  // });

  // console.log(status);

  // try {
  //   //CSRF Token
  //   const csrf_response = await fetch(sanctum_path, {
  //     method: "GET",
  //     credentials: "include", //Include credentials for cross-origin requests
  //   });

  //   if (csrf_response.ok) {
  //     try {
  //       /**login user */
  //       const res = await fetch(login_path, {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: email,
  //           password: password,
  //         }),
  //       });
  //       const response = await res.json();
  //       console.log("ress", response);

  //       if (response.status === "error") {
  //         return {
  //           error: response.message,
  //           success: false,
  //         }
  //       }

  //       if (response.status === 'success') {
  //         return response;
  //       }

  //     } catch (error) {
  //       console.log("error2", error);
  //       return {
  //         error: "Something Wrong, try again!",
  //         success: false,
  //       };
  //     }
  //   }
  // } catch (error) {
  //   console.log("error", error);
  //   return {
  //     error: "Something Wrong, try again!",
  //     success: false,
  //   };
  // }
};
