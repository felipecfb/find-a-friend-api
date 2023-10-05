import { describe, beforeEach, it, expect } from 'vitest'

import { PetsRepository } from '@/repositories/pets-repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/im-memory-pets-repository'

let petsRepository: PetsRepository
let sut: CreatePetUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Name Example',
      description: 'Description Example',
      age: 'ADULT',
      size: 'MEDIUM',
      energyLevel: 'MEDIUM',
      independenceLevel: 'MEDIUM',
      organizationId: '123456',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
