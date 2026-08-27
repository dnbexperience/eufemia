# Eufemia Agent Skills evaluation

These fixtures follow the Agent Skills `evals/evals.json` format while staying
outside `agent-skills/`, so evaluation data is not installed in consumer
projects or bundled into marketplace plugins.

Before releasing changed skill instructions:

1. Run every case in a fresh session with the changed skill and without it, or
   with the previous released skill as the baseline.
2. Grade every assertion with concrete evidence and record tokens and duration.
3. Run the prompts in `trigger-cases.json` without explicitly naming a skill.
4. Require every positive case to select the expected skill and every negative
   case to avoid all Eufemia skills.
5. Require the changed skill to improve or preserve assertion pass rate without
   an unexplained token or duration regression.
6. Save the generated grading, timing, benchmark, and human feedback with the
   release record. Do not commit generated evaluation workspaces.

Use the Agent Skills `skill-creator` workflow when available to run, grade, and
compare the cases. Human review remains required for accessibility, visual
quality, and whether findings are useful rather than merely present.
