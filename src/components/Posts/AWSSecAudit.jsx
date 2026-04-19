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
import { AWSSVG, AWSIAMSVG, BashSVG } from "../../resources/styles/icons";

const repoUrl = "https://github.com/heyitsmeharv/aws-sec-audit";

const sampleOutput = `AWS Security Scorecard  v1.0.0
Account: 123456789012  |  Region: eu-west-2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IAM
  ✗ [CRITICAL] CIS 1.1  - Root account has no MFA enabled
  ✗ [HIGH]     CIS 1.4  - Access key older than 90 days (AKIA…XYZ)
  ✓ [HIGH]     CIS 1.5  - MFA enabled for all console users
  ✗ [MEDIUM]   CIS 1.16 - AdministratorAccess attached directly to user (john.doe)
  ✓ [LOW]      CIS 1.20 - Support role exists

S3
  ✗ [CRITICAL] CIS 2.1.1 - Bucket my-old-bucket has public access enabled
  ✓ [HIGH]     CIS 2.1.4 - All buckets have server-side encryption enabled
  ✗ [MEDIUM]   CIS 2.1.2 - 3 buckets without versioning enabled
  ✗ [LOW]      CIS 2.1.5 - 2 buckets missing access logging

CloudTrail
  ✓ [CRITICAL] CIS 3.1  - CloudTrail enabled in all regions
  ✗ [HIGH]     CIS 3.2  - Log file validation not enabled on: management-trail
  ✓ [MEDIUM]   CIS 3.7  - CloudTrail encrypted with KMS

KMS
  ✗ [MEDIUM]   CIS 4.1  - 2 CMKs without automatic key rotation enabled

VPC
  ✗ [CRITICAL] CIS 5.2  - Security group sg-0abc123 allows SSH from 0.0.0.0/0
  ✓ [HIGH]     CIS 5.3  - No security groups allow unrestricted RDP access
  ✗ [MEDIUM]   CIS 5.4  - VPC flow logging not enabled on vpc-0def456

Secrets Manager
  ✗ [HIGH]     SM.1     - Secret /prod/db/password not rotated in 127 days
  ✓ [MEDIUM]   SM.2     - All secrets have rotation configured

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score: 58/100  |  Grade: D  |  Passed: 9/18 controls
Critical: 2 failed  |  High: 3 failed  |  Medium: 4 failed  |  Low: 1 failed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

const installUsage = `npm install -g aws-sec-audit

# uses the standard AWS SDK credential chain
aws-sec-audit

# target a named profile and specific region
aws-sec-audit --profile my-profile --region eu-west-2

# write a JSON report instead of terminal output
aws-sec-audit --output json > scorecard.json

# write a standalone HTML report
aws-sec-audit --output html > scorecard.html`;

const scoringTable = `Severity  Weight  Points per passing control
─────────────────────────────────────────────
Critical    10     10
High         7      7
Medium       4      4
Low          1      1

