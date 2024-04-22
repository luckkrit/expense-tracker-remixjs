import { IconType } from 'react-icons'
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

export type ContextType = { profile: ProfileResponse | null };