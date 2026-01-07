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

const verifyTf = `terraform version`;

const terraformFolderTree = `template-terraform-boilerplate/
├─ .github/
│  └─ workflows/
│     └─ terraform.yml
├─ infra/
│  ├─ env/
│  │  └─ dev/
│  │     ├─ env.tfvars
│  │     ├─ main.tf
│  │     ├─ outputs.tf
│  │     ├─ providers.tf
│  │     ├─ variables.tf
│  │     └─ backend.tf
│  ├─ modules/
│  │  └─ <module-name>/
│  │     ├─ main.tf
│  │     ├─ outputs.tf
│  │     └─ variables.tf
│  └─ scripts/
│     ├─ fmt.sh
│     ├─ validate.sh
│     ├─ plan.sh
│     ├─ apply.sh
│     ├─ use-env.sh
│     └─ whoami.sh
├─ .gitignore
├─ package.json
└─ README.md`;

const envMainTf = `/*
main.tf (environment root)
- This is the deployable entry point for an environment (dev/prod).
- Keep it readable: wire modules together, pass variables, expose outputs.
*/

module "example_bucket" {
  source = "../../modules/example-s3-bucket"

  project     = var.project
  environment = var.environment

  # Example input for the module
  bucket_suffix = "uploads"
}`;

const envVariablesTf = `/*
variables.tf (environment root)
- Defines the inputs this environment expects.
- Types + descriptions make usage obvious and reduce mistakes.
*/

variable "project" {
  type        = string
  description = "Project name used for naming/tagging."
}

variable "environment" {
  type        = string
  description = "Environment name (e.g., dev, prod)."

  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "environment must be one of: dev, prod"
  }
}

variable "aws_region" {
  type        = string
  description = "AWS region to deploy into."
  default     = "eu-west-2"
}`;

const envTfvars = `/*
env.tfvars (environment root)
- Environment-specific values for this root (dev/prod).
- Keeps main.tf identical across environments.
- Values here should be easy to diff between dev and prod.
*/

project     = "template-terraform-boilerplate"
environment = "dev"
aws_region  = "eu-west-2"`;


const envProvidersTf = `/*
providers.tf (environment root)
- Configures provider(s) used by this environment.
- Makes the deployment context explicit (region/account/role).
- Providers are configured at the root and inherited by modules.
*/

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}`;


const envOutputsTf = `/*
outputs.tf (environment root)
- Outputs are the values you want to quickly grab after apply.
- Think: URLs, IDs, ARNs, bucket names, etc.
*/

output "uploads_bucket_name" {
  description = "Name of the uploads S3 bucket."
  value       = module.example_bucket.bucket_name
}`;


const envBackendTf = `/*
backend.tf (environment root)
- Controls where Terraform state is stored.
- Remote state is what allows CI and teams to work safely:
  everyone reads/writes the same state, and locking prevents collisions.

Notes:
- Backends are configured in a terraform { backend ... } block.
*/

terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "template-terraform-boilerplate/dev/terraform.tfstate"
    region         = "eu-west-2"

    # Prevent two applies running at once:
    dynamodb_table = "terraform-state-locks"

    # Encrypt state at rest (SSE-S3 by default)
    encrypt        = true
  }
}`;

const moduleMainTf = `/*
main.tf (module)
- Modules are reusable building blocks.
- Keep modules focused: one responsibility, clear inputs/outputs.
*/

resource "aws_s3_bucket" "this" {
  bucket = "\${var.project}-\${var.environment}-\${var.bucket_suffix}"
}`;

const moduleVariablesTf = `/*
variables.tf (module)
- Inputs required by the module.
- Keep them minimal and well-described.
*/

variable "project" {
  type        = string
  description = "Project name used for naming/tagging."
}

variable "environment" {
  type        = string
  description = "Environment name (dev/prod)."
}

variable "bucket_suffix" {
  type        = string
  description = "Suffix used to build the bucket name (e.g., uploads)."
}`;

const moduleOutputsTf = `/*
outputs.tf (module)
- Outputs are how other parts of the system connect to this module.
*/

output "bucket_name" {
  description = "Name of the S3 bucket created by this module."
  value       = aws_s3_bucket.this.bucket
}`;

const scriptFmt = `#!/usr/bin/env bash
set -euo pipefail

# fmt.sh
# - Formats Terraform code under infra/ recursively.
# - Keeps diffs clean and matches what CI enforces.
#
# Usage:
#   infra/scripts/fmt.sh

ROOT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

terraform fmt -recursive
echo "✅ fmt complete"`;


