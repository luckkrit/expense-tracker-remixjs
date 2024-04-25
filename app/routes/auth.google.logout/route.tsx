import type { LoaderFunctionArgs } from "@remix-run/node";
import { ActionFunctionArgs } from '@remix-run/node';
import authenticator from '~/services/auth.server'
export async function action({ request }: ActionFunctionArgs) {
    await authenticator.logout(request, { redirectTo: "/" });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticator.logout(request, { redirectTo: "/" });
};
