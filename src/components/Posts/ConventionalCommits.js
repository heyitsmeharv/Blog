import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// components
import BackButton from "../Button/BackButton";
import { CodeBlockWithCopy } from "../Code/Code";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from "../BlogLayout/BlogLayout";

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  Paragraph,
  Strong,
  TextLink,
  TextList,
  TextListItem,
  InlineHighlight,
  IndentedTextList,
  IndentedTextListItem,
  TertiaryHeading,
} from "../Typography/Typography";

// icons
import { ConventionalCommitsSVG, GitHubSVG } from "../../resources/styles/icons";

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const initProject = `npm init -y`;

const installTooling = `npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional commit-and-tag-version`;

const installPrettierOptional = `npm i -D prettier`;

const huskyInit = `npx husky init`;

const commitlintConfig = `// .commitlintrc.cjs
module.exports = {
  extends: ["@commitlint/config-conventional"],
};`;

const huskyCommitMsgHook = `npx --no -- commitlint --edit "$1"`;

const lintStagedPackageJson = `// package.json (add)
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}`;

const huskyPreCommitHook = `npx lint-staged`;

const scriptsPackageJson = `// package.json (add / merge)
{
  "scripts": {
    "prepare": "husky",
    "release": "commit-and-tag-version"
  }
}`;

const exampleBadCommit = `git commit -m "fix stuff"`;
const exampleGoodCommit = `git commit -m "fix: handle null response"`;

const releaseCmd = `npm run release`;
const pushTagsCmd = `git push --follow-tags origin main`;

const bodyFooterExample = `feat: update authentication flow

BREAKING CHANGE: tokens are now rotated on refresh`;

