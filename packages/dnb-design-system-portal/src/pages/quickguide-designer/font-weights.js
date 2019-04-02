/**
 * Font Family Syntax
 */

import React from 'react'
import { H5 } from 'dnb-ui-lib/src/elements'

const Syntax = () => (
  <>
    <H5>Body Book</H5>
    <p>
      Achieved with classes:{' '}
      <i>.dnb-typo-book, .dnb-typo-demi, .dnb-typo-medium</i>
    </p>
    <p className="dnb-typo-medium">
      NB! body text is automatically set to use 'book' weight so there is
      no need to usw a class.
    </p>
    <div className="typography-box">
      <p className="dnb-typo-book">
        Here is a paragraph with some nonsense lipsum text. Contrary to
        popular belief, Lorem Ipsum passage, and going through the cites of
        the word in classical literature, discovered the undoubtable
        source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
        &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of Good and
        Evil) by Cicero, written in 45 BC.
      </p>
    </div>

    <H5>Body Demi</H5>
    <div className="typography-box">
      <p className="dnb-typo-demi">
        Here is a paragraph with some nonsense lipsum text. Contrary to
        popular belief, Lorem Ipsum passage, and going through the cites of
        the word in classical literature, discovered the undoubtable
        source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
        &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of Good and
        Evil) by Cicero, written in 45 BC.
      </p>
    </div>

    <H5>Body Medium</H5>
    <div className="typography-box">
      <p className="dnb-typo-medium">
        Here is a paragraph with some nonsense lipsum text. Contrary to
        popular belief, Lorem Ipsum passage, and going through the cites of
        the word in classical literature, discovered the undoubtable
        source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
        &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of Good and
        Evil) by Cicero, written in 45 BC.
      </p>
    </div>
  </>
)
export default Syntax
