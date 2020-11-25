---
showTabs: true
---

## Events

| Events             | Description                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `on_open`          | _(optional)_ this event gets triggered once the modal shows up. Returns the modal id: `{ id }`.                                                                                                                    |
| `on_close`         | _(optional)_ this event gets triggered once the modal gets closed. Returns the modal id: `{ id }`.                                                                                                                 |
| `on_close_prevent` | _(optional)_ this event gets triggered once the user tries to close the modal, but `prevent_close` is set to **true**. Returns a callback `close` You can call to trigger the close mechanism. More details below. |

### Selective on_close_prevent

```jsx
<Modal
  ...
  prevent_close={true}
  on_close_prevent={({ triggeredBy, close /* id, event */ }) => {
	switch (triggeredBy) {
	case 'keyboard':
	case 'button':
		close()
		break
	case 'overlay': {
			const timeout = setTimeout(close, 1e3)
			return () => clearTimeout(timeout) // clear timeout on unmount
		}
	}
  }}
>
  ...
</Modal>
```
