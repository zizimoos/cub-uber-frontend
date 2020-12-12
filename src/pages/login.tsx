import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;
interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}
export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();

  const onCompleted = (data: loginMutation) => {
    if (data.login.ok) {
      const {
        login: { ok, token },
      } = data;
      if (ok) {
        console.log(token);
      }
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSumit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-5 rounded-md text-center">
        <h3 className="text-3xl text-gray-800">Login</h3>
        <form onSubmit={handleSubmit(onSumit)} className="grid gap-3 mt-5 px-5">
          <input
            ref={register({ required: "Email is required" })}
            required
            name="email"
            type="email"
            placeholder="email"
            className="input mb-3"
          ></input>
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message}></FormError>
          )}
          <input
            ref={register({ required: "Password is required", minLength: 10 })}
            required
            name="password"
            type="password"
            placeholder="password"
            className="input"
          ></input>
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message}></FormError>
          )}
          {errors.password?.type === "minLength" && (
            <FormError
              errorMessage={"Password must be more than 10 chars."}
            ></FormError>
          )}
          <button className="btn mt-3">{loading ? "loading" : "LogIn"}</button>
          {loginMutationResult?.login.error && (
            <FormError
              errorMessage={loginMutationResult.login.error}
            ></FormError>
          )}
        </form>
      </div>
    </div>
  );
};
