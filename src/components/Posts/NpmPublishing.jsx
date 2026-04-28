import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";
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
import {
  ProjectArchitecture,
  EngineeringDecisions,
  ProjectChallenges,
  ProjectNextSteps,
} from "../BlogLayout/ProjectExplanation";

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  TertiaryHeading,
  Paragraph,
  Strong,
  TextLink,
  TextList,
  TextListItem,
  InlineHighlight,
} from "../Typography/Typography";

// icons
import { NpmSVG, JavascriptSVG } from "../../resources/styles/icons";

const repoUrl = "https://github.com/heyitsmeharv/architexter";
const npmUrl = "https://www.npmjs.com/package/architexter";

const packageJsonSnippet = `{
  "name": "architexter",
  "version": "0.0.4",
  "description": "Turn indented text outlines into flow, tree, branch, and React diagrams.",
  "type": "module",
  "main": "./dist/index.js",
  "exports": {
    ".": {
      "import": "./dist/index.js"
    },
    "./react": {
      "import": "./dist/react/index.js"
    }
  },
  "files": [
    "dist/index.js",
    "dist/react/index.js",
    "src",
    "examples",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "rollup -c",
    "test": "npm run build && node tests/smoke.test.js",
    "prepack": "npm run test",
    "release": "commit-and-tag-version"
  },
  "peerDependencies": {
    "react": ">=18",
    "styled-components": ">=5"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    },
    "styled-components": {
      "optional": true
    }
  }
}`;

const rollupConfig = `export default [
  {
    input: "src/index.js",
    output: { file: "dist/index.js", format: "es" },
    external: ["react", "styled-components"],
  },
  {
    input: "src/react/index.js",
    output: { file: "dist/react/index.js", format: "es" },
    external: ["react", "styled-components"],
  },
];`;

const publishFlow = `# 1. make sure you're logged in
npm login

# 2. dry run - see exactly what will be included in the package
npm pack --dry-run

# 3. publish
npm publish

# 4. verify it landed
npm info architexter`;

const installSnippet = `# runtime dependency — saved under "dependencies"
npm install architexter

# development-only — saved under "devDependencies"
npm install --save-dev architexter`;

const moduleStructure = `architexter
  src
    index.js
      (parser and renderers)
    react
      index.js
        (React component wrapper)
  dist
    index.js
      (built output - what npm ships)
    react
      index.js
  tests
    smoke.test.js
  examples
    basic.js`;

