import { signOut } from "next-auth/react";

export default function AppHome() {
    return (
        <main className='relative flex min-h-screen flex-col items-center justify-center'>
            <h1>App Home</h1>
            <div>
                <button onClick={() => signOut({ callbackUrl: '/sign-in' })}>Sign Out</button>
            </div>
        </main>
    )
}