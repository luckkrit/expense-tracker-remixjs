import type { LoaderFunctionArgs } from "@remix-run/node";

export default function () {
    return (
        <div>
            Budgets
        </div>
    );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return null;
};
