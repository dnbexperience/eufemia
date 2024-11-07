import React from 'react'
import ListFormat, { listFormat } from '../ListFormat'

export default {
  title: 'Eufemia/Components/ListFormat',
}

const list = ['A', 'B', 'C']
const jsxList = [
  <>A</>,
  <>
    <b>B</b>
  </>,
  <>C</>,
  'D',
  123,
  <a
    target="_blank"
    href="https://github.com/dnbexperience/eufemia"
    className="dnb-anchor"
    rel="noopener noreferrer"
    key="github"
  >
    Link to Eufemia's Github Repo
  </a>,
]

const jsxListWithKey = [
  <React.Fragment key="a">A</React.Fragment>,
  <React.Fragment key="b">
    <b>B</b>
  </React.Fragment>,
  <React.Fragment key="c">C</React.Fragment>,
  'D',
  123,
  <a
    target="_blank"
    href="https://github.com/dnbexperience/eufemia"
    className="dnb-anchor"
    rel="noopener noreferrer"
    key="github"
  >
    Link to Eufemia's Github Repo
  </a>,
]

export function Interception() {
  return (
    <>
      <p>listFormat function:</p>
      {listFormat(jsxListWithKey)}
      <br />
      {listFormat(jsxList)}
      <br />
      {listFormat(list)}
      <p>ListFormat component using value:</p>
      <br />
      <ListFormat value={jsxListWithKey} />
      <br />
      <ListFormat value={jsxList} />
      <br />
      <ListFormat value={list} />
      <p>ListFormat component using children:</p>
      <br />
      <ListFormat>{jsxListWithKey}</ListFormat>
      <br />
      <ListFormat>{jsxList}</ListFormat>
      <br />
      <ListFormat>{list}</ListFormat>
    </>
  )
}

export function ListFormatChildren() {
  return (
    <>
      <ListFormat variant="ol" listType="a">
        {jsxListWithKey}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="a">
        {jsxList}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="a">
        {list}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="A">
        {jsxListWithKey}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="A">
        {jsxList}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="A">
        {list}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="i">
        {jsxListWithKey}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="i">
        {jsxList}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="i">
        {list}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="I">
        {jsxListWithKey}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="I">
        {jsxList}
      </ListFormat>
      <br />
      <ListFormat variant="ol" listType="I">
        {list}
      </ListFormat>
      <br />
      <ListFormat variant="ul" listType="square">
        {jsxListWithKey}
      </ListFormat>
      <br />
      <ListFormat variant="ul" listType="square">
        {jsxList}
      </ListFormat>
      <br />
      <ListFormat variant="ul" listType="square">
        {list}
      </ListFormat>
      <br />
      <ListFormat variant="ul" listType="circle">
        {jsxListWithKey}
      </ListFormat>
      <br />
      <ListFormat variant="ul" listType="circle">
        {jsxList}
      </ListFormat>
      <br />
      <ListFormat variant="ul" listType="circle">
        {list}
      </ListFormat>
    </>
  )
}

export function ListFormatValue() {
  return (
    <>
      <ListFormat value={jsxListWithKey} variant="ol" listType="a" />
      <br />
      <ListFormat value={jsxList} variant="ol" listType="a" />
      <br />
      <ListFormat value={list} variant="ol" listType="a" />
      <br />
      <ListFormat value={jsxListWithKey} variant="ol" listType="A" />
      <br />
      <ListFormat value={jsxList} variant="ol" listType="A" />
      <br />
      <ListFormat value={list} variant="ol" listType="A" />
      <br />
      <ListFormat value={jsxListWithKey} variant="ol" listType="i" />
      <br />
      <ListFormat value={jsxList} variant="ol" listType="i" />
      <br />
      <ListFormat value={list} variant="ol" listType="i" />
      <br />
      <ListFormat value={jsxListWithKey} variant="ol" listType="I" />
      <br />
      <ListFormat value={jsxList} variant="ol" listType="I" />
      <br />
      <ListFormat value={list} variant="ol" listType="I" />
      <br />
      <ListFormat value={jsxListWithKey} variant="ul" listType="square" />
      <br />
      <ListFormat value={jsxList} variant="ul" listType="square" />
      <br />
      <ListFormat value={list} variant="ul" listType="square" />
      <br />
      <ListFormat value={jsxListWithKey} variant="ul" listType="circle" />
      <br />
      <ListFormat value={jsxList} variant="ul" listType="circle" />
      <br />
      <ListFormat value={list} variant="ul" listType="circle" />
    </>
  )
}

export function UndefinedExamples() {
  return (
    <>
      {listFormat(undefined)}
      <br />
      <ListFormat variant="ol" listType="a" />
      <br />
      <ListFormat value={undefined} variant="ol" listType="a" />
      <br />
      <ListFormat variant="ol" listType="a">
        {undefined}
      </ListFormat>
      <br />
      <ListFormat format={{ type: 'disjunction' }} />
      <br />
      <ListFormat format={{ type: 'disjunction' }}>{undefined}</ListFormat>
      <br />
      <ListFormat
        format={{ type: 'disjunction' }}
        variant="ol"
        listType="a"
      />
      <br />
      <ListFormat
        format={{ type: 'disjunction' }}
        variant="ol"
        listType="a"
      >
        {undefined}
      </ListFormat>
    </>
  )
}
