'use server'

import { Person, PrismaClient } from '@prisma/client'
import { auth } from '../lib/auth'
import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function grabUsers() {
  const session = await auth();
  if (!session) {
    return []
  }

  return await prisma.person.findMany()
}

// Note: this route is not protected by auth and open to skilled hackers
export async function randomUser() {
  return {
    FirstName: faker.person.firstName(),
    LastName: faker.person.lastName(),
    Address: faker.location.streetAddress(),
    City: faker.location.city()
  }
}

export async function createRandomUser() {
  const session = await auth();

  if (!session) {
    redirect('/login')
  }

  const fakeUser = await randomUser();

  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/person`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fakeUser)
  })
}

export async function createUser(user: Omit<Person, "PersonID">) {
  const session = await auth();

  if (!session) {
    redirect('/login')
  }

  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/person`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
}

export async function removeUser(id: number) {
  const session = await auth();

  if (!session) {
    redirect('/login')
  }

  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/person/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
}