import ModalExample from './assets/modal-example.svg'
import ModalExampleButtons from './assets/modal-example-buttons.svg'

import Img from 'Tags/Img'

# Modals (Modal Dialogs)

NB! Modal dialogs interrupt users and demand an action. They are appropriate when user’s attention needs to be directed toward important information.

#### Behaviour

The modal can be triggered from either a text element or a button. Triggering a modal will activate the opaque overlay and display the contents.

#### Structure and content

Typically an opaque cover over the main content (fullscreen) and a small centered box containing information and interactive elements (buttons, forms etc.)

#### What is it

Modal dialogs appear on top of the main content changing the _mode_ of the system into a special mode requiring user interaction. The main content is disabled until the user interacts with the modal dialog.

#### Disadvantages of modal Dialogs

1.  They require immediate attention
2.  They interrupt users
3.  They cause users to forget what they were doing
4.  They add extra goals - reading, interacting and closing the Modal
5.  They block the content in the background

#### Guidelines

1.  Use for important warnings as a way to prevent or correct critical errors.
2.  Do not use for unessential information that is not related to the users current workflow.
3.  Use for requesting the user to enter information critical to the current process.

#### Design Patterns

<Img src={ModalExample} caption="Modal with header, text and close button" alt="My alt" height="256" />
<Img src={ModalExampleButtons} caption="Modal with header, text, buttons and close button" alt="My alt" height="296" />

#### Demos
