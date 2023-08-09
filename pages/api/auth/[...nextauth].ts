// ** NextAuth Imports
import NextAuth, { NextAuthOptions } from "next-auth"
import Facebook from "next-auth/providers/facebook"
import Github from "next-auth/providers/github"

// ** MongoDB Imports
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb/client"

export const authOptions: NextAuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        Facebook({
            clientId: process.env.FACEBOOK_ID || '',
            clientSecret: process.env.FACEBOOK_SECRET || '',
        })
    ],
    // @ts-expect-error
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: 'jwt',
    },
}

export default NextAuth(authOptions)