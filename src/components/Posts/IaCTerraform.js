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
} from '../BlogLayout/BlogLayout';

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
import { TerraformSVG } from '../../resources/styles/icons';

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const verifyTerraform = `terraform version`;

const terraformFolderTree = `repo/
  .github/
    workflows/

  infra/
    env/
      dev/
        env.tfvars
        main.tf
        outputs.tf
        providers.tf
        variables.tf

    modules/
      README.md
      <module-name>/
        main.tf
        outputs.tf
        providers.tf
        variables.tf

    scripts/
      fmt.sh
      validate.sh
      plan.sh
      apply.sh

  .gitignore
  package.json
  README.md`;

const IaCTerraform = () => {
  useEffect(() => {
    Analytics.event('blog_opened', { slug: 'infrastructure-as-code-with-terraform' });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>Infrastructure as Code (IaC) with Terraform</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <TerraformSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post, we're going to build a Terraform template repo and work through the core workflow (init, plan, apply).
          We'll cover how to structure a project sensibly, and how to take the same setup from local development into CI and
          multiple environments.
        </Paragraph>

        <Paragraph>
          We'll start by organising the repo in a way that's easy to understand, then introduce Terraform concepts as they become relevant.
        </Paragraph>

        <Paragraph>
          Here is a link to the boilerplate that works locally and sets you up nicely for CI and multiple environments - <TextLink
            href="https://github.com/heyitsmeharv/template-terraform-boilerplate"
            target="_blank"
            rel="noreferrer"
          >
            template-terraform-boilerplate
          </TextLink>
        </Paragraph>

        <SectionHeading>What is Terraform?</SectionHeading>

        <Paragraph>
          Terraform is an <Strong>Infrastructure as Code</Strong> tool. It's how teams create repeatable environments,
          manage changes safely, and keep infrastructure consistent across accounts and regions.
        </Paragraph>

        <SectionHeading>Install Terraform (and verify)</SectionHeading>

        <Paragraph>
          Terraform is distributed as a single CLI tool. The easiest way to install it is usually through your system package manager, but you can also
          download the binary directly if you prefer.
        </Paragraph>

        <Paragraph>
          If you want the most up-to-date steps for your OS, these are the official docs I'd follow:
          {" "}
          <TextLink
            href="https://developer.hashicorp.com/terraform/install"
            target="_blank"
            rel="noreferrer"
          >
            Terraform install page
          </TextLink>
          {" "}
          and
          {" "}
          <TextLink
            href="https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli"
            target="_blank"
            rel="noreferrer"
          >
            Install Terraform CLI tutorial
          </TextLink>
          .
        </Paragraph>

        <SubSectionHeading>Verify the CLI is working</SubSectionHeading>
        <Paragraph>
          Once Terraform is installed, run the commands below. If they work, you're ready to move on.
        </Paragraph>

        <CodeBlockWithCopy code={verifyTerraform} />

        <SectionHeading>Repository Structure</SectionHeading>

        <Paragraph>
          Before we write any Terraform, we're going to agree on a structure that stays easy to navigate as the project grows. Everything Terraform-related
          lives under <InlineHighlight>infra/</InlineHighlight>, so the rest of the repo (app code, docs, tooling) can evolve independently.
        </Paragraph>

        <Paragraph>
          This layout separates two concerns: <Strong>environment roots</Strong> (where we actually run Terraform) and <Strong>modules</Strong> (reusable
          building blocks). That separation is what keeps your repo from turning into one huge folder of copy/paste.
        </Paragraph>

        <SubSectionHeading>High-level layout</SubSectionHeading>
        <CodeBlockWithCopy code={terraformFolderTree} />

        <SubSectionHeading>.github/workflows/</SubSectionHeading>
        <Paragraph>
          This is where your CI workflow lives. Later on, we'll add a workflow that runs <InlineHighlight>terraform fmt</InlineHighlight>,{" "}
          <InlineHighlight>validate</InlineHighlight> and <InlineHighlight>plan</InlineHighlight> on pull requests, and only runs{" "}
          <InlineHighlight>apply</InlineHighlight> on merges to main. Keeping workflows next to the code makes your infrastructure changes reviewable and
          repeatable.
        </Paragraph>

        <SubSectionHeading>infra/env/</SubSectionHeading>
        <Paragraph>
          Each folder under <InlineHighlight>infra/env/</InlineHighlight> is a deployable Terraform root. This is the folder you{" "}
          <Strong>cd into</Strong> when you run Terraform commands for that environment.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>main.tf</Strong> is the entry point. It wires together modules and resources into something deployable. In a boilerplate repo, this
            should stay readable — more orchestration, less heavy logic.
          </TextListItem>
          <TextListItem>
            <Strong>variables.tf</Strong> defines the inputs this environment expects. Typed variables make intent clearer and help catch mistakes early.
          </TextListItem>
          <TextListItem>
            <Strong>env.tfvars</Strong> holds the environment-specific values (dev vs prod). Keeping these values separate makes it obvious what actually
            changes between environments.
          </TextListItem>
          <TextListItem>
            <Strong>providers.tf</Strong> configures the provider(s) Terraform will use (AWS, GitHub, etc.). Keeping this in the environment root makes it
            clear which region/account/context you're operating in.
          </TextListItem>
          <TextListItem>
            <Strong>outputs.tf</Strong> exposes the useful results (URLs, IDs, ARNs) so you're not digging through state files or consoles to find what was
            created.
          </TextListItem>
        </TextList>

        <Paragraph>
          You'll sometimes see <InlineHighlight>backend.tf</InlineHighlight> or <InlineHighlight>versions.tf</InlineHighlight> here as well. We'll add
          those once we introduce remote state and version pinning — but the structure already has a clear place for them.
        </Paragraph>

        <SubSectionHeading>infra/modules/</SubSectionHeading>
        <Paragraph>
          Modules are reusable pieces of infrastructure you can wire together from an environment root. If an environment folder starts to feel like a
          long list of resources, that's usually your cue to extract a module.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>main.tf</Strong> contains the module's resources.
          </TextListItem>
          <TextListItem>
            <Strong>variables.tf</Strong> defines what the module needs from the outside world.
          </TextListItem>
          <TextListItem>
            <Strong>outputs.tf</Strong> defines what the module returns so other parts of the system can connect to it cleanly.
          </TextListItem>
          <TextListItem>
            <Strong>README.md</Strong> is worth having even for internal modules. A short “what it creates” + “inputs/outputs” saves you time later.
          </TextListItem>
        </TextList>

        <Paragraph>
          You included <InlineHighlight>providers.tf</InlineHighlight> inside the module template. That can be useful when you need provider aliases or
          multiple provider configurations, but for most modules the provider configuration is inherited from the environment root. We can keep it in the
          template if it matches how you like to work, and only use it when it's genuinely needed.
        </Paragraph>

        <SubSectionHeading>infra/scripts/</SubSectionHeading>
        <Paragraph>
          These are convenience scripts to keep commands consistent across machines and CI. They're optional, but they help reduce “works on my laptop”
          differences — especially once you introduce multiple environments and additional tooling.
        </Paragraph>

        <Paragraph>
          The main idea is that whether you're working locally or in CI, you're running the same handful of steps in the same order:{" "}
          <InlineHighlight>fmt</InlineHighlight> → <InlineHighlight>validate</InlineHighlight> → <InlineHighlight>plan</InlineHighlight> →{" "}
          <InlineHighlight>apply</InlineHighlight>.
        </Paragraph>

        <SubSectionHeading>Repo-level files</SubSectionHeading>
        <Paragraph>
          <Strong>.gitignore</Strong> should exclude <InlineHighlight>.terraform/</InlineHighlight>, state files, and plan files so you never commit
          sensitive or noisy artifacts.
        </Paragraph>
        <Paragraph>
          <Strong>README.md</Strong> becomes your “how to run this repo” entry point: what it deploys, how environments work, and the basic commands.
        </Paragraph>
        <Paragraph>
          <Strong>package.json</Strong> is optional, but if you're already using Node tooling for your projects it can be a nice place to standardise
          scripts (for example: running Terraform scripts, formatting, linting, and CI helpers) in one familiar interface.
        </Paragraph>


      </AnimatedPostContainer>
    </PageWrapper >
  );
}

export default IaCTerraform;