const scriptValidate = `#!/usr/bin/env bash
set -euo pipefail

# validate.sh
# - Local quality gate (CI-like) for an environment.
# - Includes linting checks:
#   1) terraform fmt -check (style gate, does not modify files)
#   2) terraform validate (syntax + internal consistency)
#   3) tflint (provider-aware linting)
#
# Usage:
#   infra/scripts/validate.sh dev
#   infra/scripts/validate.sh prod
#
# Install tflint:
#   https://github.com/terraform-linters/tflint

ENVIRONMENT="\${1:-dev}"
ROOT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")/.." && pwd)"
ENV_DIR="$ROOT_DIR/env/$ENVIRONMENT"

if [ ! -d "$ENV_DIR" ]; then
  echo "❌ Environment folder not found: $ENV_DIR"
  echo "Usage: infra/scripts/validate.sh dev|prod"
  exit 1
fi

echo "🧪 Validate (fmt check → terraform validate → tflint)"
echo "ℹ️  Env: $ENVIRONMENT"
echo ""

echo "→ terraform fmt (check)"
cd "$ROOT_DIR"
terraform fmt -recursive -check
echo "✅ fmt check passed"
echo ""

echo "→ terraform validate"
cd "$ENV_DIR"
terraform init -backend=false -input=false >/dev/null
terraform validate
echo "✅ terraform validate passed"
echo ""

echo "→ tflint"
if ! command -v tflint >/dev/null 2>&1; then
  echo "❌ tflint is not installed"
  echo "Install: https://github.com/terraform-linters/tflint"
  exit 1
fi

cd "$ROOT_DIR"
tflint --recursive
echo "✅ tflint passed"
echo ""

echo "🎉 validate complete for env: $ENVIRONMENT"`;

const scriptPlan = `#!/usr/bin/env bash
set -euo pipefail

# plan.sh
# - Creates a plan for a chosen environment.
# - Uses env.tfvars to supply environment values.
# - Outputs a tfplan file so apply uses an exact, reviewed plan.
#
# Usage:
#   infra/scripts/plan.sh dev
#   infra/scripts/plan.sh prod

ENVIRONMENT="\${1:-dev}"
ROOT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")/.." && pwd)"
ENV_DIR="$ROOT_DIR/env/$ENVIRONMENT"

if [ ! -d "$ENV_DIR" ]; then
  echo "❌ Environment folder not found: $ENV_DIR"
  echo "Usage: infra/scripts/plan.sh dev|prod"
  exit 1
fi

echo "🧾 Plan"
echo "ℹ️  Env: $ENVIRONMENT"
echo ""

cd "$ENV_DIR"

terraform init -input=false

terraform plan -input=false \\
  -var-file="env.tfvars" \\
  -out="tfplan"

echo "✅ plan complete for env: $ENVIRONMENT"
echo "ℹ️  Plan saved to: $ENV_DIR/tfplan"`;

const scriptApply = `#!/usr/bin/env bash
set -euo pipefail

# apply.sh
# - Applies a previously generated plan file (tfplan).
# - Avoids "surprise applies" and matches a safer CI pattern.
#
# Usage:
#   infra/scripts/apply.sh dev
#   infra/scripts/apply.sh prod

ENVIRONMENT="\${1:-dev}"
ROOT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")/.." && pwd)"
ENV_DIR="$ROOT_DIR/env/$ENVIRONMENT"

if [ ! -d "$ENV_DIR" ]; then
  echo "❌ Environment folder not found: $ENV_DIR"
  echo "Usage: infra/scripts/apply.sh dev|prod"
  exit 1
fi

echo "🚀 Apply"
echo "ℹ️  Env: $ENVIRONMENT"
echo ""

cd "$ENV_DIR"

if [ ! -f "tfplan" ]; then
  echo "❌ No tfplan found in $ENV_DIR"
  echo "Run: infra/scripts/plan.sh $ENVIRONMENT"
  exit 1
fi

terraform apply -input=false "tfplan"
echo "✅ apply complete for env: $ENVIRONMENT"`;

const awsConfigExample = `# ~/.aws/config
#
# This file stores AWS CLI profile configuration (not secret credentials).
# It's where you define things like:
# - default region/output
# - named profiles (dev/prod)
# - role assumption settings (role_arn + source_profile)
#
# Terraform and the AWS CLI both read these profiles, so switching environment
# locally can be as simple as setting AWS_PROFILE=dev or AWS_PROFILE=prod.
#
# "default" is the conventional base profile used when AWS_PROFILE isn't set.
# dev/prod profiles can assume roles using source_profile=default.

[default]
region = eu-west-2

[profile dev]
region = eu-west-2
role_arn = arn:aws:iam::111111111111:role/TerraformExecutionRoleDev
source_profile = default

[profile prod]
region = eu-west-2
role_arn = arn:aws:iam::222222222222:role/TerraformExecutionRoleProd
source_profile = default`;

const awsCredentialsExample = `# ~/.aws/credentials
#
# This file stores credential material for profiles.
# In many teams, "base" is an AWS SSO profile instead of static keys.
# This example uses placeholders so you can see the shape.
#
# "default" credentials are used when AWS_PROFILE isn't set.
# In many teams this is replaced by AWS SSO rather than static keys.

[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY`;

