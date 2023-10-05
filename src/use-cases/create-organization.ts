import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

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
    const organizationWithSameEmail =
      await this.organizationRepository.findOrganizationByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

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
