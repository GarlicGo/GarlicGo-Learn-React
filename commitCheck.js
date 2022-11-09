// Invoked on the commit-msg git hook by yorkie.

const chalk = require("chalk");
const msgPath = process.env.GIT_PARAMS;
const msg = require("fs").readFileSync(msgPath, "utf-8").trim();

const releaseRE = /^v\d/;

const commitRE =
  /^(revert: )?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps|style|Merge)(\(.+\))?: .{1,50}/;

const bindRequirements = /to #\d+/;

if (releaseRE.test(msg)) {
  console.log(`
    ${chalk.green("✔")} Release ${msg}.
  `);
} else {
  if (!commitRE.test(msg)) {
    console.log();
    console.error(
      `  ${chalk.bgRed.white(" ERROR ")} ${chalk.red(
        `invalid commit message format.`
      )}\n\n` +
        chalk.red(
          `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
        ) +
        `    ${chalk.green(`feat: add 'comments' option`)}\n` +
        `    ${chalk.green(`fix: handle events on blur (close #28)`)}\n\n` +
        chalk.red(`  See https://github.com/conventional-changelog/commitlint/#what-is-commitlint for more details.\n`)
    );
    process.exit(1);
  } else {
    console.log();
    console.log(
      `  ${chalk.bgGreen.white(" SUCCESS ")} ${chalk.green(
        `[Bind Requirements] successfully commit.`
      )}\n\n`
    );
  }
}
