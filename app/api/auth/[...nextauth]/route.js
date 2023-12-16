import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token) {
    try {
        const url =
            "https://oauth2.googleapis.com/token?" +
            new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            })

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        })

        const refreshedTokens = await response.json()

        if (!response.ok) {
            throw refreshedTokens
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}


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
        async jwt({ token, account, user, profile, isNewUser }) {
            // Persist the OAuth access_token and or the user id to the token right after signin

            if (account?.access_token) {
                token.accessToken = account.access_token;
            }

            if (account?.refresh_token) {
                token.refreshToken = account.refresh_token;
            }

            if (account && user) {
                return token;
            }

            if (account?.expires_at) {
                const d = new Date(0);
                d.setUTCSeconds(account.expires_at);
                if (Date.now() < d) {
                    return token;
                }
            }


            return refreshAccessToken(token);





        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            if (token.accessTokenExpires) {
                session.user.accessTokenExpires = token.accessTokenExpires
            }

            return session
        }
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }