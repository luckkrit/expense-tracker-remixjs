import logo from "../assets/logo.svg"
import { HeaderProps } from "../global"
import { AuthButton } from "./AuthButton"

export const Header = ({ hideLogo = false }: HeaderProps) => {
    return (
        <nav className="p-5 flex justify-between items-center border shadow-sm">
            {hideLogo ? null :
                <>
                    <img src={logo} width={71} height={55} alt="logo" />
                    <AuthButton data={null} />
                </>
            }
        </nav>
    )
}
