import { Api } from "@/lib/utils";
import { AxiosResponse } from "axios";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
          const response = await Api.post("/authenticate-linklyuser", credentials)



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
      const response = await Api.post("/authenticate-user", params.user[0]);

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

      //@ts-ignore
      if (user?.[0]) {
        //@ts-ignore
        token.id = user[0]._id
        //@ts-ignore
        token.name = user[0].firstName

      } else {
        if (user?.email) {
          const response = await Api.post("/authenticate-googleuser", { email: user.email })
          console.log("hey");
          console.log(response.data);
          
          
          token.id = response.data?.[0]._id;
          return token
        }

      }


      return token

    },
    async session(
      { session, token, user }
    ) {

      //@ts-ignore
      session.user.name = token.name
      //@ts-ignore
      session.user.id = token.id
      //@ts-ignore
console.log(session);

      return session;
    }

  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
