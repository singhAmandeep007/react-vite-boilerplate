import { FC, PropsWithChildren } from "react";

import {
  Form,
  FormButton,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../../components/forms";
import { RouteLink } from "../../components/ui";

import { ReactHookFormDevelopmentTools } from "../../components/utils";

import { useLoginForm } from "./useLoginForm";

export type TLoginProps = Record<string, never>;

export const Login: FC<PropsWithChildren<TLoginProps>> = () => {
  const {
    form,
    form: {
      formState: { isSubmitting },
      control,
    },
    handleSubmit,
  } = useLoginForm({ defaultValues: { email: "", password: "" } });

  return (
    <Form {...form}>
      <form
        className="mx-auto grid w-[350px] gap-6"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">Enter your email and password below to login.</p>
        </div>
        <div className="grid gap-6 text-sm">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...field}
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
              <FormItem className="grid gap-1">
                <div className="flex items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <RouteLink
                    to="/auth/forgotPassword"
                    className="ml-auto inline-block leading-none underline"
                  >
                    Forgot your password?
                  </RouteLink>
                </div>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormButton
            className="w-full"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Login
          </FormButton>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <RouteLink
            to="/auth/signup"
            className="underline"
          >
            Sign up
          </RouteLink>
        </div>
      </form>

      <ReactHookFormDevelopmentTools
        // @ts-expect-error - FIXME:
        control={control}
        placement="top-left"
      />
    </Form>
  );
};
