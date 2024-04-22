import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { useNavigate } from '@remix-run/react';
import { ProfileResponse } from '../global';
import { Form } from "@remix-run/react";
import axios from 'axios';
export const AuthButton = () => {
    const [user, setUser] = useState<Omit<TokenResponse, "error" | "error_description" | "error_uri"> | null>(null);
    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const navigate = useNavigate()
    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => setUser(codeResponse),
    //     onError: (error) => console.log('Login Failed:', error)
    // });

    // useEffect(
    //     () => {
    //         if (user) {
    //             axios
    //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })
    //                 .then((res) => {
    //                     navigate('/dashboard', { state: { profile: res.data } })
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     },
    //     [user]
    // );

    // log out function to log the user out of google and set the profile array to null
    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    //     navigate('/')
    // };

    return (
        // <div>
        //     <h2>React Google Login</h2>
        //     <br />
        //     <br />
        //     {profile ? (
        //         // <div>
        //         //     <img src={profile.picture} alt="user image" />
        //         //     <h3>User Logged in</h3>
        //         //     <p>Name: {profile.name}</p>
        //         //     <p>Email Address: {profile.email}</p>
        //         //     <br />
        //         //     <br />
        //         //     <button onClick={logOut}>Log out</button>
        //         // </div>
        //         null
        //     ) : (
        //     )}
        // </div>
        // <>

        //     {profile ? (<button onClick={() => logOut()} className='px-3 py-2 text-white bg-red-700 border rounded-md'>Log out</button>) : (
        //         <button onClick={() => login()} className='px-3 py-2 text-white bg-red-700 border rounded-md'>Get Started</button>
        //     )}
        // </>
        <Form action="/auth/google" method="get">
            <button>Login with Google</button>
        </Form>
    );
}
