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
            title: 'Upcoming',
            state: 'upcoming',
          },
          { title: 'Current', state: 'current' },
          { title: 'Completed', state: 'completed' },
        ]}
      />
    )

    expect(screen.queryAllByTestId('timeline-item')).toHaveLength(3)
  })

  it('renders a timeline with multiple items by children', () => {
    render(
      <Timeline>
        <Timeline.Item title="Upcoming" state="upcoming" />
        <Timeline.Item title="Current" state="current" />
        <Timeline.Item title="Completed" state="completed" />
      </Timeline>
    )

    expect(screen.queryAllByTestId('timeline-item')).toHaveLength(3)
  })

  it('current will have aria-current="step', () => {
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
              title: 'Upcoming',
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
            title: 'Upcoming',
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
    it('renders title', () => {
      const title = 'Completed'
      render(<TimelineItem title={title} state="completed" />)
      expect(
        screen.queryByTestId('timeline-item-label-title').textContent
      ).toBe(title)
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
      expect(
        screen.queryByTestId('timeline-item-content-subtitle').textContent
      ).toBe(subtitle)
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

      expect(
        screen.queryAllByTestId('timeline-item-content-subtitle')
      ).toHaveLength(2)

      expect(
        screen.queryAllByTestId('timeline-item-content-subtitle')[0]
          .textContent
      ).toBe(subtitles[0])
      expect(
        screen.queryAllByTestId('timeline-item-content-subtitle')[1]
          .textContent
      ).toBe(subtitles[1])
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
          title="Complete"
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
          title="Complete"
          state="completed"
          iconAlt={iconAlt}
        />
      )

      expect(screen.findByAltText('custom_alt_label')).not.toBeNull()
      expect(screen.queryByRole('img').getAttribute('alt')).toBe(iconAlt)
    })

    it('renders skeleton if skeleton is true', () => {
      const skeletonClassName = 'dnb-skeleton'

      render(<TimelineItem skeleton title="title" state="completed" />)

      expect(screen.queryByTestId('timeline-item').className).toMatch(
        skeletonClassName
      )
    })

    it('inherits skeleton prop from provider', () => {
      const skeletonClassName = 'dnb-skeleton'

      render(
        <Provider skeleton>
          <TimelineItem title="name" state="completed" />
        </Provider>
      )

      expect(screen.queryByTestId('timeline-item').className).toMatch(
        skeletonClassName
      )
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
