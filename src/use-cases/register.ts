import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface registerUseCasesRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCases({
  name,
  email,
  password,
}: registerUseCasesRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exist.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
