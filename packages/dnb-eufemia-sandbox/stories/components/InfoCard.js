/**
 * @dnb/eufemia Component Story
 *
 */

 import React from 'react'
 import { Wrapper, Box } from '../helpers'
 // import styled from '@emotion/styled'
 
 import { InfoCard } from '@dnb/eufemia/src/components'
 import { add as Svg } from '@dnb/eufemia/src/icons'
 
 export default {
   title: 'Eufemia/Components/InfoCard',
 }
 
 export const InfoCardSandbox = () => (
   <Wrapper>

<Box>
  <InfoCard />
</Box>

<Box>
  <InfoCard src='/android-chrome-192x192.png'>
  This is a description of some information or a tip that will inform the user of something that will help them.

  </InfoCard>
</Box>

<Box>
  <InfoCard title='In this example everything is centerd' center>
  This is a description of some information or a tip that will inform the user of something that will help them.

  </InfoCard>
</Box>

     <Box>
       
       <InfoCard icon={Svg} text='this is the content text' />
       
     </Box>

     <Box>
       <InfoCard title='Title of your info/tip'>
       This is a description of some information or a tip that will inform the user of something that will help them.
       </InfoCard>
     </Box>

     <Box>
       <InfoCard title='Title of your info/tip'  bottom='small'>
       This is a description of some information or a tip that will inform the user of something that will help them.
       </InfoCard>
       <InfoCard title='Title of your info/tip' center >
       This is a description of some information or a tip that will inform the user of something that will help them.
       </InfoCard>
     </Box>
     
     <Box>
       <InfoCard  >
       This is a description of some information or a tip that will inform the user of something that will help them.
       </InfoCard>
     </Box>
          
    
   </Wrapper>
 )
 
