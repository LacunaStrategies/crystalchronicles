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
        <h1>Crystal Chronicles</h1>
        <Link href="/sign-in">Sign In</Link>
    </main>
  )
}