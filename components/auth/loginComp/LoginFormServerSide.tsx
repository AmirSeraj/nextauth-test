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
import { LoginSchema } from "@/schemas";
import { FormError } from "../Form/form-error";
import { FormSuccess } from "../Form/form-success";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import BackButton from "../BackButton";
import Loading from "@/components/loading/page";
import clsx from "clsx";

interface FormLoginProps {
  email: string;
  password: string;
}

const LoginFormServerSide = ({
  form,
  onSubmit,
  isPending,
  error,
  success,
  showPassword,
  setShowPassword,
  loading,
  locale,
}: {
  form: UseFormReturn<FormLoginProps, any, undefined>;
  onSubmit: (values: z.infer<typeof LoginSchema>) => void;
  isPending: boolean;
  error?: string | false;
  success?: string | false;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  locale: string;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
                    // standard
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
                    // standard
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
          <div className="flex items-center">
            <BackButton
              label={"Forget Password?"}
              href={"/forgetPassword"}
              className="!px-0 !justify-start"
            />
          </div>
        </div>

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Button type="submit" disabled={isPending} className="w-full">
          {loading ? <Loading /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginFormServerSide;
