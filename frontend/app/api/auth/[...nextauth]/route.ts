import { Api } from "@/lib/utils";
import { AxiosResponse } from "axios";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
function convertToObject(data: any) {
  // Check if the input is already an object
  if (typeof data === "object" && !Array.isArray(data)) {
    return data; // Return as is if it's already an object
  }

  // If it's an array, convert it to an object
  if (Array.isArray(data)) {
    return data.reduce((acc, item, index) => {
      // You can customize how you want to structure the object
      // Here, we use the index as the key
      acc[index] = item;
      return acc;
    }, {});
  }

  // If it's neither an array nor an object, return an empty object or handle as needed
  return {};
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await Api.post(
            "/authenticate-linklyuser",
            credentials
          );

          return response.data;
        } catch (error) {
          return false;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn(params) {
      if (!params) return false;

      //for token
      //@ts-ignore

      if (!(params.account?.provider === "google")) return true;

      //@ts-ignore
      const lastName = params.profile.family_name;
      const email = params.profile?.email;
      const googleId = params.user.id;

      //@ts-ignore
      const firstName = params.profile.given_name;

      try {
        const exist = await Api.post("/check-google-user", {
          email,
        });
        const response = await Api.post("/create-google-user", {
          firstName,
          lastName,
          email,
          googleId,
        });
        return true;
        //axios works throws 400+ codes to catch block
      } catch (error) {
        return true;
      }
    },
    async jwt({ token, user, session }) {
      if (user) {
        let data = convertToObject(user);
        const response = await Api.post("/authenticate-user", data, {
          withCredentials: true,
        });
      }

      //@ts-ignore
      if (user?.[0]) {
        //@ts-ignore
        token.id = user[0]._id;
        //@ts-ignore
        token.name = user[0].firstName;
      } else {
        if (user?.email) {
          const response = await Api.post("/authenticate-googleuser", {
            email: user.email,
          });

          token.id = response.data?.[0]._id;
          return token;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      //@ts-ignore
      session.user.name = token.name;
      //@ts-ignore
      session.user.id = token.id;
      //@ts-ignore

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
