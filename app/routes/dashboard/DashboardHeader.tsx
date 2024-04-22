import { Outlet } from "@remix-run/react";
import { AuthButton } from "~/components/AuthButton";
import { ContextType, DashboardHeaderProps } from "~/global";

export default function ({ data }: DashboardHeaderProps) {
    return (
        <>
            <div className="p-5 shadow-sm border-b flex justify-between items-center">
                <div>
                    SearchBar
                </div>
                <AuthButton data={data} />
            </div>
        </>
    )
}
