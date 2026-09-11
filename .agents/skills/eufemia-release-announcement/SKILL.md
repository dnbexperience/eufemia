---
name: eufemia-release-announcement
description: Draft concise, Slack-ready announcements for Eufemia releases with practical feature benefits and verified documentation anchors. Use for announcing or summarizing a published Eufemia version, not for generating GitHub release notes or publishing messages.
---

# Eufemia Release Announcement

Create a self-contained announcement that developers can copy into Slack.

1. Resolve the requested release from its tag or URL. If no version is given, use the latest published GitHub release. Fetch the release metadata from `https://api.github.com/repos/dnbexperience/eufemia/releases/tags/<version>` or `/releases/latest`.
2. Use the published release body as the source of truth. Cover the user-facing entries under **Features** and include notable documentation additions when they introduce guidance developers or designers should know about. Summarize fixes in one short closing sentence instead of listing each one.
3. Describe what each highlighted item is useful for in one short sentence. Lead with the benefit, keep implementation detail only when it helps, and do not invent capabilities. When the release notes lack enough context, follow the `eufemia-release-motivations` skill and use the linked pull request descriptions to understand the motivation. Do not include internal Slack links unless the user asks for them.
4. Link each item to the most specific Eufemia documentation section. Use the associated commit's changed files to locate relevant Portal documentation when needed. Verify that the public URL returns HTTP 200 and that its exact hash exists as an `id` in the rendered page. Never invent an anchor. If no relevant documentation exists, omit the docs link rather than linking to an unrelated section.
5. Return only the copy-ready announcement. Do not publish it.

Use this shape:

```markdown
🚀 **Eufemia vX.Y.Z is out!**

- **Feature name:** Practical benefit ([docs](https://eufemia.dnb.no/path#exact-anchor)).

The release also includes ...

[See the full release notes →](https://github.com/dnbexperience/eufemia/releases/tag/vX.Y.Z)
```

Keep feature names understandable outside the pull request context. Keep the announcement concise, use sentence case, and avoid repeating the release notes verbatim.
