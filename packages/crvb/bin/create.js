#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import degit from "degit";
import { blue, cyan, dim, green, red, yellow } from "kolorist";
import prompts from "prompts";

const TEMPLATE_REPO = "singhAmandeep007/react-vite-boilerplate#main";

const toKebabCase = (input) =>
  input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const run = (command, args, cwd) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", cwd, shell: process.platform === "win32" });
    child.on("error", reject);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`))));
  });

const cleanTemplateArtifacts = async (targetDir) => {
  const pathsToRemove = [".git", ".changeset", "packages", ".github/workflows/release.yml"];

  for (const relativePath of pathsToRemove) {
    await rm(path.join(targetDir, relativePath), { recursive: true, force: true });
  }
};

const updatePackageName = async (targetDir, packageName) => {
  const pkgPath = path.join(targetDir, "package.json");
  const content = await readFile(pkgPath, "utf8");
  const pkg = JSON.parse(content);

  pkg.name = packageName;
  delete pkg.private;
  delete pkg.workspaces;
  delete pkg.scripts?.changeset;
  delete pkg.scripts?.["version:packages"];
  delete pkg.scripts?.release;
  delete pkg.devDependencies?.["@changesets/cli"];

  await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
};

async function main() {
  const rawArg = process.argv[2];

  if (rawArg === "--help" || rawArg === "-h") {
    console.log("Usage: npx crvb@latest <project-name>");
    console.log("Example: npx crvb@latest my-app");
    process.exit(0);
  }

  const argTarget = rawArg && !rawArg.startsWith("-") ? rawArg : undefined;

  const response = await prompts(
    [
      {
        type: argTarget ? null : "text",
        name: "target",
        message: "Project directory:",
        initial: "my-react-app",
      },
      {
        type: "select",
        name: "packageManager",
        message: "Install dependencies with:",
        choices: [
          { title: "npm", value: "npm" },
          { title: "pnpm", value: "pnpm" },
          { title: "yarn", value: "yarn" },
          { title: "skip", value: "skip" },
        ],
        initial: 0,
      },
      {
        type: "toggle",
        name: "initGit",
        message: "Initialize a fresh git repository?",
        initial: true,
        active: "yes",
        inactive: "no",
      },
    ],
    {
      onCancel: () => {
        console.log(yellow("\nCancelled."));
        process.exit(1);
      },
    }
  );

  const target = argTarget || response.target;
  const targetDir = path.resolve(process.cwd(), target);
  const packageName = toKebabCase(path.basename(targetDir));

  if (!target || !packageName) {
    console.error(red("Invalid target directory."));
    process.exit(1);
  }

  if (existsSync(targetDir)) {
    const overwrite = await prompts({
      type: "confirm",
      name: "ok",
      message: `Directory ${cyan(target)} already exists. Continue if empty?`,
      initial: false,
    });

    if (!overwrite.ok) {
      process.exit(1);
    }
  } else {
    await mkdir(targetDir, { recursive: true });
  }

  console.log(dim(`\nScaffolding from ${TEMPLATE_REPO}...`));

  try {
    const emitter = degit(TEMPLATE_REPO, {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(targetDir);
    await cleanTemplateArtifacts(targetDir);
    await updatePackageName(targetDir, packageName);

    if (response.initGit) {
      await run("git", ["init"], targetDir);
    }

    if (response.packageManager !== "skip") {
      const installArgs = response.packageManager === "yarn" ? [] : ["install"];
      await run(response.packageManager, installArgs, targetDir);
    }

    console.log(green("\nSuccess! Project ready."));
    console.log(`${blue("Next steps:")}`);
    console.log(`  ${cyan(`cd ${target}`)}`);
    console.log(`  ${cyan("npm run dev")}`);
  } catch (error) {
    console.error(red("\nFailed to scaffold project."));
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
