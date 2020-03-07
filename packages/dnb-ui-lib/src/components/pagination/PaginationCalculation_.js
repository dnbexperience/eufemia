/**
 * Pagination Calculate
 *
 */

export const calculatePagination = (page_count, current_page) => {
  if (page_count === 1) return [[1]]
  const start = Math.max.apply(Math, [
    1,
    current_page + 2 > page_count
      ? current_page -
        4 +
        (Math.min.apply(Math, [
          page_count,
          current_page - 2 < 1
            ? current_page + 4 - (current_page - 1)
            : current_page + 2
        ]) -
          current_page)
      : current_page - 2
  ])

  const end = Math.min.apply(Math, [
    page_count,
    current_page - 2 < 1
      ? current_page + 4 - (current_page - start)
      : current_page + 2
  ])

  let middle = []

  for (let i = start; i <= end; i++) {
    middle.push(i)
  }

  const pages = []
  if (start > 2) {
    pages.push([1])
  } else if (start === 2) {
    middle = [1].concat(middle)
  }
  pages.push(middle)

  if (end <= page_count - 2) {
    pages.push([page_count])
  } else if (end === page_count - 1) {
    middle.push(page_count)
  }

  return pages
}

export default {
  calculatePagination
}
