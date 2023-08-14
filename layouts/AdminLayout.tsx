
import SideNav from "@/components/side-nav"
import { useState } from "react"
import {
    Menu,
    X,
} from "lucide-react"
import UserNav from "@/components/user-nav"


interface Props {
    children: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children }) => {

    const [showMobileNav, setShowMobileNav] = useState(false)

    return (
        <>
            {/* Side Nav */}
            <SideNav
                showMobileNav={showMobileNav}
            />

            <div className={`transition-all duration-300 ease-in-out h-full flex flex-col container mx-auto px-4 ${showMobileNav ? 'fixed left-64' : 'left-0'}`}>
                <header className="transition-all duration-300 ease-in-out flex justify-between items-center w-full py-6">
                    <div>
                        <div className="flex items-center">
                            <button className="lg:hidden">
                                {
                                    showMobileNav ? (
                                        <X onClick={() => setShowMobileNav(false)} />
                                    ) : (
                                        <Menu onClick={() => setShowMobileNav(true)} />
                                    )
                                }
                            </button>
                            <span className="ml-4 uppercase text-xs font-semibold lg:ml-0">Dashboard</span>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <UserNav />
                    </div>
                </header>
                <main className="transition-all duration-300 ease-in-out grow">
                    {children}
                </main>
                <footer className="">

                </footer>
            </div>
        </>
    )
}

export default AdminLayout