import NavMenu from "@/components/nav-menu"
import UserNav from "@/components/user-nav"

import { Menu, X } from "lucide-react"

import { useState } from "react"

interface Props {
    pageName?: string
    children: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children, pageName }) => {

    const [showMobileNav, setShowMobileNav] = useState(false)

    const handleNavToggle = (toggle: 'show' | 'hide') => {
        switch (toggle) {
            case "show":
                document.body.style.overflow = 'hidden'
                setShowMobileNav(true)
                break
            case "hide":
                document.body.style.overflow = 'auto'
                setShowMobileNav(false)
                break
            default:
                document.body.style.overflow = 'auto'
                setShowMobileNav(false)
        }
    }

    return (
        <div className="h-full flex flex-col container mx-auto px-4">
            <header className="flex justify-between items-center w-full py-6">
                <div className="flex items-center">
                    <button
                        className="inline-block"
                        onClick={() => handleNavToggle('show')}
                    >
                        <Menu aria-hidden="true" />
                    </button>
                    <span className="uppercase text-xs font-semibold ml-2">{pageName}</span>
                </div>
                <div className="ml-auto">
                    <UserNav />
                </div>
            </header>
            <NavMenu 
                handleNavToggle={handleNavToggle}
                showMobileNav={showMobileNav}
            />
            <main className="grow">
                {children}
            </main>
        </div>
    )
}

export default AdminLayout