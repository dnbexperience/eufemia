/**
 * Unit Test
 *
 */

import { calculatePagination } from '../PaginationCalculation'

describe('Pagination calculation helper', () => {
  it('should calculate pages 1', () => {
    const pages = calculatePagination(100, 1)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9], [100]])
  })

  it('should calculate pages 2', () => {
    const pages = calculatePagination(100, 2)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9], [100]])
  })

  it('should calculate pages 3', () => {
    const pages = calculatePagination(100, 3)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9], [100]])
  })

  it('should calculate pages 4', () => {
    const pages = calculatePagination(100, 4)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9], [100]])
  })

  it('should calculate pages 5', () => {
    const pages = calculatePagination(100, 5)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9], [100]])
  })

  it('should calculate pages 6', () => {
    const pages = calculatePagination(100, 9)
    expect(pages).toEqual([[1], [6, 7, 8, 9, 10, 11, 12], [100]])
  })

  it('should calculate pages 7', () => {
    const pages = calculatePagination(100, 20)
    expect(pages).toEqual([[1], [17, 18, 19, 20, 21, 22, 23], [100]])
  })

  it('should calculate pages 8', () => {
    const pages = calculatePagination(100, 100)
    expect(pages).toEqual([[1], [92, 93, 94, 95, 96, 97, 98, 99, 100]])
  })

  it('should calculate pages 9', () => {
    const pages = calculatePagination(100, 98)
    expect(pages).toEqual([[1], [92, 93, 94, 95, 96, 97, 98, 99, 100]])
  })

  it('should calculate pages 10', () => {
    const pages = calculatePagination(100, 97)
    expect(pages).toEqual([[1], [92, 93, 94, 95, 96, 97, 98, 99, 100]])
  })

  it('should calculate pages 11', () => {
    const pages = calculatePagination(100, 96)
    expect(pages).toEqual([[1], [92, 93, 94, 95, 96, 97, 98, 99, 100]])
  })

  it('should calculate pages 11', () => {
    const pages = calculatePagination(1, 1)
    expect(pages).toEqual([[1]])
  })

  it('should calculate pages 11', () => {
    const pages = calculatePagination(2, 1)
    expect(pages).toEqual([[1, 2]])
  })

  it('should calculate pages 12', () => {
    const pages = calculatePagination(2, 2)
    expect(pages).toEqual([[1, 2]])
  })

  it('should calculate pages 12', () => {
    const pages = calculatePagination(3, 2)
    expect(pages).toEqual([[1, 2, 3]])
  })

  it('should calculate pages 13', () => {
    const pages = calculatePagination(4, 2)
    expect(pages).toEqual([[1, 2, 3, 4]])
  })

  it('should calculate pages 14', () => {
    const pages = calculatePagination(5, 2)
    expect(pages).toEqual([[1, 2, 3, 4, 5]])
  })

  it('should calculate pages 15', () => {
    const pages = calculatePagination(3, 3)
    expect(pages).toEqual([[1, 2, 3]])
  })

  it('should calculate pages 16', () => {
    const pages = calculatePagination(4, 3)
    expect(pages).toEqual([[1, 2, 3, 4]])
  })

  it('should calculate pages 17', () => {
    const pages = calculatePagination(5, 1)
    expect(pages).toEqual([[1, 2, 3, 4, 5]])
  })

  it('should calculate pages 18', () => {
    const pages = calculatePagination(6, 1)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6]])
  })

  it('should calculate pages 19', () => {
    const pages = calculatePagination(6, 6)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6]])
  })

  it('should calculate pages 20', () => {
    const pages = calculatePagination(7, 1)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6, 7]])
  })

  it('should calculate pages 21', () => {
    const pages = calculatePagination(7, 7)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6, 7]])
  })

  it('should calculate pages 22', () => {
    const pages = calculatePagination(7, 4)
    expect(pages).toEqual([[1, 2, 3, 4, 5, 6, 7]])
  })

  it('(small) should calculate pages 1', () => {
    const pages = calculatePagination(10, 2, true)
    expect(pages).toEqual([[1, 2, 3, 4], [10]])
  })

  it('(small) should calculate pages 1', () => {
    const pages = calculatePagination(10, 1, true)
    expect(pages).toEqual([[1, 2, 3, 4], [10]])
  })

  it('(small) should calculate pages 1', () => {
    const pages = calculatePagination(10, 4, true)
    expect(pages).toEqual([[1], [4, 5], [10]])
  })

  it('(small) should calculate pages 1', () => {
    const pages = calculatePagination(10, 5, true)
    expect(pages).toEqual([[1], [5, 6], [10]])
  })

  it('should return page 1 if undefiend is given', () => {
    const pages = calculatePagination(undefined, undefined)
    expect(pages).toEqual([[1]])
  })
})
