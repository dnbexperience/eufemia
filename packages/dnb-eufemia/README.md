# DNB UI Library

Eufemia is DNB's design system and UI library, providing a consistent and accessible set of components for building modern web applications. It streamlines development by offering reusable elements, design guidelines, and best practices, ensuring a unified user experience across DNB's digital products.

Read more about Eufemia and the [DNB UI Library](https://eufemia.dnb.no/uilib/about-the-lib).

## Agent Skills

The package includes portable [Agent Skills](https://agentskills.io/) that use
Eufemia's versioned documentation through the Eufemia MCP server.

Install the skills in a project that already depends on `@dnb/eufemia`:

```bash
yarn eufemia skills install
```

The command asks which supported agent locations to use and preselects existing
managed installations. Pass `--target <directory>` to bypass the selector in
non-interactive environments.

See the [Agent Skills and MCP documentation](https://eufemia.dnb.no/uilib/usage/first-steps/tools/#agent-skills)
for installation targets, npm and pnpm commands, update safety, cloud-agent
usage, and MCP configuration.

```bash
yarn eufemia skills check
yarn eufemia skills list
yarn eufemia skills update
yarn eufemia skills uninstall
```

The installer tracks generated files and refuses to replace local changes
unless `--force` is given. Commit installed project skills when they should be
available to cloud agents.

Configure the [Eufemia MCP server](https://eufemia.dnb.no/uilib/usage/first-steps/tools/#ai-assistance-and-mcp-server)
before using the skills. The skill files contain workflows, while component
APIs, tokens, theme support, and other version-sensitive facts remain in
Eufemia's packaged documentation.

## License

You find the license here: [LICENSE](https://github.com/dnbexperience/eufemia/blob/main/LICENSE)
