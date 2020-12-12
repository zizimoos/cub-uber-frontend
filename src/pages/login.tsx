import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../constant";
import nuberLogo from "../images/cubUberLogo.svg";

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
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({ mode: "onChange" });

  const onCompleted = (data: loginMutation) => {
    if (data.login.ok) {
      const {
        login: { ok, token },
      } = data;
      if (ok && token) {
        console.log(token);
        localStorage.setItem(LOCALSTORAGE_TOKEN, token);
        authTokenVar(token);
        isLoggedInVar(true);
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
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Cub Uber Eat</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={nuberLogo} className="w-35  mb-5" alt={"logo"}></img>
        <h4 className="w-full text-left text-2xl font-medium mb-4">
          Welcom back
        </h4>
        <form
          onSubmit={handleSubmit(onSumit)}
          className="w-full grid gap-3 mt-5 mb-3"
        >
          <input
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            required
            name="email"
            type="email"
            placeholder="email"
            className="p-1 px-5 border-2 text-lg font-light border-gray-200 focus:outline-none focus:border-gray-500"
          ></input>
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message}></FormError>
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a vaild email"}></FormError>
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
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log In"}
          ></Button>
          {loginMutationResult?.login.error && (
            <FormError
              errorMessage={loginMutationResult.login.error}
            ></FormError>
          )}
        </form>
        <div>
          New to cubUber?{" "}
          <Link
            to="/create-account"
            className=" text-green-500 hover:underline"
          >
            Create an account
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};
