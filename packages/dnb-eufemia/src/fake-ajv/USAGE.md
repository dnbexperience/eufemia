# How to Use Fake AJV Modules

## Quick Start

1. **Add resolutions to your `package.json`:**

```json
{
  "resolutions": {
    "ajv": "@dnb/eufemia/fake-ajv@latest",
    "ajv-errors": "@dnb/eufemia/fake-ajv-errors@latest"
  }
}
```

2. **Reinstall dependencies:**

```bash
yarn install
```

3. **Build your app as usual:**

```bash
yarn build
```

## Detailed Steps

### Step 1: Update your package.json

Add the resolutions section to your root `package.json`:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "@dnb/eufemia": "^11.0.0"
  },
  "resolutions": {
    "ajv": "@dnb/eufemia/fake-ajv@latest",
    "ajv-errors": "@dnb/eufemia/fake-ajv-errors@latest"
  }
}
```

### Step 2: Verify the setup

After running `yarn install`, you can verify that the fake modules are being used by checking your `node_modules`:

```bash
# Check that ajv points to the fake module
ls -la node_modules/ajv
# Should show a symlink to the fake module

# Check that ajv-errors points to the fake module
ls -la node_modules/ajv-errors
# Should show a symlink to the fake module
```

### Step 3: Test your application

Your application should work exactly as before, but without AJV being bundled. You can verify this by:

1. Building your application
2. Checking the bundle size (should be smaller)
3. Running your application to ensure it still works

## What happens when you use fake modules

### ✅ What works:

- All Eufemia Forms components work normally
- No TypeScript errors
- No runtime errors
- Smaller bundle size

### ⚠️ What doesn't work:

- JSON Schema validation (always passes)
- AJV-specific features
- Error messages from AJV validation

### 🔄 What happens to validation:

- All validation calls return `true` (no errors)
- No actual validation logic is executed
- Error objects are empty arrays

## Reverting to real AJV

If you need to use real AJV later:

1. **Remove the resolutions from `package.json`:**

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "@dnb/eufemia": "^11.0.0"
  }
  // Remove the resolutions section
}
```

2. **Reinstall dependencies:**

```bash
yarn install
```

3. **Your app will now use the real AJV modules**

## Troubleshooting

### Issue: "Module not found" errors

**Solution:** Make sure you're using the correct package names in resolutions:

- `@dnb/eufemia/fake-ajv@latest`
- `@dnb/eufemia/fake-ajv-errors@latest`

### Issue: TypeScript errors

**Solution:** The fake modules maintain the same TypeScript interfaces. If you get errors, try restarting your TypeScript server.

### Issue: Validation not working

**Solution:** This is expected! The fake modules don't perform real validation. If you need validation, revert to real AJV.

### Issue: Bundle size not reduced

**Solution:** Make sure the resolutions are working by checking `node_modules/ajv` points to the fake module.

## Package Manager Comparison

| Feature        | Yarn          | npm         | pnpm                                                               |
| -------------- | ------------- | ----------- | ------------------------------------------------------------------ |
| Field          | `resolutions` | `overrides` | `pnpm.overrides`                                                   |
| Alternative    | -             | -           | `resolutions` (Yarn compatibility)                                 |
| Scoping        | Basic         | Advanced    | Advanced                                                           |
| Root-only      | Yes           | Yes         | Yes                                                                |
| Merge behavior | -             | -           | `resolutions` + `pnpm.overrides` (pnpm.overrides takes precedence) |

## Advanced Usage

### Using with different bundlers

The fake modules work with any bundler that respects package manager overrides:

- Webpack
- Vite
- Rollup
- Parcel
- esbuild

### Using with npm

If you're using npm instead of yarn, you can use npm's `overrides` feature as documented in the [npm package.json documentation](https://docs.npmjs.com/cli/v11/configuring-npm/package-json):

```json
{
  "overrides": {
    "ajv": "@dnb/eufemia/fake-ajv@latest",
    "ajv-errors": "@dnb/eufemia/fake-ajv-errors@latest"
  }
}
```

According to the [npm documentation](https://docs.npmjs.com/cli/v11/configuring-npm/package-json), overrides provide a way to replace a package in your dependency tree with another version, or another package entirely. The overrides are only considered in the root `package.json` file for a project and can be scoped as specific or as vague as desired.

#### How npm overrides work:

1. **Root-level only**: Overrides are only considered in the root `package.json` file for a project
2. **Dependency tree replacement**: They replace packages anywhere in your dependency tree
3. **Scoped overrides**: You can target specific packages or use wildcards
4. **Version matching**: You can specify exact versions or version ranges

#### Example with scoped overrides:

If you want to override `ajv` only when it's a dependency of `@dnb/eufemia`:

```json
{
  "overrides": {
    "@dnb/eufemia": {
      "ajv": "@dnb/eufemia/fake-ajv@latest",
      "ajv-errors": "@dnb/eufemia/fake-ajv-errors@latest"
    }
  }
}
```

This ensures that only the `ajv` and `ajv-errors` packages used by `@dnb/eufemia` are replaced with the fake modules, while other packages that might use these dependencies will continue to use the real versions.

### Using with pnpm

With pnpm, use the `pnpm.overrides` field as documented in the [pnpm package.json documentation](https://pnpm.io/9.x/package_json#pnpmoverrides):

```json
{
  "pnpm": {
    "overrides": {
      "ajv": "@dnb/eufemia/fake-ajv@latest",
      "ajv-errors": "@dnb/eufemia/fake-ajv-errors@latest"
    }
  }
}
```

Alternatively, pnpm also supports the `resolutions` field for Yarn compatibility:

```json
{
  "resolutions": {
    "ajv": "@dnb/eufemia/fake-ajv@latest",
    "ajv-errors": "@dnb/eufemia/fake-ajv-errors@latest"
  }
}
```

According to the [pnpm documentation](https://pnpm.io/9.x/package_json#pnpmoverrides), `resolutions` and `pnpm.overrides` get merged before package resolution (with `pnpm.overrides` taking precedence), which can be useful when migrating from Yarn.

## Bundle Size Impact

| Scenario      | Bundle Size | Savings |
| ------------- | ----------- | ------- |
| With real AJV | ~200KB+     | -       |
| With fake AJV | ~1KB        | ~199KB+ |

_Actual savings may vary depending on your bundler and tree-shaking configuration._
