import Link from 'next/link'
import {
    Gem,
    Home,
    LogOut,
    Search,
    User,
    X
} from 'lucide-react'

interface Props {
    showMobileNav: boolean
}

const navigation = [
    {
        
    }
]

const SideNav: React.FC<Props> = ({ showMobileNav }) => {
    return (
        <div className={`transition-all duration-300 ease-in-out fixed top-0 left-0 ${showMobileNav ? 'translate-x-0' : '-translate-x-64 lg:translate-x-0'} bottom-0 px-5 w-64 bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 text-white`}>
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
                        <li>
                            <Link href="" className="transition duration-300 flex items-center uppercase text-fuchsia-950 text-xs leading-8 bg-white py-2 px-4 mb-3 rounded-full">
                                <Home className="mr-4 h-6 w-6" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="transition duration-300 flex items-center uppercase text-xs leading-8 hover:bg-white/25 py-2 px-4 mb-3 rounded-full">
                                <Search className="mr-4 h-6 w-6" />
                                Find Crystals
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="transition duration-300 flex items-center uppercase text-xs leading-8 hover:bg-white/25 py-2 px-4 mb-3 rounded-full">
                                <Gem className="mr-4 h-6 w-6" />
                                My Collection
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="transition duration-300 flex items-center uppercase text-xs leading-8 hover:bg-white/25 py-2 px-4 mb-3 rounded-full">
                                <User className="mr-4 h-6 w-6" />
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="transition duration-300 flex items-center uppercase text-xs leading-8 hover:bg-white/25 py-2 px-4 mb-3 rounded-full">
                                <LogOut className="mr-4 h-6 w-6" />
                                Log out
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SideNav