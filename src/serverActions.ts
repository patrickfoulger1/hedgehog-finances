//write functions you want to happen in client components on the server here
"use server";
import { PrismaClient, User } from "@prisma/client";
import { hash } from "bcrypt";
import { Novu } from "@novu/api";
import { signIn } from "next-auth/react";
import { log } from "util";

const prisma = new PrismaClient();
const novu = new Novu({
    secretKey: `${process.env.NEXT_PUBLIC_NOVU_SECRET_KEY}`,
});

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
        const newSubscriber = await novu.subscribers.create({
            firstName: newUser.username,
            subscriberId: newUser.id,
            email: newUser.email,
        });

        return { newUser };
    } catch (error) {
        console.log(error);
        return { error: "An error occurred, please try again later." };
    }
};

export const updateProfileImage = async (url: string, user: User) => {
    await prisma.user.update({
        where: { email: user.email },
        data: { image: url },
    });
};
