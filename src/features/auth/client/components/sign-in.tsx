import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form"
import { useEffect } from "react";
import LoadingButton from "src/components/LoadingButton";
import { Input } from "src/components/ui/input";
import { authClient } from "src/features/auth/lib/auth-client";
import { useResendVerificationEmail, useSignIn, useSignInWithPasskey } from "src/features/auth/client/use-cases";
import { signInValidation } from "src/features/auth/validations";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "src/components/ui/field"
import { Button } from "src/components/ui/button";

export default function SignIn() {
  const navigate = useNavigate();
  const signInMutation = useSignIn();
  const signInWithPasskeyMutation = useSignInWithPasskey();
  const resendVerificationMutation = useResendVerificationEmail();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signInValidation,
    },
    onSubmit: async ({ value }) => {
      signInMutation.mutate(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            navigate({ to: "/dashboard" });
          },
        }
      );
    },
  })

  // Autofill passkey if available
  // useEffect(() => {
  //   if (
  //     !PublicKeyCredential.isConditionalMediationAvailable ||
  //     !PublicKeyCredential.isConditionalMediationAvailable()
  //   ) {
  //     return;
  //   }

  //   void authClient.signIn.passkey({ autoFill: true });
  // }, []);

  async function signInWithPasskey() {
    signInWithPasskeyMutation.mutate(undefined, {
      onSuccess: () => {
        navigate({ to: "/dashboard" });
      },
    });
  }

  async function onResendVerificationEmail() {
    // resendVerificationMutation.mutate(getValues("email"), {
    //   onSuccess: () => {
    //     toast.info("Verification email sent. Please check your inbox.");
    //     signInMutation.reset();
    //   },
    //});
  }

  return (

    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Välkommen tillbaka</CardTitle>
        <CardDescription>Logga in till Forba Systems</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="sign-in-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Logga in med Forba konto
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                eller fortsätt med
              </span>
            </div>
          </div>
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="m@example.com"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Lösenord</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="********"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
          <LoadingButton
            isLoading={signInMutation.isPending}
            disabled={signInMutation.isPending}
            type="submit"
            className="w-full mt-5"
          >
            Logga in
          </LoadingButton>
          <div className="text-center text-sm mt-2">
            Inget konto?{" "}
            <Link to="/sign-up" className="underline underline-offset-4">
              Registrea konto
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>


    // <div className="mx-auto" style={{ width: "min(100%, 500px)" }}>
    //   <div className="flex flex-col items-center mb-8">
    //     <Link to="/">
    //       <Gem className="mb-2" />
    //     </Link>
    //     <h1 className="font-bold text-2xl mb-2">Välkommen tillbaka</h1>
    //     <p className="text-sm">
    //       Don't have an account?{" "}
    //       <Link to="/sign-up" className="underline">
    //         Sign up
    //       </Link>
    //     </p>
    //   </div>
    //   <form
    //     onSubmit={handleSubmit(onSignIn)}
    //     className="grid space-y-4"
    //     style={{ width: "min(100%, 500px)" }}
    //   >
    //     <div>
    //       <Label htmlFor="email">Email</Label>
    //       <Input
    //         id="email"
    //         type="email"
    //         placeholder="example@email.com"
    //         autoComplete="email webauthn"
    //         {...register("email")}
    //         aria-invalid={errors.email ? "true" : "false"}
    //       />
    //       <p className="text-destructive text-sm">{errors.email?.message}</p>
    //     </div>
    //     <div>
    //       <div className="flex justify-between">
    //         <Label htmlFor="password">Password</Label>
    //         <Link
    //           to="/request-reset-password"
    //           className="text-sm text-muted-foreground underline text-center block"
    //         >
    //           Forgot password
    //         </Link>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <Input
    //           id="password"
    //           type={showPassword ? "text" : "password"}
    //           placeholder="********"
    //           autoComplete="current-password webauthn"
    //           {...register("password")}
    //           aria-invalid={errors.password ? "true" : "false"}
    //         />
    //         <Button
    //           variant="outline"
    //           type="button"
    //           onClick={() => setShowPassword((prev) => !prev)}
    //         >
    //           {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    //         </Button>
    //       </div>
    //       <p className="text-destructive text-sm">{errors.password?.message}</p>
    //     </div>
    //     <LoadingButton
    //       isLoading={signInMutation.isPending}
    //       disabled={signInMutation.isPending}
    //       type="submit"
    //       className="w-full"
    //     >
    //       Sign In
    //     </LoadingButton>
    //     {signInMutation.error ? (
    //       signInMutation.error.message === "Please verify your email address" ? (
    //         <p className="text-destructive text-sm text-center">
    //           Please verify your email address.{" "}
    //           <Button
    //             variant="link"
    //             className="px-0 text-destructive underline"
    //             onClick={onResendVerificationEmail}
    //             type="button"
    //             disabled={resendVerificationMutation.isPending}
    //           >
    //             Resend verification email
    //           </Button>
    //         </p>
    //       ) : (
    //         <p className="text-destructive text-sm text-center">{signInMutation.error.message}</p>
    //       )
    //     ) : null}
    //     {signInWithPasskeyMutation.error && (
    //       <p className="text-destructive text-sm text-center">
    //         {signInWithPasskeyMutation.error?.message}
    //       </p>
    //     )}
    //   </form>
    //   <div className="flex items-center gap-4 mt-4 mb-6">
    //     <span className="bg-muted h-1 grow" />
    //     <p className="text-muted-foreground">Or</p>
    //     <span className="bg-muted h-1 grow" />
    //   </div>
    //   <div className="grid sm:grid-cols-2 gap-4 mb-8">
    //     <Button
    //       variant="outline"
    //       onClick={async () =>
    //         await authClient.signIn.social({
    //           provider: "google",
    //           callbackURL: "/dashboard",
    //           errorCallbackURL: "/sign-in",
    //         })
    //       }
    //     >
    //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    //         <path
    //           d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
    //           fill="currentColor"
    //         />
    //       </svg>
    //       Continue with Google
    //     </Button>
    //     <LoadingButton
    //       variant="outline"
    //       onClick={signInWithPasskey}
    //       isLoading={signInWithPasskeyMutation.isPending}
    //       disabled={signInWithPasskeyMutation.isPending}
    //     >
    //       <Key className="size-4" />
    //       Continue with Passkey
    //     </LoadingButton>
    //   </div>
    //   <p className="text-xs max-w-[31ch] text-center mx-auto text-muted-foreground">
    //     By clicking continue, you agree to our{" "}
    //     <Link to="/" hash="not-implemented" className="underline">
    //       Temrs of Service
    //     </Link>{" "}
    //     and{" "}
    //     <Link to="/" hash="not-implemented" className="underline">
    //       Privacy Policy
    //     </Link>
    //   </p>
    // </div>
  );
}
