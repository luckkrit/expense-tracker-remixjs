import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
import { GoogleProfile, GoogleStrategy } from 'remix-auth-google'

let googleStrategy = new GoogleStrategy(
    {
        clientID: import.meta.env.VITE_CLIENTID,
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5173/auth/google/callback',
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
        // Get the user data from your DB or API using the tokens and profile
        // return User.findOrCreate({ email: profile.emails[0].value })
        return profile
    }
)
let authenticator = new Authenticator<GoogleProfile>(sessionStorage);

authenticator.use(googleStrategy)
export default authenticator
