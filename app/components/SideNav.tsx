import logo from "../assets/logo.svg"
import { LuLayoutGrid, LuPiggyBank, LuReceipt, LuShieldCheck } from "react-icons/lu";
import { MenuItem } from "../global";
import { AuthButton } from "./AuthButton";
import { NavLink } from '@remix-run/react'
export const SideNav = () => {
    const menuList: MenuItem[] = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LuLayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: LuPiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: LuReceipt,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: LuShieldCheck,
            path: '/dashboard/upgrade'
        }
    ]
    return (
        <aside className="h-screen min-w-60 border shadow-sm p-5 flex flex-col justify-between">
            <div>
                <img src={logo} width={71} height={55} alt="logo" className="mx-auto" />
                <div className="mt-5">
                    {menuList.map((menu, i) => (
                        <NavLink to={menu.path} end key={i} className={({ isActive }) =>
                            'flex items-center gap-2 font-medium p-5 cursor-pointer border border-transparent hover:border hover:rounded-md hover:text-blue-700 hover:bg-blue-100 ' + (isActive ? 'border rounded-md text-blue-700 bg-blue-100' : 'text-gray-500 ')
                        }>
                            <menu.icon />
                            {menu.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="mb-5 w-full flex justify-center">
                <AuthButton />
            </div>
        </aside>
    )
}
