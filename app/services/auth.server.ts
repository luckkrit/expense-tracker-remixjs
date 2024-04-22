import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
import { GoogleStrategy } from 'remix-auth-google'

let googleStrategy = new GoogleStrategy(
    {
        clientID: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        callbackURL: 'https://example.com/auth/google/callback',
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
        // Get the user data from your DB or API using the tokens and profile
        // return User.findOrCreate({ email: profile.emails[0].value })
        console.log(profile)
        return {}
    }
)
let authenticator = new Authenticator<any>(sessionStorage);

authenticator.use(googleStrategy)
export default authenticator
