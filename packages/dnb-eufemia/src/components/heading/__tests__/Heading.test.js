/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Heading, { resetLevels, setNextLevel } from '../Heading'

import H3 from '../../../elements/H3'

const warn = jest.fn()

class StateChanges extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Heading.Level group="A" debug={warn} reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading increase>h3</Heading>

        <Heading.Level group="B">
          <Heading>h3 before</Heading>
          {this.state.showHeading3 && (
            <React.StrictMode>
              <Heading increase>h4 1</Heading>
              <Heading>h4 2</Heading>
              <Heading increase>h5 1</Heading>
            </React.StrictMode>
          )}
          <Heading>h3 after</Heading>

          <Heading.Increase group="C">
            {this.state.showHeading4 && (
              <React.StrictMode>
                <Heading>h4 1</Heading>
                <Heading>h4 2</Heading>
                <Heading increase>h5 1</Heading>
              </React.StrictMode>
            )}
          </Heading.Increase>
        </Heading.Level>

        <Heading.Decrease group="C">
          <Heading>h2</Heading>
        </Heading.Decrease>
      </Heading.Level>
    )
  }
}

describe('Heading component', () => {
  it('have to match level correction', () => {
    const Comp = mount(
      <React.StrictMode>
        <Heading level={2} debug={warn}>
          Heading #1
        </Heading>
        <Heading.Level reset={1} debug={warn}>
          <Heading level={2}>Heading #2</Heading>
          <Heading level={3}>Heading #3</Heading>
          <Heading level={4}>Heading #4</Heading>
          <Heading level={4}>Heading #5</Heading>
          <Heading level={2}>Heading #6</Heading>
          <Heading level={1}>Heading #7</Heading>
        </Heading.Level>
        <Heading.Level debug={warn}>
          <Heading>Heading #8</Heading>
        </Heading.Level>
        <Heading.Level increase debug={warn}>
          <Heading>Heading #9</Heading>
        </Heading.Level>
        <Heading.Level inherit debug={warn}>
          <Heading>Heading #10</Heading>
        </Heading.Level>
        <Heading debug inherit>
          Heading #11
        </Heading>
        <Heading debug inherit decrease>
          Heading #12
        </Heading>
      </React.StrictMode>
    )

    let i = -1
    const elem = Comp.find('.dnb-heading')
    expect(elem.at(++i).text()).toBe('[h1] Heading #1')
    expect(elem.at(++i).text()).toBe('[h1] Heading #2')
    expect(elem.at(++i).text()).toBe('[h2] Heading #3')
    expect(elem.at(++i).text()).toBe('[h3] Heading #4')
    expect(elem.at(++i).text()).toBe('[h4] Heading #5')
    expect(elem.at(++i).text()).toBe('[h2] Heading #6')
    expect(elem.at(++i).text()).toBe('[h2] Heading #7')
    expect(elem.at(++i).text()).toBe('[h2] Heading #8')
    expect(elem.at(++i).text()).toBe('[h3] Heading #9')
    expect(elem.at(++i).text()).toBe('[h3] Heading #10')
    expect(elem.at(++i).text()).toBe('[h3] Heading #11')
    expect(elem.at(++i).text()).toBe('[h2] Heading #12')
  })

  it('have to match global reset', () => {
    const Comp = mount(
      <React.StrictMode>
        <Heading.Level debug={warn} reset={1}>
          <Heading>Heading #1</Heading>
        </Heading.Level>

        <Heading.Level debug={warn} reset={1}>
          <Heading>Heading #2</Heading>
        </Heading.Level>

        <Heading debug>Heading #3</Heading>
        <Heading debug reset>
          Heading #4
        </Heading>
      </React.StrictMode>
    )

    let i = -1
    const elem = Comp.find('.dnb-heading')
    expect(elem.at(++i).text()).toBe('[h1] Heading #1')
    expect(elem.at(++i).text()).toBe('[h1] Heading #2')
    expect(elem.at(++i).text()).toBe('[h2] Heading #3')
    expect(elem.at(++i).text()).toBe('[h2] Heading #4')
  })

  it('have to match context reset', () => {
    const Comp = mount(
      <React.StrictMode>
        <Heading.Level debug={warn} reset={1}>
          <Heading>Heading #1</Heading>
          <Heading>Heading #2</Heading>
          <Heading increase>Heading #3</Heading>
          <Heading.Level reset>
            <Heading>Heading #4</Heading>
          </Heading.Level>
          <Heading reset>Heading #5</Heading>
        </Heading.Level>
      </React.StrictMode>
    )

    let i = -1
    const elem = Comp.find('.dnb-heading')
    expect(elem.at(++i).text()).toBe('[h1] Heading #1')
    expect(elem.at(++i).text()).toBe('[h2] Heading #2')
    expect(elem.at(++i).text()).toBe('[h3] Heading #3')
    expect(elem.at(++i).text()).toBe('[h2] Heading #4')
    expect(elem.at(++i).text()).toBe('[h2] Heading #5')
  })

  it('have to match level correction with manual heading', () => {
    const Comp = mount(
      <React.StrictMode>
        <Heading.Level debug={warn} reset={1}>
          <Heading>Heading #1</Heading>
          <Heading>Heading #2</Heading>
          <H3 level="use">Heading #3</H3>
          <Heading>Heading #4</Heading>
        </Heading.Level>
      </React.StrictMode>
    )

    const first = Comp.find('h3.dnb-h--medium')
    expect(first.at(0).text()).toBe('Heading #3')

    let i = -1
    const elem = Comp.find('.dnb-heading')
    expect(elem.at(++i).text()).toBe('[h1] Heading #1')
    expect(elem.at(++i).text()).toBe('[h2] Heading #2')
    expect(elem.at(++i).text()).toBe('[h3] Heading #4')
  })

  it('have to match after level state update', () => {
    const warn = jest.fn()

    // resetLevels(1,{overwriteContext:true})
    // resetAllLevels()
    Heading.resetLevels(1, { overwriteContext: true })

    const RenderComp = (props) => (
      <React.StrictMode>
        <Heading debug={warn} {...props}>
          Heading #1
        </Heading>
      </React.StrictMode>
    )
    const Comp = mount(<RenderComp />)

    expect(Comp.find('.dnb-heading').at(0).text()).toBe('[h1] Heading #1')

    Comp.setProps({ level: 3 })

    // We got a level correction here!
    expect(Comp.find('.dnb-heading').at(0).text()).toBe('[h2] Heading #1')

    expect(warn).toBeCalledTimes(2) // 2 because of StrictMode
    expect(warn).toHaveBeenCalledWith(
      'Heading levels can only be changed by factor one! Got:',
      3,
      'and had before',
      1,
      '- The new level is',
      2,
      '\nNB: This warning was triggered by:',
      '',
      'Heading #1'
    )

    Comp.setProps({ skip_correction: true })
    Comp.setProps({ level: 4 })

    expect(Comp.find('.dnb-heading').at(0).text()).toBe('[h4] Heading #1')
    // still one time, same as we had earlier
    expect(warn).toBeCalledTimes(2) // 2 because of StrictMode
  })

  it('have to have correct leveling after using setNextLevel', () => {
    setNextLevel(4, { overwriteContext: true })

    resetLevels(1, { overwriteContext: true })
    const Comp1 = mount(<Heading debug={warn}>h1</Heading>)

    Heading.setNextLevel(2, { overwriteContext: true })
    const Comp2 = mount(<Heading debug={warn}>h2</Heading>)

    setNextLevel(3, { overwriteContext: true })
    const RenderComp3 = (props) => (
      <React.StrictMode>
        <Heading.Level debug={warn} {...props}>
          <Heading>h3</Heading>
        </Heading.Level>
      </React.StrictMode>
    )
    const Comp3 = mount(<RenderComp3 />)

    expect(Comp1.find('.dnb-heading').at(0).text()).toBe('[h1] h1')
    expect(Comp2.find('.dnb-heading').at(0).text()).toBe('[h2] h2')
    expect(Comp3.find('.dnb-heading').at(0).text()).toBe('[h3] h3')

    Comp2.setState({
      level: 4,
    })
    expect(Comp2.find('.dnb-heading').at(0).text()).toBe('[h4] h2')

    resetLevels(1, { overwriteContext: true })
    Comp2.setProps({ relevel: true })
    expect(Comp2.find('.dnb-heading').at(0).text()).toBe('[h1] h2')

    setNextLevel(2, { overwriteContext: true })
    Comp1.setProps({ relevel: true })
    expect(Comp1.find('.dnb-heading').at(0).text()).toBe('[h2] h1')

    // setNextLevel(4, {overwriteContext:true})
    // resetLevels(4, {overwriteContext:true})
    // Comp3.setProps({ relevel: true })
    // expect(Comp3.find('.dnb-heading').at(0).text()).toBe('[h4] h3')
  })

  it('have to have aria role and level if set as span element', () => {
    const Comp = mount(
      <Heading element="span" debug={warn} reset={1}>
        Heading #1
      </Heading>
    )

    const elem = Comp.find('span.dnb-heading')
    expect(elem.at(0).text()).toBe('[h1] Heading #1')
    expect(elem.at(0).instance().getAttribute('role')).toBe('heading')
    expect(elem.at(0).instance().getAttribute('aria-level')).toBe('1')
  })

  it('have to refuse to set level below 1', () => {
    const Comp = mount(
      <Heading debug={warn} level={0} reset={1}>
        Heading #1
      </Heading>
    )

    expect(Comp.find('.dnb-heading').at(0).text()).toBe('[h1] Heading #1')
  })

  it('have to have correct size class', () => {
    const Comp = mount(
      <Heading debug={warn} size="x-large" reset={1}>
        Heading #1
      </Heading>
    )

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[h1] Heading #1')
    expect(elem.at(0).exists('.dnb-h--x-large')).toBe(true)
    expect(elem.at(0).instance().getAttribute('class')).toBe(
      'dnb-heading dnb-h--x-large'
    )
  })

  it('should set level if skip_correction is true', () => {
    const Comp = mount(
      <React.StrictMode>
        <Heading.Level debug={warn} skip_correction reset={1}>
          <Heading level={4}>Heading #1</Heading>
          <Heading increase>Heading #2</Heading>
        </Heading.Level>
      </React.StrictMode>
    )

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[h4] Heading #1')
    expect(elem.at(1).text()).toBe('[h5] Heading #2')
  })

  it('should not increase level above 6', () => {
    resetLevels(1, { overwriteContext: true })
    const Comp = mount(
      <React.StrictMode>
        <Heading.Level debug={warn}>
          <Heading>Heading #1</Heading>
          <Heading.Increase skip_correction level="6">
            <Heading>Heading #2</Heading>
            <Heading increase>Heading #3</Heading>
          </Heading.Increase>
        </Heading.Level>
      </React.StrictMode>
    )

    const elem = Comp.find('.dnb-heading')
    expect(elem.at(0).text()).toBe('[h1] Heading #1')
    expect(elem.at(1).text()).toBe('[h6] Heading #2')
    expect(elem.at(2).text()).toBe('[h6] Heading #3')
  })

  it('should keep context level after state update', () => {
    const Comp = mount(<StateChanges />)

    let i = -1
    let elem = Comp.find('.dnb-heading')
    expect(elem.at(++i).text()).toBe('[h1] h1')
    expect(elem.at(++i).text()).toBe('[h2] h2')
    expect(elem.at(++i).text()).toBe('[h3] h3')
    expect(elem.at(++i).text()).toBe('[h3] h3 before')
    expect(elem.at(++i).text()).toBe('[h3] h3 after')
    expect(elem.at(++i).text()).toBe('[h2] h2')

    Comp.setState({
      showHeading3: true,
    })

    i = -1
    elem = Comp.find('.dnb-heading')
    expect(elem.at(++i).text()).toBe('[h1] h1')
    expect(elem.at(++i).text()).toBe('[h2] h2')
    expect(elem.at(++i).text()).toBe('[h3] h3')
    expect(elem.at(++i).text()).toBe('[h3] h3 before')
    expect(elem.at(++i).text()).toBe('[h4] h4 1')
    expect(elem.at(++i).text()).toBe('[h4] h4 2')
    expect(elem.at(++i).text()).toBe('[h5] h5 1')
    expect(elem.at(++i).text()).toBe('[h3] h3 after')
    expect(elem.at(++i).text()).toBe('[h2] h2')

    Comp.setState({
      showHeading4: true,
    })

    i = -1
    elem = Comp.find('.dnb-heading')
    expect(elem.at(++i).text()).toBe('[h1] h1')
    expect(elem.at(++i).text()).toBe('[h2] h2')
    expect(elem.at(++i).text()).toBe('[h3] h3')
    expect(elem.at(++i).text()).toBe('[h3] h3 before')
    expect(elem.at(++i).text()).toBe('[h4] h4 1')
    expect(elem.at(++i).text()).toBe('[h4] h4 2')
    expect(elem.at(++i).text()).toBe('[h5] h5 1')
    expect(elem.at(++i).text()).toBe('[h3] h3 after')
    expect(elem.at(++i).text()).toBe('[h4] h4 1')
    expect(elem.at(++i).text()).toBe('[h4] h4 2')
    expect(elem.at(++i).text()).toBe('[h5] h5 1')
    expect(elem.at(++i).text()).toBe('[h2] h2')

    Comp.setState({
      showHeading4: false,
    })

    // also test to reset the context, as this should be truthy
    resetLevels(1)
    setNextLevel(1)

    Comp.setState({
      showHeading4: true,
    })

    i = -1
    elem = Comp.find('.dnb-heading')
    expect(elem.at(++i).text()).toBe('[h1] h1')
    expect(elem.at(++i).text()).toBe('[h2] h2')
    expect(elem.at(++i).text()).toBe('[h3] h3')
    expect(elem.at(++i).text()).toBe('[h3] h3 before')
    expect(elem.at(++i).text()).toBe('[h4] h4 1')
    expect(elem.at(++i).text()).toBe('[h4] h4 2')
    expect(elem.at(++i).text()).toBe('[h5] h5 1')
    expect(elem.at(++i).text()).toBe('[h3] h3 after')
    expect(elem.at(++i).text()).toBe('[h4] h4 1')
    expect(elem.at(++i).text()).toBe('[h4] h4 2')
    expect(elem.at(++i).text()).toBe('[h5] h5 1')
    expect(elem.at(++i).text()).toBe('[h2] h2')
  })

  it('have to match default leveling', () => {
    const Comp = makeComp()

    let i = -1
    const elem = Comp.find('.dnb-heading')
    expect(elem.at(++i).text()).toBe('[h1] Heading #1')
    expect(elem.at(++i).text()).toBe('[h2] Heading #2')
    expect(elem.at(++i).text()).toBe('[h3] Heading #3')
    expect(elem.at(++i).text()).toBe('[h4] Heading #4')
    expect(elem.at(++i).text()).toBe('[h3] Heading #5')
    expect(elem.at(++i).text()).toBe('[h2] Heading #6')
    expect(elem.at(++i).text()).toBe('[h3] Heading #7')
    expect(elem.at(++i).text()).toBe('[h2] Heading #8')
    expect(elem.at(++i).text()).toBe('[h2] Heading #9')
  })

  it('have to match default heading snapshot', () => {
    const Comp = makeComp()
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('should validate with ARIA rules', async () => {
    const Comp = makeComp()
    expect(await axeComponent(Comp, {})).toHaveNoViolations()
  })

  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
})

let gComp
function makeComp() {
  // resetLevels(1,{overwriteContext:true})
  gComp =
    gComp ||
    mount(
      <React.StrictMode>
        <Heading.Level debug={warn} reset={1}>
          <Heading>Heading #1</Heading>
          <Heading>Heading #2</Heading>

          <Heading.Increase>
            <Heading>Heading #3</Heading>
            <Heading up>Heading #4</Heading>
            <Heading down>Heading #5</Heading>
            <Heading decrease>Heading #6</Heading>
          </Heading.Increase>

          <Heading.Increase>
            <Heading>Heading #7</Heading>
            <Heading.Increase decrease>
              <Heading>Heading #8</Heading>
              <Heading decrease>Heading #9</Heading>
            </Heading.Increase>
          </Heading.Increase>
        </Heading.Level>
      </React.StrictMode>
    )

  return gComp
}
