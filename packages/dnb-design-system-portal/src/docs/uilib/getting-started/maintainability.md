---
title: 'Maintainability'
description: 'The hard part of a living design system, like Eufemia, is not to create black holes and choosing ways to make maintainability hard and complex.'
order: 3
---

# Maintainability

The hard part of a living design system, like Eufemia, is to avoid creating black holes and choosing ways to make maintainability hard and complex.

To make this more understandable, follow along this detailed explanation about the hard part of DNB UX's vision of maintaining future changes to accessibility, including design, diversity of thinking, future user experience evolution, alongside with DNB brand changes.

## Integration

Now that we got a picture about [what Eufemia aims to strive against](/uilib/getting-started/living-system), we will dive into more technical aspects on how to find solutions to support the system as it should.

> It is vital that Eufemia integrations are made as easy as possible to maintain, update and be prepared for maintainability and future changes.

## Sub systems

Eufemia is build upon using a tree shaped system pattern. Where one system uses a sub-system (or parts of it) in order to shape its full existence. E.g. the Button component uses the color system, spacing system, the typography system, a naming system (properties, file names) and the icon system.

Some systems are low level systems (like a naming system) and some are high level systems (like components). Both types of systems we thread as our building blocks.

## Using the building blocks

Using the building blocks (sub-systems) as they are meant to be used, is an important part of using Eufemia. It is in fact a key factor of helping Eufemia to future develop and avoid friction and unexpected behavior changes.

### Color system usage

As an example, we can look at the color system, which provides colors in form of both CSS variables and JavaScript variables. Re-using these variables is a important part of using Eufemia. Once you have to declare a color in your code, make sure to use custom properties for that. It makes code both readable, maintainable, and easier to change in future.

## Adapter pattern

In order to both serve ready to use components and make them as flexible as possible to be used, there are a couple of different concepts Eufemia is following:

- Helper pattern
- Property pattern (Web Components)
- Higher order component pattern
- Render prop pattern
- Hooks pattern

It will vary when and where these extensions are used. And some extensions, like the property pattern, is used by almost every component.

Overall, the reuse of existing adapters and APIs and using components for what they are designed for to be used, will allow Eufemia to be able to further develop and be maintainable.

## The declarative paradigm

HTML and CSS is by nature declarative. But once they are used together, they quickly and certainly lead to imperative programming styles, especially when JavaScript comes in to the picture.

We want to avoid creating applications with imperative programming styles, because of its nature to make code hard to read and maintain. We encourage everyone to write code as declarative and functional as possible. Parts that belong together, should naturally be kept close to each other, but still as small independent, encapsulated blocks.
