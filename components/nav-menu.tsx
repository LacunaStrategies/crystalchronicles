import Link from 'next/link'

import { useRouter } from 'next/router'
import {
    Gem,
    Home,
    LogOut,
    Menu,
    Search,
    User,
    X
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const navigation: NavItem[] = [
    {
        name: "Dashboard",
        icon: <Home className="mr-4 h-6 w-6" />,
        path: "/app",
    },
    {
        name: "Find Crystals",
        icon: <Search className="mr-4 h-6 w-6" />,
        path: "/app/crystals",
    },
    {
        name: "My Collections",
        icon: <Gem className="mr-4 h-6 w-6" />,
        path: "/app/my-collections",
    },
    {
        name: "Profile",
        icon: <User className="mr-4 h-6 w-6" />,
        path: "/app/profile",
    },
    {
        name: "Log Out",
        icon: <LogOut className="mr-4 h-6 w-6" />,
        path: "#",
        onClick: () => signOut({ callbackUrl: '/sign-in' }),
    },
]

interface NavItem {
    name: string
    icon: React.ReactNode
    path: string
    disabled?: boolean
    onClick?: () => Promise<undefined>
}

interface Props {
    showMobileNav: boolean
    handleNavToggle: (toggle: 'show' | 'hide') => void
}

const NavMenu: React.FC<Props> = ({ handleNavToggle, showMobileNav }) => {

    const router = useRouter()

    return (
        <div className={`z-50 transition-all duration-300 fixed top-0 left-0 bottom-0 flex flex-col items-center w-full bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 text-white ${showMobileNav ? 'translate-y-0' : '-translate-y-full'}`}>
            <button
                className="absolute top-6 right-6"
                onClick={() => handleNavToggle('hide')}
            >
                <X aria-hidden="true" />
            </button>
            {/* Logo */}
            <div className="my-auto">
                <div className="text-center border-b border-b-white">
                    <Link
                        href="/app"
                        className="block uppercase text-center py-6 leading-10"
                    >Crystal Chronicles</Link>
                </div>
                {/* Nav Menu */}
                <nav className="py-6">
                    <ul>
                        {
                            navigation.map(item => {
                                if (item.disabled)
                                    return (
                                        <li key={item.name}>
                                            <span className={`transition duration-300 flex items-center uppercase text-xs leading-8 py-2 px-4 mb-3 rounded-full text-white/50 cursor-default`}
                                            >
                                                {item.icon}
                                                {item.name}
                                            </span>
                                        </li>
                                    )

                                if (item.onClick)
                                    return (
                                        <li key={item.name}>
                                            <button
                                                onClick={item.onClick}
                                                className={`transition duration-300 flex items-center uppercase w-full hover:bg-white/25 text-xs leading-8 py-2 px-4 mb-3 rounded-full`}
                                            >
                                                {item.icon}
                                                {item.name}
                                            </button>
                                        </li>
                                    )

                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.path}
                                            onClick={() => handleNavToggle('hide')}
                                            className={`transition duration-300 flex items-center uppercase ${router.asPath === item.path ? 'bg-white text-fuchsia-950' : 'hover:bg-white/25'} text-xs leading-8 py-2 px-4 mb-3 rounded-full disabled:text-white/50`}
                                        >
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default NavMenu