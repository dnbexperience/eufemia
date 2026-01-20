# Dropdown Mode Property Migration Guide

## Overview

The `preventSelection`, `actionMenu`, and `moreMenu` properties have been **removed** and replaced with a single unified `mode` property. This is a **breaking change** that prevents conflicting configurations and makes the API clearer.

## Migration Required

All usages of the deprecated properties must be updated to use the new `mode` property.

## Migration Examples

### Before (Deprecated)

```tsx
// Normal selection prevention
<Dropdown preventSelection data={data} />

// Action menu (bottom drawer on mobile)
<Dropdown actionMenu data={data} />

// More menu (three dots icon)
<Dropdown moreMenu data={data} />
```

### After (Recommended)

```tsx
// Normal selection prevention
<Dropdown mode="prevent" data={data} />

// Action menu (bottom drawer on mobile)
<Dropdown mode="action-menu" data={data} />

// More menu (three dots icon)
<Dropdown mode="more-menu" data={data} />

// Default behavior (normal selection)
<Dropdown mode="default" data={data} />
// or simply omit the mode property
<Dropdown data={data} />
```

## Mode Values

| Mode Value    | Description                                       | Replaces                  |
| ------------- | ------------------------------------------------- | ------------------------- |
| `default`     | Normal dropdown with selection (default behavior) | No property set           |
| `prevent`     | No permanent selection will be made               | `preventSelection={true}` |
| `action-menu` | Prevent selection + bottom drawer on mobile       | `actionMenu={true}`       |
| `more-menu`   | Prevent selection + icon-only (three dots)        | `moreMenu={true}`         |

## Benefits

✅ **Mutually exclusive**: Cannot accidentally combine conflicting modes  
✅ **Type safety**: Better TypeScript autocompletion and validation  
✅ **Clarity**: Intent is clearer from the property name  
✅ **Extensibility**: Easier to add new modes in the future

## Breaking Change

This is a **breaking change**. The old properties (`preventSelection`, `actionMenu`, `moreMenu`) have been completely removed and will cause TypeScript/runtime errors if used.

## Questions?

If you have any questions about this migration, please reach out to the Eufemia team.
