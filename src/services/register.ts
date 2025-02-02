import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import bcrypt from "bcrypt";

interface RegisterServiceProps {
  name: string;
  email: string;
  password: string;
}

export async function registerService({
  name,
  email,
  password,
}: RegisterServiceProps) {
  const password_hash = bcrypt.hashSync(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("Email already exists.");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({ name, email, password_hash });
}
