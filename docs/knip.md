# Dead Code Detection with Knip

This project uses [Knip](https://knip.dev/) to detect unused files, dependencies, and exports in the codebase. This helps maintain a clean, efficient codebase by identifying dead code that can be safely removed.

## What Knip Detects

- ❌ **Unused files** - Files that aren't imported anywhere
- ❌ **Unused dependencies** - Packages in package.json that aren't imported
- ❌ **Unused exports** - Exported functions/classes/variables that aren't used
- ❌ **Duplicate exports** - Same export defined multiple times
- ❌ **Unused enum members** - Enum values that are never referenced
- ❌ **Unused types** - TypeScript types/interfaces that aren't used

## Running Knip

### Locally

```bash
# Full analysis (development + production)
yarn workspace @dnb/eufemia test:unused

# Production-only analysis (excludes devDependencies)
yarn workspace @dnb/eufemia test:unused:production

# From root
yarn workspace @dnb/eufemia test:unused
```

### In CI

Knip should be run periodically (manually or on a schedule) rather than on every commit, as it can be resource-intensive and may produce false positives that require investigation.

## Interpreting Results

### Example Output

```
Unused files (2)
  src/components/old-button/OldButton.tsx
  src/utils/deprecated-helper.ts

Unused dependencies (1)
  lodash

Unused exports (5)
  src/components/Button/Button.tsx:
    calculateWidth (exported but never used)
  src/utils/helpers.ts:
    formatDate (exported but never used)
    parseData (exported but never used)
```

### What to Do

1. **Review carefully** - Not all "unused" items are actually unused
2. **Check public APIs** - Exported items in `index.ts` files are intentional
3. **Consider usage** - Some exports are for consumers of the library
4. **Remove with confidence** - If truly unused, remove it

## Configuration

The configuration is in [`knip.config.ts`](../knip.config.ts) at the repository root.

### Key Settings

```typescript
{
  // Automatically detected by Knip
  entry: ['src/index.ts', 'src/components/*/index.tsx'],
  
  // Files to analyze
  project: ['src/**/*.{js,ts,tsx}'],
  
  // Files/patterns to ignore
  ignore: ['**/__tests__/**', '**/*.stories.tsx'],
}
```

## Ignoring False Positives

### In Code

Use comments to ignore specific exports:

```typescript
// @knip-ignore-next-line
export const publicAPI = () => {}

// Or for entire file
// @knip-ignore-file
```

### In Configuration

Update [`knip.config.ts`](../knip.config.ts):

```typescript
{
  ignoreDependencies: ['some-package'],
  ignore: ['**/some-file.ts'],
}
```

## Common False Positives

### Library Exports

**Issue**: Public API exports show as unused

**Solution**: This is expected. Library exports are meant for external consumers.

```typescript
// This is CORRECT - consumers need this
export { Button } from './components/Button'
```

### Type-Only Imports

**Issue**: TypeScript types marked as unused

**Solution**: These might be used only for type checking. Check if they're actually needed.

### Dynamic Imports

**Issue**: Dynamically imported files marked as unused

**Solution**: Add to `entry` in knip.config.ts if they're legitimate entry points.

### Build Artifacts

**Issue**: Generated files marked as unused

**Solution**: Add to `ignore` patterns in knip.config.ts.

## Integration with CI

### Manual Run (Recommended)

Run periodically (weekly/monthly) and create issues for findings:

```bash
yarn workspace @dnb/eufemia test:unused
```

### Automated (Optional)

Add to `.github/workflows/verify.yml` if desired:

```yaml
- name: Check for unused code
  run: yarn workspace @dnb/eufemia test:unused
  continue-on-error: true  # Don't fail builds
```

⚠️ **Note**: Start with manual runs to tune configuration before adding to CI.

## Best Practices

### Regular Maintenance

1. Run monthly to catch accumulating dead code
2. Address findings in batches
3. Update configuration as needed

### Before Removing Code

1. Search for dynamic imports (`import(\`./\${name}\`)`)
2. Check for string-based references
3. Look for documentation references
4. Review git history for context

### Reducing False Positives

1. Use consistent export patterns
2. Document why exports exist if they look unused
3. Keep entry points up to date in config
4. Review and update ignore patterns

## Troubleshooting

### Too Many Results

Start with specific workspaces:

```bash
# Just the main library
knip --workspace packages/dnb-eufemia

# Just the portal
knip --workspace packages/dnb-design-system-portal
```

### Slow Performance

```bash
# Use --performance flag to see bottlenecks
knip --performance

# Exclude large directories
knip --exclude '**/node_modules/**'
```

### Missing Dependencies

Knip might not detect dependencies used in:
- String templates
- Dynamic imports
- CLI commands in package.json scripts
- Peer dependencies

## Resources

- [Knip Documentation](https://knip.dev/)
- [Knip Configuration Reference](https://knip.dev/reference/configuration)
- [Common Issues](https://knip.dev/guides/handling-issues)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin)

## Alternatives

If Knip doesn't meet your needs:

- **ts-prune**: TypeScript-only, simpler but less powerful
- **depcheck**: Dependencies only, no exports analysis
- **unimported**: Similar to Knip, different approach