const scriptUseEnv = `#!/usr/bin/env bash
set -euo pipefail

# use-env.sh
# - Switches local AWS context by setting AWS_PROFILE (dev/prod).
# - Use with "source" so the variable persists in your current shell session.
#
# Usage:
#   source infra/scripts/use-env.sh dev
#   source infra/scripts/use-env.sh prod
#
# Notes:
# - Assumes AWS profiles are configured in ~/.aws/config
# - Region is set here for convenience and can be overridden

ENVIRONMENT="\${1:-dev}"

case "$ENVIRONMENT" in
  dev|prod) ;;
  *)
    echo "❌ Unknown environment: $ENVIRONMENT"
    echo "Usage: source infra/scripts/use-env.sh dev|prod"
    return 1 2>/dev/null || exit 1
    ;;
esac

export AWS_PROFILE="$ENVIRONMENT"

# Optional: keep region explicit for Terraform + AWS CLI
export AWS_REGION="\${AWS_REGION:-eu-west-2}"
export AWS_DEFAULT_REGION="\${AWS_DEFAULT_REGION:-$AWS_REGION}"

echo "✅ Switched environment to: $ENVIRONMENT"
echo "✅ AWS_PROFILE=$AWS_PROFILE"
echo ""
echo "Next:"
echo "  cd infra/env/$ENVIRONMENT"
echo "  terraform init"
echo "  terraform plan -var-file=env.tfvars"`;

const scriptWhoAmI = `#!/usr/bin/env bash
set -euo pipefail

# whoami.sh
# - Prints the current AWS identity (account + principal ARN).
# - Useful before plan/apply, especially when switching environments.
#
# Usage:
#   infra/scripts/whoami.sh
#
# Notes:
# - Requires jq for prettier output

if ! command -v jq >/dev/null 2>&1; then
  echo "❌ jq is required for this script (brew install jq / apt-get install jq)"
  exit 1
fi

aws sts get-caller-identity | jq`;

const terraformRoleTrustPolicyExample = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAssumeFromTrustedPrincipal",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111111111111:role/YourTrustedRoleOrUser"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`;

const terraformExecutionRoleTerraform = `/*
terraform-execution-role.tf (bootstrap example)
- Creates a Terraform execution role that can be assumed by a trusted principal.
- Trust policy controls who can assume the role.
- Permissions policies control what Terraform can do once assumed.
*/

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::111111111111:role/YourTrustedRoleOrUser"]
    }
  }
}

resource "aws_iam_role" "terraform_execution" {
  name               = "TerraformExecutionRoleDev"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# Starter-friendly: get moving, then tighten later.
resource "aws_iam_role_policy_attachment" "admin" {
  role       = aws_iam_role.terraform_execution.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}
`;

const terraformExecutionRoleNotes = `/*
notes (recommended naming + intent)
- Create one execution role per environment/account:
  TerraformExecutionRoleDev, TerraformExecutionRoleProd, etc.
- Trust policy: who can assume (you, your SSO role, CI role).
- Permissions: what Terraform can do (start broad, tighten later).
*/`;

const remoteStateOverview = `/*
Remote state (why it matters)
- Terraform state is the source of truth for what Terraform thinks it manages.
- Local state works for solo experiments, but breaks down for teams and CI.
- Remote state gives you:
  - Shared state (everyone and CI reads/writes the same file)
  - Locking (prevents two applies at the same time)
  - Safer collaboration (less chance of state drift and corruption)
*/`;

const backendDevExample = `/*
backend.tf (infra/env/dev)
- Remote state for dev environment using:
  - S3 bucket for state storage
  - DynamoDB table for state locking
- Keep the key unique per environment (dev vs prod).
- Backend config is separate from providers on purpose: state is a different concern.
*/

terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "template-terraform-boilerplate/dev/terraform.tfstate"
    region         = "eu-west-2"

    # Locking: prevents concurrent applies
    dynamodb_table = "terraform-state-locks"

    # Encrypt state at rest (SSE-S3 by default)
    encrypt        = true
  }
}
`;

const backendProdExample = `/*
backend.tf (infra/env/prod)
- Same backend, different key (separate state file).
- This keeps prod isolated even if dev changes frequently.
*/

terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "template-terraform-boilerplate/prod/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "terraform-state-locks"
    encrypt        = true
  }
}
`;

const stateKeyConvention = `/*
State key convention (recommended)
- Keep state keys predictable and environment-scoped.
- A common pattern is:
  <project>/<env>/terraform.tfstate

Examples:
- template-terraform-boilerplate/dev/terraform.tfstate
- template-terraform-boilerplate/prod/terraform.tfstate
*/`;

const githubTerraformWorkflow = `name: Terraform

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: "Environment to apply (dev or prod)"
        required: true
        default: "prod"
        type: choice
        options:
          - dev
          - prod

# Needed for OIDC auth to AWS + PR commenting
permissions:
  id-token: write
  contents: read
  pull-requests: write

