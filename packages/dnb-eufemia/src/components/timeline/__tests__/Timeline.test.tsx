import React from 'react'
import { render, screen } from '@testing-library/react'
import Timeline, { TimelineAllProps } from '../Timeline'
import TimelineItem, { TimelineItemAllProps } from '../TimelineItem'

import IconPrimary from '../../icon-primary/IconPrimary'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('Timeline', () => {
  it('renders with props as an object', () => {
    const props: TimelineAllProps = {}

    render(<Timeline {...props} />)

    expect(document.querySelector('.dnb-timeline')).not.toBeNull()
  })

  it('renders without properties', () => {
    render(<Timeline />)

    expect(document.querySelector('.dnb-timeline')).not.toBeNull()
  })

  it('renders a timeline with multiple items by data prop', () => {
    render(
      <Timeline
        data={[
          {
            title: 'Upcoming',
            state: 'upcoming',
          },
          { title: 'Current', state: 'current' },
          { title: 'Completed', state: 'completed' },
        ]}
      />
    )

    expect(document.querySelectorAll('.dnb-timeline__item')).toHaveLength(
      3
    )
  })

  it('renders a timeline with multiple items by children', () => {
    render(
      <Timeline>
        <Timeline.Item title="Upcoming" state="upcoming" />
        <Timeline.Item title="Current" state="current" />
        <Timeline.Item title="Completed" state="completed" />
      </Timeline>
    )

    expect(document.querySelectorAll('.dnb-timeline__item')).toHaveLength(
      3
    )
  })

  it('current will have aria-current="step"', () => {
    render(
      <Timeline
        data={[
          {
            title: 'Upcoming',
            state: 'upcoming',
          },
          { title: 'Completed', state: 'completed' },
          { title: 'Current', state: 'current' },
        ]}
      />
    )

    const currentItem = screen.getByText('Current')
    expect(
      currentItem.parentElement.parentElement.getAttribute('aria-current')
    ).toBe('step')
  })

  it('uses ordered list semantic elements', () => {
    render(
      <Timeline
        data={[
          {
            title: 'Upcoming',
            state: 'upcoming',
          },
          { title: 'Completed', state: 'completed' },
          { title: 'Current', state: 'current' },
        ]}
      />
    )

    const element = document.querySelector('.dnb-timeline')
    const firstChild = element.firstChild as HTMLLIElement
    const lastChild = element.lastChild as HTMLLIElement

    expect(element.tagName).toBe('OL')
    expect(firstChild.tagName).toBe('LI')
    expect(lastChild.tagName).toBe('LI')
  })

  it('inherits skeleton prop from provider', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Provider skeleton>
        <Timeline
          data={[
            {
              title: 'Upcoming',
              state: 'upcoming',
            },
          ]}
        />
      </Provider>
    )

    expect(
      document.getElementsByClassName(skeletonClassName)
    ).toHaveLength(1)
  })

  it('should support spacing props', () => {
    render(
      <Timeline
        top="2rem"
        data={[
          {
            title: 'Upcoming',
            state: 'upcoming',
          },
        ]}
      />
    )

    const element = document.querySelector('.dnb-timeline')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-timeline',
      'dnb-space__reset',
      'dnb-space__top--large',
    ])
  })

  it('should support extra attributes', () => {
    render(
      <Timeline
        aria-label="extra-label"
        data={[
          {
            title: 'Upcoming',
            state: 'upcoming',
          },
          { title: 'Completed', state: 'completed' },
          { title: 'Current', state: 'current' },
        ]}
      />
    )

    const element = document.querySelector('.dnb-timeline')

    expect(element.getAttribute('aria-label')).toBe('extra-label')
  })

  describe('TimelineItem', () => {
    it('renders with props as an object', () => {
      const props: TimelineItemAllProps = {
        state: 'completed',
        title: 'title',
      }

      render(<TimelineItem {...props} />)

      expect(document.querySelector('.dnb-timeline__item')).not.toBeNull()
    })

    it('renders title', () => {
      const title = 'Completed'
      render(<TimelineItem title={title} state="completed" />)
      expect(screen.queryByText(title)).toBeTruthy()
    })

    it('renders subtitle', () => {
      const subtitle = '10. september 2021'
      render(
        <TimelineItem
          subtitle={subtitle}
          title="Complete"
          state="completed"
        />
      )
      expect(screen.queryByText(subtitle)).toBeTruthy()
    })

    it('renders subtitles', () => {
      const subtitles = ['10. september 2021', '11. september 2021']
      render(
        <TimelineItem
          subtitle={subtitles}
          title="Complete"
          state="completed"
        />
      )

      expect(screen.queryByText(subtitles[0])).toBeTruthy()
      expect(screen.queryByText(subtitles[1])).toBeTruthy()
    })

    it('renders info message', () => {
      const infoMessage = 'Info text'
      render(
        <TimelineItem
          infoMessage={infoMessage}
          title="Complete"
          state="completed"
        />
      )
      expect(screen.queryByText(infoMessage)).toBeTruthy()
    })

    it('renders custom icon', () => {
      const CustomIcon = <IconPrimary icon="bell" />
      render(
        <TimelineItem
          icon={CustomIcon}
          title="Complete"
          state="completed"
        />
      )

      const element = screen.queryByTestId('bell icon')
      expect(element).not.toBeNull()
    })

    it('renders custom alt label', () => {
      const iconAlt = 'custom_alt_label'
      render(
        <TimelineItem
          title="Complete"
          state="completed"
          iconAlt={iconAlt}
        />
      )

      expect(screen.findByAltText(iconAlt)).not.toBeNull()
      expect(screen.queryByRole('img').getAttribute('alt')).toBe(iconAlt)
    })

    it('renders skeleton if skeleton is true', () => {
      const skeletonClassName = 'dnb-skeleton'

      render(<TimelineItem skeleton title="title" state="completed" />)

      expect(
        document.getElementsByClassName(skeletonClassName)
      ).toHaveLength(1)
    })

    it('inherits skeleton prop from provider', () => {
      const skeletonClassName = 'dnb-skeleton'

      render(
        <Provider skeleton>
          <TimelineItem title="name" state="completed" />
        </Provider>
      )

      expect(
        document.getElementsByClassName(skeletonClassName)
      ).toHaveLength(1)
    })

    describe('renders default icon based on state property', () => {
      it('renders check icon when state is completed', () => {
        render(<TimelineItem title="Complete" state="completed" />)
        expect(screen.queryByRole('img').getAttribute('aria-label')).toBe(
          'check icon'
        )
      })

      it('renders pin icon when state is current', () => {
        render(<TimelineItem title="Current" state="current" />)
        expect(screen.queryByRole('img').getAttribute('aria-label')).toBe(
          'pin icon'
        )
      })

      it('renders calendar icon when state is upcoming', () => {
        render(<TimelineItem title="Upcoming" state="upcoming" />)
        expect(screen.queryByRole('img').getAttribute('aria-label')).toBe(
          'calendar icon'
        )
      })

      it('renders alt label "Utfør"t when state is completed', () => {
        render(<TimelineItem title="Complete" state="completed" />)
        expect(screen.queryByRole('img').getAttribute('alt')).toBe(
          'Utført'
        )
      })

      it('renders alt label "Nåværende" when state is current', () => {
        render(<TimelineItem title="Current" state="current" />)
        expect(screen.queryByRole('img').getAttribute('alt')).toBe(
          'Nåværende'
        )
      })

      it('renders alt label "Kommende" when state is upcoming', () => {
        render(<TimelineItem title="Upcoming" state="upcoming" />)
        expect(screen.queryByRole('img').getAttribute('alt')).toBe(
          'Kommende'
        )
      })
    })
  })
})

describe('Timeline aria', () => {
  it('should validate', async () => {
    const Component = render(
      <Timeline
        data={[
          {
            title: 'Upcoming',
            state: 'upcoming',
            subtitle: '10. september 2021',
            infoMessage: 'Info message',
          },
          {
            title: 'Current',
            state: 'current',
            subtitle: '10. september 2021',
            infoMessage: 'Info message',
          },
          {
            title: 'Completed',
            state: 'completed',
            subtitle: '10. september 2021',
            infoMessage: 'Info message',
          },
        ]}
      />
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Timeline scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-timeline-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
