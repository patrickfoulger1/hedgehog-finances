//write functions you want to happen in client components on the server here
"use server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { signIn } from "next-auth/react";
const prisma = new PrismaClient();

export const example = async () => {
  console.log("I would run on server");
};

const concatNames = (first: string, last: string) => {
  let username;
  const lowerFirst = first.toLowerCase()
  const lowerLast = last.toLowerCase()
  function capitalizeFirstLetter(string: string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  return capitalizeFirstLetter(lowerFirst) + " " + capitalizeFirstLetter(lowerLast);
}


export const handleSignup = async (formData: FormData) => {
  try {
    const formEmail = formData.get("email") as string
    // check user does not exist in db
    const isUser = await prisma.user.findUnique({ where: { email: formEmail } })

    // If user exists - some sort of front end notice that user email aleady in use

    // if user does not exist create new user
    if (isUser) { return "Email already in use" }
    const password = formData.get("password") as string
    const hashedPassword = await hash(password + process.env.NEXTAUTH_SECRET, 12)
    const firstName = formData.get('first-name') as string
    const lastName = formData.get('last-name') as string
    const username = concatNames(firstName, lastName)

    const newUser = await prisma.user.create({
      data: {
        email: formEmail,
        username,
        password: hashedPassword,
      },
    });
    await signIn("credentials", {
      redirect: false,
      email: newUser.email,
      password,

    });
    return null;

  } catch (error) {
    return "An error occured, please try again later."
  }


}