import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  findOrganizationByEmail: (email: string) => Promise<Organization | null>
  findOrganizationById: (id: string) => Promise<Organization | null>
  create: (data: Prisma.OrganizationCreateInput) => Promise<Organization>
}
