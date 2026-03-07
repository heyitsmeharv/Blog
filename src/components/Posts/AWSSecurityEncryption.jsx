import React, { useEffect } from "react";
import styled from "styled-components";

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
  PostImage,
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
  IndentedTextList,
  IndentedTextListItem,
} from "../Typography/Typography";

// icons
import {
  AWSSVG,
  AWSKMSSVG,
  AWSSSMSVG,
  AWSSecretsManagerSVG,
  AWSCertificateManagerSVG,
  AWSShieldSVG,
  AWSFirewallSVG,
  AWSWAFSVG,
  AWSInspectorSVG,
  AWSMacieSVG,
} from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import Table from "../Table/Table";

// images
import TLSSSLExample from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_ssl_tls.jpeg";
import ServerSideEncryption from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_server_rest.jpeg";
import ClientSideEncryption from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_client.jpeg";
import CrossAccountSnapshot from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_cross_account_snapshot.jpeg";
import MultiRegionKeys from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_multi_region_keys.jpeg";
import DynamoDBKMSMultiRegion from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_dynamo_db_kms_multi_region_client_encryption.jpeg";
import AuroraDBKMSMultiRegion from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_aurora_db_kms_multi_region_client_encryption.jpeg";
import AMISharingKMS from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_ami_kms.jpeg";
import SSMParameterStore from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_ssm_parameter_store.jpeg";
import MultiRegionSecrets from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_multi_region_secrets.jpeg";
import AWSACM from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_acm.jpeg";
import AWSACMImportingPublicCertificates from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_acm_importing_public_certs.jpeg";
import AWSACMIntegrationWithALB from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_acm_integration_with_alb.jpeg";
import AWSACMIntegrationWithAPIGateway from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_acm_integration_with_api_gateway.jpeg";
import AWSWAFFixedIP from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_waf_fixed_ip.jpeg";
import AWSGuardDuty from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_guard_duty.jpeg";
import AWSInspector from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_inspector.jpeg";
import AWSMacie from "../../resources/images/blog/AWSSecurityEncryption/aws_security_encryption_macie.jpeg";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSSecurityEncryption = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-encryption" });
  }, []);

  const compareSecretsColumns = ["Feature", "SSM Parameter Store", "AWS Secrets Manager"];
  const compareSecretsData = [
    {
      Feature: "Use Case",
      "SSM Parameter Store": "Configuration & secrets",
      "AWS Secrets Manager": "Primarily secrets",
    },
    {
      Feature: "Encryption",
      "SSM Parameter Store": "KMS (optional)",
      "AWS Secrets Manager": "KMS (mandatory)",
    },
    {
      Feature: "Rotation",
      "SSM Parameter Store": "Manual or Lambda",
      "AWS Secrets Manager": "Automated rotation",
    },
    {
      Feature: "Versioning",
      "SSM Parameter Store": "Yes",
      "AWS Secrets Manager": "Yes",
    },
    {
      Feature: "Pricing",
      "SSM Parameter Store": "Free (except for API calls)",
      "AWS Secrets Manager": "Paid service",
    },
  ];

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Amazon Security & Encryption</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSKMSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSSMSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSecretsManagerSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSCertificateManagerSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSShieldSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSFirewallSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSWAFSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSInspectorSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSMacieSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post we'll explore core{" "}
          <Strong>AWS security and encryption services</Strong>: KMS, SSM
          Parameter Store, Secrets Manager, ACM, and the main protection and
          detection services like WAF, Shield, Firewall Manager, GuardDuty,
          Inspector and Macie.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#aws-encryption-overview">Encryption Overview</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-kms">KMS (Key Management Service)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-multi-region-keys">KMS Multi-Region Keys</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-s3-replication-encryption">S3 Replication Encryption</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-ami-sharing-via-kms">
              AMI Sharing Encrypted via KMS
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-ssm-parameter-store">SSM Parameter Store</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-secrets-manager">AWS Secrets Manager</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-certificate-manager">
              AWS Certificate Manager (ACM)
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-waf">AWS Web Application Firewall (WAF)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-shield">AWS Shield</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-firewall-manager">AWS Firewall Manager</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-guard-duty">AWS GuardDuty</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-inspector">AWS Inspector</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-macie">AWS Macie</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-encryption-overview">
          Encryption Overview
        </SectionHeading>
        <Paragraph>
          Encryption protects sensitive information in transit and at rest by
          transforming plaintext into ciphertext that can only be read with the
          appropriate key. AWS provides multiple mechanisms to handle{" "}
          <Strong>encryption in flight</Strong>,{" "}
          <Strong>server-side encryption</Strong> and{" "}
          <Strong>client-side encryption</Strong>.
        </Paragraph>

        <SubSectionHeading>Encryption in Flight (TLS/SSL)</SubSectionHeading>
        <Paragraph>
          <Strong>Transport Layer Security (TLS)</Strong> - still often referred
          to as SSL - secures data in transit between clients and your
          applications by encrypting the connection.
        </Paragraph>
        <PostImage
          src={TLSSSLExample}
          alt="TLS/SSL encryption in flight example"
        />

        <SubSectionHeading>Server-Side Encryption at Rest</SubSectionHeading>
        <Paragraph>
          With <Strong>server-side encryption</Strong>, AWS services handle
          encrypting data before it is written to disk and decrypting it on
          access. Keys are typically managed by{" "}
          <Strong>AWS KMS or service-owned keys</Strong>.
        </Paragraph>
        <PostImage
          src={ServerSideEncryption}
          alt="Server-side encryption at rest"
        />

        <SubSectionHeading>Client-Side Encryption</SubSectionHeading>
        <Paragraph>
          With <Strong>client-side encryption</Strong>, your application
          encrypts data before sending it to AWS and decrypts it after retrieval.
          AWS only ever sees ciphertext; key management lives entirely on the
          client side (or in your own KMS/HSM).
        </Paragraph>
        <PostImage
          src={ClientSideEncryption}
          alt="Client-side encryption flow"
        />

        <SectionHeading id="aws-kms">KMS (Key Management Service)</SectionHeading>
        <Paragraph>
          <Strong>AWS Key Management Service (KMS)</Strong> is a managed service
          for creating, managing and controlling cryptographic keys used across
          AWS services and your applications. It provides centralised key
          management with fine-grained IAM controls and detailed CloudTrail
          auditing.
        </Paragraph>

        <SubSectionHeading>KMS Key Types</SubSectionHeading>

        <TertiaryHeading>Symmetric CMKs (AES-256)</TertiaryHeading>
        <TextList>
          <TextListItem>
            Single key used to <Strong>encrypt and decrypt</Strong>.
          </TextListItem>
          <TextListItem>
            Most AWS services (S3, EBS, RDS, SQS, DynamoDB, etc.) use{" "}
            <Strong>symmetric CMKs</Strong>.
          </TextListItem>
          <TextListItem>
            You never get raw key material; you must call the{" "}
            <Strong>KMS API</Strong> to use the key.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Asymmetric CMKs (RSA & ECC)</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Public/private key pair</Strong>.
          </TextListItem>
          <TextListItem>
            Used for <Strong>encrypt/decrypt</Strong> or{" "}
            <Strong>sign/verify</Strong> operations.
          </TextListItem>
          <TextListItem>
            Public key is downloadable; private key is never exposed.
          </TextListItem>
          <TextListItem>
            Great when you need encryption <Strong>outside AWS</Strong> by
            parties that can't call the KMS API directly.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Copying Snapshots Across Regions / Accounts</SubSectionHeading>
        <Paragraph>
          When copying <Strong>encrypted EBS snapshots</Strong> across accounts
          or regions, you must ensure the destination has access to the relevant
          KMS keys, and that policies allow decrypt on the source key and
          encrypt on the destination key.
        </Paragraph>
        <PostImage
          src={CrossAccountSnapshot}
          alt="Cross-account encrypted snapshot sharing"
        />

        <SubSectionHeading>Types of KMS Keys & Pricing</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>AWS owned keys</Strong> (no direct visibility):
            SSE-S3/SQS/DynamoDB default.
          </TextListItem>
          <TextListItem>
            <Strong>AWS managed keys</Strong> (for a service, e.g. aws/rds,
            aws/ebs).
          </TextListItem>
          <TextListItem>
            <Strong>Customer managed keys</Strong> (in KMS): typically ~$1/month
            per key.
          </TextListItem>
          <TextListItem>
            <Strong>Imported keys</Strong> (bring your own material): also
            charged at key rate.
          </TextListItem>
          <TextListItem>
            API usage: roughly <Strong>$0.03 per 1,000</Strong> KMS requests.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Key Rotation</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>AWS-managed CMKs</Strong>: rotate automatically every{" "}
            <Strong>year</Strong>.
          </TextListItem>
          <TextListItem>
            <Strong>Customer-managed CMKs</Strong>: can enable automatic
            rotation and also rotate on-demand (by creating new CMKs and moving
            aliases).
          </TextListItem>
          <TextListItem>
            <Strong>Imported keys</Strong>: only manual rotation via aliases.
          </TextListItem>
        </TextList>

        <SubSectionHeading>KMS Key Policies</SubSectionHeading>
        <Paragraph>
          Key policies are similar to S3 bucket policies - they define who can
          use or administer a key. You cannot grant access to a key without a
          key policy (even if IAM says &quot;Allow&quot;).
        </Paragraph>
        <TertiaryHeading>Default Key Policy</TertiaryHeading>
        <TextList>
          <TextListItem>
            Automatically created if you don't specify one.
          </TextListItem>
          <TextListItem>
            Typically grants broad access to the account root (or all IAM users
            in the account).
          </TextListItem>
        </TextList>
        <TertiaryHeading>Custom Key Policy</TertiaryHeading>
        <TextList>
          <TextListItem>
            Precisely define which <Strong>users/roles</Strong> may use or
            administer the key.
          </TextListItem>
          <TextListItem>
            Required for <Strong>cross-account</Strong> KMS usage.
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-multi-region-keys">
          KMS Multi-Region Keys
        </SectionHeading>
        <Paragraph>
          <Strong>Multi-Region keys</Strong> replicate key material across
          regions. Each replica key shares the same key ID and key material, but
          is managed independently in its own region. This enables seamless
          encryption/decryption across regions for multi-region architectures.
        </Paragraph>
        <PostImage
          src={MultiRegionKeys}
          alt="KMS multi-region keys overview"
        />

        <SubSectionHeading>
          DynamoDB Global Tables & Aurora Global with KMS
        </SubSectionHeading>
        <Paragraph>
          For multi-region databases, you can combine{" "}
          <Strong>multi-region KMS keys</Strong> with{" "}
          <Strong>client-side encryption</Strong> for end-to-end protection.
        </Paragraph>
        <PostImage
          src={DynamoDBKMSMultiRegion}
          alt="DynamoDB Global Tables with KMS and client-side encryption"
        />
        <PostImage
          src={AuroraDBKMSMultiRegion}
          alt="Aurora Global Database with KMS and client-side encryption"
        />

        <SectionHeading id="aws-s3-replication-encryption">
          S3 Replication Encryption
        </SectionHeading>
        <Paragraph>
          When using <Strong>Amazon S3 Replication</Strong> with encryption,
          there are several key considerations to keep replication secure and
          compliant.
        </Paragraph>

        <SubSectionHeading>
          Source and Destination Encryption Compatibility
        </SubSectionHeading>
        <IndentedTextList>
          <IndentedTextListItem>
            Unencrypted objects and SSE-S3 objects are replicated by default.
          </IndentedTextListItem>
          <IndentedTextListItem>
            If using <Strong>SSE-KMS</Strong>, both source and destination
            buckets must use compatible KMS keys.
          </IndentedTextListItem>
          <IndentedTextListItem>
            The replication IAM role must have <Strong>Decrypt</Strong> on the
            source KMS key and <Strong>Encrypt</Strong> on the destination KMS
            key.
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>
          Enabling Replication with Encrypted Objects
        </SubSectionHeading>
        <TextList>
          <TextListItem>
            Only objects written <Strong>after</Strong> replication is enabled
            are replicated by default.
          </TextListItem>
          <TextListItem>
            Use <Strong>Batch Replication</Strong> to replicate existing objects.
          </TextListItem>
        </TextList>

        <SubSectionHeading>
          Changing Encryption During Replication
        </SubSectionHeading>
        <Paragraph>
          If a source object's encryption is changed (for example
          SSE-S3 → SSE-KMS), replication does not automatically re-replicate it;
          again, Batch Replication or manual processes are needed.
        </Paragraph>

        <SectionHeading id="aws-ami-sharing-via-kms">
          AMI Sharing Process Encrypted via KMS
        </SectionHeading>
        <Paragraph>
          You can securely share an <Strong>encrypted AMI</Strong> across
          accounts using KMS:
        </Paragraph>
        <TextList>
          <TextListItem>
            <Strong>Grant launch permission</Strong> - modify AMI properties in
            Account A to allow Account B to launch it.
          </TextListItem>
          <TextListItem>
            <Strong>Share the KMS key</Strong> - update key policy so Account B
            can use the CMK that encrypted the AMI's volumes.
          </TextListItem>
          <TextListItem>
            <Strong>Set up IAM in Account B</Strong> - role or user with
            permissions to use the AMI and CMK (DescribeKey, Decrypt,
            CreateGrant, ReEncrypt, etc.).
          </TextListItem>
          <TextListItem>
            <Strong>Launch EC2 instance</Strong> - Account B can now launch from
            the shared AMI and optionally re-encrypt volumes with its own CMK.
          </TextListItem>
        </TextList>
        <Paragraph>
          This ensures secure AMI sharing and proper encryption management across
          accounts.
        </Paragraph>
        <PostImage src={AMISharingKMS} alt="AMI sharing with KMS across accounts" />

        <SectionHeading id="aws-ssm-parameter-store">
          SSM Parameter Store
        </SectionHeading>
        <Paragraph>
          <Strong>AWS Systems Manager Parameter Store</Strong> is a central,
          secure store for configuration and secrets. Typical use cases include:
        </Paragraph>
        <TextList>
          <TextListItem>Database connection strings</TextListItem>
          <TextListItem>API keys</TextListItem>
          <TextListItem>Passwords</TextListItem>
          <TextListItem>Application config flags</TextListItem>
          <TextListItem>Environment variables</TextListItem>
        </TextList>
        <PostImage
          src={SSMParameterStore}
          alt="SSM Parameter Store architecture"
        />

        <SectionHeading id="aws-secrets-manager">AWS Secrets Manager</SectionHeading>
        <Paragraph>
          <Strong>AWS Secrets Manager</Strong> is a fully managed service for
          securely storing, rotating and managing secrets such as:
        </Paragraph>
        <TextList>
          <TextListItem>Database credentials (RDS, Redshift, etc.)</TextListItem>
          <TextListItem>API keys and OAuth tokens</TextListItem>
          <TextListItem>Application credentials</TextListItem>
          <TextListItem>Encryption keys and other sensitive config data</TextListItem>
        </TextList>
        <Paragraph>
          It's ideal where you need{" "}
          <Strong>automatic rotation</Strong>, centralised secrets governance
          and tight integration with AWS services.
        </Paragraph>

        <SubSectionHeading>Secrets Manager vs SSM Parameter Store</SubSectionHeading>
        <Table columns={compareSecretsColumns} data={compareSecretsData} />

        <SubSectionHeading>Multi-Region Secrets</SubSectionHeading>
        <Paragraph>
          Secrets Manager can <Strong>replicate secrets</Strong> to multiple
          regions as read replicas, keeping them in sync with the primary
          secret. You can also <Strong>promote</Strong> a replica to become a
          standalone secret for regional independence.
        </Paragraph>
        <PostImage
          src={MultiRegionSecrets}
          alt="Multi-region secrets in AWS Secrets Manager"
        />

        <SectionHeading id="aws-certificate-manager">
          AWS Certificate Manager (ACM)
        </SectionHeading>
        <Paragraph>
          <Strong>AWS Certificate Manager (ACM)</Strong> manages the lifecycle
          of SSL/TLS certificates for use with AWS services (and some internal
          resources). It handles issuance, renewal and deployment, helping you
          secure traffic with minimal overhead.
        </Paragraph>
        <PostImage src={AWSACM} alt="AWS Certificate Manager overview" />

        <SubSectionHeading>Requesting Public Certificates</SubSectionHeading>
        <Paragraph>
          To request a public ACM certificate, you:
        </Paragraph>
        <TextList>
          <TextListItem>
            Request a public certificate and specify domain names (including
            wildcards if needed).
          </TextListItem>
          <TextListItem>
            Validate ownership via <Strong>DNS</Strong> (CNAME record) or{" "}
            <Strong>email</Strong>.
          </TextListItem>
          <TextListItem>
            Once validated, ACM issues the certificate, which can be used with
            ALB, CloudFront, API Gateway, etc.
          </TextListItem>
          <TextListItem>
            ACM automatically renews <Strong>DNS-validated</Strong> public
            certs; email validation requires manual approval at renewal.
          </TextListItem>
          <TextListItem>
            Public ACM certs <Strong>cannot be exported</Strong> for external
            use.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Importing Public Certificates</SubSectionHeading>
        <Paragraph>
          You can import existing public certificates into ACM. There is{" "}
          <Strong>no automatic renewal</Strong> for imports - you must re-import
          new certs before expiry. ACM emits <Strong>expiration events</Strong>{" "}
          (e.g. from 45 days before expiry), and AWS Config provides a managed
          rule <Strong>acm-certificate-expiration-check</Strong> to track
          expiring certs.
        </Paragraph>
        <PostImage
          src={AWSACMImportingPublicCertificates}
          alt="Importing public certificates into ACM"
        />

        <SubSectionHeading>Integration with ALB</SubSectionHeading>
        <Paragraph>
          ACM integrates directly with <Strong>Application Load Balancers</Strong>{" "}
          to terminate TLS at the load balancer. Certificates are selected per
          listener, and ACM handles rotation transparently.
        </Paragraph>
        <PostImage
          src={AWSACMIntegrationWithALB}
          alt="ACM with Application Load Balancer"
        />

        <SubSectionHeading>API Gateway Endpoint Types</SubSectionHeading>
        <TertiaryHeading>Edge-Optimised (default)</TertiaryHeading>
        <IndentedTextList>
          <IndentedTextListItem>
            Requests are routed via <Strong>CloudFront edge locations</Strong>{" "}
            to reduce latency for global clients.
          </IndentedTextListItem>
          <IndentedTextListItem>
            API Gateway itself still lives in a single region.
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Regional</TertiaryHeading>
        <IndentedTextList>
          <IndentedTextListItem>
            For clients mainly within the same region.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Can be combined manually with a custom CloudFront distribution for
            more control.
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Private</TertiaryHeading>
        <IndentedTextList>
          <IndentedTextListItem>
            Accessible only from your VPC via <Strong>interface VPC endpoints</Strong>{" "}
            (ENIs).
          </IndentedTextListItem>
          <IndentedTextListItem>
            Access controlled via <Strong>resource policies</Strong>.
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>ACM Integration with API Gateway</SubSectionHeading>
        <TextList>
          <TextListItem>
            For <Strong>edge-optimised</Strong> APIs, the ACM certificate must
            be in <Strong>us-east-1</Strong> (CloudFront region).
          </TextListItem>
          <TextListItem>
            For <Strong>regional</Strong> APIs, the ACM certificate must be in
            the <Strong>same region</Strong> as the API.
          </TextListItem>
        </TextList>
        <PostImage
          src={AWSACMIntegrationWithAPIGateway}
          alt="ACM certificates with API Gateway"
        />

        <SectionHeading id="aws-waf">AWS Web Application Firewall (WAF)</SectionHeading>
        <Paragraph>
          <Strong>AWS WAF</Strong> protects web applications from common web
          exploits (SQL injection, XSS, bad bots, etc.) by inspecting HTTP(S)
          requests and applying <Strong>Web ACL</Strong> rules before they reach
          your backend.
        </Paragraph>
        <Paragraph>WAF can be attached to:</Paragraph>
        <TextList>
          <TextListItem>Application Load Balancers (ALB)</TextListItem>
          <TextListItem>Amazon API Gateway</TextListItem>
          <TextListItem>CloudFront distributions</TextListItem>
          <TextListItem>AppSync GraphQL APIs</TextListItem>
          <TextListItem>Cognito User Pools</TextListItem>
        </TextList>

        <SubSectionHeading>Web ACLs & Rules</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Web ACLs</Strong> contain rules that inspect request
            components (IP, headers, query strings, body, URI, etc.).
          </TextListItem>
          <TextListItem>
            You can define up to <Strong>10,000 IP addresses</Strong> per IP set.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Individual Rules</TertiaryHeading>
        <TextList>
          <TextListItem>
            Can match on IPs, string patterns, SQL injection signatures, XSS
            patterns, geo-match, rate-based rules for basic DDoS mitigation,
            etc.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Rule Actions</TertiaryHeading>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Block</Strong> - immediately reject the request.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Allow</Strong> - explicitly permit.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Count</Strong> - log for monitoring without affecting
            outcome.
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Rule Groups & Managed Rules</TertiaryHeading>
        <TextList>
          <TextListItem>
            Group rules into <Strong>rule groups</Strong> for reuse.
          </TextListItem>
          <TextListItem>
            Use AWS and partner <Strong>managed rule groups</Strong> for
            out-of-the-box protection against common threats.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Fixed IP with WAF & Load Balancer</SubSectionHeading>
        <Paragraph>
          WAF does not support Network Load Balancers directly. To have{" "}
          <Strong>fixed IP addresses</Strong> plus WAF protection you can use{" "}
          <Strong>AWS Global Accelerator</Strong> in front of an ALB that has
          WAF attached.
        </Paragraph>
        <PostImage
          src={AWSWAFFixedIP}
          alt="Using Global Accelerator + ALB + WAF for fixed IP"
        />

        <SectionHeading id="aws-shield">AWS Shield</SectionHeading>
        <Paragraph>
          <Strong>AWS Shield</Strong> provides DDoS protection for resources
          running on AWS.
        </Paragraph>

        <SubSectionHeading>Tiers of Service</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Shield Standard</Strong>: enabled by default at no
            additional cost; protects against most common network and transport
            layer DDoS attacks.
          </TextListItem>
          <TextListItem>
            <Strong>Shield Advanced</Strong>: adds enhanced detection and
            mitigation, cost protection, detailed visibility and{" "}
            <Strong>24/7 access</Strong> to the AWS DDoS Response Team (DRT).
          </TextListItem>
        </TextList>

        <SectionHeading id="aws-firewall-manager">
          AWS Firewall Manager
        </SectionHeading>
        <Paragraph>
          <Strong>AWS Firewall Manager</Strong> centralises the management and
          enforcement of security policies across a multi-account AWS
          environment (via AWS Organizations).
        </Paragraph>

        <SubSectionHeading>Centralised Management</SubSectionHeading>
        <Paragraph>
          It lets security teams define <Strong>organisation-wide</Strong>{" "}
          policies for:
        </Paragraph>
        <TextList>
          <TextListItem>AWS WAF Web ACLs</TextListItem>
          <TextListItem>AWS Shield Advanced protections</TextListItem>
          <TextListItem>VPC security group policies</TextListItem>
          <TextListItem>Network Firewall policies (if used)</TextListItem>
        </TextList>

        <SubSectionHeading>Policy Enforcement</SubSectionHeading>
        <Paragraph>
          Firewall Manager automatically applies and keeps policies in sync as
          accounts and resources are added, helping maintain consistent security
          posture and reducing configuration drift.
        </Paragraph>

        <SectionHeading id="aws-guard-duty">AWS GuardDuty</SectionHeading>
        <Paragraph>
          <Strong>AWS GuardDuty</Strong> is a managed threat detection service
          that continuously analyses AWS data sources (CloudTrail, VPC Flow
          Logs, DNS logs, etc.) for <Strong>malicious or unauthorised activity</Strong>.
        </Paragraph>
        <Paragraph>
          It uses ML, anomaly detection and threat intelligence feeds to spot
          issues like compromised IAM credentials, reconnaissance, data
          exfiltration, and even crypto-mining attacks (dedicated findings for
          this).
        </Paragraph>
        <PostImage src={AWSGuardDuty} alt="AWS GuardDuty high-level diagram" />

        <SectionHeading id="aws-inspector">AWS Inspector</SectionHeading>
        <Paragraph>
          <Strong>AWS Inspector</Strong> is an automated vulnerability
          management service that scans your AWS workloads for{' '}
          <Strong>CVEs and security issues</Strong>.
        </Paragraph>
        <Paragraph>
          It continuously analyses EC2 instances, container images (e.g. in ECR)
          and other supported resources to identify vulnerabilities,
          misconfigurations, and deviations from security best practices.
        </Paragraph>
        <PostImage src={AWSInspector} alt="AWS Inspector vulnerability scanning" />

        <SectionHeading id="aws-macie">AWS Macie</SectionHeading>
        <Paragraph>
          <Strong>AWS Macie</Strong> is a managed data security and privacy
          service that uses ML to discover and protect{" "}
          <Strong>sensitive data in S3</Strong>.
        </Paragraph>
        <Paragraph>
          It automatically identifies and classifies data such as PII, financial
          data or intellectual property, helping you understand{" "}
          <Strong>what sensitive data you have and where it lives</Strong>, and
          to maintain compliance with data protection requirements.
        </Paragraph>
        <PostImage src={AWSMacie} alt="AWS Macie sensitive data discovery" />

        <SectionHeading id="references">References</SectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/kms/latest/developerguide/overview.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Key Management Service - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Systems Manager Parameter Store
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Secrets Manager - User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Certificate Manager - Overview
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS WAF - Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS GuardDuty - What Is GuardDuty?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/inspector/latest/user/getting-started.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Inspector - Getting Started
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Macie - What Is Macie?
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSSecurityEncryption;
