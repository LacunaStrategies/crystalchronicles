import SideNav from "@/components/side-nav"
import { useState } from "react"
import UserNav from "@/components/user-nav"


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
        <>
            {/* Side Nav */}
            <SideNav
                showMobileNav={showMobileNav}
                handleNavToggle={handleNavToggle}
            />

            <div className={`transition-all duration-300 ease-in-out h-full flex flex-col container mx-auto px-4 ${showMobileNav ? 'translate-x-64 blur-sm pointer-events-none lg:translate-x-0 lg:blur-none lg:pointer-events-auto' : 'translate-x-0'} lg:max-w-[calc(100%-16rem)] lg:ml-auto lg:mr-0 2xl:max-w[calc(1400px-16rem)]`}>
                <header className="transition-all duration-300 ease-in-out flex justify-between items-center w-full py-6">
                    <div>
                        <span className="ml-12 uppercase text-xs font-semibold lg:ml-0">{pageName}</span>
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