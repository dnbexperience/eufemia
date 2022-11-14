---
showTabs: true
---

## Description

The Upload component should be used in scenarios where the user has to upload any kind of files.

## How to use the Upload component

- Files selected by the user should be uploaded immediately (temporary location).
- The user should be able to remove them (files) during the session.
- If the Upload component is shown in a submit form, then a [GlobalStatus](/uilib/components/global-status) should be a part of the form.
- Validation messages coming from the "backend" should be displayed for each file via the `useUpload` hook. See [example](/uilib/components/upload/#upload-error-message) below.
- The `useUpload` hook can be placed on any location in your application, and does not need to be where the `Upload` component is used.

```jsx
function YourComponent() {
  const { files, setFiles } = Upload.useUpload('unique-id')

  React.useEffect(() => {
    setFiles(
      files.map((fileItem) => {
        if (fileItem.file.name === fileNameFromBackend) {
          fileItem.errorMessage = 'Your message from the backend'
        }
        return fileItem
      })
    )
  }, [fileNameFromBackend])

  return <Upload id="unique-id" />
}
```

## Backend integration

The "backend" receiving the files is decoupled and can be any existing or new system.

## Limit the amount of files

By default, the Upload component accepts multiple files. You can use the prop `filesAmountLimit={1}` to make the component accept only one file.

## Page wide drop support

Once the Upload component mounts, it also adds support for dropping files to the entire browser body.

**NB:** When you have several mounted components, all of them will receive the dropped files.
