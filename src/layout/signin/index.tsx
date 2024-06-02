"use client"; // style
import { Button, Card, Spinner, TextInput } from "flowbite-react";
import { DarkModeButton } from "@dark-mode";
import { schemaSignin } from "@validations";
import { Signin } from "@auth-interface";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterStore } from "@store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import frame1 from "../../assets/frame1.png";
import frame2 from "../../assets/frame2.png";
import Logo from "../../assets/img.png";
import "./style.css";

export default function SignIn() {
  const { signin } = useRegisterStore();
  const navigate = useNavigate();

  const initialValues: Signin = {
    email: "t0664005@gmail.com",
    password: "Akmalweb12@",
  };

  const handleSubmit = async (values: Signin) => {
    const status = await signin(values);
    if (status === 201) {
      navigate("/main");
      window.location.reload();
    } else if (status === 404) navigate("/signup");
  };

  return (
    <div className="flex items-center justify-between w-screen h-screen px-5">
      <div className="relative w-[50%] bg-gra-200 p-28  flex items-center justify-center">
        <img src={frame1} className="rotate-clockwise absolute w-[500px]" />
        <img src={Logo} className="fixed z-10 w-[500px]" />
        <img src={frame2} className="rotate-clockwise absolute w-[500px]" />
      </div>
      <div className="w-[50%] bg-gra-200 ml-8a flex justify-center">
        <Card className="w-96 shadow-lg ">
          <h1 className="text-center text-[#0e7490] my-3 text-3xl font-semibold dark:text-white">
            Sign In
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={schemaSignin}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="grid gap-2">
                <Field
                  name="email"
                  type="email"
                  as={TextInput}
                  placeholder="Email"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="small"
                      className="text-[red]"
                    />
                  }
                />
                <Field
                  name="password"
                  type="password"
                  as={TextInput}
                  placeholder="Password"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="small"
                      className="text-[red]"
                    />
                  }
                />

                <div className="flex justify-between mb-4">
                  <small className="dark:text-gray-300">
                    Not registered yet?
                  </small>
                  <Link to="/signup" className="text-[13px] text-sky-500">
                    Sign Up
                  </Link>
                </div>

                <Button type="submit">
                  {isSubmitting ? (
                    <>
                      <Spinner aria-label="Default status example" size="md" />{" "}
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
      <DarkModeButton />
    </div>
  );
}