concurrency:
  group: terraform-\${{ github.ref }}
  cancel-in-progress: true

env:
  TF_IN_AUTOMATION: "true"
  AWS_REGION: "eu-west-2"

jobs:
  plan:
    name: Plan (\${{ matrix.environment }})
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    strategy:
      fail-fast: false
      matrix:
        environment: [dev, prod]

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets[format('AWS_ROLE_ARN_{0}', matrix.environment)] }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Validate (fmt check + validate + tflint)
        run: bash infra/scripts/validate.sh \${{ matrix.environment }}

      - name: Plan
        run: bash infra/scripts/plan.sh \${{ matrix.environment }}

      - name: Upload plan artifact
        uses: actions/upload-artifact@v4
        with:
          name: tfplan-\${{ matrix.environment }}
          path: infra/env/\${{ matrix.environment }}/tfplan
          if-no-files-found: error

  apply-dev:
    name: Apply (dev)
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    environment: dev

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN_dev }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Validate (fmt check + validate + tflint)
        run: bash infra/scripts/validate.sh dev

      # Generate plan in this run so apply uses an exact plan file
      - name: Plan
        run: bash infra/scripts/plan.sh dev

      - name: Apply
        run: bash infra/scripts/apply.sh dev

  apply-prod:
    name: Apply (prod)
    runs-on: ubuntu-latest
    if: github.event_name == 'workflow_dispatch' && inputs.environment == 'prod'
    environment: prod

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN_prod }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Validate (fmt check + validate + tflint)
        run: bash infra/scripts/validate.sh prod

      - name: Plan
        run: bash infra/scripts/plan.sh prod

      - name: Apply
        run: bash infra/scripts/apply.sh prod
