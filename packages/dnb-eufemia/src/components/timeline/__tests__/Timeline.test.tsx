import React from 'react'
import { render, screen } from '@testing-library/react'
import Timeline from '../Timeline'
import TimelineItem from '../TimelineItem'

import IconPrimary from '../../icon-primary/IconPrimary'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

describe('Timeline', () => {
  it('renders without properties', () => {
    render(<Timeline />)

    expect(screen.queryByTestId('timeline')).not.toBeNull()
  })

  it('renders a timeline with multiple items by data prop', () => {
    render(
      <Timeline
        data={[
          {
            name: 'Upcoming',
            state: 'upcoming',
          },
          { name: 'Current', state: 'current' },
          { name: 'Completed', state: 'completed' },
        ]}
      />
    )

    expect(screen.queryAllByTestId('timeline-item')).toHaveLength(3)
  })

  it('renders a timeline with multiple items by children', () => {
    render(
      <Timeline>
        <Timeline.Item name="Upcoming" state="upcoming" />
        <Timeline.Item name="Current" state="current" />
        <Timeline.Item name="Completed" state="completed" />
      </Timeline>
    )

    expect(screen.queryAllByTestId('timeline-item')).toHaveLength(3)
  })

  it('current will have aria-current="step', () => {
    render(
      <Timeline
        data={[
          {
            name: 'Upcoming',
            state: 'upcoming',
          },
          { name: 'Completed', state: 'completed' },
          { name: 'Current', state: 'current' },
        ]}
      />
    )

    const lastElem = screen.getAllByTestId('timeline-item').slice(-1)[0]
    expect(lastElem.getAttribute('aria-current')).toBe('step')
  })

  it('inherits skeleton prop from provider', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Provider skeleton>
        <Timeline
          data={[
            {
              name: 'Upcoming',
              state: 'upcoming',
            },
          ]}
        />
      </Provider>
    )

    expect(screen.queryByTestId('timeline-item').className).toMatch(
      skeletonClassName
    )
  })

  it('should support spacing props', () => {
    render(
      <Timeline
        data={[
          {
            name: 'Upcoming',
            state: 'upcoming',
          },
        ]}
        top="2rem"
      />
    )

    const element = screen.getByTestId('timeline')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'data-testid'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-timeline',
      'dnb-space__top--large',
    ])
  })

  describe('TimelineItem', () => {
    it('renders name', () => {
      const name = 'Completed'
      render(<TimelineItem name={name} state="completed" />)
      expect(
        screen.queryByTestId('timeline-item-label-name').textContent
      ).toBe(name)
    })

    it('renders date', () => {
      const date = '10. september 2021'
      render(
        <TimelineItem date={date} name="Complete" state="completed" />
      )
      expect(
        screen.queryByTestId('timeline-item-content-date').textContent
      ).toBe(date)
    })

    it('renders dates', () => {
      const dates = ['10. september 2021', '11. september 2021']
      render(
        <TimelineItem date={dates} name="Complete" state="completed" />
      )

      expect(
        screen.queryAllByTestId('timeline-item-content-date')
      ).toHaveLength(2)

      expect(
        screen.queryAllByTestId('timeline-item-content-date')[0]
          .textContent
      ).toBe(dates[0])
      expect(
        screen.queryAllByTestId('timeline-item-content-date')[1]
          .textContent
      ).toBe(dates[1])
    })

    it('renders info message', () => {
      const infoMessage = 'Info text'
      render(
        <TimelineItem
          infoMessage={infoMessage}
          name="Complete"
          state="completed"
        />
      )
      expect(
        screen.queryByTestId('timeline-item-content-info').textContent
      ).toBe(infoMessage)
    })

    it('renders custom icon', () => {
      const CustomIcon = (
        <IconPrimary data-testid="timeline-item-custom-icon" icon="bell" />
      )
      render(
        <TimelineItem
          icon={CustomIcon}
          name="Complete"
          state="completed"
        />
      )

      const element = screen.queryByTestId('timeline-item-custom-icon')
      expect(element).not.toBeNull()
      expect(element.getAttribute('data-test-id')).toBe('bell icon')
    })

    it('renders custom alt label', () => {
      const iconAlt = 'custom_alt_label'
      render(
        <TimelineItem
          name="Complete"
          state="completed"
          iconAlt={iconAlt}
        />
      )

      expect(screen.findByAltText('custom_alt_label')).not.toBeNull()
      expect(screen.queryByRole('img').getAttribute('alt')).toBe(iconAlt)
    })

    it('renders skeleton if skeleton is true', () => {
      const skeletonClassName = 'dnb-skeleton'

      render(<TimelineItem skeleton name="name" state="completed" />)

      expect(screen.queryByTestId('timeline-item').className).toMatch(
        skeletonClassName
      )
    })

    it('inherits skeleton prop from provider', () => {
      const skeletonClassName = 'dnb-skeleton'

      render(
        <Provider skeleton>
          <TimelineItem name="name" state="completed" />
        </Provider>
      )

      expect(screen.queryByTestId('timeline-item').className).toMatch(
        skeletonClassName
      )
    })

    describe('renders default icon based on state property', () => {
      it('renders check icon when state is completed', () => {
        render(<TimelineItem name="Complete" state="completed" />)
        expect(screen.queryByRole('img').getAttribute('aria-label')).toBe(
          'check icon'
        )
      })

      it('renders pin icon when state is current', () => {
        render(<TimelineItem name="Current" state="current" />)
        expect(screen.queryByRole('img').getAttribute('aria-label')).toBe(
          'pin icon'
        )
      })

      it('renders calendar icon when state is upcoming', () => {
        render(<TimelineItem name="Upcoming" state="upcoming" />)
        expect(screen.queryByRole('img').getAttribute('aria-label')).toBe(
          'calendar icon'
        )
      })

      it('renders alt label Utført when state is completed', () => {
        render(<TimelineItem name="Complete" state="completed" />)
        expect(screen.queryByRole('img').getAttribute('alt')).toBe(
          'Utført'
        )
      })

      it('renders alt label Nåværende when state is current', () => {
        render(<TimelineItem name="Current" state="current" />)
        expect(screen.queryByRole('img').getAttribute('alt')).toBe(
          'Nåværende'
        )
      })

      it('renders alt label Kommende when state is upcoming', () => {
        render(<TimelineItem name="Upcoming" state="upcoming" />)
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
            name: 'Upcoming',
            state: 'upcoming',
            date: '10. september 2021',
            infoMessage: 'Info message',
          },
          {
            name: 'Current',
            state: 'current',
            date: '10. september 2021',
            infoMessage: 'Info message',
          },
          {
            name: 'Completed',
            state: 'completed',
            date: '10. september 2021',
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
    const scss = loadScss(require.resolve('../style/dnb-timeline.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-timeline-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
