import { Outlet } from '@remix-run/react'

export default function () {
    return (
        <>
            <div>Dashboard Layout</div>
            <Outlet />
        </>
    )
}
