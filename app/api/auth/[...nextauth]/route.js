import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID || "",
            clientSecret: process.env.CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/books",
                },
            },
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }

            return token;
        },
        async session({ session, token }) {

            // Send properties to the client, like an access_token and user id from a provider.
            session.user.accessToken = token.accessToken

            return session
        }
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }