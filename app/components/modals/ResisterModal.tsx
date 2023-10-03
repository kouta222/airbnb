"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import Heading from "../Heading";
import Input from "../inputs/input";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useResisterModal from "@/app/hooks/useResisterModal";
import Modals from "./Modals";
import toast, { Toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import Github from "next-auth/providers/github";
import useLoginModal from "@/app/hooks/useLoginModal";

const ResisterModal = () => {
  const registerModal = useResisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("something wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle2 = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className=" flex flex-col gap-4 ">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
      text-neutral-500
      mt-4
      font-light
      "
      >
        <div className="justify-center flex flex-row items-center gap-2 ">
          <div>Already have an account?</div>
          <div
            onClick={toggle2}
            className="
          text-center
          cursor-pointer
          hover:underline
          ml-4
          
          "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modals
      disable={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ResisterModal;
