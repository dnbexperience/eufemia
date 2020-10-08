---
title: 'Patterns'
icon: 'patterns'
order: 8
---

# Patterns

## Description

Patterns are typical solutions to common problems in design and software design.
Each pattern is like a blueprint that you can customize to solve a particular design problem.
They differ from components in that they act more as a guide as to how a particular solution could be made.

### Work In Progress

Patterns have not gotten too much attention during development of Eufemia. Nevertheless, they will get their shape over time.

### Import pattern styles

The styles for patterns are not a part of the default styles, so you have to import them explicitly.

```js
import 'dnb-ui-lib/style/patterns'
```

## [ActionNav](/uilib/patterns/action-nav)

The ActionNav provides a way to navigate through a form in a series of steps allowing the user to go backwards and forwards if necessary.

## [DescriptionList](/uilib/patterns/description-list)

The description list pattern is a simplified version of a table. Use it when you want a crossover between a list and a table where you've got the key on the left hand side and description on the right hand side.

<!-- ## [FieldsetDescription (deprecated)](/uilib/patterns/fieldset-description) -->

## [Footer](/uilib/patterns/footer)

The footer is a container that typically contains site navigation, contact details, privacy policies etc.
Traditionally placed the the end of a document but can also be placed at the end of an article containing author details, copyright information etc.

<!-- ## [FormSummaryPage (deprecated)](/uilib/patterns/form-summary) -->

## [Form](/uilib/patterns/form)

Forms in Eufemia are regarded as patterns because of their unpredictable and varying content and structure. However, their individual components and elements have design guidelines, rules and behaviours.

## [Grid](/uilib/patterns/grid)

A simple grid setup (layout framework) using CSS Flexbox.

## [MainMenu](/uilib/patterns/main-menu)

The main navigation is an element which consists of multiple components.

<!-- ## [RangeSlider (deprecated)](/uilib/patterns/range-slider) -->

## [SummaryTable (deprecated)](/uilib/patterns/summary-table)

This is the navigation which appears at the bottom of step-by-step forms. It has two columns; left and right which can take a number of buttons. The content of children will be inserted into the right navigation placeholder.

## [ViewTitle (deprecated)](/uilib/patterns/view-title)

The `ViewTitle` component is a heading variant with borders on both sides. It is commonly used as a `legend` in form fieldsets.
