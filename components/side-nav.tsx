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

interface Props {
    showMobileNav: boolean
    handleNavToggle: (toggle: 'show' | 'hide') => void
}

interface NavItem {
    name: string
    icon: React.ReactNode
    path: string
    disabled?: boolean
    onClick?: () => Promise<undefined>
}

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

const SideNav: React.FC<Props> = ({ handleNavToggle, showMobileNav }) => {

    const router = useRouter()

    return (
        <div className={`transition-all duration-300 ease-in-out fixed z-30 top-0 left-0 ${showMobileNav ? 'translate-x-0' : '-translate-x-64 lg:translate-x-0'} bottom-0 px-5 w-64 bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 text-white`}>
            <button className="absolute top-8 -right-12 z-50 text-black lg:hidden">
                {
                    showMobileNav ? (
                        <X onClick={() => handleNavToggle('hide')} />
                    ) : (
                        <Menu onClick={() => handleNavToggle('show')} />
                    )
                }
            </button>

            {/* Logo */}
            <div className="text-center border-b border-b-white">
                <Link
                    href="/app"
                    className="block uppercase text-center py-6 leading-10"
                >Crystal Chronicles</Link>
            </div>
            {/* Nav Menu */}
            <div>
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

export default SideNav