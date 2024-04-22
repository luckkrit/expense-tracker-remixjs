import type { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import authenticator from '~/services/auth.server'

// export let loader = () => redirect('/')

// export let action = ({ request }: ActionFunctionArgs) => {
//     console.log('work')
//     return authenticator.authenticate('google', request)
// }


export const loader = async ({ request }: LoaderFunctionArgs) => {
    return redirect('/')
};

export const action = async ({ request }: ActionFunctionArgs) => {
    console.log('work')
    return authenticator.authenticate('google', request)
};
