import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { auth_middleware } from '@/lib/auth-middleware'

export async function PUT(req: NextRequest) {
  const authCheck = await auth_middleware(req)
  if (!authCheck.authenticated || !authCheck.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Both current and new password are required.' }, { status: 400 })
  }

  try {
    await auth.api.changePassword({
      body: { currentPassword, newPassword, revokeOtherSessions: false },
      headers: req.headers,
    })
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to change password.'
    const isWrongPassword =
      typeof message === 'string' && message.toLowerCase().includes('password')
    return NextResponse.json(
      { error: isWrongPassword ? 'Current password is incorrect.' : message },
      { status: 400 }
    )
  }
}
