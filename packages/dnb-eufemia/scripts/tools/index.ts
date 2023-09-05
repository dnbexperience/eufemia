/**
 * Tools we want to reuse
 *
 */

// export type AsyncForEachArray = Array<unknown>
export type AsyncForEachCallback<TBase> = (
  item: Array<TBase>[number],
  i: number,
  array: Array<TBase>
) => unknown

export async function asyncForEach<TBase>(
  array: Array<TBase>,
  callback: AsyncForEachCallback<TBase>
) {
  let res = []
  for (let i = 0, l = array.length; i < l; ++i) {
    const cur = await callback(
      array[i] as (typeof array)[number],
      i,
      array
    )
    if (typeof cur !== 'undefined') {
      res = res.concat(cur)
    }
  }
  return res
}
