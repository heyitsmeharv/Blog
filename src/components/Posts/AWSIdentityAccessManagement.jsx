import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import {
  AWSSVG,
  AWSIAMSVG,
  AWSOrganisationsSVG,
  AWSControlTowerSVG,
} from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
  PostImage,
  ContentRow,
  ContentRowTop,
  InlinePostImage,
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
} from "../Typography/Typography";

// images
import IAMPolicyInheritance from "../../resources/images/blog/AWSIdentityAccessManagement/iam.jpeg";
import IAMPolicyInheritance2 from "../../resources/images/blog/AWSIdentityAccessManagement/iam_2.jpeg";
import IAMPolicyInheritance3 from "../../resources/images/blog/AWSIdentityAccessManagement/iam_3.jpeg";
import IAMPolicyInheritance4 from "../../resources/images/blog/AWSIdentityAccessManagement/iam_4.jpeg";
import IAMRole from "../../resources/images/blog/AWSIdentityAccessManagement/iam_5.jpeg";
import IAMPolicyExample from "../../resources/images/blog/AWSIdentityAccessManagement/policy_example.png";
import OrganisationsExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_organisations.jpeg";
import OrganisationSCPHeirarchyExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_organisations_scp.jpeg";
import OrganisationalUnitsExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_organisational_units.jpeg";
import IAMConditionRestrictIP from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_condition_restrict_ip.jpeg";
import IAMConditionRestrictRegion from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_condition_restrict_region.jpeg";
import IAMConditionRestrictTags from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_condition_restrict_tags.jpeg";
import IAMConditionEnforceMFA from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_condition_enforce_mfa.jpeg";
import IAMForS3 from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_for_s3.jpeg";
import IAMPrincipalOrgId from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_principal_org_id.jpeg";
import IAMPrincipalOrgId2 from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_principal_org_id2.jpeg";
import IAMRolesResourcePolicies from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_roles_resource_policies.jpeg";
import IAMPermissionBoundary from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_permission_boundary.jpeg";
import IAMPermissionBoundaryExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_permission_boundary_example.jpeg";
import IAMIdentityCenter from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_identity_center.jpeg";
import IAMIdentityCenter2 from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_identity_center2.jpeg";
import PolicyEvaluationSingleAccountRole from "../../resources/images/blog/AWSIdentityAccessManagement/PolicyEvaluationSingleAccountRole.png";
import ControlTowerExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_control_tower.jpeg";

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSIdentityAccessManagement = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-iam" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>AWS Identity and Access Management (IAM)</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSIAMSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSOrganisationsSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSControlTowerSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          This is the first of my AWS series blog posts where I'll be going
          through the Identity and Access Management service, also known as IAM.
          I'm hoping this will serve as a refresher or a quick reference guide
          for those familiar with IAM, or help you get to grips with the basics
          if you're not familiar with the service at all.
        </Paragraph>

        <Paragraph>Let's start by outlining some useful information:</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>IAM:</Strong> Identity and Access Management is a{" "}
            <Strong>global</Strong> service (it isn't region specific).
          </TextListItem>
          <TextListItem>
            <Strong>Root account:</Strong> created by default and should not be
            used for day-to-day work or shared.
          </TextListItem>
          <TextListItem>
            <Strong>Users:</Strong> people (or identities) within your
            organisation.
          </TextListItem>
          <TextListItem>
            <Strong>Groups:</Strong> contain users, but not other groups.
          </TextListItem>
          <TextListItem>
            <Strong>Roles:</Strong> used by AWS services (like EC2 instances) or
            external identities to assume permissions.
          </TextListItem>
          <TextListItem>
            <Strong>Policies:</Strong> JSON or YAML documents that define
            permissions for users, groups, or roles. You should apply the{" "}
            <Strong>least privilege principle</Strong> - don't give more
            permissions than a user or service needs.
          </TextListItem>
        </TextList>

        <SectionHeading>IAM Policy Inheritance</SectionHeading>

        <Paragraph>
          Let's say we have a group of developers and we want to apply
          permissions to that group. To do that, we attach a{" "}
          <Strong>policy</Strong> to the group.
        </Paragraph>

        <ContentRow>
          <InlinePostImage src={IAMPolicyInheritance} alt="IAM policy attached to a developer group" />
          <Paragraph>
            A <Strong>policy</Strong> explicitly defines which services and
            actions are accessible. Once the policy has been added to the group,
            every user in that group inherits those permissions.
          </Paragraph>
        </ContentRow>

        <Paragraph>
          Now let's say we have another group in the organisation called{" "}
          <Strong>Operations</Strong>. The users in this group
          would typically have a different set of permissions than the users in{" "}
          <Strong>Developers</Strong> because this group has a
          different <Strong>policy</Strong> attached.
        </Paragraph>

        <PostImage src={IAMPolicyInheritance2} alt="IAM policies attached to different groups" />

        <Paragraph>
          It's not mandatory for a user to be a member of a group - you can
          assign inline policies directly to a user to define their access.
        </Paragraph>

        <PostImage src={IAMPolicyInheritance3} alt="Inline policy attached to IAM user" />

        <Paragraph>
          It's also important to note that users can belong to more than one
          group, meaning they inherit the combined permissions of all attached{" "}
          <Strong>policies</Strong>.
        </Paragraph>

        <PostImage src={IAMPolicyInheritance4} alt="IAM user in multiple groups inheriting policies" />

        <SectionHeading>IAM Policy Structure</SectionHeading>

        <Paragraph>
          Here is an example of a policy written in YAML (policies can also be
          written in JSON):
        </Paragraph>

        <PostImage src={IAMPolicyExample} alt="Example of an IAM policy structure" />

        <Paragraph>Statements typically consist of:</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Sid:</Strong> optional identifier for the statement.
          </TextListItem>
          <TextListItem>
            <Strong>Effect:</Strong> whether the statement <Strong>allows</Strong> or{" "}
            <Strong>denies</Strong> access.
          </TextListItem>
          <TextListItem>
            <Strong>Principal:</Strong> the account, user, or role to which the
            policy applies (mainly in resource-based policies).
          </TextListItem>
          <TextListItem>
            <Strong>Action:</Strong> list of actions this policy allows or denies
            (for example, <Strong>s3:PutObject</Strong>).
          </TextListItem>
          <TextListItem>
            <Strong>Resource:</Strong> list of resources to which the actions
            apply.
          </TextListItem>
          <TextListItem>
            <Strong>Condition:</Strong> additional constraints for when the
            policy is in effect (optional).
          </TextListItem>
        </TextList>

        <SectionHeading>IAM Roles</SectionHeading>

        <ContentRowTop>
          <Paragraph>
            The last core IAM component to cover here is <Strong>roles</Strong>.
            Just as a user requires permissions, AWS services performing actions
            on your behalf also need permissions. To enable that, we create and
            assign <Strong>roles</Strong>.
            <br />
            <br />
            A common example is an EC2 instance needing to access an AWS
            service. For that to happen, the EC2 instance must have a role
            attached which states what it can do and with which services.
          </Paragraph>
          <InlinePostImage src={IAMRole} alt="IAM role assigned to EC2" />
        </ContentRowTop>

        <SectionHeading>AWS Organizations</SectionHeading>

        <Paragraph>
          AWS Organizations is a service that helps you centrally manage and
          govern multiple AWS accounts within a single organisation. It provides
          features such as consolidated billing, policy-based account
          management, security controls, and automation, making it easier to
          scale AWS usage securely and efficiently.
        </Paragraph>

        <PostImage src={OrganisationsExample} alt="AWS Organizations account structure example" />

        <SectionHeading>Organisational Units (OU) - Examples</SectionHeading>

        <PostImage src={OrganisationalUnitsExample} alt="AWS Organizations OU example" />

        <SectionHeading>Organisation SCP Hierarchy</SectionHeading>

        <PostImage
          src={OrganisationSCPHeirarchyExample}
          alt="AWS Organizations Service Control Policy hierarchy example"
        />

        <Paragraph>
          Here's a simplified description of how Service Control Policies (SCPs)
          affect different accounts in this example hierarchy:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Management Account:</Strong> can do anything; SCPs don't
            restrict the management account.
          </TextListItem>
          <TextListItem>
            <Strong>Account A:</Strong> can do anything except:
            <TextList>
              <TextListItem>
                <Strong>S3:</Strong> explicit deny from the Sandbox OU.
              </TextListItem>
              <TextListItem>
                <Strong>EC2:</Strong> explicit deny on EC2.
              </TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>
            <Strong>Accounts B &amp; C:</Strong> can do anything except:
            <TextList>
              <TextListItem>
                <Strong>S3:</Strong> explicit deny from the Sandbox OU.
              </TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>
            <Strong>Account D:</Strong> can access EC2 (but may have other
            restrictions via SCPs).
          </TextListItem>
          <TextListItem>
            <Strong>Prod OU and Accounts E &amp; F:</Strong> can do anything;
            no SCPs applied in this example.
          </TextListItem>
        </TextList>

        <SectionHeading>IAM Conditions</SectionHeading>

        <SubSectionHeading>Restrict via IP Address</SubSectionHeading>

        <Paragraph>
          Here is an example of a policy that restricts API calls to specific IP
          addresses.
        </Paragraph>

        <PostImage src={IAMConditionRestrictIP} alt="IAM condition restricting IP addresses" />

        <SubSectionHeading>Restrict via Region</SubSectionHeading>

        <Paragraph>
          This example shows how to restrict API calls to specific AWS regions.
        </Paragraph>

        <PostImage src={IAMConditionRestrictRegion} alt="IAM condition restricting regions" />

        <SubSectionHeading>Restrict based on Tags</SubSectionHeading>

        <Paragraph>
          This example shows how to allow users to start and stop EC2 instances
          only if they belong to a certain group or if the instance itself is
          tagged with a specific value.
        </Paragraph>

        <PostImage src={IAMConditionRestrictTags} alt="IAM condition using tags" />

        <SubSectionHeading>Enforce MFA</SubSectionHeading>

        <Paragraph>
          This example allows users to do anything in EC2, but restricts them
          from stopping or terminating EC2 instances unless MFA is present.
        </Paragraph>

        <PostImage src={IAMConditionEnforceMFA} alt="IAM condition enforcing MFA" />

        <SectionHeading>IAM for S3</SectionHeading>

        <Paragraph>
          For S3, you can define <Strong>bucket-level</Strong> and{" "}
          <Strong>object-level</Strong> permissions. In this example:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>s3:ListBucket</Strong> applies to{" "}
            <Strong>arn:aws:s3:::test</Strong> (bucket level).
          </TextListItem>
          <TextListItem>
            <Strong>s3:PutObject</Strong>,{" "}
            <Strong>s3:GetObject</Strong>,{" "}
            <Strong>s3:DeleteObject</Strong> apply to{" "}
            <Strong>arn:aws:s3:::test/*</Strong> (object level).
          </TextListItem>
        </TextList>

        <PostImage src={IAMForS3} alt="IAM policy for S3 bucket and object level" />

        <SectionHeading>Principal Org ID</SectionHeading>

        <Paragraph>
          The <Strong>aws:PrincipalOrgID</Strong> condition
          key can be used in a resource policy to allow access only to accounts
          that are members of a specific AWS Organization.
        </Paragraph>

        <PostImage src={IAMPrincipalOrgId} alt="PrincipalOrgID condition example 1" />
        <PostImage src={IAMPrincipalOrgId2} alt="PrincipalOrgID condition example 2" />

        <SectionHeading>IAM Roles vs Resource-based Policies</SectionHeading>

        <Paragraph>
          When calling APIs across different accounts, you typically have two
          main options:
        </Paragraph>

        <Paragraph>
          Attach a <Strong>resource-based policy</Strong> directly to the
          resource (for example, an S3 bucket policy).
          Use an <Strong>IAM role</Strong> as a proxy and{" "}
          <Strong>assume</Strong> that role from another account.
        </Paragraph>

        <Paragraph>
          It's worth noting that when you assume a role, you give up your
          original permissions and take on the permissions assigned to the role.
          With a resource-based policy, the principal keeps their existing
          permissions and gains the additional access granted by the resource
          policy.
        </Paragraph>

        <PostImage
          src={IAMRolesResourcePolicies}
          alt="IAM roles vs resource-based policies diagram"
        />

        <SectionHeading>IAM Permission Boundaries</SectionHeading>

        <Paragraph>
          IAM permission boundaries are supported for <Strong>users</Strong> and{" "}
          <Strong>roles</Strong> (not groups). They can be used alongside AWS
          Organizations SCPs and identity-based policies to limit the{" "}
          <Strong>maximum</Strong> permissions an identity can have.
        </Paragraph>

        <PostImage
          src={IAMPermissionBoundary}
          alt="IAM permission boundary concept diagram"
        />

        <Paragraph>
          Permission boundaries act as guardrails: even if a user or role is
          granted broader permissions through policies, they can&apos;t exceed
          the limits defined by the boundary.
        </Paragraph>

        <Paragraph>Here is an example of a permission boundary policy:</Paragraph>

        <PostImage
          src={IAMPermissionBoundaryExample}
          alt="Example IAM permission boundary policy"
        />

        <Paragraph>
          In this example, no matter what permissions the role is given, it will
          never be able to do anything outside of S3. If an admin attaches an
          IAM policy allowing <Strong>ec2:*</Strong>, the
          permission boundary prevents the role from using EC2.
        </Paragraph>

        <Paragraph>
          Permission boundaries are useful when you want to delegate IAM role
          creation without losing control over what permissions those roles can
          ultimately have, and to prevent privilege escalation.
        </Paragraph>

        <SectionHeading>IAM Policy Evaluation Logic</SectionHeading>

        <Paragraph>
          The following flow chart shows how a policy evaluation decision is
          made for an IAM role within a single account:
        </Paragraph>

        <PostImage
          src={PolicyEvaluationSingleAccountRole}
          alt="IAM policy evaluation flow chart for a single account role"
        />

        <SectionHeading>IAM Identity Center</SectionHeading>

        <Paragraph>
          AWS IAM Identity Center (formerly AWS Single Sign-On) is a centralised
          service that simplifies managing user identities and permissions
          across AWS accounts and integrated business applications. Identities
          can come from the built-in identity store or from an external identity
          provider like Okta.
        </Paragraph>

        <PostImage
          src={IAMIdentityCenter}
          alt="IAM Identity Center architecture example"
        />

        <Paragraph>
          You can assign permissions to groups by attaching permission sets or
          policies to the group and then mapping that group to accounts or OUs.
        </Paragraph>

        <PostImage
          src={IAMIdentityCenter2}
          alt="IAM Identity Center group-to-account assignments"
        />

        <SectionHeading>Control Tower</SectionHeading>

        <Paragraph>
          AWS Control Tower is a managed service that simplifies setting up and
          governing a secure, multi-account AWS environment following best
          practices. It leverages AWS Landing Zone concepts to enforce security,
          compliance, and governance across multiple accounts.
        </Paragraph>

        <SubSectionHeading>Guardrails</SubSectionHeading>

        <Paragraph>
          Guardrails in AWS Control Tower are preconfigured governance rules
          that help maintain security, compliance, and best practices across AWS
          accounts. They ensure that your AWS environments adhere to
          organisational policies without manual intervention.
        </Paragraph>

        <PostImage
          src={ControlTowerExample}
          alt="AWS Control Tower guardrails example"
        />

        <SectionHeading>References</SectionHeading>

        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS IAM User Guide - What is IAM?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Organizations - Introduction
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html"
              target="_blank"
              rel="noreferrer"
            >
              IAM Policies and Permissions
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_conditions.html"
              target="_blank"
              rel="noreferrer"
            >
              IAM JSON Policy Elements: Condition
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html"
              target="_blank"
              rel="noreferrer"
            >
              IAM Permission Boundaries
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS IAM Identity Center - What is it?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Control Tower - What is AWS Control Tower?
            </TextLink>
          </TextListItem>
        </TextList>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default AWSIdentityAccessManagement;