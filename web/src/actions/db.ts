'use server'

import { Person, PrismaClient } from '@prisma/client'
import { auth } from '../lib/auth'
import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function grabUsers(): Promise<Person[]> {
  const session = await auth();
  if (!session) {
    return []
  }

  return await prisma.person.findMany()
}

export async function createRandomUser() {
  const session = await auth();

  if (!session) {
    redirect('/login')
  }

  await prisma.person.create({
    data: {
      FirstName: faker.person.firstName(),
      LastName: faker.person.lastName(),
      Address: faker.location.streetAddress(),
      City: faker.location.city()
    }
  })

  revalidatePath('/')
}

export async function removeUser(id: number) {
  const session = await auth();

  if (!session) {
    redirect('/login')
  }

  await prisma.person.delete({
    where: { PersonID: id }
  })

  revalidatePath('/')
}