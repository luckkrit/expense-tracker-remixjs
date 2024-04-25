import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Header } from "~/components";

export const loader = async ({ request }: LoaderFunctionArgs) => {

    return null;
};

export default function () {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