`;


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

        <CodeBlockWithCopy code={verifyTf} />

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
            <Strong>main.tf</Strong> the environment entry point where you wire modules together and keep the overall intent readable.
          </TextListItem>
          <CodeBlockWithCopy code={envMainTf} />
          <TextListItem>
            <Strong>variables.tf</Strong> typed inputs for the environment so configuration stays explicit and mistakes are caught early.
          </TextListItem>
          <CodeBlockWithCopy code={envVariablesTf} />
          <TextListItem>
            <Strong>env.tfvars</Strong> environment-specific values (dev/prod) so the Terraform code can stay the same across environments.
          </TextListItem>
          <CodeBlockWithCopy code={envTfvars} />
          <TextListItem>
            <Strong>providers.tf</Strong> provider configuration for this environment (region/account context), inherited by modules.
          </TextListItem>
          <CodeBlockWithCopy code={envProvidersTf} />
          <TextListItem>
            <Strong>outputs.tf</Strong> the important values you want after apply (names, IDs, URLs) without digging through state.
          </TextListItem>
          <CodeBlockWithCopy code={envOutputsTf} />
          <TextListItem>
            <Strong>backend.tf</Strong> where state lives (remote state + locking), which is what makes Terraform safe for teams and CI.
          </TextListItem>
          <CodeBlockWithCopy code={envBackendTf} />
        </TextList>

        <SubSectionHeading>infra/modules/</SubSectionHeading>
        <Paragraph>
          Modules are reusable pieces of infrastructure you can wire together from an environment root. If an environment folder starts to feel like a
          long list of resources, that's usually your cue to extract a module.
        </Paragraph>
        <TextList>
          <TextListItem>
            <Strong>main.tf</Strong> the resources this module creates (keep modules small and single-purpose).
          </TextListItem>
          <CodeBlockWithCopy code={moduleMainTf} />
          <TextListItem>
            <Strong>variables.tf</Strong> inputs the module needs so it stays reusable across environments.
          </TextListItem>
          <CodeBlockWithCopy code={moduleVariablesTf} />
          <TextListItem>
            <Strong>outputs.tf</Strong> what the module returns so other parts of the system can connect to it cleanly.
          </TextListItem>
          <CodeBlockWithCopy code={moduleOutputsTf} />
        </TextList>

        <SubSectionHeading>infra/scripts/</SubSectionHeading>

        <Paragraph>
          These scripts are optional, but they make local development feel the same as CI. GitHub Actions will run the workflow end-to-end, but when you're
          working locally it's still useful to have a consistent way to format, validate, plan, and apply - especially once you introduce multiple environments.
        </Paragraph>

        <Paragraph>
          The main idea is that whether you're working locally or in CI, you're running the same steps in the same order:{" "}
          <InlineHighlight>fmt</InlineHighlight> → <InlineHighlight>validate</InlineHighlight> → <InlineHighlight>plan</InlineHighlight> →{" "}
          <InlineHighlight>apply</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          I will go through the scripts usage more thoroughly in it's own section <Strong>(Local Development)</Strong> as to not to distract from
          the purpose of this topic.
        </Paragraph>

        <SubSectionHeading>repo-level files</SubSectionHeading>
        <Paragraph>
          <Strong>.gitignore</Strong> should exclude .terraform state files, and plan files so you never commit
          sensitive or noisy artifacts.
        </Paragraph>
        <Paragraph>
          <Strong>README.md</Strong> becomes your "how to run this repo" entry point: what it deploys, how environments work, and the basic commands.
        </Paragraph>
        <Paragraph>
          <Strong>package.json</Strong> is optional, but if you're already using Node tooling for your projects it can be a nice place to standardise
          scripts (for example: running Terraform scripts, formatting, linting, and CI helpers) in one familiar interface.
        </Paragraph>

        <SectionHeading>Local Development</SectionHeading>
        <Paragraph>
          We touched on the topics of scripts above in the Repository Structure about how they could be used to help run your terraform locally. What is
          also handy is the ability to maintain a local setup when working in multiple environments.
        </Paragraph>

        <Paragraph>
          Locally, we'll use{" "} <Strong>AWS profiles per environment</Strong> so switching between dev and prod is explicit and low-risk.
        </Paragraph>

        <SubSectionHeading>AWS profiles per environment</SubSectionHeading>

        <Paragraph>
          The approach is simple: define a <InlineHighlight>dev</InlineHighlight> and <InlineHighlight>prod</InlineHighlight> profile in{" "}
          <InlineHighlight>~/.aws/config</InlineHighlight>, and store base credentials in <InlineHighlight>~/.aws/credentials</InlineHighlight>.
          Terraform and the AWS CLI both understand these files. The AWS docs cover the file locations and formats in detail:
          {" "}
          <TextLink href="https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-files.html" target="_blank" rel="noreferrer">
            AWS CLI config & credentials files
          </TextLink>
          {" "}
          and
          {" "}
          <TextLink href="https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-configure.html" target="_blank" rel="noreferrer">
            Configuring the AWS CLI
          </TextLink>
          .
        </Paragraph>

        <Paragraph>
          In a team setup, you'll typically assume a Terraform role per environment/account. AWS roles are split into two parts: a{" "}
          <InlineHighlight>trust policy</InlineHighlight> (who can assume the role) and a{" "}
          <InlineHighlight>permissions policy</InlineHighlight> (what the role can do).
        </Paragraph>

        <Paragraph>
          If you need a refresher, the best starting point:
          {" "}
          <TextLink href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html" target="_blank" rel="noreferrer">
            IAM roles overview
          </TextLink>
          {" "}
          and
          {" "}
          <TextLink href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-custom.html" target="_blank" rel="noreferrer">
            Create a role with a custom trust policy
          </TextLink>
          .
          {" "}
          Alternatively you can look at my
          {" "}
          <TextLink href="https://www.heyitsmeharv.com/blog/aws-identity-access-management" target="_blank" rel="noreferrer">
            AWS Identity and Access Management (IAM) blog post
          </TextLink>
          .
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>~/.aws/config</Strong>
          </TextListItem>
          <CodeBlockWithCopy code={awsConfigExample} />
          <TextListItem>
            <Strong>~/.aws/credentials</Strong> How you populate credentials depends on your setup. This example shows placeholders so you can see the shape of the file.
          </TextListItem>
          <CodeBlockWithCopy code={awsCredentialsExample} />
          <TextListItem>
            <Strong>Terraform role trust policy</Strong> This is a simple example of a trust policy that allows a specific principal to assume the role.
            The actual principal will depend on your setup (an IAM user, an SSO role, or a role in another account). The key idea is: trust policy controls{" "}
            <InlineHighlight>who can assume</InlineHighlight>, permissions policy controls <InlineHighlight>what they can do</InlineHighlight>.
          </TextListItem>
          <CodeBlockWithCopy code={terraformRoleTrustPolicyExample} />
        </TextList>

        <SubSectionHeading>Scripts</SubSectionHeading>

        <Paragraph>
          These scripts assume you're using named AWS profiles. The main one you'll use is{" "}
          <InlineHighlight>use-env.sh</InlineHighlight>, which sets <InlineHighlight>AWS_PROFILE</InlineHighlight> for your shell session.
          From there, Terraform commands run in the correct account/role context.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>use-env.sh</Strong> switches AWS context locally by setting <InlineHighlight>AWS_PROFILE</InlineHighlight> for dev/prod.
          </TextListItem>
          <CodeBlockWithCopy code={scriptUseEnv} />

          <TextListItem>
            <Strong>whoami.sh</Strong> prints your active AWS identity (account/role) so you don't plan/apply in the wrong place.
          </TextListItem>
          <CodeBlockWithCopy code={scriptWhoAmI} />

          <TextListItem>
            <Strong>fmt.sh</Strong> formats Terraform code under <InlineHighlight>infra/</InlineHighlight> so diffs stay clean.
          </TextListItem>
          <CodeBlockWithCopy code={scriptFmt} />

          <TextListItem>
            <Strong>validate.sh</Strong> the local quality gate (fmt check + validate + tflint) before you generate a plan.
          </TextListItem>
          <CodeBlockWithCopy code={scriptValidate} />

          <TextListItem>
            <Strong>plan.sh</Strong> creates a saved plan file using <InlineHighlight>env.tfvars</InlineHighlight> so changes can be reviewed.
          </TextListItem>
          <CodeBlockWithCopy code={scriptPlan} />

          <TextListItem>
            <Strong>apply.sh</Strong> applies the saved plan file so you deploy exactly what you planned.
          </TextListItem>
          <CodeBlockWithCopy code={scriptApply} />
        </TextList>

        <Paragraph>
          Once we introduce GitHub Actions, the workflow will run these same steps automatically. The scripts are just there to keep your local workflow
          consistent and safe, especially when you're switching environments.
        </Paragraph>

        {/* <SubSectionHeading>Create the Terraform execution role</SubSectionHeading>

        <Paragraph>
          Before Terraform can create anything in AWS, it needs an identity it can run as. In most teams, that's a dedicated IAM role per environment —
          something like <Strong>TerraformExecutionRoleDev</Strong> and <Strong>TerraformExecutionRoleProd</Strong>.
        </Paragraph>

        <Paragraph>
          An IAM role is made up of two parts:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Trust policy</Strong> — who is allowed to assume the role (your SSO role, a CI role, an IAM user, etc.).
          </TextListItem>
          <TextListItem>
            <Strong>Permissions policies</Strong> — what Terraform is allowed to do once it has assumed the role.
          </TextListItem>
        </TextList>

        <Paragraph>
          AWS documents this split clearly, and it's worth keeping in mind as you build out your repo.
        </Paragraph>

        <TertiaryHeading>Option 1: Create the role manually (recommended for the very first setup)</TertiaryHeading>

        <Paragraph>
          For the first time you set up a new account/environment, creating the execution role in the AWS Console is usually the smoothest path. It avoids the
          “Terraform needs the role, but the role doesn't exist yet” problem.
        </Paragraph>

        <Paragraph>
          In the IAM Console, go to <Strong>Roles</Strong> → <Strong>Create role</Strong> → choose <Strong>Custom trust policy</Strong>, then paste a trust policy
          like the one below (replace the principal ARN with your real trusted identity). AWS walks through these exact console steps in their docs.
        </Paragraph>

        <CodeBlockWithCopy code={terraformRoleTrustPolicyExample} />

        <Paragraph>
          After that, attach a permissions policy. For a boilerplate template, it's common to start broad (so you can actually build), then tighten permissions
          once your modules settle. The key is that permissions are separate from trust: trust is <InlineHighlight>who can assume</InlineHighlight>, permissions
          are <InlineHighlight>what they can do</InlineHighlight>.
        </Paragraph>

        <TertiaryHeading>Option 2: Create the role with Terraform (bootstrap example)</TertiaryHeading>

        <Paragraph>
          Once you already have some base access (for example via SSO or a temporary admin setup), you can also create the execution role using Terraform itself.
          I like including this as a reference because it shows the relationship between the trust policy and role attachments in code.
        </Paragraph>

        <CodeBlockWithCopy code={terraformExecutionRoleTerraform} />

        <Paragraph>
          The AWS provider docs for <InlineHighlight>aws_iam_role</InlineHighlight> show the same core pattern: define an assume role policy and then attach
          permissions.
        </Paragraph>

        <TertiaryHeading>Where this fits into the local workflow</TertiaryHeading>

        <Paragraph>
          Once the role exists, your <InlineHighlight>~/.aws/config</InlineHighlight> profiles can assume it automatically via{" "}
          <InlineHighlight>role_arn</InlineHighlight> + <InlineHighlight>source_profile</InlineHighlight>. That's what makes switching between dev/prod locally
          simple and low-risk.
        </Paragraph>

        <SectionHeading>Remote state & locking</SectionHeading>

        <Paragraph>
          Terraform keeps track of what it manages using <Strong>state</Strong>. It's the file Terraform reads to understand what already exists, what it created,
          and what needs to change next.
        </Paragraph>

        <Paragraph>
          Local state is fine when you're experimenting alone, but it becomes fragile as soon as you introduce a second machine, a teammate, or CI. That's where
          <InlineHighlight>remote state</InlineHighlight> comes in.
        </Paragraph>

        <CodeBlockWithCopy code={remoteStateOverview} /> */}

        <SubSectionHeading>What remote state solves</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Shared source of truth</Strong> — your laptop and CI both read/write the same state, so you don't end up with competing copies.
          </TextListItem>
          <TextListItem>
            <Strong>Locking</Strong> — prevents two applies happening at once, which is one of the fastest ways to corrupt state.
          </TextListItem>
          <TextListItem>
            <Strong>Environment isolation</Strong> — dev and prod get separate state files, even if they share the same module code.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Backend conventions</SubSectionHeading>

        <Paragraph>
          You'll see backend config kept in a dedicated <InlineHighlight>backend.tf</InlineHighlight> at the environment root. I like this because it makes state
          behaviour explicit per environment, and keeps it separate from provider configuration.
        </Paragraph>

        <Paragraph>
          The key detail is the <InlineHighlight>key</InlineHighlight>. That's the path inside the bucket where the state file lives. Use a predictable convention
          so it's always obvious which environment you're looking at.
        </Paragraph>

        <CodeBlockWithCopy code={stateKeyConvention} />

        <SubSectionHeading>Dev backend example</SubSectionHeading>
        <Paragraph>
          This is a standard AWS pattern: S3 stores the state file, and DynamoDB provides a lock so concurrent applies don't collide.
        </Paragraph>
        <CodeBlockWithCopy code={backendDevExample} />

        <SubSectionHeading>Prod backend example</SubSectionHeading>
        <Paragraph>
          Prod is the same configuration, just a different key. This small separation is what keeps environments clean.
        </Paragraph>
        <CodeBlockWithCopy code={backendProdExample} />

        {/* <SubSectionHeading>A note on bootstrapping</SubSectionHeading>
        <Paragraph>
          The backend resources (the S3 bucket and DynamoDB table) need to exist before Terraform can use them. Most teams handle this in one of two ways:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Manual bootstrap once</Strong> — create the state bucket and lock table up front, then Terraform uses them forever.
          </TextListItem>
          <TextListItem>
            <Strong>Bootstrap stack</Strong> — a tiny Terraform project whose only job is creating the backend resources.
          </TextListItem>
        </TextList>

        <Paragraph>
          For this boilerplate, I'd start with a manual bootstrap, then introduce a bootstrap stack once the workflow feels familiar.
        </Paragraph> */}

        <SubSectionHeading>What changes locally when you enable a backend</SubSectionHeading>
        <Paragraph>
          Once <InlineHighlight>backend.tf</InlineHighlight> is present, <InlineHighlight>terraform init</InlineHighlight> will initialise the backend and move your
          state into it. From that point on, <InlineHighlight>plan</InlineHighlight> and <InlineHighlight>apply</InlineHighlight> operate against remote state —
          which is exactly what you want for CI.
        </Paragraph>

        <Paragraph>
          Next, we'll wire the same workflow into GitHub Actions so pull requests generate plans automatically, and main branch merges are the only thing that can apply.
        </Paragraph>

        <SectionHeading>GitHub Actions: plan on PR, apply on main</SectionHeading>

        <Paragraph>
          Once your repo structure is in place and you've got an execution role per environment, GitHub Actions becomes the glue that makes Terraform feel
          safe and repeatable. The goal is simple:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Pull requests</Strong> generate a plan automatically so you can review infrastructure changes like code.
          </TextListItem>
          <TextListItem>
            <Strong>Main branch</Strong> is the only place that can apply changes, keeping deployments intentional.
          </TextListItem>
          <TextListItem>
            <Strong>Prod</Strong> should be protected, ideally with an explicit manual approval step.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Authenticating to AWS (OIDC)</SubSectionHeading>

        <Paragraph>
          For CI, the cleanest pattern is to use GitHub's OIDC integration to assume an AWS role with short-lived credentials. That means you don't need to store
          long-lived AWS access keys in GitHub secrets. GitHub and AWS both document this approach, and the{" "}
          <InlineHighlight>aws-actions/configure-aws-credentials</InlineHighlight> action supports it directly.
        </Paragraph>

        <Paragraph>
          The only requirement on the workflow side is granting <InlineHighlight>id-token: write</InlineHighlight> so the job can request an OIDC token.
        </Paragraph>

        <SubSectionHeading>Environment protection for prod</SubSectionHeading>

        <Paragraph>
          GitHub Environments let you put guardrails around deployments. For example, you can configure the <InlineHighlight>prod</InlineHighlight> environment to
          require reviewers before any job targeting it can run. This gives you a simple “manual approval” without reinventing anything.
        </Paragraph>

        <SubSectionHeading>The workflow</SubSectionHeading>

        <Paragraph>
          The workflow below follows the same shape as our local scripts:
          <InlineHighlight> validate </InlineHighlight> → <InlineHighlight> plan </InlineHighlight> → <InlineHighlight> apply </InlineHighlight>.
          On pull requests, it runs <Strong>plan</Strong> (for dev and prod) and uploads the plan output as an artifact. On main branch pushes, it applies to dev.
          For prod, it uses <InlineHighlight>workflow_dispatch</InlineHighlight> and an environment gate.
        </Paragraph>

        <CodeBlockWithCopy code={githubTerraformWorkflow} />

        <Paragraph>
          Under the hood, we rely on <InlineHighlight>hashicorp/setup-terraform</InlineHighlight> to install Terraform on the runner, and we use OIDC auth to assume
          the correct Terraform execution role for each environment.
        </Paragraph>

        <SectionHeading>GitHub repo setup (Environments, approvals, secrets)</SectionHeading>

        <Paragraph>
          The workflow is only half the story. To make “plan on PR” and “apply with guardrails” work properly, we need to configure a couple of things in GitHub:
          Environments (for approvals) and Secrets (for role ARNs).
        </Paragraph>

        <SubSectionHeading>1) Create the environments</SubSectionHeading>

        <Paragraph>
          Environments are a GitHub feature that let you attach deployment rules (like manual approvals) and environment-specific secrets. A job that targets an
          environment won't run until the protection rules pass.
        </Paragraph>

        <Paragraph>
          In your repo:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            Go to <Strong>Settings</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            In the left sidebar, click <Strong>Environments</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Click <Strong>New environment</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Create an environment named <InlineHighlight>dev</InlineHighlight>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Repeat and create an environment named <InlineHighlight>prod</InlineHighlight>
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          The environment names must match the <InlineHighlight>environment:</InlineHighlight> value in your workflow exactly.
        </Paragraph>

        <SubSectionHeading>2) Add a manual approval for prod</SubSectionHeading>

        <Paragraph>
          This is where the “guardrail” lives. You can require reviewers for an environment so deployments pause until someone approves. GitHub calls these
          <Strong>deployment protection rules</Strong>.
        </Paragraph>

        <Paragraph>
          In your repo:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            Go to <Strong>Settings</Strong> → <Strong>Environments</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Click the <InlineHighlight>prod</InlineHighlight> environment
          </IndentedTextListItem>
          <IndentedTextListItem>
            Under <Strong>Deployment protection rules</Strong>, enable <Strong>Required reviewers</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Add yourself (or a team) as a required reviewer
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          Now, any job that uses <InlineHighlight>environment: prod</InlineHighlight> will pause and wait for approval before it can run.
        </Paragraph>

        <SubSectionHeading>3) Add the role ARNs as secrets</SubSectionHeading>

        <Paragraph>
          Your workflow needs the role ARN(s) to assume via OIDC. You can store these either as repository secrets or as environment secrets. Environment secrets
          are nice because they keep dev/prod values scoped and harder to misuse.
        </Paragraph>

        <TertiaryHeading>Option A: Environment secrets (recommended)</TertiaryHeading>

        <IndentedTextList>
          <IndentedTextListItem>
            Go to <Strong>Settings</Strong> → <Strong>Environments</Strong> → click <InlineHighlight>dev</InlineHighlight>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Under <Strong>Environment secrets</Strong>, click <Strong>Add secret</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Add <InlineHighlight>AWS_ROLE_ARN</InlineHighlight> = <InlineHighlight>arn:aws:iam::...:role/TerraformExecutionRoleDev</InlineHighlight>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Repeat for <InlineHighlight>prod</InlineHighlight> using the prod role ARN
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          If you use environment secrets like this, update the workflow to reference <InlineHighlight>secrets.AWS_ROLE_ARN</InlineHighlight> (the value will come
          from the current environment automatically).
        </Paragraph>

        <TertiaryHeading>Option B: Repository secrets (simple)</TertiaryHeading>

        <IndentedTextList>
          <IndentedTextListItem>
            Go to <Strong>Settings</Strong> → <Strong>Secrets and variables</Strong> → <Strong>Actions</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Click <Strong>New repository secret</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Add <InlineHighlight>AWS_ROLE_ARN_dev</InlineHighlight> = <InlineHighlight>arn:aws:iam::...:role/TerraformExecutionRoleDev</InlineHighlight>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Add <InlineHighlight>AWS_ROLE_ARN_prod</InlineHighlight> = <InlineHighlight>arn:aws:iam::...:role/TerraformExecutionRoleProd</InlineHighlight>
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          This matches the workflow pattern where dev/prod selects a different secret based on the environment name.
        </Paragraph>

        <SubSectionHeading>4) What it looks like when prod is waiting for approval</SubSectionHeading>

        <Paragraph>
          When you trigger a prod apply, the workflow run will pause at “Deployment protection rules” and wait. A reviewer can then approve and start the waiting
          job directly from the workflow run page. GitHub documents this flow under reviewing deployments.
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            Go to the <Strong>Actions</Strong> tab
          </IndentedTextListItem>
          <IndentedTextListItem>
            Open the running workflow
          </IndentedTextListItem>
          <IndentedTextListItem>
            In <Strong>Deployment protection rules</Strong>, click <Strong>Review deployments</Strong> / <Strong>Start all waiting jobs</Strong> (wording varies)
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>5) Sanity check: OIDC permissions</SubSectionHeading>

        <Paragraph>
          For OIDC to work, your workflow must have <InlineHighlight>permissions: id-token: write</InlineHighlight>. The AWS credentials action calls this out
          directly, and GitHub's OIDC docs do as well.
        </Paragraph>

      </AnimatedPostContainer>
    </PageWrapper >
  );
}

export default IaCTerraform;
