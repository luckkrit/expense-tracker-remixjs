import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react'
import { ContextType } from '~/global';
import DashboardHeader from './DashboardHeader';
import SideNav from './SideNav';
import authenticator from '~/services/auth.server';
import { Toaster } from '~/components/ui/toaster';

export const loader = async ({ request }: LoaderFunctionArgs) => {

    const profile = await authenticator.isAuthenticated(request)
    return profile;
};
export default function () {
    const data = useLoaderData<typeof loader>()
    return (
        <div className="flex">
            <div className="hidden md:block">
                <SideNav data={data} />
            </div>
            <main className="w-full">
                <DashboardHeader data={data} />
                <Outlet context={{ data } satisfies ContextType} />

                <Toaster />
            </main>
        </div>
    )
}
export function useProfile() {
    return useOutletContext<ContextType>();
}