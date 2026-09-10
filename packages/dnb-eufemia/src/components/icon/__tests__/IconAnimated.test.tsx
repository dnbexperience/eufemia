import { render } from '@testing-library/react'
import Icon from '../Icon'
import IconPrimary from '../../icon-primary/IconPrimary'
import bell from '../../../icons/dnb/bell'
import animatedBell from '../../../icons/animated/bell'
import animatedBellMedium from '../../../icons/animated/bell_medium'
import animatedArrowRight from '../../../icons/animated/arrow_right'
import animatedCheck from '../../../icons/animated/check'

describe('animated Icon', () => {
  it('keeps the animated icon static by default', () => {
    render(<Icon icon={animatedBell} />)

    const element = document.querySelector('.dnb-icon')

    expect(element).not.toHaveClass('dnb-icon--animate')
    expect(element).not.toHaveAttribute('animate')
  })

  it('preserves the medium icon size', () => {
    render(<Icon icon={animatedBellMedium} animate />)

    expect(document.querySelector('.dnb-icon')).toHaveClass(
      'dnb-icon--medium',
      'dnb-icon--animated-bell'
    )
  })

  it('plays the animation once', () => {
    render(<Icon icon={animatedBell} animate="once" />)

    const element = document.querySelector('.dnb-icon')

    expect(element).toHaveClass(
      'dnb-icon--animate',
      'dnb-icon--animate-once',
      'dnb-icon--animated-bell'
    )
    expect(element).not.toHaveAttribute('animate')
  })

  it('treats animate={true} as once', () => {
    render(<Icon icon={animatedBell} animate />)

    expect(document.querySelector('.dnb-icon')).toHaveClass(
      'dnb-icon--animate-once'
    )
  })

  it('loops the animation', () => {
    render(<Icon icon={animatedBell} animate="loop" />)

    expect(document.querySelector('.dnb-icon')).toHaveClass(
      'dnb-icon--animate-loop'
    )
  })

  it('supports animation triggered by hover', () => {
    render(<Icon icon={animatedArrowRight} animateWhen="hover" />)

    const element = document.querySelector('.dnb-icon')

    expect(element).toHaveClass(
      'dnb-icon--animate-when-hover',
      'dnb-icon--animated-arrow-right'
    )
    expect(element).not.toHaveClass('dnb-icon--animate')
    expect(element).not.toHaveAttribute('animateWhen')
  })

  it('does not animate a regular icon', () => {
    render(<Icon icon={bell} animate />)

    expect(document.querySelector('.dnb-icon')).not.toHaveClass(
      'dnb-icon--animate'
    )
  })

  it('replays when animationKey changes', () => {
    const { rerender } = render(
      <Icon icon={animatedBell} animate animationKey={0} />
    )
    const initialSvg = document.querySelector('.dnb-icon svg')

    rerender(<Icon icon={animatedBell} animate animationKey={1} />)

    expect(document.querySelector('.dnb-icon svg')).not.toBe(initialSvg)
    expect(document.querySelector('.dnb-icon')).toHaveClass(
      'dnb-icon--animate-once'
    )
  })

  it('supports animation through IconPrimary', () => {
    render(<IconPrimary icon={animatedBell} animate="loop" />)

    expect(document.querySelector('.dnb-icon')).toHaveClass(
      'dnb-icon--animate-loop',
      'dnb-icon--animated-bell'
    )
  })

  it.each([
    ['arrow-right', animatedArrowRight],
    ['check', animatedCheck],
  ])('supports the %s animated icon', (name, icon) => {
    render(<Icon icon={icon} animate />)

    expect(document.querySelector('.dnb-icon')).toHaveClass(
      `dnb-icon--animated-${name}`,
      'dnb-icon--animate-once'
    )
  })
})
