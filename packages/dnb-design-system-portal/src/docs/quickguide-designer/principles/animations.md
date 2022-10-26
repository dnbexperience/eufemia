---
title: 'Animation Principles'
---

# Animation Principles

Animations by itself contains a wide range of possible experiences, including micro-animations.

## Purpose

The purposes of the Eufemia Animation Principles are:

1. To gain and foster consistency in the experience of animations
2. To give a deeper understanding in why and when we should animate
3. To guide and help designers and developers making user centric animations

## Micro-Interactions

When animations are used to enhance the user experience in DNB applications, its often tied together in harmony with the "users" interaction.

Therefore, these animation principles will focus on so called "micro" interactions. Still, they are animations.

> Micro-interactions are contained product moments that revolve around a single use case — they have one main task (Dan Saffer)

Micro-interactions appeal to a users desire to see the result of their action. This is how users can better understand the essential functions of the application. So, they will:

- Enhance the sense of control.
- Help users see the result of their action.
- Communicate feedback or the result of an action very quick.

## Making user-centric animations

Animations ask the user for attention. They may delight the user and create a moment that is engaging. But not necessarily in a positive way. People will always experience animations differently. And therefore its more over important to keep animations in a DNB wide consistency.

Animations can give users feelings and a certain state of mind.

The users desire to use an app is often proportional to the design of the app. And so will animations contribute or deprive the enhanced experience.

## Do's and don'ts

Animations in DNB applications should:

- help the user understanding the content.
- help to focus on the underlying action.
- give the user a feeling of control.
- be almost not noticeable.
- be rather too short than too long.
- use a slow-fast-slow easing.

Animations should not:

- ask for attention by itself.
- exist to make the application look cool or feel impressive.
- happen off-content.
- start by its own.
- use a spring or bounce easing.

## Consistency in the experience of animations

To achieve a consistent experience of animations, we should reuse given tools and follow the guide-lines.

To give the user the experience of something fading in, it does not need to animate from the very start to the very end. It often is enough to just show the last part of the animation.

Timing and the easing matters. Try `300ms` to `500ms` in timing. And reuse the existing easing functions `var(--easing-default)`:

```css
transition: height 400ms var(--easing-default);
```
