import P from '@dnb/eufemia/src/elements/P'
import notice from './experimentalNotice.json'

export default function ExperimentalNotice() {
  return (
    <P top="medium" bottom="medium">
      <strong>Experimental:</strong> {notice.text}
    </P>
  )
}
