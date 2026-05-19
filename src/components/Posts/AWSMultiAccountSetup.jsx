import React, { useEffect } from "react";
import styled from "styled-components";
import { renderArchitexter } from "architexter";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

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
  IndentedTextList,
  IndentedTextListItem,
  InlineHighlight,
} from "../Typography/Typography";

// icons
import {
  AWSSVG,
  AWSIAMSVG,
  AWSOrganisationsSVG,
  AWSControlTowerSVG,
  AWSCloudTrailSVG,
} from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import { CodeBlockWithCopy } from "../Code/Code";

// code blocks
import {
  awsMultiAccountSCPDenyGuardDuty,
  awsMultiAccountSCPDenyRegions,
  awsMultiAccountSCPDenyRoot,
  awsMultiAccountTerraformDeployRoleTrust,
  awsMultiAccountGitHubOIDCRole,
  awsMultiAccountTerraformProviderAssumeRole,
  awsMultiAccountTagPolicy,
} from "../../helpers/codeblocks";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const accountHierarchy = `[root] Root
  [ou] Management OU
    [mgmt] Management Account
  [ou] Dev OU
    [dev] Dev Account
  [ou] Prod OU
    [stage] Stage Account
    [prod] Prod Account`;

const iamIdentityCenterFlow = `[user] Engineer
  > authenticates via
  [sso] IAM Identity Center (Management Account)
    > assumes permission set into
    [dev] Dev Account
    [stage] Stage Account
    [prod] Prod Account`;

const terraformDeployFlow = `[gh] GitHub Actions
  > authenticates via OIDC
  [mgmt] Management Account
    [role] CICDRole
      > assumes
      [dev-role] TerraformDeployRole (Dev Account)
      [stage-role] TerraformDeployRole (Stage Account)
      [prod-role] TerraformDeployRole (Prod Account)`;

