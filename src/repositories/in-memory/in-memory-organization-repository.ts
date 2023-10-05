import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  async findOrganizationById(id: string): Promise<{
    id: string
    contactPersonName: string
    email: string
    zip: string
    address: string
    phone: string
    password: string
    passwordConfirm: string
    createdAt: Date
  } | null> {
    const organization = this.organizations.find(
      (organization) => organization.id === id,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findOrganizationByEmail(email: string): Promise<Organization | null> {
    const organization = this.organizations.find(
      (organization) => organization.email === email,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  public organizations: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = {
      id: data.id ?? randomUUID(),
      contactPersonName: data.contactPersonName,
      email: data.email,
      zip: data.zip,
      address: data.address,
      phone: data.phone,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      createdAt: new Date(),
    }

    this.organizations.push(organization)

    return organization
  }
}
