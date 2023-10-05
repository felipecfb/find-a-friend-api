import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      organizationId: data.organizationId,
      createdAt: new Date(),
    }

    this.pets.push(pet)

    return pet
  }
}