const designDecisions = [
  {
    title: "Rollup over other bundlers",
    body: `Rollup produces clean, readable output for library builds - no runtime wrapper, no injected module boilerplate. It also handles the external peer dependencies naturally: you mark react and styled-components as external and Rollup leaves them as bare imports rather than bundling them in. That keeps the package small and avoids version conflicts in consumer projects.`,
  },
  {
    title: "Peer dependencies, not hard dependencies",
    body: `React and styled-components are listed as peer dependencies because the React renderer is optional - the core parsing and rendering functions work without React at all. Declaring them as peers means npm warns the consumer if they're missing, rather than silently installing a second copy of React next to the one the consumer already has.`,
  },
  {
    title: "prepack over prepublish",
    body: `The build and test run under prepack rather than prepublish. The distinction matters: prepublish also runs on npm install in older npm versions, which means your build step fires in unexpected places. prepack runs only when you're actually packing the tarball - before npm publish or npm pack.`,
  },
];

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const NpmPublishing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/publishing-an-npm-package");
    Analytics.track("blog_page_viewed", {
      slug: "publishing-an-npm-package",
    });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Publishing an npm Package</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <NpmSVG />
            </HeaderIcon>
            <HeaderIcon>
              <JavascriptSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          I've dabbled with publishing packages to npm in the past and I have
          most recently done so for{" "}
          <TextLink href={repoUrl} target="_blank" rel="noreferrer">
            architexter
          </TextLink>
          , a small package I use across this portfolio to render text outlines
          as ASCII diagrams. I thought that it would make for an okay blog post
          to walk through - as I'm definitely not running out of blogging ideas!
        </Paragraph>

        <ProjectArchitecture
          archOutline={moduleStructure}
          type="tree"
          summary="architexter has two entry points: the core index.js which exports parsing and rendering functions, and a react/index.js which adds an optional React component. Both compile to a dist/ folder which is what npm ships."
        />

        <SectionHeading>Setting Up the npm Account</SectionHeading>

        <Paragraph>
          Create an account at{" "}
          <TextLink
            href="https://www.npmjs.com"
            target="_blank"
            rel="noreferrer"
          >
            npmjs.com
          </TextLink>{" "}
          if you don't have one. Then authenticate on the CLI:
        </Paragraph>

        <CodeBlockWithCopy code={`npm login`} />

        <Paragraph>
          npm needs to verify that you own the package before it will accept a
          publish. Without that check, anyone could overwrite your package with
          malicious code. The mechanism it uses is an{" "}
          <Strong>access token</Strong> - a long random string that represents a
          trusted session tied to your npm account.
        </Paragraph>

        <Paragraph>
          Running <InlineHighlight>npm login</InlineHighlight> opens a browser
          window where you complete the login on npmjs.com (including 2FA if you
          have it enabled). Once you authorize the CLI, npm's servers generate a
          new token and hand it back to the terminal, which writes it into your{" "}
          <InlineHighlight>~/.npmrc</InlineHighlight> file on a line that looks
          like:
        </Paragraph>

        <CodeBlockWithCopy
          code={`//registry.npmjs.org/:_authToken=npm_xxxxxxxxxxxxxxxxxxxx`}
        />

        <Paragraph>
          Every subsequent <InlineHighlight>npm publish</InlineHighlight> reads
          that token from <InlineHighlight>~/.npmrc</InlineHighlight> and sends
          it as a header to the registry, which checks it against your account
          before accepting the upload. You only need to log in once per machine,
          or when the token expires or is revoked.
        </Paragraph>

        <TertiaryHeading>Scoped Packages and Access Levels</TertiaryHeading>

        <Paragraph>
          A <Strong>scope</Strong> is the{" "}
          <InlineHighlight>@name/</InlineHighlight> prefix before a package
          name. It namespaces the package so you can use a name that might
          already be taken unscoped, and it makes ownership obvious at a glance.
        </Paragraph>

        <Paragraph>
          You don't need an organization to use one. Your npm username is
          automatically a valid scope, so{" "}
          <InlineHighlight>@yourname/package-name</InlineHighlight> works out of
          the box. If you want to publish under an org scope (e.g.{" "}
          <InlineHighlight>@quiet-ly/package-name</InlineHighlight>) you need to
          be a member of that org on npmjs.com first - otherwise the registry
          will reject the publish.
        </Paragraph>

        <Paragraph>
          The catch with scoped packages is that npm assumes they're{" "}
          <Strong>private</Strong> by default, because orgs often use scopes to
          gate internal packages. If you're publishing publicly you have to opt
          out of that assumption on the first publish:
        </Paragraph>

        <CodeBlockWithCopy code={`npm publish --access public`} />

        <Paragraph>
          You only need the flag once as npm remembers the access level for
          subsequent publishes.
        </Paragraph>

        <SectionHeading>package.json: The Fields That Matter</SectionHeading>

        <Paragraph>
          Most of the important decisions about how your package behaves for
          consumers live in package.json. Here's what architexter's looks like:
        </Paragraph>

        <CodeBlockWithCopy code={packageJsonSnippet} />

        <SubSectionHeading>name and version</SubSectionHeading>

        <Paragraph>
          The name must be unique on npm. Before you settle on one, check with{" "}
          <InlineHighlight>npm info your-package-name</InlineHighlight> - if it
          returns anything, the name is taken.
        </Paragraph>

        <SubSectionHeading>type: "module"</SubSectionHeading>

        <Paragraph>
          Setting <InlineHighlight>"type": "module"</InlineHighlight> tells Node
          to treat every <InlineHighlight>.js</InlineHighlight> file in the
          package as an ES module. Without it, Node defaults to CommonJS, which
          means you'd need to use <InlineHighlight>require()</InlineHighlight>{" "}
          instead of <InlineHighlight>import</InlineHighlight>. For new packages
          today, ESM is the right choice.
        </Paragraph>

        <SubSectionHeading>exports</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>exports</InlineHighlight> field is the modern way
          to declare what your package exposes. It supersedes{" "}
          <InlineHighlight>main</InlineHighlight> entirely - if{" "}
          <InlineHighlight>exports</InlineHighlight> is present, Node ignores{" "}
          <InlineHighlight>main</InlineHighlight>. The{" "}
          <InlineHighlight>"."</InlineHighlight> entry is the default import
          path and <InlineHighlight>"./react"</InlineHighlight> makes the React
          component available at{" "}
          <InlineHighlight>architexter/react</InlineHighlight> without any
          special configuration on the consumer side.
        </Paragraph>

        <SubSectionHeading>files</SubSectionHeading>

        <Paragraph>
          By default npm would ship everything in your repo. The{" "}
          <InlineHighlight>files</InlineHighlight> field inverts that: you
          declare exactly what to include. For architexter that means the
          compiled dist output, the original src (for anyone who wants to read
          it), examples, the README, and the LICENSE. Tests, build config, and
          dev scripts are excluded.
        </Paragraph>

        <SubSectionHeading>peerDependencies</SubSectionHeading>

        <Paragraph>
          React and styled-components are listed as peer dependencies rather
          than regular dependencies. They're optional because the core parsing
          and rendering functions don't use React at all - only the{" "}
          <InlineHighlight>architexter/react</InlineHighlight> entry point does.
          Declaring them as peers means npm warns consumers if they're missing,
          rather than quietly installing a second copy of React alongside the
          one they already have. The{" "}
          <InlineHighlight>peerDependenciesMeta</InlineHighlight> section marks
          them optional so npm doesn't warn consumers who only use the non-React
          entry point.
        </Paragraph>

        <SectionHeading>Building with Rollup</SectionHeading>

        <Paragraph>
          The source lives in <InlineHighlight>src/</InlineHighlight> and gets
          compiled to <InlineHighlight>dist/</InlineHighlight> before
          publishing. Rollup is a good fit for library builds because it
          produces clean output with no runtime wrapper and handles the external
          peer dependencies cleanly.
        </Paragraph>

        <CodeBlockWithCopy code={rollupConfig} />

        <Paragraph>
          The two entries mirror the two export paths. The{" "}
          <InlineHighlight>external</InlineHighlight> array tells Rollup to
          leave <InlineHighlight>react</InlineHighlight> and{" "}
          <InlineHighlight>styled-components</InlineHighlight> as bare imports
          in the output rather than bundling them in. If you forget this, Rollup
          will inline entire copies of React into your dist file, bloating the
          package unnecessarily.
        </Paragraph>

        <SectionHeading>Writing Tests</SectionHeading>

        <Paragraph>
          Before publishing anything I want to know the built output actually
          works. The key principle is that the tests always import from{" "}
          <InlineHighlight>dist/</InlineHighlight>, not from{" "}
          <InlineHighlight>src/</InlineHighlight>. Running tests against source
          might pass while the build is broken — this way, if Rollup produces
          broken output, the tests catch it before anything reaches the
          registry.
        </Paragraph>

        <Paragraph>
          The test script chains build and test together so neither can be
          skipped:
        </Paragraph>

        <CodeBlockWithCopy
          code={`"test": "npm run build && node tests/smoke.test.js"`}
        />

        <SectionHeading>The prepack Hook</SectionHeading>

        <Paragraph>
          npm has a set of lifecycle hooks that run automatically around certain
          commands. <InlineHighlight>prepack</InlineHighlight> runs before{" "}
          <InlineHighlight>npm publish</InlineHighlight> and before{" "}
          <InlineHighlight>npm pack</InlineHighlight>. Wiring the tests to it
          means there's no way to publish a broken package - the publish will
          abort if the build or tests fail.
        </Paragraph>

        <CodeBlockWithCopy code={`"prepack": "npm run test"`} />

        <Banner title="prepublish vs prepack" variant="info">
          <Paragraph>
            Older guides use <InlineHighlight>prepublish</InlineHighlight> for
            this, but in earlier versions of npm it also ran on{" "}
            <InlineHighlight>npm install</InlineHighlight>, which caused builds
            to fire unexpectedly. <InlineHighlight>prepack</InlineHighlight>{" "}
            only runs when you're actually creating the package tarball, which
            is the behaviour I want.
          </Paragraph>
        </Banner>

        <SectionHeading>Publishing</SectionHeading>

        <Paragraph>
          Before publishing for real, do a dry run to see exactly what files
          will be included in the tarball:
        </Paragraph>

        <CodeBlockWithCopy code={publishFlow} />

        <Paragraph>
          The <InlineHighlight>npm pack --dry-run</InlineHighlight> output is
          worth reviewing carefully on first publish. It's easy to accidentally
          include <InlineHighlight>.env</InlineHighlight> files, large test
          fixtures, or generated files you didn't intend to ship. If you see
          anything unexpected, update the{" "}
          <InlineHighlight>files</InlineHighlight> field and run it again before
          committing.
        </Paragraph>

        <Paragraph>Once that looks right, publish:</Paragraph>

        <CodeBlockWithCopy code={`npm publish`} />

        <Paragraph>
          That's it. prepack fires, the build runs, the tests run, and if
          everything passes the package is uploaded to the registry. The first
          publish creates the package page at{" "}
          <TextLink href={npmUrl} target="_blank" rel="noreferrer">
            npmjs.com/package/architexter
          </TextLink>
          .
        </Paragraph>

        <SectionHeading>Installing from the Registry</SectionHeading>

        <Paragraph>Consumers install the package with:</Paragraph>

        <CodeBlockWithCopy code={installSnippet} />

        <Paragraph>
          The difference between the two comes down to when the package is
          actually needed. npm splits dependencies into two buckets in
          package.json:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>dependencies</Strong> — packages your code needs to run. If
            someone installs your app in production, these get installed too.
            Examples: React, a date formatting library, a HTTP client.
          </TextListItem>
          <TextListItem>
            <Strong>devDependencies</Strong> — packages only needed while you're
            building or testing. They're skipped in production installs to keep
            things lean. Examples: test runners, linters, bundlers like Rollup.
          </TextListItem>
        </TextList>

        <Paragraph>
          The flag you pass to <InlineHighlight>npm install</InlineHighlight>{" "}
          decides which bucket the package lands in.{" "}
          <InlineHighlight>--save-dev</InlineHighlight> (or the shorthand{" "}
          <InlineHighlight>-D</InlineHighlight>) writes it to{" "}
          <InlineHighlight>devDependencies</InlineHighlight>. Without any flag,
          it goes into <InlineHighlight>dependencies</InlineHighlight>. Where
          architexter belongs depends on how you use it - if it renders diagrams
          directly in the UI it's a runtime dependency; if it's only used in a
          build script or doc generator it's a dev dependency.
        </Paragraph>

        <SectionHeading>
          Semantic Versioning with Conventional Commits
        </SectionHeading>

        <Paragraph>
          Once the package is live, you need a consistent way to bump the
          version. I covered the full setup - commitlint, Husky hooks, and{" "}
          <InlineHighlight>commit-and-tag-version</InlineHighlight> in a
          separate post if you want to know more about how that works:{" "}
          <TextLink href="/blog/semantic-versioning-with-conventional-commits">
            Semantic Versioning with Conventional Commits
          </TextLink>
          .
        </Paragraph>

        <EngineeringDecisions decisions={designDecisions} />

        <ProjectNextSteps>
          <Paragraph>
            The thing missing from this setup is a CI workflow that publishes
            automatically. Right now publishing is a manual step on my machine.
            The natural improvement would be a GitHub Actions workflow that runs
            on a version tag push and calls{" "}
            <InlineHighlight>npm publish</InlineHighlight> with a token stored
            as a secret. That removes the dependency on my local environment and
            makes the release process reproducible.
          </Paragraph>
        </ProjectNextSteps>

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          The actual mechanics of publishing are straightforward - create an
          account, fill in package.json correctly, run npm publish. The part
          worth spending time on is the surrounding guardrails: a build step
          that compiles to a clean dist, tests that run against the built output
          rather than the source, prepack to make those tests mandatory, and a
          versioning workflow that keeps the changelog legible.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href={repoUrl} target="_blank" rel="noreferrer">
              github.com/heyitsmeharv/architexter
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href={npmUrl} target="_blank" rel="noreferrer">
              npmjs.com/package/architexter
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default NpmPublishing;
