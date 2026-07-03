import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { expo } from "@better-auth/expo";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [admin(), expo()],
    // Allow the Expo mobile app (deep-link scheme "mobile") to authenticate.
    trustedOrigins: ["mobile://"],
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 7 * 24 * 60 * 60,
        },
    },
});