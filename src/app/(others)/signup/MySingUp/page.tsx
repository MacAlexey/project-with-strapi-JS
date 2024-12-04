import React, { useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import Heading2 from "components/Heading/Heading2";
import Image from "components/Image/Image";
import Layout from "../../layout";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../authContext/authContextProps";
import { API } from "../../../../../src/constants";
import { setToken } from "../../../../helpers";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const SignUp: React.FC = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = { username, email, password, firstName, lastName };
    setIsLoading(true);
    // console.log(JSON.stringify(values));
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok || data?.error) {
        throw new Error(data?.error?.message || "Registration failed");
      }

      setToken(data.jwt);
      setUser(data.user);
      navigate("/", { replace: true });
    } catch (error: any) {
      setError(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>Sign up</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Welcome to our blog magazine Community
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        <div className="grid gap-3">
          {loginSocials.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
              <Image
                className="flex-shrink-0"
                src={item.icon}
                alt={item.name}
              />
              <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                {item.name}
              </h3>
            </a>
          ))}
        </div>
        {/* OR */}
        <div className="relative text-center">
          <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
            OR
          </span>
          <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
        </div>
        {/* FORM */}
        <form
          className="grid grid-cols-1 gap-6"
          method="post"
          onSubmit={onFinish}
        >
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              First name
            </span>
            <Input
              type="text"
              placeholder="first name"
              className="mt-1"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Last name
            </span>
            <Input
              type="text"
              placeholder="last name"
              className="mt-1"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Your Username
            </span>
            <Input
              type="text"
              placeholder="username"
              className="mt-1"
              // id="username"
              // value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address
            </span>
            <Input
              type="email"
              placeholder="your@email"
              className="mt-1"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
            </span>
            <Input
              type="password"
              className="mt-1"
              placeholder="***"
              //   id="username"
              //   value={username}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <ButtonPrimary type="submit">Registration</ButtonPrimary>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Already have an account? {` `}
          <NcLink href="/login">Sign in</NcLink>
        </span>
      </div>
    </Layout>
  );
};

export default SignUp;
