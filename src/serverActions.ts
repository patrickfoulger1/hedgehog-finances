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
    const lowerFirst = first.toLowerCase();
    const lowerLast = last.toLowerCase();
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return capitalizeFirstLetter(lowerFirst) + " " + capitalizeFirstLetter(lowerLast);
};

export const handleSignup = async (formData: FormData) => {
    try {
        const formEmail = formData.get("email") as string;
        const password = formData.get("password") as string;
        const firstName = formData.get("first-name") as string;
        const lastName = formData.get("last-name") as string;
        const username = concatNames(firstName, lastName);

        // check if user exists
        const isUser = await prisma.user.findUnique({
            where: { email: formEmail },
        });

        // if user already exists return error
        if (isUser) {
            return { error: "Email already in use" };
        }

        const hashedPassword = await hash(password + process.env.NEXTAUTH_SECRET, 12);

        const newUser = await prisma.user.create({
            data: {
                email: formEmail,
                username,
                password: hashedPassword,
            },
        });

        return { newUser };
    } catch (error) {
        console.log(error);
        return { error: "An error occurred, please try again later." };
    }
};
