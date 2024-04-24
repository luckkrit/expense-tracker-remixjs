import { IconType } from 'react-icons'
import { GoogleProfile } from 'remix-auth-google'
import { Budgets } from './database/types'
export type ProfileResponse = {

    "id": string,
    "email": string,
    "verified_email": boolean,
    "name": string,
    "given_name": string,
    "family_name": string,
    "picture": string,
    "locale": string
}
export interface HeaderProps {
    hideLogo?: boolean
}
export type MenuItem = {
    id: number,
    name: string,
    icon: IconType,
    path: string
}

export type ContextType = { data: JsonifyObject<GoogleProfile> | null };

export interface DashboardHeaderProps {
    data: JsonifyObject<GoogleProfile> | null
}
export interface AuthButtonProps {
    data: JsonifyObject<GoogleProfile> | null
}
export interface SideNavProps {
    data: JsonifyObject<GoogleProfile> | null
}

export interface BudgetListProps {
    budgets: JsonifyObject<Budgets[]>
}
export interface BudgetItemProps {
    budget: Budgets
}