Grade thresholds
─────────────────
A   90 – 100
B   75 – 89
C   60 – 74
D   45 – 59
F    0 – 44`;

const cisControls = `Area             Control    Severity   Title
─────────────────────────────────────────────────────────────────────────────
IAM              CIS 1.1    Critical   MFA enabled for root account
IAM              CIS 1.2    Critical   Hardware MFA enabled for root account
IAM              CIS 1.4    High       Access keys rotated every 90 days
IAM              CIS 1.5    High       MFA enabled for all console users
IAM              CIS 1.6    Critical   No root account access keys exist
IAM              CIS 1.14   Medium     Access keys exist only for active users
IAM              CIS 1.16   High       IAM policies not attached directly to users
IAM              CIS 1.20   Low        Support role exists
S3               CIS 2.1.1  Critical   S3 public access block enabled
S3               CIS 2.1.2  Medium     S3 versioning enabled
S3               CIS 2.1.3  High       MFA delete enabled
S3               CIS 2.1.4  High       Server-side encryption enabled
S3               CIS 2.1.5  Low        S3 access logging enabled
S3               CIS 2.2.1  Medium     Bucket policy blocks cross-account access
CloudTrail       CIS 3.1    Critical   CloudTrail enabled in all regions
CloudTrail       CIS 3.2    High       Log file validation enabled
CloudTrail       CIS 3.3    Critical   CloudTrail S3 bucket not publicly accessible
CloudTrail       CIS 3.4    Medium     CloudTrail integrated with CloudWatch Logs
CloudTrail       CIS 3.7    Medium     CloudTrail logs encrypted at rest with KMS
KMS              CIS 4.1    Medium     CMK automatic key rotation enabled
VPC              CIS 5.1    Critical   No security group allows all-port ingress
VPC              CIS 5.2    Critical   No security group allows unrestricted SSH
VPC              CIS 5.3    Critical   No security group allows unrestricted RDP
VPC              CIS 5.4    Medium     VPC flow logging enabled
Secrets Manager  SM.1       High       Secrets rotated within 90 days
Secrets Manager  SM.2       Medium     Rotation configured on all secrets`;

const dryRun = `aws-sec-audit --fix --dry-run

DRY RUN - no changes will be made

  ✎ CIS 2.1.2  Enable versioning on: my-bucket-1, logs-archive, staging-assets
  ✎ CIS 3.2    Enable log file validation on trail: management-trail
  ✎ CIS 4.1    Enable key rotation on: alias/prod-app-key, alias/backup-key
  ✎ SM.1       Trigger rotation on: /prod/db/password

  4 remediations available. Run without --dry-run to apply.
  Note: CIS 1.1 (root MFA) and CIS 5.2 (open security group) require manual action.`;

const selectiveFix = `# apply only specific controls
aws-sec-audit --fix 2.1.2,4.1

  ✓ CIS 2.1.2  Versioning enabled on: my-bucket-1, logs-archive, staging-assets
  ✓ CIS 4.1    Key rotation enabled on: alias/prod-app-key, alias/backup-key`;

const ciWorkflow = `name: Security Scorecard

