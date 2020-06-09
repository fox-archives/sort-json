if (!import.meta.main) Deno.exit(0);

import { sortJsonPath } from "./src/main.ts";
import { path, fs } from "./deps.ts";

const { globToRegExp } = path;
const { walk } = fs;

const jsonFiles = walk(".", {
  match: [globToRegExp("**/*.json", {
    flags: "g",
    extended: true,
    globstar: true,
  })],
});

for await (const jsonFile of jsonFiles) {
  await sortJsonPath(jsonFile.path);
}
