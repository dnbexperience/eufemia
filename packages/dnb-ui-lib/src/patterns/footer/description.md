---
status: 'wip'
---

## Description

### User story

I wish to quickly find specific sections of a site or application bypassing the navigational structure also basic information such as contact details, address, opening times, support, terms and privacy policies in a consistent place throughout my interaction with the application.

### What is it

The footer is a container that typically contains site navigation, contact details, privacy policies etc.
Traditionally placed the the end of a document but can also be placed at the end of an article containing author details, copyright information etc.

#### User story

I wish to quickly find specific sections of a site or application bypassing the navigational structure also basic information such as contact details, address, opening times, support, terms and privacy policies in a consistent place throughout my interaction with the application.

#### Good practices

Keep it as simple as possible. There can be a tendency to over-fill footers with extra information, logos of partners etc.
Consider users on mobile/touch devices - make sure the footer navigation has sufficient touch space between elements.

> Ask what **my** users expect to see here?
> What is the next logical step in the user journey?

#### Accessibility concerns

The VoiceOver screen reader has an issue where the footer landmark role is not announced in the landmark rotor. To address this, add role="contentinfo" to the footer element. [Read more about this](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer).

#### Design

Stack footer content blocks vertically and follow a similar pattern as to the one shown below.

If there is only one block then it should have background color:
