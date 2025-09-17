# Fake AJV Module for Yarn Resolutions

This directory contains fake implementations of `ajv` and `ajv-errors` that can be used with yarn resolutions to prevent these libraries from being bundled when they're not actually used.

## Problem

Eufemia Forms includes AJV (Another JSON Schema Validator) as a dependency for JSON Schema validation. However, if your application doesn't use JSON Schema validation, AJV still gets bundled, adding unnecessary weight to your bundle.

## Solution

These fake modules provide the same interface as the real AJV libraries but are essentially no-ops. When used with yarn resolutions, npm overrides, or pnpm overrides, they replace the real AJV modules, preventing them from being bundled.

## Usage

### With Yarn

Add the following to your `package.json`:

```json
{
  "resolutions": {
    "ajv": "@dnb/eufemia/fake-ajv@latest",
    "ajv-errors": "@dnb/eufemia/fake-ajv-errors@latest"
  }
}
```

Then run:

```bash
yarn install
```

### With npm

Add the following to your `package.json` using npm's `overrides` feature:

```json
{
  "overrides": {
    "ajv": "@dnb/eufemia/fake-ajv@latest",
    "ajv-errors": "@dnb/eufemia/fake-ajv-errors@latest"
  }
}
```

Then run:

```bash
npm install
```

For more details on npm overrides, see the [npm package.json documentation](https://docs.npmjs.com/cli/v11/configuring-npm/package-json).

### With pnpm

Add the following to your `package.json` using pnpm's `overrides` feature:

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

Then run:

```bash
pnpm install
```

Alternatively, pnpm also supports the `resolutions` field for Yarn compatibility. For more details on pnpm overrides, see the [pnpm package.json documentation](https://pnpm.io/9.x/package_json#pnpmoverrides).

## How it works

1. **Fake AJV Module** (`fake-ajv/`):

   - Provides a `FakeAjv` class that implements the same interface as the real AJV
   - All validation methods return `true` (no validation errors)
   - Handles the specific import pattern used by Eufemia: `ajv/dist/2020`

2. **Fake AJV-Errors Module** (`fake-ajv-errors/`):
   - Provides a no-op function that marks the AJV instance as having ajv-errors applied
   - Maintains compatibility with the existing code

## When to use

Use these fake modules when:

- You're using Eufemia Forms but NOT using JSON Schema validation
- You want to reduce your bundle size
- You're only using Zod schemas or custom validation

## When NOT to use

Do NOT use these fake modules when:

- You're using JSON Schema validation with Eufemia Forms
- You need actual AJV functionality
- You're using AJV directly in your application

## Reverting to real AJV

To revert back to the real AJV modules, simply remove the resolutions from your `package.json` and run `yarn install` again.

## Bundle size impact

The real AJV library is approximately 200KB+ when bundled. Using these fake modules can save this space when JSON Schema validation is not needed.

## Technical details

The fake modules maintain the same TypeScript interfaces and runtime behavior as the real modules, ensuring that:

- No TypeScript errors occur
- Runtime code doesn't break
- The same API surface is available
- All imports work correctly

The only difference is that validation always passes (returns `true`) and no actual validation logic is executed.
