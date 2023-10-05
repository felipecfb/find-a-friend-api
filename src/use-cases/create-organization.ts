import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'

interface CreateOrganizationUseCaseRequest {
  contactPersonName: string
  email: string
  zip: string
  address: string
  phone: string
  password: string
  passwordConfirm: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    contactPersonName,
    email,
    zip,
    address,
    phone,
    password,
    passwordConfirm,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.create({
      contactPersonName,
      email,
      zip,
      address,
      phone,
      password,
      passwordConfirm,
    })

    return {
      organization,
    }
  }
}
