import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from '@remix-run/react'
import authenticator from '~/services/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const profile = await authenticator.isAuthenticated(request)
    if (profile !== null && profile !== undefined) {
        return redirect('/dashboard')
    }
    return null;
};

export default function () {
    return (
        <div>Landing Index</div>
    )
}
