---
showTabs: true
---

## Events

| Events         | Description                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`     | _(optional)_ will be called on `files` changes made by the user. Access the files with `{ files }` (containing each a `fileItem`). |
| `onFileDelete` | _(optional)_ will be called once a file gets deleted by the user. Access the deleted file with `{ fileItem }`.                     |

Each `fileItem` will contain a `{ file, id }` (File Object and an unique ID) along with other information.
