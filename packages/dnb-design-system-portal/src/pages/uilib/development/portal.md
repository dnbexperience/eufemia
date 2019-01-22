---
title: 'Portal and docs'
draft: false
order: 5
---

# Portal Changes

## Update Content only

In case You make changes **not** related to [/uilib](/uilib) pages, You don't have to run the build process for sure. Simply commit Your changes. But make sure the Markdown is formatted correctly by using Prettier.

You can either do changes directly on GitHub with a fork of the Repository, or You can clone the Repository locally on Your computer and make changes there.

### Run the Portal locally

```bash
$ yarn start
```

This will start the Portal. You can view the website by visiting [localhost:8000](http://localhost:8000/).

Content changes to both Markdown files and styles (SCSS) and code changes will be reflected immediately.

### Build Pages

In case You make changes witch effects the content of the [/uilib](/uilib) pages, You have to **regenerate** the Portal pages by running:

```bash
# In the `dnb-design-system-portal` directory, run:
$ yarn build

# You can also start a "watch" mode with:
$ yarn build:dev
```

This will update/create all the needed [pages](/uilib).

Fore sure, this applies to change to Markdown files in the `dnb-ui-lib` - but also changes to the Component Code Examples.
