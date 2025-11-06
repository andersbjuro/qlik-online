import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "@tanstack/react-form"
import z from "zod";
import LoadingButton from "src/components/LoadingButton";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { useSignUp } from "src/features/auth/client/use-cases";
import { registerValidation } from "src/features/auth/validations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "src/components/ui/field"

export default function SignUp() {
  const signUpMutation = useSignUp();

  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(registerValidation),
  // });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: registerValidation,
    },
    onSubmit: async ({ value }) => {
      signUpMutation.mutate(
        {
          name: value.name,
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            setEmailSent(true);
          },
        }
      );
    },
  })

  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Välkommen tillbaka</CardTitle>
        <CardDescription>Logga in till Forba Systems</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="sign-up-form"
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
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Namn</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Namn"
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
            isLoading={signUpMutation.isPending}
            disabled={signUpMutation.isPending}
            type="submit"
            className="w-full mt-5"
          >
            Registrera konto
          </LoadingButton>
          <div className="text-center text-sm mt-2">
            Redan registrerad?{" "}
            <Link to="/sign-in" className="underline underline-offset-4">
              Logga in
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
    //     <h1 className="font-bold text-2xl mb-2">Start your journy</h1>
    //     <p className="text-sm">
    //       Already have an account?{" "}
    //       <Link to="/sign-in" className="underline">
    //         Sign in
    //       </Link>
    //     </p>
    //   </div>
    //   <form
    //     onSubmit={handleSubmit(onSignUp)}
    //     className="grid space-y-4"
    //     style={{ width: "min(100%, 500px)" }}
    //   >
    //     <div>
    //       <Label htmlFor="name">Name</Label>
    //       <Input
    //         id="name"
    //         type="text"
    //         placeholder="John Doe"
    //         {...register("name")}
    //         aria-invalid={errors.name ? "true" : "false"}
    //       />
    //       <p className="text-destructive text-sm">{errors.name?.message}</p>
    //     </div>
    //     <div>
    //       <Label htmlFor="email">Email</Label>
    //       <Input
    //         id="email"
    //         type="email"
    //         placeholder="example@email.com"
    //         {...register("email")}
    //         aria-invalid={errors.email ? "true" : "false"}
    //       />
    //       <p className="text-destructive text-sm">{errors.email?.message}</p>
    //     </div>
    //     <div>
    //       <Label htmlFor="password">Password</Label>
    //       <div className="flex items-center gap-2">
    //         <Input
    //           id="password"
    //           type={showPassword ? "text" : "password"}
    //           placeholder="********"
    //           {...register("password")}
    //           aria-invalid={errors.password ? "true" : "false"}
    //         />
    //         <Button
    //           onClick={() => setShowPassword((prev) => !prev)}
    //           type="button"
    //           variant="outline"
    //         >
    //           {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    //         </Button>
    //       </div>
    //       <p className="text-destructive text-sm">{errors.password?.message}</p>
    //     </div>
    //     <LoadingButton isLoading={mutation.isPending} disabled={mutation.isPending} type="submit">
    //       Sign Up
    //     </LoadingButton>
    //     <p className="text-destructive text-sm text-center">{mutation.error?.message}</p>
    //     {emailSent && (
    //       <p className="text-sm text-green-400 text-center">
    //         An email has been sent to your address. Please verify your email to signing in.
    //       </p>
    //     )}
    //   </form>
    // </div>
  );
}
