import { LoginSchema } from "@/schemas";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loggedInUser } from "./actions/getLoggedInUser";

/**PATH */
const sanctum_path =
  process.env.NEXT_PUBLIC_APP_URL_SANCTUM + "/sanctum/csrf-cookie";
const login_path = process.env.NEXT_PUBLIC_APP_URL_API + "/auth/login";
/**PATH */

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return { error: "Invalid Credentials!", success: false };
        }

        try {
          //CSRF Token
          const csrf_response = await fetch(sanctum_path, {
            method: "GET",
            credentials: "include", //Include credentials for cross-origin requests
          });

          if (csrf_response.ok) {
            try {
              /**login user */
              const res = await fetch(login_path, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                }),
              });
              const response = await res.json();
              console.log("ress", response);

              if (response.status === "error") {
                return {
                  error: response.message,
                  success: false,
                };
              }

              if (response.status === "success") {
                const user = await loggedInUser(response.token);
                console.log("userAuth:", user);
                return { ...user, ...response.token };
              }
            } catch (error) {
              console.log("error2", error);
              return {
                error: "Something Wrong, try again!",
                success: false,
              };
            }
          }
        } catch (error) {
          console.log("error", error);
          return {
            error: "Something Wrong, try again!",
            success: false,
          };
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
};
