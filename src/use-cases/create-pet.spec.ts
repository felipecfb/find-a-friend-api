import { describe, beforeEach, it, expect } from 'vitest'

import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/im-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'

import { CreatePetUseCase } from './create-pet'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { OrganizationNotExistsError } from './errors/organization-not-exists-error'

let petsRepository: PetsRepository
let organizationsRepository: OrganizationsRepository
let sut: CreatePetUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to create a new pet', async () => {
    const { id } = await organizationsRepository.create({
      contactPersonName: 'John Doe',
      email: 'johndoe@example.com',
      zip: '12345',
      address: 'Address Example',
      phone: '123456789',
      password: '123456',
      passwordConfirm: '123456',
    })

    const { pet } = await sut.execute({
      name: 'Name Example',
      description: 'Description Example',
      age: 'ADULT',
      size: 'MEDIUM',
      energyLevel: 'MEDIUM',
      independenceLevel: 'MEDIUM',
      organizationId: id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with organization not exists', async () => {
    await expect(() =>
      sut.execute({
        name: 'Name Example',
        description: 'Description Example',
        age: 'ADULT',
        size: 'MEDIUM',
        energyLevel: 'MEDIUM',
        independenceLevel: 'MEDIUM',
        organizationId: 'not-exists-organization-id',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotExistsError)
  })
})
