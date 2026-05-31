import { NextRequest, NextResponse } from 'next/server'
import { auth_middleware } from '@/lib/auth-middleware'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const authCheck = await auth_middleware(req)
  if (!authCheck.authenticated || !authCheck.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: authCheck.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      phone: true,
      gender: true,
      dateOfBirth: true,
      country: true,
      targetScore: true,
      examDate: true,
      createdAt: true,
    },
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  return NextResponse.json({ user })
}

export async function PUT(req: NextRequest) {
  const authCheck = await auth_middleware(req)
  if (!authCheck.authenticated || !authCheck.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { name, phone, gender, dateOfBirth, country, targetScore, examDate } = body

  const updated = await prisma.user.update({
    where: { id: authCheck.user.id },
    data: {
      ...(name !== undefined && { name: String(name).trim() }),
      ...(phone !== undefined && { phone: phone ? String(phone).trim() : null }),
      ...(gender !== undefined && { gender: gender || null }),
      ...(dateOfBirth !== undefined && { dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null }),
      ...(country !== undefined && { country: country ? String(country).trim() : null }),
      ...(targetScore !== undefined && { targetScore: targetScore !== null ? Number(targetScore) : null }),
      ...(examDate !== undefined && { examDate: examDate ? new Date(examDate) : null }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      phone: true,
      gender: true,
      dateOfBirth: true,
      country: true,
      targetScore: true,
      examDate: true,
    },
  })

  return NextResponse.json({ user: updated })
}
