import AdminLayout from "@/layouts/AdminLayout"
import { useSession } from "next-auth/react"


export default function AppHome() {

    const { data: session, status } = useSession()

    return (
        <AdminLayout pageName="Dashboard">
            <div className="p-8 bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 text-white rounded-3xl">
                <h1 className="text-2xl mb-8">Welcome, <span className="font-medium">{session?.user?.email}</span>!</h1>
                <p className="mb-2">We are actively building this "toy" version of our application..."alpha" phase is possibly what you could call it? You're welcome to pop in and look around. Don't expect everything to work and don't be surprised when things are broken!</p>
                <p className="mb-2">This project is part of "<a href="https://twitter.com/_buildspace" target="_blank" rel="noreferrer" className="underline">@_buildspace</a> <a href="https://twitter.com/_nightsweekends" target="_blank" rel="noreferrer" className="underline">@_nightsweekends</a>, Season 4" and we're excited to be shipping with everyone!</p>
                <p className="mb-2">Follow us on <a href="https://twitter.com/hunter_pdx" target="_blank" rel="noreferrer" className="underline">Twitter</a> or <a href="https://www.instagram.com/hunter_pdx/" target="_blank" rel="noreferrer" className="underline">Instagram</a> and join in the fun!</p>
            </div>
        </AdminLayout>
    )
}