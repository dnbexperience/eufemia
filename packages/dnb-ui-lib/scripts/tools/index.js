/**
 * Tools we want to reuse
 *
 */

export const asyncForEach = async (array, callback) => {
  let res = []
  for (let i = 0, l = array.length; i < l; ++i) {
    const cur = await callback(array[i], i, array)
    if (typeof cur !== 'undefined') {
      res = res.concat(cur)
    }
  }
  return res
}
