---
title: 'DataContext.Context'
description: 'The context object used in `DataContext.Provider`.'
version: 11.8.0
generatedAt: 2026-06-26T12:38:09.948Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# DataContext.Context

## Description

The main context for [DataContext.Provider](/uilib/extensions/forms/DataContext/Provider) which the [Field](/uilib/extensions/forms/base-fields/) and [Value](/uilib/extensions/forms/Value/) components connect to (optional) for sources and callbacks when it is present. For custom field and value components, prefer [useFieldProps](/uilib/extensions/forms/create-component/useFieldProps/), [useValueProps](/uilib/extensions/forms/create-component/useValueProps/) or [Form.useDataValue](/uilib/extensions/forms/Form/useDataValue/) instead of consuming `DataContext.Context` directly. Direct reads from `data` or `internalDataRef.current` do not create a data subscription.
