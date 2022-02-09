/**
 * Pagination Calculate
 *
 */

export const calculatePagination = (
  pageCount: number,
  currentPage: number,
  isSmallScreen?: boolean
): Array<Array<number>> => {
  if (pageCount === 1) return [[1]]
  const MIDDLE_WIDTH = isSmallScreen ? 1 : 2
  const EDGE_WIDTH = isSmallScreen ? 2 : 4
  const START = 1

  const currentAtEnd = currentPage + 2 > pageCount
  const currentAtStart = currentPage - 2 < START

  const middleStart = Math.max(
    1,
    currentAtEnd ? pageCount - EDGE_WIDTH : currentPage - MIDDLE_WIDTH
  )

  const middleEnd = Math.min(
    pageCount,
    currentAtStart ? middleStart + EDGE_WIDTH : currentPage + MIDDLE_WIDTH
  )

  const startArray = [START]
  const middleArray = []
  const endArray = [pageCount]
  if (middleStart === START + 1) {
    middleArray.push(startArray[0])
  }
  for (let i = middleStart; i <= middleEnd; i++) {
    middleArray.push(i)
  }
  if (middleEnd === pageCount - 1) {
    middleArray.push(endArray[0])
  }

  const pages = []
  if (middleStart > 2) {
    pages.push(startArray)
  }
  pages.push(middleArray)

  if (middleEnd <= pageCount - 2) {
    pages.push(endArray)
  }

  return pages
}

export const getDotsAriaLabel = ({
  more_pages,
  numbersList: nList,
  pageNumberGroups: pGroups,
}: {
  more_pages: string
  numbersList: Array<number>
  pageNumberGroups: Array<Array<number>>
}) => {
  let count = 0

  try {
    if (nList.length === 1) {
      count =
        nList[0] -
        (pGroups.length === 2
          ? pGroups[0][pGroups[0].length - 1]
          : pGroups[1][pGroups[1].length - 1])
    } else if (nList.length > 1) {
      count = nList[0] - pGroups[0][0] - 1
    }
  } catch (e) {
    //
  }

  return count > 0 ? more_pages.replace('%s', count.toString()) : null
}
