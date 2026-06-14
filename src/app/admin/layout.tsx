"use client"
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    const {
        data: session,
        isPending,
        error,
    } = authClient.useSession()

    useEffect(() => {
        if (isPending) return;
        if (!session) {
            router.push('/login')
        } else if ((session.user as { role?: string }).role !== 'admin') {
            router.push('/')
        }
    }, [isPending, session, router])

    if (isPending) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!session || (session.user as { role?: string }).role !== 'admin') return null;

    return <div>{children}</div>
}

export default AdminLayout