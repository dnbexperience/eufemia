---
title: 'Portal and docs'
draft: true
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

This will start the Portal. You can view the portal website by visiting [localhost:8000](http://localhost:8000/).

Content changes to both Markdown files and styles (SCSS) and code changes will be reflected immediately.

### Local build

In case You have to create a local static build of the portal website (for various reasons), you can do so by:

```bash
# In the `dnb-design-system-portal` directory, run:
$ yarn build
```

The build will be exported to the `/public` directory. You can now also run a local static server to view it at the given port [localhost:8000](http://localhost:8000/):

```bash
# In the `dnb-design-system-portal` directory, run:
$ yarn serve
```
