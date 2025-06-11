import { describe, it, expect } from 'vitest'
import { greet } from '../src/index'

describe('greet()', () => {
  it('greets the user by name', () => {
    expect(greet('Krishna')).toBe('Hello, Krishna!')
  })
})