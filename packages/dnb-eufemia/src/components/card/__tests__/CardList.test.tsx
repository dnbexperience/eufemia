import { render } from '@testing-library/react'
import Card from '../index'

describe('Card.List', () => {
  it('should render a list with list items', () => {
    render(
      <Card.List>
        <Card.ListItem>
          <Card>Content 1</Card>
        </Card.ListItem>
        <Card.ListItem>
          <Card>Content 2</Card>
        </Card.ListItem>
      </Card.List>
    )

    const list = document.querySelector('.dnb-card-list')
    expect(list.tagName).toBe('UL')
    expect(list.querySelectorAll('.dnb-card-list__item')).toHaveLength(2)
  })

  it('should forward className to Card.List', () => {
    render(
      <Card.List className="custom-class">
        <Card.ListItem>
          <Card>Content</Card>
        </Card.ListItem>
      </Card.List>
    )

    const list = document.querySelector('.dnb-card-list')
    expect(list).toHaveClass('custom-class')
  })

  it('should forward HTML attributes to Card.List', () => {
    render(
      <Card.List data-testid="my-list" aria-label="Card list">
        <Card.ListItem>
          <Card>Content</Card>
        </Card.ListItem>
      </Card.List>
    )

    const list = document.querySelector('.dnb-card-list')
    expect(list).toHaveAttribute('data-testid', 'my-list')
    expect(list).toHaveAttribute('aria-label', 'Card list')
  })

  it('should support spacing props on Card.List', () => {
    render(
      <Card.List top="large" bottom="small">
        <Card.ListItem>
          <Card>Content</Card>
        </Card.ListItem>
      </Card.List>
    )

    const list = document.querySelector('.dnb-card-list')
    expect(list).toHaveClass('dnb-space__top--large')
    expect(list).toHaveClass('dnb-space__bottom--small')
  })
})

describe('Card.ListItem', () => {
  it('should forward className to Card.ListItem', () => {
    render(
      <Card.List>
        <Card.ListItem className="custom-item">
          <Card>Content</Card>
        </Card.ListItem>
      </Card.List>
    )

    const item = document.querySelector('.dnb-card-list__item')
    expect(item).toHaveClass('custom-item')
  })

  it('should apply center class when center is true', () => {
    render(
      <Card.List>
        <Card.ListItem center>
          <Card>Content</Card>
        </Card.ListItem>
      </Card.List>
    )

    const item = document.querySelector('.dnb-card-list__item')
    expect(item).toHaveClass('dnb-card-list__item--center')
  })

  it('should apply center-when-small class when center is "when-small"', () => {
    render(
      <Card.List>
        <Card.ListItem center="when-small">
          <Card>Content</Card>
        </Card.ListItem>
      </Card.List>
    )

    const item = document.querySelector('.dnb-card-list__item')
    expect(item).toHaveClass('dnb-card-list__item--center-when-small')
    expect(item).not.toHaveClass('dnb-card-list__item--center')
  })

  it('should not add center classes when center is not set', () => {
    render(
      <Card.List>
        <Card.ListItem>
          <Card>Content</Card>
        </Card.ListItem>
      </Card.List>
    )

    const item = document.querySelector('.dnb-card-list__item')
    expect(item).not.toHaveClass('dnb-card-list__item--center')
    expect(item).not.toHaveClass('dnb-card-list__item--center-when-small')
  })

  it('should support spacing props on Card.ListItem', () => {
    render(
      <Card.List>
        <Card.ListItem top="medium">
          <Card>Content</Card>
        </Card.ListItem>
      </Card.List>
    )

    const item = document.querySelector('.dnb-card-list__item')
    expect(item).toHaveClass('dnb-space__top--medium')
  })
})
