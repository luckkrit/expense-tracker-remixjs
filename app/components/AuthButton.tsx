import { Form } from "@remix-run/react";
import { AuthButtonProps } from "~/global";
export const AuthButton = ({ data }: AuthButtonProps) => {
    return (
        <>

            {data !== null && data !== undefined ?
                <Form action="/auth/google/logout" method="post" >
                    <button className='px-3 py-2 text-white bg-red-700 border rounded-md w-full'>Sign out</button>
                </Form>
                :

                <Form action="/auth/google" method="post" >
                    <button className='px-3 py-2 text-white bg-red-700 border rounded-md w-full'>Login with Google</button>
                </Form>
            }
        </>
    );
}
