type DateFormatProps = {
  date: Date | string
}

export default function DateFormat({ date }: DateFormatProps) {
  return (
    <p>DateFormat: {date instanceof Date ? date.toDateString() : date}</p>
  )
}
