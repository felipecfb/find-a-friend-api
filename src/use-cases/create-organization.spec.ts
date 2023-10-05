import { describe, beforeEach, it, expect } from 'vitest'

import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { CreateOrganizationUseCase } from './create-organization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organization-repository'

let organizationsRepository: OrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await sut.execute({
      contactPersonName: 'John Doe',
      email: 'johndoe@example.com',
      zip: '12345',
      address: 'Address Example',
      phone: '123456789',
      password: '123456',
      passwordConfirm: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new organization with same email', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      contactPersonName: 'John Doe',
      email,
      zip: '12345',
      address: 'Address Example',
      phone: '123456789',
      password: '123456',
      passwordConfirm: '123456',
    })

    await expect(() =>
      sut.execute({
        contactPersonName: 'John Doe',
        email,
        zip: '12345',
        address: 'Address Example',
        phone: '123456789',
        password: '123456',
        passwordConfirm: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
