import type { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import authenticator from '~/services/auth.server'


export const loader = async ({ request }: LoaderFunctionArgs) => {
    return redirect('/')
};

export const action = async ({ request }: ActionFunctionArgs) => {
    return authenticator.authenticate('google', request)
};
