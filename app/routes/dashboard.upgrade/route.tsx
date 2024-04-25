import type { LoaderFunctionArgs } from "@remix-run/node";
import React from 'react'

export default function () {
    return (
        <div>
            Upgrade
        </div>
    );
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
    return null;
};