const ConventionalCommits = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "semantic-versioning-with-conventional-commits" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>Semantic Versioning with Conventional Commits</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <ConventionalCommitsSVG />
            </HeaderIcon>
            <HeaderIcon>
              <GitHubSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          I'm guilty of writing some pretty horrific commit messages in my own personal projects and that has now caught up to me!
          If your git history is the same as mine which is full of commits like <Strong>fix test</Strong>,{" "}
          <Strong>wip</Strong>, or just <Strong>fix</Strong> look no further.
        </Paragraph>

        <Paragraph>
          This post will look to set up a simple system that forces clean, consistent commit messages and turns those commits into
          reliable version bumps and changelogs. The end result is that your commit history starts looking like a professional changelog by default
          and releasing becomes a predictable, low-effort step instead of a spaghetti mess of low effort, unclear commit messages.
        </Paragraph>

        <SectionHeading>What is Semantic Versioning?</SectionHeading>

        <Paragraph>
          <Strong>Semantic Versioning</Strong> is a convention for version numbers:{" "}
          <Strong>MAJOR.MINOR.PATCH</Strong>.
          It's a contract that communicates the impact of changes to anyone using your project.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>PATCH</Strong> (<InlineHighlight>1.2.3 → 1.2.4</InlineHighlight>) for bug fixes
          </TextListItem>
          <TextListItem>
            <Strong>MINOR</Strong> (<InlineHighlight>1.2.3 → 1.3.0</InlineHighlight>) for new features that don't break existing usage
          </TextListItem>
          <TextListItem>
            <Strong>MAJOR</Strong> (<InlineHighlight>1.2.3 → 2.0.0</InlineHighlight>) for breaking changes
          </TextListItem>
        </TextList>

        <Paragraph>
          The key insight is: versioning becomes automatic and trustworthy once your commit messages follow a structured format.
          That structured format is <Strong>Conventional Commits</Strong>.
        </Paragraph>

        <SectionHeading>What are Conventional Commits?</SectionHeading>

        <Paragraph>
          Conventional Commits is a lightweight standard for commit messages. It looks like this:
        </Paragraph>

        <CodeBlockWithCopy code={`type(scope): short summary`} />

        <Paragraph>
          A few examples you'll use every day:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>feat: add profile page</InlineHighlight> (new feature)
          </TextListItem>
          <TextListItem>
            <InlineHighlight>fix(auth): handle expired token</InlineHighlight> (bug fix, scoped)
          </TextListItem>
          <TextListItem>
            <InlineHighlight>docs: update readme</InlineHighlight> (documentation)
          </TextListItem>
          <TextListItem>
            <InlineHighlight>chore(ci): bump node version</InlineHighlight> (maintenance / CI)
          </TextListItem>
        </TextList>

        <Paragraph>
          Breaking changes are explicit. You can use <InlineHighlight>!</InlineHighlight>:
        </Paragraph>

        <CodeBlockWithCopy code={`feat!: remove legacy endpoint`} />

        <Paragraph>
          Or use a body footer:
        </Paragraph>

        <CodeBlockWithCopy code={bodyFooterExample} />

        <Paragraph>
          Once commits follow this format, tools can map commit history to Semantic Versioning automatically:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            <InlineHighlight>fix</InlineHighlight> → patch bump
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>feat</InlineHighlight> → minor bump
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>breaking change</InlineHighlight> → major bump
          </IndentedTextListItem>
        </IndentedTextList>

        <SectionHeading>The Setup (Husky + commitlint + lint-staged)</SectionHeading>

        <Paragraph>
          We'll wire up two git hooks:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>commit-msg</Strong>: rejects non-conventional commit messages
          </TextListItem>
          <TextListItem>
            <Strong>pre-commit</Strong>: runs formatting/linting only on staged files
          </TextListItem>
        </TextList>

        <SubSectionHeading>1) Initialise the project</SubSectionHeading>

        <Paragraph>
          If you're adding this to an existing repo, you can skip the init step. Otherwise:
        </Paragraph>

        <CodeBlockWithCopy code={initProject} />

        <SubSectionHeading>2) Install the dev dependencies</SubSectionHeading>

        <Paragraph>
          These packages give us hooks, commit validation, staged-file formatting, and version automation:
        </Paragraph>

        <CodeBlockWithCopy code={installTooling} />

        <Paragraph>
          If you want a "batteries included" pre-commit formatter, install Prettier:
        </Paragraph>

        <CodeBlockWithCopy code={installPrettierOptional} />

        <SubSectionHeading>3) Enable Husky</SubSectionHeading>

        <Paragraph>
          Husky manages the git hooks locally so they run automatically when you commit.
        </Paragraph>

        <CodeBlockWithCopy code={huskyInit} />

        <SubSectionHeading>4) Add commitlint (commit-msg hook)</SubSectionHeading>

        <Paragraph>
          Create a commitlint config so we enforce the Conventional Commits rules.
        </Paragraph>

        <CodeBlockWithCopy code={commitlintConfig} />

        <Paragraph>
          Then add the <InlineHighlight>commit-msg</InlineHighlight> hook:
        </Paragraph>

        <CodeBlockWithCopy code={huskyCommitMsgHook} />

        <Paragraph>
          Now you get immediate feedback when a commit message isn't up to standard:
        </Paragraph>

        <CodeBlockWithCopy code={exampleBadCommit} />

        <Paragraph>
          And this passes cleanly:
        </Paragraph>

        <CodeBlockWithCopy code={exampleGoodCommit} />

        <SubSectionHeading>5) Add lint-staged (pre-commit hook)</SubSectionHeading>

        <Paragraph>
          The best "quality of life" move is to only check the files you're committing — not the entire repo.
          That's what <Strong>lint-staged</Strong> does.
        </Paragraph>

        <Paragraph>
          Add a simple lint-staged config into <InlineHighlight>package.json</InlineHighlight>:
        </Paragraph>

        <CodeBlockWithCopy code={lintStagedPackageJson} />

        <Paragraph>
          Then wire the <InlineHighlight>pre-commit</InlineHighlight> hook to run lint-staged:
        </Paragraph>

        <CodeBlockWithCopy code={huskyPreCommitHook} />

        <Paragraph>
          At this point, every commit becomes:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>format/lint staged files</IndentedTextListItem>
          <IndentedTextListItem>validate commit message format</IndentedTextListItem>
          <IndentedTextListItem>create commit</IndentedTextListItem>
        </IndentedTextList>

        <SectionHeading>Releases with commit-and-tag-version</SectionHeading>

        <Paragraph>
          Now that commit messages are predictable, we can safely automate version bumps and changelogs.{" "}
          <Strong>commit-and-tag-version</Strong> gives you a clean local workflow: bump the version, generate/update the changelog,
          and tag the release — without needing to integrate anything into CI/CD.
        </Paragraph>

        <Paragraph>
          Add a couple of scripts:
        </Paragraph>

        <CodeBlockWithCopy code={scriptsPackageJson} />

        <Paragraph>
          When you're ready to cut a release:
        </Paragraph>

        <CodeBlockWithCopy code={releaseCmd} />

        <Paragraph>
          That will:
        </Paragraph>

        <TextList>
          <TextListItem>bump the version in <Strong>package.json</Strong></TextListItem>
          <TextListItem>generate/update <Strong>CHANGELOG.md</Strong></TextListItem>
          <TextListItem>create a tag like <Strong>v1.3.0</Strong></TextListItem>
        </TextList>

        <Paragraph>
          Push the commit and tags:
        </Paragraph>

        <CodeBlockWithCopy code={pushTagsCmd} />

        <SectionHeading>Example Commits</SectionHeading>

        <Paragraph>
          Once this is in place, the "professional commit history" happens almost automatically.
          Your job is just to pick the right commit type.
        </Paragraph>

        <TertiaryHeading>Most-used commit types</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>feat</Strong>: feature work (minor version bump)
          </TextListItem>
          <TextListItem>
            <Strong>fix</Strong>: bug fixes (patch version bump)
          </TextListItem>
          <TextListItem>
            <Strong>chore</Strong>: maintenance (deps, tooling, configs)
          </TextListItem>
          <TextListItem>
            <Strong>docs</Strong>: docs and comments
          </TextListItem>
          <TextListItem>
            <Strong>ci</Strong>: pipeline/workflow changes
          </TextListItem>
          <TextListItem>
            <Strong>refactor</Strong>: non-functional code improvements
          </TextListItem>
        </TextList>

        <Paragraph>
          If you're unsure, default to <InlineHighlight>chore</InlineHighlight> for maintenance and{" "}
          <InlineHighlight>feat</InlineHighlight>/<InlineHighlight>fix</InlineHighlight> for product-facing changes.
        </Paragraph>

        <SectionHeading>Optional: quality-of-life extensions</SectionHeading>

        <Paragraph>
          Everything up to this point is the core system: your commits are enforced, your history stays clean, and releases can be generated from those commits.
          If you want to go one step further, there are a couple of optional tools that builds upon the above:
        </Paragraph>

        <SubSectionHeading>Interactive commit prompts</SubSectionHeading>

        <Paragraph>
          Tools like <Strong>cz-git</Strong> and <Strong>Commitizen</Strong> add an interactive prompt that asks a few questions and generates a valid
          Conventional Commit for you.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="https://github.com/Zhengqbbb/cz-git" target="_blank" rel="noreferrer">
              cz-git
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="https://github.com/commitizen/cz-cli" target="_blank" rel="noreferrer">
              Commitizen (cz-cli)
            </TextLink>
          </TextListItem>
        </TextList>

        <SubSectionHeading>Customising commitlint rules</SubSectionHeading>

        <Paragraph>
          In this post we use the standard Conventional Commits ruleset, which is enough for most repos. But commitlint can be tuned if you want to enforce
          conventions, for example: only allowing certain commit types, enforcing scope naming, or setting a subject line length limit so your history stays readable.
        </Paragraph>

        <Paragraph>
          If you want to see the full set of options, commitlint's configuration docs and rule reference are the best starting point:
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="https://github.com/conventional-changelog/commitlint#config" target="_blank" rel="noreferrer">
              commitlint config
            </TextLink>
          </TextListItem>
        </TextList>

        <SubSectionHeading>Deeper changelog tooling</SubSectionHeading>

        <Paragraph>
          You don't need to touch this directly if you're using commit-and-tag-version, but if you're curious what sits underneath, the conventional-changelog
          ecosystem is what turns Conventional Commits into structured changelog entries.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="https://github.com/conventional-changelog/conventional-changelog" target="_blank" rel="noreferrer">
              conventional-changelog
            </TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading>References</SectionHeading>

        <Paragraph>
          If you want to go deeper, these are the docs:
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="https://www.conventionalcommits.org/" target="_blank" rel="noreferrer">
              Conventional Commits
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="https://semver.org/" target="_blank" rel="noreferrer">
              Semantic Versioning
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="https://typicode.github.io/husky/" target="_blank" rel="noreferrer">
              Husky
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="https://github.com/absolute-version/commit-and-tag-version" target="_blank" rel="noreferrer">
              commit-and-tag-version
            </TextLink>
          </TextListItem>
        </TextList>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default ConventionalCommits;