const AWSMultiAccountSetup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/aws-multi-account-setup");
    Analytics.track("blog_page_viewed", { slug: "aws-multi-account-setup" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>AWS Multi-Account Setup</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSOrganisationsSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSIAMSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSCloudTrailSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSControlTowerSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          This post is a blueprint for the conventional AWS multi-account
          architecture: a <Strong>Management account</Strong> acting as both the
          organisation root and the platform hub, alongside separate{" "}
          <Strong>Dev</Strong>, <Strong>Stage</Strong>, and{" "}
          <Strong>Prod</Strong> workload accounts. It covers why you would
          structure things this way, how each piece fits together, and the
          supporting services that make the setup complete.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#why-multi-account">Why Multi-Account?</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-organisations">AWS Organizations</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#account-structure">
              The 4-Account Structure
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#ous">Organisational Units (OUs)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#scps">Service Control Policies (SCPs)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#iam-identity-center">
              IAM Identity Center (SSO)
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#cross-account-roles">
              Cross-Account Role Assumption
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#day-zero">Bootstrapping: Day Zero</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#terraform-state">Terraform State Backend</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#root-user-security">
              Root User Security Per Account
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#guardduty-security-hub">
              GuardDuty & Security Hub
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#budget-alerts">Budget Alerts Per Account</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#tag-policies">Tag Policies</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#cloudtrail">Org-Level CloudTrail</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#evolve">When to Evolve the Architecture</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="why-multi-account">
          Why Multi-Account?
        </SectionHeading>

        <Paragraph>
          Running all your environments — dev, stage, and production — inside a
          single AWS account is the path of least resistance when you are
          starting out. There is only one login, one billing page, and one set
          of IAM policies to think about. But as infrastructure grows, that
          convenience becomes a liability.
        </Paragraph>

        <Paragraph>
          The core problem is that AWS accounts share namespaces. IAM policies,
          S3 bucket names, security groups, and CloudWatch log groups all live
          in the same space. A misconfigured IAM policy, an overly permissive
          resource, or a missing guardrail can affect every environment at once.
          There is no fence between experimenting in dev and breaking
          production. This is called <Strong>blast radius</Strong> — and in a
          single-account setup, the blast radius of any mistake is the entire
          account.
        </Paragraph>

        <Paragraph>
          Multi-account architecture solves this by making the boundary
          explicit. Each environment lives in its own account with its own IAM
          namespace, its own billing, and its own set of guardrails. A mistake
          in dev stays in dev — it cannot cross account boundaries to touch
          stage or prod.
        </Paragraph>

        <Paragraph>
          Beyond isolation, separate accounts give you cost visibility. With{" "}
          <Strong>Cost Explorer</Strong> filtered by Linked Account, you can see
          exactly how much each environment spends every month without relying
          on complex tagging strategies. Compliance requirements also tend to
          demand hard account-level separation — auditors want to see
          environments divided at the account level, not just by tag.
        </Paragraph>

        <SectionHeading id="aws-organisations">
          AWS Organizations
        </SectionHeading>

        <Paragraph>
          AWS Organizations is the service that ties multiple accounts together
          under a single management structure. Without it, each account is
          entirely standalone — separate billing, separate logins, no shared
          policies.
        </Paragraph>

        <Paragraph>
          When you enable Organizations, you nominate one account as the{" "}
          <Strong>management account</Strong> (also called the root account or
          payer account). From that account you can create member accounts,
          group them into Organisational Units, attach Service Control Policies,
          and access organisation-wide features that simply do not exist at the
          single-account level:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Consolidated billing</Strong> — all accounts roll up into
            one invoice; volume discounts apply across the total spend
          </TextListItem>
          <TextListItem>
            <Strong>Org-level CloudTrail</Strong> — captures API calls from
            every account in one immutable trail
          </TextListItem>
          <TextListItem>
            <Strong>Config Aggregator</Strong> — a compliance view across all
            accounts from a single dashboard
          </TextListItem>
          <TextListItem>
            <Strong>IAM Identity Center</Strong> — one login portal that grants
            access to every account
          </TextListItem>
        </TextList>

        <Paragraph>
          None of these require per-account setup once the Organisation exists.
          The overhead of managing multiple accounts drops significantly because
          the Organisation handles shared concerns centrally.
        </Paragraph>

        <CodeBlockWithCopy
          compact
          code={renderArchitexter(accountHierarchy, "tree")}
        />

        <SectionHeading id="account-structure">
          The 4-Account Structure
        </SectionHeading>

        <Paragraph>
          The conventional starting structure for most teams is four accounts:
          one management account and three workload accounts.
        </Paragraph>

        <SubSectionHeading>
          Management Account (Root + Platform)
        </SubSectionHeading>

        <Paragraph>
          The management account owns the Organisation. It is the billing root
          and the control plane for everything that spans accounts — SCPs, OUs,
          IAM Identity Center, and org-level CloudTrail. It also doubles as the{" "}
          <Strong>platform account</Strong>, hosting the Terraform remote state
          and the CI/CD execution roles that deploy into the workload accounts.
        </Paragraph>

        <Paragraph>What lives here:</Paragraph>

        <TextList>
          <TextListItem>
            AWS Organizations control plane (SCPs, OU structure, account
            creation)
          </TextListItem>
          <TextListItem>IAM Identity Center (human SSO access)</TextListItem>
          <TextListItem>Consolidated billing and budget alerts</TextListItem>
          <TextListItem>Org-level CloudTrail trail</TextListItem>
          <TextListItem>Config Aggregator</TextListItem>
          <TextListItem>
            Terraform remote state (S3 bucket + DynamoDB lock table)
          </TextListItem>
          <TextListItem>
            GitHub OIDC provider and deployment IAM role
          </TextListItem>
        </TextList>

        <SubSectionHeading>Dev Account</SubSectionHeading>

        <Paragraph>
          The dev account is for active development and experimentation.
          Engineers have broad access via IAM Identity Center, guardrails are
          relaxed, and breaking things is expected. It contains a{" "}
          <InlineHighlight>TerraformDeployRole</InlineHighlight> whose trust
          policy allows the management account's CI/CD role to assume it.
        </Paragraph>

        <SubSectionHeading>Stage Account</SubSectionHeading>

        <Paragraph>
          Stage mirrors production constraints exactly — it lives in the same OU
          as production and shares the same Service Control Policies. The
          purpose is to catch issues that would only surface under prod-like
          conditions before they affect real users. Human write access is
          limited; all deployments go through CI/CD.
        </Paragraph>

        <SubSectionHeading>Prod Account</SubSectionHeading>

        <Paragraph>
          Production carries the strictest policies. Break-glass access is
          available for humans via IAM Identity Center using a dedicated
          permission set, but day-to-day all changes come through the CI/CD
          pipeline. CloudWatch alerts on IAM activity and Terraform applies
          provide visibility into every change.
        </Paragraph>

        <SectionHeading id="ous">Organisational Units (OUs)</SectionHeading>

        <Paragraph>
          Organisational Units are the grouping mechanism inside AWS
          Organizations. They let you attach a Service Control Policy once at
          the OU level and have it apply to every account in that group — rather
          than attaching the same policy to each account individually.
        </Paragraph>

        <Paragraph>
          The recommended structure for this setup is three OUs:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Management OU</Strong> — contains only the management
            account. This OU exists so you can apply policies specifically to
            the management account, or deliberately exempt it from policies that
            apply to workload accounts.
          </TextListItem>
          <TextListItem>
            <Strong>Dev OU</Strong> — contains the dev account. SCPs here are
            relaxed, allowing the experimentation that development workflows
            require.
          </TextListItem>
          <TextListItem>
            <Strong>Prod OU</Strong> — contains both stage and prod. This is the
            key structural decision: stage lives alongside production in the
            strictest OU. If stage has different guardrails than prod, it is not
            genuinely testing under prod conditions. By sharing an OU, you
            guarantee they share the same ceiling.
          </TextListItem>
        </TextList>

        <SectionHeading id="scps">
          Service Control Policies (SCPs)
        </SectionHeading>

        <Paragraph>
          A Service Control Policy is a JSON document that you attach to an OU
          or account. It sets the{" "}
          <Strong>maximum permissions available within that scope</Strong> — it
          does not grant anything, it constrains. Even an IAM user with{" "}
          <InlineHighlight>AdministratorAccess</InlineHighlight> cannot perform
          an action that an SCP denies. SCPs are guardrails, not permission
          grants; IAM policies still do the actual granting within whatever
          ceiling the SCP defines.
        </Paragraph>

        <Paragraph>
          From day one, there are certain actions you never want to be possible
          in any workload account regardless of who is asking:
        </Paragraph>

        <TextList>
          <TextListItem>Disabling GuardDuty</TextListItem>
          <TextListItem>Deleting the org-level CloudTrail</TextListItem>
          <TextListItem>Using the root account credentials</TextListItem>
          <TextListItem>Creating root access keys</TextListItem>
          <TextListItem>
            Making API calls outside approved AWS regions
          </TextListItem>
          <TextListItem>Leaving the Organisation</TextListItem>
        </TextList>

        <Paragraph>
          For accounts in the Prod OU (stage and prod), additional restrictions
          apply:
        </Paragraph>

        <TextList>
          <TextListItem>Deny unencrypted EBS volumes</TextListItem>
          <TextListItem>Require MFA for destructive IAM actions</TextListItem>
        </TextList>

        <SubSectionHeading>Deny Disabling GuardDuty</SubSectionHeading>

        <CodeBlockWithCopy code={awsMultiAccountSCPDenyGuardDuty} />

        <SubSectionHeading>Deny Non-Approved Regions</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>NotAction</InlineHighlight> pattern is important
          here — global services like IAM, Route 53, and CloudFront are region-
          agnostic and must be excluded from the region restriction, otherwise
          they stop working entirely.
        </Paragraph>

        <CodeBlockWithCopy code={awsMultiAccountSCPDenyRegions} />

        <SubSectionHeading>Deny Root Account Usage</SubSectionHeading>

        <CodeBlockWithCopy code={awsMultiAccountSCPDenyRoot} />

        <SectionHeading id="iam-identity-center">
          IAM Identity Center (SSO)
        </SectionHeading>

        <Paragraph>
          IAM Identity Center is the AWS-native solution for giving humans
          access to multiple accounts through a single login. Rather than
          creating IAM users in each account with individual passwords and
          access keys, engineers log in once at the access portal URL and assume
          the appropriate role in whichever account they need.
        </Paragraph>

        <Paragraph>
          It ships with a <Strong>built-in identity store</Strong>. You create
          users directly in the IAM Identity Center console, they receive an
          email to set a password, and they log in via the AWS access portal at{" "}
          <InlineHighlight>
            https://your-subdomain.awsapps.com/start
          </InlineHighlight>
          . No third-party service is required. If you already have an external
          identity provider such as Okta, Azure AD, or Google Workspace, you can
          connect it via SAML or OIDC — but it is optional, not a prerequisite.
        </Paragraph>

        <Paragraph>
          Access is controlled through <Strong>Permission Sets</Strong>. A
          Permission Set is a named collection of IAM policies that IAM Identity
          Center provisions as an IAM role in each member account. Assign a user
          to an account with a given Permission Set, and they can assume that
          role from the portal.
        </Paragraph>

        <Paragraph>Recommended permission sets for this setup:</Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>AdministratorAccess</InlineHighlight> — full
            access; break-glass only for prod
          </TextListItem>
          <TextListItem>
            <InlineHighlight>DeveloperAccess</InlineHighlight> — broad
            read/write across services; deny IAM and billing changes
          </TextListItem>
          <TextListItem>
            <InlineHighlight>ReadOnly</InlineHighlight> — for auditors and
            stakeholders
          </TextListItem>
          <TextListItem>
            <InlineHighlight>BillingReadOnly</InlineHighlight> — management
            account only, for finance teams
          </TextListItem>
        </TextList>

        <CodeBlockWithCopy
          compact
          code={renderArchitexter(iamIdentityCenterFlow, "tree")}
        />

        <SectionHeading id="cross-account-roles">
          Cross-Account Role Assumption (CI/CD + Terraform)
        </SectionHeading>

        <Paragraph>
          Humans access accounts through IAM Identity Center. Automation —
          specifically Terraform running in CI/CD — uses a different mechanism:{" "}
          <Strong>IAM role assumption</Strong>.
        </Paragraph>

        <Paragraph>The trust chain works as follows:</Paragraph>

        <TextList>
          <TextListItem>
            GitHub Actions authenticates to the management account using OIDC —
            no long-lived credentials
          </TextListItem>
          <TextListItem>
            The management account holds a{" "}
            <InlineHighlight>CICDRole</InlineHighlight> with permission to call{" "}
            <InlineHighlight>sts:AssumeRole</InlineHighlight>
          </TextListItem>
          <TextListItem>
            Each workload account has a{" "}
            <InlineHighlight>TerraformDeployRole</InlineHighlight> whose trust
            policy explicitly allows the management account to assume it
          </TextListItem>
          <TextListItem>
            Terraform's provider block uses{" "}
            <InlineHighlight>assume_role</InlineHighlight> to switch into the
            target account before creating or updating resources
          </TextListItem>
        </TextList>

        <CodeBlockWithCopy
          compact
          code={renderArchitexter(terraformDeployFlow, "tree")}
        />

        <Paragraph>
          No long-lived access keys are involved anywhere in this chain. GitHub
          Actions uses a short-lived OIDC token, and every subsequent role
          assumption produces short-lived STS credentials that expire within
          hours.
        </Paragraph>

        <SubSectionHeading>TerraformDeployRole Trust Policy</SubSectionHeading>

        <Paragraph>
          This policy lives in each workload account. Replace{" "}
          <InlineHighlight>MANAGEMENT_ACCOUNT_ID</InlineHighlight> with the
          account ID of your management account.
        </Paragraph>

        <CodeBlockWithCopy code={awsMultiAccountTerraformDeployRoleTrust} />

        <SubSectionHeading>GitHub OIDC Role Trust Policy</SubSectionHeading>

        <Paragraph>
          This policy lives in the management account. It allows GitHub Actions
          to assume a role via OIDC without any static credentials.
        </Paragraph>

        <CodeBlockWithCopy code={awsMultiAccountGitHubOIDCRole} />

        <SubSectionHeading>
          Terraform Provider with assume_role
        </SubSectionHeading>

        <CodeBlockWithCopy code={awsMultiAccountTerraformProviderAssumeRole} />

        <SectionHeading id="day-zero">Bootstrapping: Day Zero</SectionHeading>

        <Paragraph>
          There is a chicken-and-egg problem with Terraform and remote state:
          Terraform needs an S3 bucket to store its state, but that S3 bucket
          does not exist until something creates it. If you try to use Terraform
          to create its own state backend, you are managing state for the thing
          that manages state.
        </Paragraph>

        <Paragraph>
          The management account solves this. You create the state backend once,{" "}
          <Strong>manually</Strong>, before Terraform is involved at all. Two
          resources: an S3 bucket with versioning and server-side encryption
          enabled, and a DynamoDB table for state locking. From that point
          forward, Terraform uses those resources as its backend and manages
          everything else.
        </Paragraph>

        <Paragraph>The bootstrap sequence:</Paragraph>

        <TextList>
          <TextListItem>
            Create the management account and enable AWS Organizations
          </TextListItem>
          <TextListItem>
            Create the S3 state bucket and DynamoDB lock table manually via the
            console or AWS CLI
          </TextListItem>
          <TextListItem>
            Write the Terraform backend configuration pointing at those
            resources
          </TextListItem>
          <TextListItem>
            All subsequent infrastructure — member accounts, OUs, SCPs, IAM
            Identity Center configuration, and workload resources in every
            account — is managed by Terraform from that point forward
          </TextListItem>
        </TextList>

        <Paragraph>
          This is the reason the management account doubles as the platform: it
          provides the stable, manually bootstrapped foundation that everything
          else is built on top of.
        </Paragraph>

        <SectionHeading id="terraform-state">
          Terraform State Backend
        </SectionHeading>

        <Paragraph>
          With the management account acting as the platform hub, the Terraform
          state for all three workload environments lives here. The convention
          is one S3 bucket per environment with a matching DynamoDB lock table:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>tfstate-dev</InlineHighlight> +{" "}
            <InlineHighlight>tfstate-dev-locks</InlineHighlight>
          </TextListItem>
          <TextListItem>
            <InlineHighlight>tfstate-stage</InlineHighlight> +{" "}
            <InlineHighlight>tfstate-stage-locks</InlineHighlight>
          </TextListItem>
          <TextListItem>
            <InlineHighlight>tfstate-prod</InlineHighlight> +{" "}
            <InlineHighlight>tfstate-prod-locks</InlineHighlight>
          </TextListItem>
        </TextList>

        <Paragraph>
          Access to the state buckets should be restricted to two principals:
          the management account's CI/CD role for pipeline deployments, and the
          IAM Identity Center{" "}
          <InlineHighlight>AdministratorAccess</InlineHighlight> role for
          break-glass manual operations. S3 versioning is mandatory — it allows
          rolling back to any previous state if an apply leaves things in an
          inconsistent state. Server-side encryption should be enabled on all
          buckets.
        </Paragraph>

        <SectionHeading id="root-user-security">
          Root User Security Per Account
        </SectionHeading>

        <Paragraph>
          When AWS Organizations creates a member account, it also creates a
          root user for that account. Each root user has its own email address,
          its own password, and its own MFA device — separate from the
          management account's root user. Four accounts means four root users.
        </Paragraph>

        <Paragraph>
          The safest approach is to never use them. Root credentials are
          required only for a small number of account-level operations (changing
          the support plan, closing the account, enabling certain services), but
          for anything else IAM Identity Center provides the access you need.
        </Paragraph>

        <Paragraph>
          Immediately after each account is created, take the following steps:
        </Paragraph>

        <TextList>
          <TextListItem>
            Use email aliases to keep root addresses distinct:{" "}
            <InlineHighlight>aws+dev@company.com</InlineHighlight>,{" "}
            <InlineHighlight>aws+stage@company.com</InlineHighlight>,{" "}
            <InlineHighlight>aws+prod@company.com</InlineHighlight>
          </TextListItem>
          <TextListItem>
            Set a strong, unique password stored in a password manager
          </TextListItem>
          <TextListItem>Enable virtual or hardware MFA</TextListItem>
          <TextListItem>Never create root access keys</TextListItem>
        </TextList>

        <Paragraph>
          The <InlineHighlight>Deny root account usage</InlineHighlight> SCP
          from the SCPs section reinforces this automatically. Even if someone
          discovers a root password, the SCP prevents any API calls from
          succeeding.
        </Paragraph>

        <SectionHeading id="guardduty-security-hub">
          GuardDuty & Security Hub (Org-Level)
        </SectionHeading>

        <Paragraph>
          GuardDuty and Security Hub both support an organisation-level{" "}
          <Strong>delegated admin</Strong> pattern: configure them once in the
          management account and they automatically enrol every current and
          future member account.
        </Paragraph>

        <Paragraph>
          <Strong>GuardDuty</Strong> monitors for threats across all accounts —
          unusual API calls, signs of credential compromise, known malware
          signatures, crypto mining patterns, and network anomalies. When
          enabled at the organisation level, no member account can opt out.
        </Paragraph>

        <Paragraph>
          <Strong>Security Hub</Strong> aggregates findings from GuardDuty,
          Config, Inspector, and Macie into a single compliance dashboard. You
          get a cross-account view of everything in one place without logging
          into each account individually.
        </Paragraph>

        <Paragraph>
          To set this up, designate the management account as the delegated
          administrator for both services, then enable auto-enrol for new
          accounts. Any account that subsequently joins the Organisation will
          have both services enabled automatically. Both services charge
          per-account per-region — with four accounts across two regions, costs
          add up quickly, so budget for this from the start.
        </Paragraph>

        <SectionHeading id="budget-alerts">
          Budget Alerts Per Account
        </SectionHeading>

        <Paragraph>
          Consolidated billing produces one invoice, which is convenient but
          makes it easy for individual environment costs to go unnoticed until
          the total spikes. The solution is account-level budgets.
        </Paragraph>

        <Paragraph>
          Set a monthly spend limit per account and configure alerts at 80%
          forecasted and 100% actual. AWS Budgets supports both email and SNS
          notifications, so alerts can feed into whatever incident channel the
          team already uses.
        </Paragraph>

        <Paragraph>
          The management account should have its own budget too, covering
          org-level services: CloudTrail, Config, IAM Identity Center, and
          GuardDuty across all accounts. These costs are consistent and easy to
          overlook when thinking primarily about workload infrastructure.
        </Paragraph>

        <Paragraph>
          Cost Explorer's filter by Linked Account makes per-environment spend
          visible without relying on resource tags. This is one of the practical
          benefits of the account-per-environment model — cost reporting is a
          side effect of the Organisation structure rather than something you
          have to engineer separately.
        </Paragraph>

        <SectionHeading id="tag-policies">Tag Policies</SectionHeading>

        <Paragraph>
          Tag Policies are an AWS Organizations feature that enforces consistent
          tagging rules across all member accounts. Without them, one team tags
          with <InlineHighlight>env=production</InlineHighlight>, another uses{" "}
          <InlineHighlight>env=prod</InlineHighlight>, and a third uses{" "}
          <InlineHighlight>Environment=Production</InlineHighlight>. Cost
          allocation reports become unreliable and any policies built on tag
          values become inconsistent.
        </Paragraph>

        <Paragraph>
          A tag policy defines the allowed keys and values. For the{" "}
          <InlineHighlight>env</InlineHighlight> tag, the policy specifies that
          the only allowed values are exactly{" "}
          <InlineHighlight>dev</InlineHighlight>,{" "}
          <InlineHighlight>stage</InlineHighlight>, and{" "}
          <InlineHighlight>prod</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          Tag policies operate in two modes. In <Strong>warn mode</Strong>,
          non-compliant resources are flagged in Config but creation is not
          blocked. In <Strong>enforce mode</Strong>, resource creation fails if
          the required tags are missing or do not match the allowed values.
          Starting in warn mode gives teams time to get compliant before
          switching to enforce.
        </Paragraph>

        <Paragraph>
          A minimal set of mandatory tags for any multi-account setup:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>env</InlineHighlight> — the environment (dev /
            stage / prod)
          </TextListItem>
          <TextListItem>
            <InlineHighlight>team</InlineHighlight> — the owning team
          </TextListItem>
          <TextListItem>
            <InlineHighlight>cost-center</InlineHighlight> — for finance
            attribution
          </TextListItem>
          <TextListItem>
            <InlineHighlight>managed-by</InlineHighlight> —{" "}
            <InlineHighlight>terraform</InlineHighlight> for infrastructure
            resources
          </TextListItem>
        </TextList>

        <CodeBlockWithCopy code={awsMultiAccountTagPolicy} />

        <SectionHeading id="cloudtrail">Org-Level CloudTrail</SectionHeading>

        <Paragraph>
          A standard CloudTrail trail captures API calls in the account it lives
          in. An org-level trail captures API calls across{" "}
          <Strong>every account</Strong> in the Organisation, landing them all
          in a single S3 bucket in the management account.
        </Paragraph>

        <Paragraph>
          The critical property of an org-level trail is that member accounts
          cannot disable or modify it. Even a user with{" "}
          <InlineHighlight>AdministratorAccess</InlineHighlight> in a workload
          account cannot stop the trail — it is owned by the management account
          and any attempt to interfere with it from a member account is
          rejected. Combined with the SCP that denies deleting CloudTrail, you
          get an immutable log of all API calls across the entire Organisation.
        </Paragraph>

        <Paragraph>
          AWS Config's Organisation Aggregator works on the same principle — it
          pulls Config compliance findings from all accounts into a single view
          in the management account. One place to see whether any resource in
          any account is out of compliance with your Config rules, without
          logging into each account individually.
        </Paragraph>

        <SectionHeading id="evolve">
          When to Evolve the Architecture
        </SectionHeading>

        <Paragraph>
          The 4-account structure is a solid foundation, but some teams will
          outgrow it. The signal that it is time to evolve is usually that the
          management account starts to do too much — hosting Terraform state and
          CI/CD pipelines alongside billing and SCPs creates coupling that gets
          uncomfortable as the number of workloads grows.
        </Paragraph>

        <Paragraph>
          The natural expansion is to split the management account's platform
          role into a dedicated <Strong>Shared Services</Strong> account, moving
          Terraform state, CI/CD pipelines, and shared infrastructure out of the
          management account. The management account then returns to its pure
          role: billing, SCPs, and IAM Identity Center.
        </Paragraph>

        <Paragraph>
          For teams that want a more opinionated approach with automated account
          vending, <Strong>AWS Control Tower</Strong> provides a pre-built
          landing zone with account factory, pre-configured guardrails, and a
          structured account hierarchy. It is worth considering once you need to
          create accounts frequently or want to enforce a standard baseline
          across a large number of accounts.
        </Paragraph>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSMultiAccountSetup;
