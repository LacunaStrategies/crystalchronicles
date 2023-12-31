import { signIn, useSession } from "next-auth/react"
import { useState } from 'react'
import { useRouter } from "next/router"

export default function SignIn() {

    // State Variables
    const [loading, setLoading] = useState(false)

    // Hooks
    const { data: session, status } = useSession()
    const router = useRouter()

    const handleSignIn = async (provider: string) => {
        setLoading(true)
        await signIn(provider, { callbackUrl: '/app' })
        setLoading(false)
    }

    if (status === 'authenticated') {
        router.push('/app')
    }

    return (
        <main className="relative flex flex-col min-h-screen items-center justify-center">
            <div className="px-4">
               
                {/* Logo */}
                <h1 className="font-bold text-center text-transparent text-5xl bg-clip-text bg-gradient-to-br from-fuchsia-800 to-fuchsia-300 mb-8 md:text-7xl">
                    Crystal Chronicles
                </h1>

                {/* Form */}
                <div className="w-full max-w-sm mx-auto">
                    <div className="flex flex-col justify-center items-center">
                        <button
                            disabled={loading}
                            type="button"
                            onClick={() => handleSignIn('github')}
                            className="w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 justify-center inline-flex items-center mb-2"
                        >
                            <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                            </svg>
                            Sign in with Github
                        </button>

                        <button
                            disabled={loading}
                            type="button"
                            onClick={() => handleSignIn('facebook')}
                            className="w-full text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 justify-center inline-flex items-center mb-2"
                        >
                            <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                            </svg>
                            Sign in with Facebook
                        </button>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="text-center text-sm mt-12">
                    <a
                        href="#"
                        className="transition duration-300 text-fuchsia-700 hover:text-fuchsia-500 mx-2"
                    >Terms of Use</a>
                    {' '}|{' '}
                    <a
                        href="#"
                        className="transition duration-300 text-fuchsia-700 hover:text-fuchsia-500 mx-2"
                    >Privacy Policy</a>
                </div>
            </div>
        </main>
    )
}