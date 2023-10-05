import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Age, EnergyLevel, IndependenceLevel, Pet, Size } from '@prisma/client'
import { OrganizationNotExistsError } from './errors/organization-not-exists-error'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: Age
  size: Size
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findOrganizationById(organizationId)

    if (!organization) {
      throw new OrganizationNotExistsError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energyLevel,
      independenceLevel,
      organizationId,
    })

    return {
      pet,
    }
  }
}
