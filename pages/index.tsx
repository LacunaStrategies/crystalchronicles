import { signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from 'react'

export default function Home() {

  // State Variables
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (provider: string) => {
    setLoading(true)
    await signIn(provider, { callbackUrl: '/app' })
    setLoading(false)
  }

  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center'>
      <h1 className="font-bold text-transparent text-7xl bg-clip-text bg-gradient-to-br from-fuchsia-800 to-fuchsia-300 mb-4">Crystal Chronicles</h1>
      <p className="max-w-lg text-2xl text-center mb-8">an app that improves the way you organize and understand your crystals</p>
      <Link
        className="transition duration-300 bg-gradient-to-br from-fuchsia-950 to-fuchsia-700 text-white py-1.5 px-5 rounded-md"
        href="/sign-in">Sign In</Link>
    </main>
  )
}