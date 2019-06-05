---
draft: true
---

| Events             | Description                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_open`          | _(optional)_ this event gets triggered once the modal shows up                                                                                                                                 |
| `on_close`         | _(optional)_ this event gets triggered once the modal gets closed                                                                                                                              |
| `on_close_prevent` | _(optional)_ this event gets triggered once the user tries to close the modal, but `prevent_close` is set to **true**. Returns a callback `close` You can call to trigger the close mechanism. |
