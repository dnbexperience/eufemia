---
name: eufemia-release-announcement
description: Draft concise, Slack-ready announcements for Eufemia releases with practical feature benefits and verified documentation anchors. Use for announcing or summarizing a published Eufemia version, not for generating GitHub release notes or publishing messages.
---

# Eufemia Release Announcement

Create a concise, self-contained announcement that developers can copy into Slack.

- Use the requested published release, or the latest when unspecified, as the source of truth.
- Highlight user-facing features and notable new guidance. Explain the practical benefit of each in one short sentence. Summarize fixes in one closing sentence.
- When context is missing, follow the `eufemia-release-motivations` skill and inspect the linked pull requests. Do not include internal Slack links unless requested.
- Link each item to the most specific public Eufemia documentation section. Verify the URL and exact hash. Omit the link when no relevant documentation exists.
- Return only copy-ready text. Do not publish it.

Format feature entries like this:

```markdown
- **Feature name:** Practical benefit ([docs](https://eufemia.dnb.no/path#exact-anchor)).
```
