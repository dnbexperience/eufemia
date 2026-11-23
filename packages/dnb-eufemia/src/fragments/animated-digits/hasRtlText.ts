// Keep native shaping and bidi controls together instead of splitting RTL text.
export default function hasRtlText(value: string) {
  return /[\u0590-\u08ff\ufb1d-\ufdff\ufe70-\ufeff\u200e-\u200f\u202a-\u202e\u2066-\u2069]/u.test(
    value.replace(/\p{Nd}/gu, '')
  )
}