on:
  schedule:
    - cron: "0 8 * * 1"   # every Monday at 08:00
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/AwsSecAuditRead
          aws-region: eu-west-2

      - name: Run audit
        run: |
          npx aws-sec-audit --output json > scorecard.json
          # exits with code 2 on D or F - fails the job
        continue-on-error: false

      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: scorecard
          path: scorecard.json`;

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSSecAudit = () => {
  useEffect(() => {
    Analytics.pageview("/blog/aws-sec-audit");
    Analytics.track("blog_page_viewed", {
      slug: "aws-sec-audit",
    });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>AWS Security Scorecard CLI</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSIAMSVG />
            </HeaderIcon>
            <HeaderIcon>
              <BashSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          I've written a lot of theory posts about AWS security services - IAM,
          KMS, CloudTrail, VPC, Secrets Manager. I covered how they work, what
          the controls are, why they matter. I used this project as an excuse to
          see if I could build something useful which encapsulates the above.{" "}
          <TextLink href={repoUrl} target="_blank" rel="noreferrer">
            aws-sec-audit
          </TextLink>{" "}
          is a Node.js CLI that connects to your AWS account, runs 26 CIS
          Foundations Benchmark controls across six services, and gives you a
          grade.
        </Paragraph>

        <Paragraph>
          The idea is simple enough to install in under a minute but structured
          around a real compliance framework - the CIS AWS Foundations Benchmark
          v2.0 - so the findings map to something meaningful rather than being
          an arbitrary checklist which most likely people would not follow.
        </Paragraph>

        <SectionHeading>What Is the CIS Benchmark?</SectionHeading>

        <Paragraph>
          The Center for Internet Security publishes prescriptive configuration
          guides for cloud platforms. The AWS Foundations Benchmark is one of
          them: a numbered list of controls, each with a severity, a rationale,
          and a remediation procedure. Control 1.1 is "ensure MFA is enabled for
          the root account". Control 5.2 is "ensure no security groups allow
          unrestricted inbound SSH". The controls are publicly available, widely
          referenced, and mapped to SOC 2 and PCI DSS by compliance teams.
        </Paragraph>

        <Paragraph>
          Using a real framework instead of inventing my own means the output is
          legible to anyone who's seen a security audit before, and it means
          every finding has a documented rationale rather than just my opinion.
        </Paragraph>

        <SectionHeading>Installation and Usage</SectionHeading>

        <CodeBlockWithCopy code={installUsage} />

        <Paragraph>
          The tool uses the standard AWS SDK v3 credential chain - environment
          variables, shared credentials file, instance profiles, SSO - so
          however you authenticate to AWS today, it'll just pick that up.
        </Paragraph>

        <Banner title="Permissions required" variant="info">
          <Paragraph>
            The audit needs read-only access across the six services it checks.
            The repo includes a ready-made IAM policy (
            <InlineHighlight>AwsSecAuditRead</InlineHighlight>) that covers
            exactly the calls made - nothing broader.
          </Paragraph>
        </Banner>

        <SectionHeading>Sample Output</SectionHeading>

        <Paragraph>
          Running the audit against a real account with a few rough edges looks
          like this:
        </Paragraph>

        <CodeBlockWithCopy code={sampleOutput} />

        <Paragraph>
          Findings are grouped by service and sorted by severity within each
          group. Passing controls show alongside failing ones so you can see
          what's already in good shape. Resource identifiers - bucket names,
          security group IDs, secret ARNs - appear next to each finding so
          there's no ambiguity about what needs fixing.
        </Paragraph>

        <SectionHeading>The Scoring System</SectionHeading>

        <Paragraph>
          Each control has a weighted score based on severity. A passing
          Critical control contributes 10 points; a passing Low contributes 1.
          The final score is a 0-100 percentage of points earned versus points
          possible, which maps to a letter grade.
        </Paragraph>

        <CodeBlockWithCopy code={scoringTable} />

        <Paragraph>
          Weighting by severity means a single open SSH security group moves the
          needle more than three buckets missing access logs - which reflects
          the actual risk difference between those two findings.
        </Paragraph>

        <SectionHeading>Controls Covered</SectionHeading>

        <Paragraph>
          The 26 controls span six service areas. Each maps to a CIS section and
          severity:
        </Paragraph>

        <CodeBlockWithCopy code={cisControls} />

        <SectionHeading>The --fix Flag</SectionHeading>

        <Paragraph>
          Some findings have a safe, non-destructive remediation - enabling S3
          versioning, turning on KMS key rotation, activating CloudTrail log
          file validation. These can be applied automatically. Findings that
          require human judgment - revoking a public S3 bucket that might be
          serving content, removing a security group rule that might be
          intentional - are flagged but never touched automatically.
        </Paragraph>

        <SubSectionHeading>Dry run first</SubSectionHeading>

        <Paragraph>
          Always preview before applying. The{" "}
          <InlineHighlight>--dry-run</InlineHighlight> flag lists every
          remediation that would run without making any API calls.
        </Paragraph>

        <CodeBlockWithCopy code={dryRun} />

        <SubSectionHeading>Selective targeting</SubSectionHeading>

        <Paragraph>
          If you only want to fix specific controls - useful when rolling out
          remediations incrementally - you can pass a comma-separated list of
          control IDs.
        </Paragraph>

        <CodeBlockWithCopy code={selectiveFix} />

        <Banner title="What --fix will never touch" variant="warning">
          <Paragraph>
            Controls that could break a running system - removing public S3
            bucket access, deleting or disabling access keys, modifying security
            group rules - are always reported as manual action required.{" "}
            <InlineHighlight>--fix</InlineHighlight> is for the boring
            configuration toggles that have no downside, not for decisions that
            could take something offline.
          </Paragraph>
        </Banner>

        <SectionHeading>CI Integration</SectionHeading>

        <Paragraph>
          The tool exits with code <InlineHighlight>2</InlineHighlight> when the
          account grades D or F, and code <InlineHighlight>0</InlineHighlight>{" "}
          otherwise. That makes it straightforward to wire into a scheduled
          GitHub Actions workflow that fails if the account regresses below a
          passing grade.
        </Paragraph>

        <CodeBlockWithCopy code={ciWorkflow} />

        <Paragraph>
          Running on a schedule rather than on every push makes more sense for
          an account audit - your security posture doesn't change with every
          commit, but it can drift quietly over time if nobody's watching. A
          weekly run catches that drift before it accumulates.
        </Paragraph>

        <SectionHeading>Notable Design Decisions</SectionHeading>

        <TertiaryHeading>Resilient by default</TertiaryHeading>

        <Paragraph>
          All six service checks run concurrently rather than sequentially. The
          important consequence of that choice is failure isolation - if one
          service check hits a permission error or a transient timeout, it
          produces an UNKNOWN finding for that control and the rest of the audit
          continues unaffected. You shouldn't lose visibility on 25 controls
          because a single IAM call timed out.
        </Paragraph>

        <TertiaryHeading>Consistent finding shape</TertiaryHeading>

        <Paragraph>
          Every check, regardless of which service it targets, produces the same
          finding structure: a control ID, a pass/fail result, the resource it
          applies to, and a message. Severity and CIS metadata live in one
          central place rather than being repeated across each check. That means
          the scoring and reporting logic doesn't need to know anything about
          individual checks - it just processes a flat list of findings in a
          known shape.
        </Paragraph>

        <TertiaryHeading>Least-privilege by design</TertiaryHeading>

        <Paragraph>
          The bundled IAM policy covers exactly the read calls the checks make -
          nothing broader. A security tool that demands wide permissions to
          audit your permissions would be missing the point. If the audit fails
          on a permission error, the answer is to compare against the policy in
          the README, not to widen it until the error goes away.
        </Paragraph>

        <SectionHeading>Honest Limitations</SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Single region</Strong> - the audit targets one region per
            run. Multi-region scanning requires running the tool once per region
            and diffing the outputs; there's no built-in aggregation yet.
          </TextListItem>
          <TextListItem>
            <Strong>No AWS Organizations support</Strong> - scanning across
            multiple accounts requires running the tool with different assumed
            roles. A wrapper script for that is on the roadmap.
          </TextListItem>
          <TextListItem>
            <Strong>S3 MFA delete (CIS 2.1.3)</Strong> - enabling MFA delete
            requires root credentials and cannot be done programmatically via
            the SDK without them. The check detects the state correctly but{" "}
            <InlineHighlight>--fix</InlineHighlight> cannot remediate it.
          </TextListItem>
          <TextListItem>
            <Strong>No historical trending</Strong> - each run is a
            point-in-time snapshot. Storing results to S3 and diffing over time
            is a natural next step but isn't built in yet.
          </TextListItem>
        </TextList>

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          The most useful thing about building this was running it against my
          own account. I had root MFA enabled, which I knew. I had an access key
          I'd forgotten about that was 140 days old! I had KMS key rotation
          disabled on two keys I'd created for a side project and never
          revisited. None of those are embarrassing findings individually, but
          seeing them all together with a score made the drift tangible in a way
          that reading theory posts never does.
        </Paragraph>

        <Paragraph>
          I also came out of it with a much cleaner understanding of how the CIS
          Benchmark is structured - what "Level 1" versus "Level 2" actually
          means, why some controls are scored Critical despite being relatively
          easy to fix (because the blast radius if exploited is enormous), and
          where the gaps in the AWS study posts are. That's probably worth as
          much as the tool itself.
        </Paragraph>

        <Paragraph>Full source on GitHub:</Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href={repoUrl} target="_blank" rel="noreferrer">
              github.com/heyitsmeharv/aws-sec-audit
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSSecAudit;
