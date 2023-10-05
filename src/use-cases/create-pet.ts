import { PetsRepository } from '@/repositories/pets-repository'
import { Age, EnergyLevel, IndependenceLevel, Pet, Size } from '@prisma/client'

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
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
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
