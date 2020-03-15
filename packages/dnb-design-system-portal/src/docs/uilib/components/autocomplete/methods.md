## Dynamically change data

You can manipulate the used data dynamically, either by changing the `data` property, or during user events like `on_type` or `on_focus`. The following properties and methods are there to use:

**Methods**

- `updateData` replace all data entries
- `emptyData` remove all data entries
- `showIndicator` shows a progress indicator
- `showNoOptions` shows the no entries found status
- `setVisible` shows the [DrawerList](/uilib/components/fragments/drawer-list)
- `setHidden` hides the [DrawerList](/uilib/components/fragments/drawer-list)

**Properties**

- `dataList` contains all the data entries

**Example**

```jsx
<Autocomplete
  on_focus={({ updateData, showIndicator }) => {
    showIndicator()
    setTimeout(() => {
      updateData(topMovies)
    }, 1e3)
  }}
  on_type={({ value /* updateData, ... */ }) => {
    console.log('on_type', value)
  }}
/>
```
