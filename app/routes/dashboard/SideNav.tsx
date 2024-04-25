import logo from '../../assets/logo.svg'
import { LuLayoutGrid, LuPiggyBank, LuReceipt, LuShieldCheck } from "react-icons/lu";
import { NavLink } from '@remix-run/react'
import { MenuItem, SideNavProps } from "~/global";
import { AuthButton } from "~/components";

export default function SideNav({ data }: SideNavProps) {
    const menuList: MenuItem[] = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LuLayoutGrid,
            path: '/dashboard',
            end: true
        },
        {
            id: 2,
            name: 'Budgets',
            icon: LuPiggyBank,
            path: '/dashboard/budgets',
            end: true
        },
        {
            id: 3,
            name: 'Expenses',
            icon: LuReceipt,
            path: '/dashboard/expenses',
            end: false
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: LuShieldCheck,
            path: '/dashboard/upgrade',
            end: true
        }
    ]
    return (
        <aside className="h-screen min-w-60 border shadow-sm p-5 flex flex-col justify-between">
            <div>
                <img src={logo} width={71} height={55} alt="logo" className="mx-auto" />
                <div className="mt-5">
                    {menuList.map((menu, i) => (
                        <NavLink to={menu.path} end={menu.end} key={i} className={({ isActive }) =>
                            'flex items-center gap-2 font-medium p-5 cursor-pointer border border-transparent hover:border hover:rounded-md hover:text-blue-700 hover:bg-blue-100 ' + (isActive ? 'border rounded-md text-blue-700 bg-blue-100' : 'text-gray-500 ')
                        }>
                            <menu.icon />
                            {menu.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="mb-5 w-full flex justify-center">
                <AuthButton data={data} />
            </div>
        </aside>
    )
}
