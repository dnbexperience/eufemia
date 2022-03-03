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
  // Number of buttons on each side of the current button when it's not at the start nor at the end of the pagination
  const MIDDLE_WIDTH = isSmallScreen ? 1 : 3
  // Number of buttons at the start/end when the current button is at the start or at the end of the pagination
  const EDGE_WIDTH = isSmallScreen ? 4 : 9
  const FIRST_BUTTON = 1
  const LAST_BUTTON = pageCount

  const currentAtStart = currentPage - EDGE_WIDTH + 1 < FIRST_BUTTON
  const currentAtEnd = currentPage + EDGE_WIDTH > LAST_BUTTON
  let middleStart: number
  let middleEnd: number

  // Set the bounds of the pagination
  if (currentAtStart) {
    middleStart = 2
    middleEnd = EDGE_WIDTH
  } else if (currentAtEnd) {
    middleStart = LAST_BUTTON + 1 - EDGE_WIDTH
    middleEnd = LAST_BUTTON - 1
  } else {
    middleStart = isSmallScreen ? currentPage : currentPage - MIDDLE_WIDTH
    middleEnd = currentPage + MIDDLE_WIDTH
  }

  if (middleEnd > LAST_BUTTON - 1) middleEnd = LAST_BUTTON - 1
  if (middleStart < FIRST_BUTTON + 1) middleStart = FIRST_BUTTON + 1

  // Merge the middlearray with first or last button if it is at the start/end of the pagination
  const middleArray = []
  if (middleStart == 2) {
    middleArray.push(FIRST_BUTTON)
  }
  for (let i = middleStart; i <= middleEnd; i++) {
    middleArray.push(i)
  }
  if (middleEnd == LAST_BUTTON - 1) {
    middleArray.push(LAST_BUTTON)
  }

  // Put the button groups in a two-dimensional array, each representing a group between dots (...)
  const pages = []
  if (middleStart !== 2) {
    pages.push([FIRST_BUTTON])
  }
  pages.push(middleArray)
  if (middleEnd != LAST_BUTTON - 1) {
    pages.push([LAST_BUTTON])
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
