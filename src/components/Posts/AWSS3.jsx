import React, { useEffect } from "react";

// helpers
import { Analytics } from "../../helpers/analytics";

// icons
import {
  AWSSVG,
  AWSS3SVG,
  AWSSnowSVG,
  AWSFSXSVG,
  AWSStorageGatewaySVG,
  AWSTransferFamilySVG,
  AWSDataSyncSVG,
} from "../../resources/styles/icons";

// layout
import BackButton from "../Button/BackButton";
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
  Paragraph,
  Strong,
  TextLink,
  TextList,
  TextListItem,
  IndentedTextList,
  IndentedTextListItem,
  TertiaryHeading,
} from "../Typography/Typography";

// components
import Table from "../Table/Table";

// images
import S3Objects from "../../resources/images/blog/AWSS3/s3_objects.jpeg";
import S3Versions from "../../resources/images/blog/AWSS3/s3_versions.jpeg";
import S3LifecycleRule from "../../resources/images/blog/AWSS3/s3_lifecycle_rule.jpeg";
import S3RequesterPaysBucket from "../../resources/images/blog/AWSS3/s3_requester_pays_bucket.jpeg";
import S3EventDestination from "../../resources/images/blog/AWSS3/s3_event_destination.jpeg";
import S3MultiPartUpload from "../../resources/images/blog/AWSS3/s3_multi_part_upload.jpeg";
import S3TransferAcceleration from "../../resources/images/blog/AWSS3/s3_transfer_acceleration.jpeg";
import S3StorageLens from "../../resources/images/blog/AWSS3/s3_storage_lens.jpeg";
import S3EncryptionSSES3 from "../../resources/images/blog/AWSS3/s3_encryption_sse_s3.jpeg";
import S3EncryptionSSEKMS from "../../resources/images/blog/AWSS3/s3_encryption_sse_kms.jpeg";
import S3EncryptionSSEC from "../../resources/images/blog/AWSS3/s3_encryption_sse_c.jpeg";
import CORS from "../../resources/images/blog/AWSS3/s3_cors.jpeg";
import S3CORS from "../../resources/images/blog/AWSS3/s3_with_cors.jpeg";
import S3AccessPoints from "../../resources/images/blog/AWSS3/s3_access_points.jpeg";
import S3AccessPointsVPCOrigin from "../../resources/images/blog/AWSS3/s3_access_points_vpc_origin.jpeg";
import S3ObjectLambda from "../../resources/images/blog/AWSS3/s3_object_lambda.jpeg";
import SnowballGlacier from "../../resources/images/blog/AWSS3/aws_storage_extras_snowball_glacier.jpeg";
import FSxSupport from "../../resources/images/blog/AWSS3/aws_storage_extras_fsx.jpeg";
import FSxScratchFileSystem from "../../resources/images/blog/AWSS3/aws_storage_extras_fsx_scratch_file_system.jpeg";
import FSxPersistantFileSystem from "../../resources/images/blog/AWSS3/aws_storage_extras_fsx_persistent_file_system.jpeg";
import FSxNetApp from "../../resources/images/blog/AWSS3/aws_storage_extras_fsx_netapp.jpeg";
import FSxOpenZFS from "../../resources/images/blog/AWSS3/aws_storage_extras_fsx_openzfs.jpeg";
import StorageGatewayS3 from "../../resources/images/blog/AWSS3/aws_storage_extras_storage_gateway_s3.jpeg";
import VolumeGateway from "../../resources/images/blog/AWSS3/aws_storage_extras_volume_gateway.jpeg";
import TapeGateway from "../../resources/images/blog/AWSS3/aws_storage_extras_tape_gateway.jpeg";
import StorageGateway from "../../resources/images/blog/AWSS3/aws_storage_extras_storage_gateway.jpeg";
import TransferFamily from "../../resources/images/blog/AWSS3/aws_storage_extras_transfer_family.jpeg";
import NFSSMBToAWS from "../../resources/images/blog/AWSS3/aws_storage_extras_data_sync_nfs_smb_aws.jpeg";
import AWSStorageServices from "../../resources/images/blog/AWSS3/aws_storage_extras_datasync_aws_storage_services.jpeg";

const PostContainer = BasePostContainer;

const AWS3 = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-s3" });
  }, []);

  const columns = ["", "User", "Resource"];
  const data = [
    {
      "": "Attachment Point",
      User: "Attached to IAM identities (users, groups, roles).",
      Resource: "Attached directly to AWS resources",
    },
    {
      "": "Scope and Usage",
      User:
        "Define what actions an identity can perform across various resources and services.",
      Resource:
        "Define who can perform actions on a specific resource, often enabling cross-account access.",
    },
    {
      "": "Cross-Account Access",
      User: "Typically used within a single AWS account.",
      Resource:
        "Can easily specify permissions for principals from other AWS accounts.",
    },
    {
      "": "Policy Management",
      User:
        "Managed in IAM and can be reused across different identities.",
      Resource:
        "Managed directly on the resource, providing granular control by the resource owner.",
    },
    {
      "": "Combining Policies",
      User:
        "Can be combined with resource-based policies to fine-tune access control.",
      Resource:
        "Can be combined with user-based policies to specify permissions more explicitly.",
    },
  ];

  const columns2 = ["Device", "Compute", "Memory", "Storage"];
  const data2 = [
    {
      Device: "Snowball Edge Storage Optimised",
      Compute: "104 vCPUs.",
      Memory: "416 GB",
      Storage: "210 TB",
    },
    {
      Device: "Snowball Edge Compute Optimised",
      Compute: "104 vCPUs.",
      Memory: "416 GB",
      Storage: "28 TB",
    },
  ];

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer as="article" aria-labelledby="aws-s3-title">
        <HeaderRow>
          <PageTitle id="aws-s3-title">
            Amazon Simple Storage Service (S3)
          </PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSS3SVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSnowSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSFSXSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSStorageGatewaySVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSTransferFamilySVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSDataSyncSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post we'll be diving into Amazon S3 which was amazon's first
          ever service! I'll be breaking this post down into sections, much like
          the previous posts:
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#s3-introduction">S3 Introduction</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#buckets-objects">Buckets and Objects</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#bucket-policies">Policies</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#bucket-versioning">Versioning</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#bucket-replication">Replication</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#storage-classes">Storage Classes</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#lifecycle-rules">Lifecycle Rules</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#requester-pays">Requester Pays</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#event-notifications">Event Notifications</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#performance">Performance</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#s3-select">S3 Select & Glacier Select</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#batch-operations">Batch Operations</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#storage-lens">Storage Lens</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#s3-encryption">S3 Encryption</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#cors">CORS</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#mfa-delete">MFA Delete</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#s3-access-logs">S3 Access Logs</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#pre-signed-urls">Pre-Signed URLs</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#s3-glacier-vault-lock">
              S3 Glacier Vault Lock
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#s3-object-lock">S3 Object Lock</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#s3-access-points">S3 Access Points</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#s3-object-lambda">S3 Object Lambda</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-snowball">Snowball</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-fsx">FSx</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-storage-gateway">Storage Gateway</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-transfer-family">Transfer Family</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#aws-data-sync">Data Sync</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#storage-options-comparison">
              Storage Options Comparison
            </TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="s3-introduction">
          Amazon Simple Storage Service
        </SectionHeading>

        <Paragraph>
          Amazon Simple Storage Service (Amazon S3) is a highly scalable,
          durable, and secure object storage service. Amazon S3 is widely used
          across industries for its reliability, scalability, and security,
          making it a foundational service for storing and managing data in the
          cloud.
        </Paragraph>

        <SubSectionHeading>Use Cases</SubSectionHeading>

        <Paragraph>Here are some use cases for using this service:</Paragraph>

        <TextList>
          <TextListItem>Backup and storage.</TextListItem>
          <TextListItem>Disaster Recovery.</TextListItem>
          <TextListItem>Archive.</TextListItem>
          <TextListItem>Hybrid Cloud storage.</TextListItem>
          <TextListItem>Application hosting.</TextListItem>
          <TextListItem>Media hosting.</TextListItem>
          <TextListItem>Data lakes and big data analytics.</TextListItem>
          <TextListItem>Software delivery.</TextListItem>
          <TextListItem>Static website.</TextListItem>
        </TextList>

        <SectionHeading id="buckets-objects">Buckets and Objects</SectionHeading>

        <SubSectionHeading>Buckets</SubSectionHeading>

        <Paragraph>
          In Amazon S3, a <Strong>bucket</Strong> is a container for storing
          objects (files and their metadata). Buckets are created within a
          specific AWS region and must have unique names globally. The naming
          convention must adhere to certain rules, such as being between 3 and
          63 characters, and not containing uppercase characters or underscores,
          not an IP, must start with a lowercase letter or number, must not
          start with the prefix xn-- or end with the suffix -s3alias.
        </Paragraph>

        <SubSectionHeading>Objects</SubSectionHeading>

        <Paragraph>
          Buckets can store an unlimited number of objects, each of which can be
          up to 5 terabytes in size. If you're uploading more than 5GB of data,
          you must use "multi-part upload" Objects are identified within a
          bucket using a unique key (object name). There is no concept of
          directories in S3, just long names with slashes ('/') separating them.
        </Paragraph>

        <PostImage src={S3Objects} alt="S3 bucket objects and keys" />

        <TertiaryHeading>Object Tags</TertiaryHeading>

        <Paragraph>
          Object tags are key-value pairs associated with an S3 object, used to
          organize, manage, and control access to objects. Tags are particularly
          useful for categorizing and managing objects based on different
          criteria, such as department, project, or data sensitivity. An S3
          object can have up to 10 tags.
        </Paragraph>

        <TertiaryHeading>Key features of Object Tags:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Tagging on Upload</Strong>: Tags can be applied to objects
            when they are uploaded or added later.
          </TextListItem>
          <TextListItem>
            <Strong>Filtering and Organizing</Strong>: Tags can be used to
            filter objects within a bucket, making it easier to manage large
            datasets.
          </TextListItem>
          <TextListItem>
            <Strong>Lifecycle Policies</Strong>: Tags can be used with lifecycle
            policies to define rules for transitioning objects between storage
            classes or for deleting them.
          </TextListItem>
          <TextListItem>
            <Strong>Billing and Cost Management</Strong>: Tags help in tracking
            storage costs by categorizing objects according to usage or
            departments.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Example Use Cases for Object Tags:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Cost Allocation</Strong>: Tagging objects by department to
            track storage costs.
          </TextListItem>
          <TextListItem>
            <Strong>Data Management</Strong>: Applying tags to implement
            lifecycle policies that archive or delete objects based on their
            tags.
          </TextListItem>
          <TextListItem>
            <Strong>Access Control</Strong>: Using tags to control access to
            objects via IAM policies.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Object Metadata</TertiaryHeading>

        <Paragraph>
          Object metadata consists of a set of name-value pairs that describe an
          object, providing additional information about the object such as
          content type, size, and user-defined metadata.
        </Paragraph>

        <TertiaryHeading>Key features of Metadata:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>System-Defined</Strong>: Essential for object management and
            retrieval. For example, Content-Type helps browsers understand how
            to handle the object.
          </TextListItem>
          <TextListItem>
            <Strong>User-Defined</Strong>: Useful for storing additional context
            or information about the object, such as application-specific data.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Example Use Cases for Metadata:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Content Handling</Strong>: Setting Content-Type to ensure
            objects are rendered correctly by browsers.
          </TextListItem>
          <TextListItem>
            <Strong>Application-Specific Information</Strong>: Storing metadata
            that applications can use to manage or process objects.
          </TextListItem>
          <TextListItem>
            <Strong>Search and Organization</Strong>: Using metadata to store
            searchable attributes about objects.
          </TextListItem>
        </TextList>

        <SectionHeading id="bucket-policies">Policies</SectionHeading>

        <Paragraph>
          Bucket policies in Amazon S3 are JSON-based access policy statements
          that define permissions for the bucket and its objects. These policies
          provide a way to control access to the bucket and its contents at a
          granular level. You can refer to my previous post that goes into
          detail on 👉{" "}
          <TextLink href="/blog/aws-identity-access-management">
            IAM policies
          </TextLink>
          .
        </Paragraph>

        <SubSectionHeading>User-Based</SubSectionHeading>

        <Paragraph>
          User-based policies, also known as identity-based policies, are
          attached to IAM (Identity and Access Management) identities such as
          users, groups, or roles. These policies define what actions an
          identity can perform on which resources.
        </Paragraph>

        <TextList>
          <TextListItem>
            IAM Policies - which API call should be allowed for a specific user
            from IAM.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Resource-Based Policies</SubSectionHeading>

        <Paragraph>
          Resource-based policies are directly attached to AWS resources. These
          policies specify who (which IAM users, roles, or AWS accounts) can
          access the resource and what actions they can perform.
        </Paragraph>

        <TextList>
          <TextListItem>
            Bucket Policies - bucket wide rules from the S3 console - allows
            cross account.
          </TextListItem>
          <TextListItem>
            Object Access Control List (ACL) - finer grain (can be disabled).
          </TextListItem>
          <TextListItem>
            Bucket Access Control List (ACL) - less common (can be disabled).
          </TextListItem>
        </TextList>

        <Table columns={columns} data={data} />

        <Paragraph>
          Note that the IAM principal can access an S3 object if the IAM
          permissions <Strong>ALLOW</Strong> it or the resource policy{" "}
          <Strong>ALLOWS</Strong> it and there's no explicit{" "}
          <Strong>DENY</Strong>.
        </Paragraph>

        <SectionHeading id="bucket-versioning">Versioning</SectionHeading>

        <Paragraph>
          Versioning is a feature that happens on the bucket level and allows
          you to maintain multiple versions of an object in a bucket, providing
          a mechanism to recover from both unintended user actions and
          application failures. When versioning is enabled for an S3 bucket,
          each object within the bucket can have multiple versions. Each version
          is assigned a unique version ID. The latest version of an object does
          not have a version ID (null version) if the bucket was not versioned
          at the time of the object's creation.
        </Paragraph>

        <PostImage src={S3Versions} alt="S3 versioning example" />

        <SubSectionHeading>
          Here's what happens for each operation on a bucket:
        </SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Upload</Strong>: Each time you upload an object to a
            versioning-enabled bucket, S3 assigns a new version ID to the
            object.
          </TextListItem>
          <TextListItem>
            <Strong>Delete</Strong>: When you delete an object, S3 inserts a
            delete marker (a placeholder object with a unique version ID)
            instead of permanently removing the object. The object remains in
            the bucket with older versions intact.
          </TextListItem>
          <TextListItem>
            <Strong>Restore</Strong>: To restore a previous version, you can
            either delete the delete marker or copy the specific version back
            into place.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Benefits of Versioning:</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Data Protection</Strong>: Protects against accidental
            overwrites and deletions. If an object is deleted or overwritten,
            previous versions can be restored.
          </TextListItem>
          <TextListItem>
            <Strong>Backup and Recovery</Strong>: Facilitates easy recovery from
            unintended deletions and application failures.
          </TextListItem>
          <TextListItem>
            <Strong>Audit and Compliance</Strong>: Keeps a complete history of
            object modifications, which can be crucial for auditing and
            compliance.
          </TextListItem>
        </TextList>

        <SectionHeading id="bucket-replication">Replication</SectionHeading>

        <Paragraph>
          Replication enables automatic, asynchronous copying of objects across
          S3 buckets in different AWS Regions (Cross-Region Replication) or
          within the same region (Same-Region Replication). You define
          replication rules to specify which objects and object versions should
          be replicated and to where. The configuration includes specifying the
          source bucket, destination bucket, and replication rules. You can
          configure multiple rules for different objects within the same bucket.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Cross-Region Replication (CRR):</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Replicates objects to a bucket in a different AWS Region.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Enhances data availability and disaster recovery capabilities.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Helps meet compliance requirements by keeping a copy of data in a
            different geographical location.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Same-Region Replication (SRR):</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Replicates objects to a bucket within the same AWS Region.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Useful for maintaining copies of data for compliance or data
            redundancy within the same region.
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>Benefits of Replication:</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Disaster Recovery</Strong>: Ensures data is available in
            multiple locations, providing a fallback option if the primary
            region is unavailable.
          </TextListItem>
          <TextListItem>
            <Strong>Data Compliance</Strong>: Helps meet compliance and
            regulatory requirements by storing data copies in specific
            locations.
          </TextListItem>
          <TextListItem>
            <Strong>Low-Latency Access</Strong>: Provides low-latency access to
            data by storing copies closer to the end-users in different regions.
          </TextListItem>
          <TextListItem>
            <Strong>Data Durability and Redundancy</Strong>: Enhances data
            durability and redundancy by storing multiple copies across regions
            or within the same region.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Managing Replication:</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Replication Time Control (RTC)</Strong>: Provides a
            predictable replication time backed by an SLA, ensuring that 99.99%
            of objects are replicated within 15 minutes.
          </TextListItem>
          <TextListItem>
            <Strong>Object Versioning</Strong>: Both source and destination
            buckets should have versioning enabled to support replication.
          </TextListItem>
          <TextListItem>
            <Strong>Permissions</Strong>: The source bucket's AWS Identity and
            Access Management (IAM) role must have the necessary permissions to
            read from the source bucket and write to the destination bucket.
          </TextListItem>
        </TextList>

        <SectionHeading id="storage-classes">Storage Classes</SectionHeading>

        <Paragraph>
          Amazon S3 offers several storage classes, each designed to address
          different use cases in terms of cost, access frequency, and durability
          requirements. Here's an overview of the available S3 storage classes:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Standard - General Purpose</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Use Case</Strong>: General-purpose storage for frequently
            accessed data.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Durability</Strong>: 99.999999999% (11 nines) durability.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Availability</Strong>: 99.99% availability over a given
            year.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Features</Strong>: Low latency and high throughput,
            suitable for a wide range of use cases including big data analytics,
            mobile and gaming applications, and content distribution.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Retrieval Fee</Strong>: None.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Intelligent Tiering</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Use Case</Strong>: Data with unknown or changing access
            patterns.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Durability</Strong>: 99.999999999% (11 nines) durability.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Availability</Strong>: 99.9% availability over a given
            year.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Features</Strong>: Automatically moves objects between two
            access tiers (frequent and infrequent access) when access patterns
            change. Optimizes costs without performance impact or operational
            overhead.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Retrieval Fee</Strong>: None.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Standard-Infrequent Access (IA)</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Use Case</Strong>: Data that is accessed less frequently but
            requires rapid access when needed.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Durability</Strong>: 99.999999999% (11 nines) durability.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Availability</Strong>: 99.9% availability over a given
            year.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Features</Strong>: Lower storage cost compared to S3
            Standard but with a retrieval fee. Ideal for backups, disaster
            recovery, and long-term storage of less frequently accessed data.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Retrieval Fee</Strong>: Per GB retrieved.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>One Zone-Infrequent Access</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Use Case</Strong>: Infrequently accessed data that does not
            require multiple availability zone resilience.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Durability</Strong>: 99.999999999% (11 nines) durability.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Availability</Strong>: 99.5% availability over a given
            year.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Features</Strong>: Lower cost option compared to
            Standard-IA. Suitable for data that can be easily recreated or for
            non-critical data stored in a specific availability zone.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Retrieval Fee</Strong>: Per GB retrieved.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Glacier Instant Retrieval</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Use Case</Strong>: Archival storage for rarely accessed data
            with immediate access needs.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Durability</Strong>: 99.999999999% (11 nines) durability.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Availability</Strong>: 99.9% availability over a given
            year.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Features</Strong>: Low-cost storage with milliseconds access
            time. Ideal for medical images, news media assets, and
            user-generated content that is rarely accessed but needs to be
            available quickly when requested.{" "}
            <Strong>Minimum storage duration of 90 days.</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Retrieval Fee</Strong>: Per GB retrieved.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Glacier Flexible Retrieval</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Use Case</Strong>: Long-term archival storage with
            occasional, flexible retrieval needs.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Durability</Strong>: 99.999999999% (11 nines) durability.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Availability</Strong>: 99.99% - Suitable for archival
            storage where data is rarely accessed.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Features</Strong>: Low-cost storage with three retrieval
            options (<Strong>Minimum storage duration of 90 days.</Strong>):
          </IndentedTextListItem>
        </IndentedTextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Expedited</Strong>: 1-5 minutes retrieval time.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Standard</Strong>: 3-5 hours retrieval time.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Bulk</Strong>: 5-12 hours retrieval time. Ideal for backup
            and disaster recovery use cases.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Retrieval Fee</Strong>: Per GB retrieved.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Glacier Deep Archive</Strong>
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Use Case</Strong>: Long-term archival storage with
            infrequent access and long retrieval times.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Durability</Strong>: 99.999999999% (11 nines) durability.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Availability</Strong>: 99.99% - Suitable for data that is
            rarely accessed and for which retrieval time of 12 hours is
            acceptable.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Features</Strong>: Lowest storage cost among all S3 classes.
            Retrieval options include (<Strong>
              Minimum storage duration of 180 days.
            </Strong>
            ):
          </IndentedTextListItem>
        </IndentedTextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Standard</Strong>: 12 hours retrieval time.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Bulk</Strong>: 48 hours retrieval time. Ideal for data that
            needs to be preserved for 7-10 years or more.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Retrieval Fee</Strong>: Per GB retrieved.
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>Choosing the Right Storage Class</SubSectionHeading>

        <Paragraph>When choosing an S3 storage class, consider the following factors:</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Access Frequency</Strong>: How often you need to access the
            data.
          </TextListItem>
          <TextListItem>
            <Strong>Retrieval Time</Strong>: The acceptable time frame for
            retrieving data.
          </TextListItem>
          <TextListItem>
            <Strong>Durability and Availability Requirements</Strong>: The level
            of redundancy and availability you need.
          </TextListItem>
          <TextListItem>
            <Strong>Cost</Strong>: The cost trade-offs between storage,
            retrieval, and transfer.
          </TextListItem>
        </TextList>

        <SectionHeading id="lifecycle-rules">Lifecycle Rules</SectionHeading>

        <Paragraph>
          Lifecycle rules allow you to manage your objects so that they are
          stored cost-effectively throughout their lifecycle. Lifecycle rules
          enable you to define actions that AWS S3 applies to groups of objects,
          including transitioning objects between storage classes and deleting
          objects after a specified period. A lifecycle configuration is a set
          of rules that define actions S3 applies to objects during their
          lifetime. Each rule specifies an action to perform on a set of objects
          defined by a prefix (object name prefix) or tag filters.
        </Paragraph>

        <PostImage src={S3LifecycleRule} alt="S3 lifecycle rule example" />

        <Paragraph>
          Lifecycle actions can include transitioning objects to different
          storage classes, expiring objects, and aborting incomplete multipart
          uploads.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Transition Actions</Strong>: Move objects to a different
            storage class based on the age of the object. For example:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Transition objects to the S3 Standard-IA storage class 30 days after
            creation.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Move objects to S3 Glacier Flexible Retrieval after 60 days.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Transition objects to S3 Glacier Deep Archive for long-term storage
            after 180 days.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Expiration Actions</Strong>: Permanently delete objects
            after a specified period. For example:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Expire objects 365 days after creation.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Abort Incomplete Multipart Uploads</Strong>: Configure a
            rule to abort incomplete multipart uploads after a specified number
            of days. This helps to avoid incurring storage costs for incomplete
            multipart uploads.
          </TextListItem>
        </TextList>

        <Paragraph>
          Rules can be created for a certain prefix (example:
          s3://mybucket/mp3/*) and created for certain object tags (example:
          Department: Finance).
        </Paragraph>

        <SectionHeading id="requester-pays">Requester Pays</SectionHeading>

        <Paragraph>
          In general, bucket owners pay for all of the storage and data transfer
          costs associated with their bucket. With Requester Pays buckets, the
          requester instead of the bucket owner pays the cost of the request and
          the data download from the bucket. This feature is helpful when you
          want to share large datasets with other accounts. The requester must
          be authenticated in AWS for this feature to work.
        </Paragraph>

        <PostImage
          src={S3RequesterPaysBucket}
          alt="S3 requester pays bucket example"
        />

        <SectionHeading id="event-notifications">
          Event Notifications
        </SectionHeading>

        <Paragraph>
          Event Notifications allow you to automatically trigger actions in
          response to changes in your S3 buckets. These notifications can be
          configured to send messages to Amazon Simple Notification Service
          (SNS), Amazon Simple Queue Service (SQS), or invoke AWS Lambda
          functions when specific events occur in your S3 bucket. Event
          notifications typically deliver events in seconds but can sometimes
          take a minute or longer. S3 supports various types of events,
          including:
        </Paragraph>

        <TextList>
          <TextListItem>s3:ObjectCreated:*: Triggered when an object is created.</TextListItem>
          <TextListItem>
            s3:ObjectCreated:Put: Triggered specifically for PUT operations.
          </TextListItem>
          <TextListItem>
            s3:ObjectCreated:Post: Triggered for POST operations.
          </TextListItem>
          <TextListItem>
            s3:ObjectCreated:Copy: Triggered for COPY operations.
          </TextListItem>
          <TextListItem>
            s3:ObjectCreated:CompleteMultipartUpload: Triggered when a multipart
            upload is completed.
          </TextListItem>
          <TextListItem>
            s3:ObjectRemoved:*: Triggered when an object is deleted.
          </TextListItem>
          <TextListItem>
            s3:ObjectRemoved:Delete: Triggered specifically for DELETE
            operations.
          </TextListItem>
          <TextListItem>
            s3:ObjectRemoved:DeleteMarkerCreated: Triggered when a delete marker
            is created.
          </TextListItem>
          <TextListItem>
            s3:ObjectRestore:Post: Triggered when a restore is initiated for an
            object in the S3 Glacier storage class.
          </TextListItem>
          <TextListItem>
            s3:ObjectRestore:Completed: Triggered when the restore is completed.
          </TextListItem>
          <TextListItem>
            s3:Replication:*: Various events related to replication, such as
            s3:Replication:OperationFailedReplication,
            s3:Replication:OperationMissedThreshold
          </TextListItem>
        </TextList>

        <PostImage
          src={S3EventDestination}
          alt="S3 event destination architecture"
        />

        <SubSectionHeading>Example Use Cases</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Image Processing</Strong>: Automatically trigger a Lambda
            function to process images (e.g., generate thumbnails) when new
            images are uploaded to an S3 bucket.
          </TextListItem>
          <TextListItem>
            <Strong>Data Ingestion</Strong>: Send a message to an SQS queue for
            further processing when new data files are uploaded.
          </TextListItem>
          <TextListItem>
            <Strong>Monitoring and Alerting</Strong>: Use SNS to send
            notifications or alerts when specific events occur in your S3
            bucket.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Considerations</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Permissions</Strong>: Ensure that the S3 bucket has the
            appropriate permissions to invoke Lambda functions, send messages to
            SNS topics, or SQS queues.
          </TextListItem>
          <TextListItem>
            <Strong>Event Delivery Retry</Strong>: AWS retries event
            notifications if the destination (Lambda, SQS, SNS) is temporarily
            unavailable.
          </TextListItem>
          <TextListItem>
            <Strong>Configuration Limits</Strong>: Each bucket can have up to
            1,000 event notifications. Consider consolidating configurations if
            needed.
          </TextListItem>
        </TextList>

        <SectionHeading id="performance">Performance</SectionHeading>

        <Paragraph>
          The baseline performance of Amazon S3 includes several key aspects:
        </Paragraph>

        <SubSectionHeading>Throughput and Latency</SubSectionHeading>

        <TertiaryHeading>High Throughput</TertiaryHeading>

        <Paragraph>
          Amazon S3 is designed to provide high throughput, allowing for
          large-scale data transfers. The service supports thousands of requests
          per second, making it suitable for big data analytics, media
          processing, and backup and restore applications.
        </Paragraph>

        <TertiaryHeading>Low Latency</TertiaryHeading>

        <Paragraph>
          S3 offers low-latency access to data, with typical read and write
          latencies in the range of a few milliseconds. This ensures quick
          retrieval and storage operations, which is essential for
          time-sensitive applications.
        </Paragraph>

        <SubSectionHeading>Request Rate and Performance Guidelines</SubSectionHeading>

        <TertiaryHeading>Request Rate Limits</TertiaryHeading>

        <Paragraph>
          Amazon S3 can handle up to 3,500 PUT/POST/DELETE requests per second
          and 5,500 GET requests per second per prefix in a bucket. By using
          multiple prefixes, you can scale these limits further.
        </Paragraph>

        <TertiaryHeading>Prefix Utilization</TertiaryHeading>

        <Paragraph>
          There are no limits to the number of prefixes in a bucket. Distribute
          objects across multiple prefixes to optimize performance. This avoids
          request rate limits being concentrated on a single prefix.
        </Paragraph>

        <TertiaryHeading>Multipart Upload</TertiaryHeading>

        <Paragraph>
          For large files, use multipart upload to improve upload speed and
          reliability. It's recommended for files bigger than 100MB and it's a
          must use for files that are bigger than 5GB.
        </Paragraph>

        <PostImage
          src={S3MultiPartUpload}
          alt="S3 multipart upload diagram"
        />

        <TertiaryHeading>Transfer Acceleration</TertiaryHeading>

        <Paragraph>
          Increases transfer speed by transferring files to an AWS edge location
          which will forward the data to the S3 bucket in the target region.
          This feature is also compatible with multi-part upload.
        </Paragraph>

        <PostImage
          src={S3TransferAcceleration}
          alt="S3 transfer acceleration"
        />

        <SubSectionHeading>Data Transfer</SubSectionHeading>

        <TertiaryHeading>Upload Performance:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Single PUT</Strong>: For small objects, use single PUT
            requests.
          </TextListItem>
          <TextListItem>
            <Strong>Multipart Upload</Strong>: For objects larger than 100 MB,
            it is recommended to use multipart upload, which enables faster and
            more efficient uploads.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Download Performance:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Range GET</Strong>: Use Range GETs to retrieve partial data
            from objects, which can enhance download performance and save
            bandwidth.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Consistency Model</SubSectionHeading>

        <TertiaryHeading>Read-after-Write Consistency</TertiaryHeading>

        <Paragraph>
          Amazon S3 offers read-after-write consistency for PUTs of new objects
          in your S3 bucket in all regions.
        </Paragraph>

        <TertiaryHeading>Eventual Consistency</TertiaryHeading>

        <Paragraph>
          Overwrite PUTS and DELETES (PUTS that overwrite an existing object and
          DELETES of objects) are eventually consistent.
        </Paragraph>

        <SubSectionHeading>Scalability and Concurrency</SubSectionHeading>

        <Paragraph>
          Amazon S3 automatically scales to handle the load, so there are no
          hard limits on the number of objects you can store or the total
          amount of storage you can consume. This scalability supports
          concurrent access and operations on your data, allowing multiple users
          and applications to interact with the storage simultaneously.
        </Paragraph>

        <SubSectionHeading>Network Considerations</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Transfer Acceleration</Strong>: S3 Transfer Acceleration can
            speed up content transfers to and from S3 buckets over long
            distances by leveraging Amazon CloudFront's globally distributed
            edge locations.
          </TextListItem>
          <TextListItem>
            <Strong>Direct Connect</Strong>: For more predictable performance
            and lower latency, AWS Direct Connect provides dedicated network
            connections from your premises to AWS.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Monitoring and Optimization</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>S3 Storage Lens</Strong>: Provides visibility into storage
            usage and activity trends, helping optimize performance and costs.
          </TextListItem>
          <TextListItem>
            <Strong>CloudWatch Metrics</Strong>: Use CloudWatch to monitor S3
            performance and set up alerts for unusual activity.
          </TextListItem>
        </TextList>

        <SectionHeading id="s3-select">S3 Select & Glacier Select</SectionHeading>

        <Paragraph>
          S3 Select is a feature of Amazon S3 that allows you to retrieve a
          subset of data from an object using simple SQL expressions. This means
          you can perform SQL-like queries (server-side) directly on the data
          stored in S3 without having to download the entire object. If you have
          a CSV file stored in S3 and only need records where a specific column
          meets a certain condition, you can use S3 Select to fetch just those
          records instead of downloading the entire file.
        </Paragraph>

        <TertiaryHeading>Key features:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Query Archived Data</Strong>: Perform SQL queries on data
            stored in Glacier without having to restore the entire object.
          </TextListItem>
          <TextListItem>
            <Strong>Efficient Data Retrieval</Strong>: Enables selective
            retrieval of data, which can save time and reduce retrieval costs.
          </TextListItem>
          <TextListItem>
            <Strong>Supports CSV and JSON Formats</Strong>: Allows querying of
            data stored in these formats.
          </TextListItem>
          <TextListItem>
            <Strong>Improves Access to Archived Data</Strong>: Makes it easier
            to access specific pieces of archived data without full retrieval.
          </TextListItem>
        </TextList>

        <SectionHeading id="batch-operations">Batch Operations</SectionHeading>

        <Paragraph>
          Amazon S3 Batch Operations allows you to manage and perform large-scale
          batch operations on the objects stored in your S3 buckets. It
          simplifies the process of performing repetitive or bulk actions across
          many objects, helping you automate and scale these tasks.
        </Paragraph>

        <TertiaryHeading>Common Operations:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Copy Operations</Strong>: Copy objects to another bucket or
            within the same bucket, useful for data migration or backup tasks.
          </TextListItem>
          <TextListItem>
            <Strong>Tagging</Strong>: Add, remove, or replace tags on a large
            number of objects to manage and organize them more effectively.
          </TextListItem>
          <TextListItem>
            <Strong>ACL Updates</Strong>: Change access permissions for a large
            set of objects to manage access control.
          </TextListItem>
          <TextListItem>
            <Strong>Object Restore from Glacier</Strong>: Initiate restore
            operations for objects stored in S3 Glacier.
          </TextListItem>
          <TextListItem>
            <Strong>Metadata Updates</Strong>: Modify metadata for a group of
            objects.
          </TextListItem>
        </TextList>

        <SectionHeading id="storage-lens">Storage Lens</SectionHeading>

        <Paragraph>
          Amazon S3 Storage Lens is a feature that provides visibility into your
          S3 storage usage and activity trends. It delivers comprehensive
          insights through interactive dashboards, making it easier to
          understand, analyze, and optimize your S3 storage. S3 Storage Lens
          aggregates data across your entire organization or specific accounts
          and regions, offering both summary and granular views of your storage.
        </Paragraph>

        <TertiaryHeading>Key features:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Unified Metrics and Recommendations</Strong>: S3 Storage
            Lens provides metrics across multiple dimensions (e.g., bucket,
            account, region) and actionable recommendations to optimize costs
            and improve data protection.
          </TextListItem>
          <TextListItem>
            <Strong>Interactive Dashboards</Strong>: Pre-configured, interactive
            dashboards give you a comprehensive view of your storage usage and
            activity. You can also create custom dashboards to focus on specific
            metrics.
          </TextListItem>
          <TextListItem>
            <Strong>Data Aggregation</Strong>: Aggregates storage usage and
            activity metrics across your organization, making it easier to
            manage and optimize large-scale storage environments.
          </TextListItem>
          <TextListItem>
            <Strong>Detailed Insights</Strong>: Metrics include information on
            storage usage, object counts, request activity, and more, enabling
            you to understand patterns and make informed decisions.
          </TextListItem>
          <TextListItem>
            <Strong>Integration with AWS Services</Strong>: Integrates with
            other AWS services such as AWS Organizations, allowing you to
            collect metrics and insights at the organizational level.
          </TextListItem>
          <TextListItem>
            <Strong>Cost Optimization</Strong>: Provides recommendations to
            reduce costs, such as identifying infrequently accessed data that
            could be moved to a lower-cost storage class.
          </TextListItem>
          <TextListItem>
            <Strong>Data Protection and Management</Strong>: Offers insights
            into potential data protection issues and recommendations to enhance
            security and compliance.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Common Metrics:</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Storage Usage</Strong>: Total bytes stored, breakdown by
            storage class, and trends over time.
          </TextListItem>
          <TextListItem>
            <Strong>Object Counts</Strong>: Number of objects stored, including
            breakdowns by storage class.
          </TextListItem>
          <TextListItem>
            <Strong>Request Activity</Strong>: Number of GET, PUT, DELETE, and
            other requests, helping you understand access patterns.
          </TextListItem>
          <TextListItem>
            <Strong>Cost Efficiency</Strong>: Identifies potential savings by
            highlighting infrequently accessed data and suggesting appropriate
            storage classes.
          </TextListItem>
          <TextListItem>
            <Strong>Data Protection</Strong>: Highlights objects without
            versioning or with public access, providing recommendations to
            improve data security.
          </TextListItem>
        </TextList>

        <PostImage src={S3StorageLens} alt="S3 Storage Lens dashboard" />

        <SectionHeading id="s3-encryption">S3 Encryption</SectionHeading>

        <Paragraph>You can encrypt objects in S3 buckets using one of 4 methods:</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Server-Side Encryption (SSE)</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>
              Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3)
            </Strong>{" "}
            - Enabled by default
          </IndentedTextListItem>
          <IndentedTextListItem>
            Encrypts S3 objects using keys handled, managed, and owned by AWS.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>
              Server-Side Encryption with KMS Keys stored in AWS KMS (SSE-KMS)
            </Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            Leverage AWS Key Management Service (AWS KMS) to manage encryption
            keys
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>
              Server-Side Encryption with Customer-Provided Keys (SSE-C)
            </Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            When you want to manage your own encryption keys.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Client-Side Encryption</Strong>
          </TextListItem>
        </TextList>

        <TertiaryHeading>Server-Side Encryption (SSE)</TertiaryHeading>

        <PostImage src={S3EncryptionSSES3} alt="S3 SSE-S3 encryption" />

        <TextList>
          <TextListItem>
            Encryption using keys handled, managed, and owned by AWS
          </TextListItem>
          <TextListItem>Object is encrypted server-side</TextListItem>
          <TextListItem>Encryption type is AES-256</TextListItem>
          <TextListItem>
            Must set header "x-amz-server-side-encryption":"AES256"
          </TextListItem>
          <TextListItem>
            Enabled by default for new buckets & new objects
          </TextListItem>
        </TextList>

        <TertiaryHeading>SSE-KMS</TertiaryHeading>

        <PostImage src={S3EncryptionSSEKMS} alt="S3 SSE-KMS encryption" />

        <TextList>
          <TextListItem>
            Encryption using keys handled, managed by AWS KMS (Key Management
            Service)
          </TextListItem>
          <TextListItem>Object is encrypted server-side</TextListItem>
          <TextListItem>
            User control + audit key using CloudTrail
          </TextListItem>
          <TextListItem>
            Must set header "x-amz-server-side-encryption":"aws:kms"
          </TextListItem>
        </TextList>

        <TertiaryHeading>SSE-C</TertiaryHeading>

        <PostImage src={S3EncryptionSSEC} alt="S3 SSE-C encryption" />

        <TextList>
          <TextListItem>
            Server-Side encryption using keys fully managed by the customer
            outside of AWS
          </TextListItem>
          <TextListItem>
            Amazon S3 does not store the encryption key you provide
          </TextListItem>
          <TextListItem>HTTPS must be used</TextListItem>
          <TextListItem>
            Encryption key must be provided in HTTP headers for every HTTP
            request made
          </TextListItem>
        </TextList>

        <SectionHeading id="cors">CORS</SectionHeading>

        <Paragraph>
          CORS, which stands for Cross-Origin Resource Sharing, is a security
          feature implemented in web browsers to control how web applications
          can request resources (like APIs, fonts, images, etc.) from a
          different domain (origin) than the one from which the application was
          served.
        </Paragraph>

        <Paragraph>
          Before diving into CORS, it's important to understand the Same-Origin
          Policy (SOP), which is a fundamental security concept for web
          browsers. The Same-Origin Policy restricts how a web page can make
          requests to a different domain (origin) than its own. An "origin" is
          defined by the combination of the protocol (http/https), domain
          (example.com), and port (if specified). For example:
        </Paragraph>

        <TextList>
          <TextListItem>
            https://example.com and https://example.com (same origin)
          </TextListItem>
          <TextListItem>
            https://example.com and https://api.example.com (different origins)
          </TextListItem>
          <TextListItem>
            https://example.com:3000 and https://example.com:4000 (different
            origins)
          </TextListItem>
        </TextList>

        <Paragraph>
          Under SOP, a web page cannot fetch resources from a different origin
          unless explicitly allowed by the server hosting the resource. This is
          where CORS comes in.
        </Paragraph>

        <TertiaryHeading>How CORS works</TertiaryHeading>

        <Paragraph>
          CORS allows a server to specify which origins are permitted to access
          its resources. This is done through HTTP headers that are included in
          the server's response to the client (typically a web browser).
        </Paragraph>

        <TertiaryHeading>CORS HTTP Headers</TertiaryHeading>

        <Paragraph>Here are some of the key HTTP headers used in CORS:</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Access-Control-Allow-Origin</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Specifies which origin(s) can access the resource. For example,
            Access-Control-Allow-Origin: https://example.com allows
            https://example.com to access the resource. Using * as the value
            allows access from any origin.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Access-Control-Allow-Methods</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Specifies which HTTP methods (GET, POST, PUT, DELETE, etc.) are
            allowed when accessing the resource. For example,
            Access-Control-Allow-Methods: GET, POST.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Access-Control-Allow-Headers</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Specifies which headers can be used when making the actual request.
            For example, Access-Control-Allow-Headers: Content-Type,
            Authorization.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Access-Control-Allow-Credentials</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Indicates whether or not the response to the request can be exposed
            to the client when credentials (such as cookies or HTTP
            authentication) are included. For example,
            Access-Control-Allow-Credentials: true.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Access-Control-Max-Age</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Specifies how long the results of a preflight request (see below)
            can be cached. For example, Access-Control-Max-Age: 3600 means the
            result can be cached for one hour.
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Simple Requests vs. Preflight Requests</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Simple Requests</Strong>: If the request method is GET,
            POST, or HEAD, and the request does not include any custom headers
            or use a non-simple content type (like application/json), the
            browser sends the request directly with the necessary CORS headers.
          </TextListItem>
          <TextListItem>
            <Strong>Preflight Requests</Strong>: For requests that are not
            simple (e.g., using PUT or DELETE methods, or including custom
            headers), the browser first sends an "OPTIONS" request to the server
            to check if the actual request is safe to send. This is called a
            "preflight request." The server then responds with the appropriate
            CORS headers, and if allowed, the actual request is sent.
          </TextListItem>
        </TextList>

        <TertiaryHeading>Why CORS Is Important</TertiaryHeading>

        <Paragraph>
          CORS is crucial for web security as it helps prevent unauthorized
          access to resources from different origins, protecting sensitive
          information and maintaining the integrity of web applications.
          However, it also enables legitimate use cases where resources need to
          be shared across different domains, such as APIs being consumed by web
          applications hosted on different domains.
        </Paragraph>

        <TertiaryHeading>Example Scenario</TertiaryHeading>

        <Paragraph>
          Consider a web application hosted on https://app.example.com that
          needs to access an API hosted on https://api.example.com. Without
          CORS, the browser would block this request due to the Same-Origin
          Policy. By configuring CORS on https://api.example.com to allow
          requests from https://app.example.com, the browser will permit the
          cross-origin request, enabling the web application to access the API.
        </Paragraph>

        <PostImage src={CORS} alt="CORS example diagram" />

        <TertiaryHeading>S3 with CORS</TertiaryHeading>

        <PostImage src={S3CORS} alt="S3 with CORS diagram" />

        <SectionHeading id="mfa-delete">MFA Delete</SectionHeading>

        <Paragraph>
          MFA Delete is an additional security feature in S3 that helps protect
          your data by requiring multi-factor authentication (MFA) for certain
          operations on versioned buckets. When MFA Delete is enabled, users are
          required to provide an authentication code from a physical or virtual
          MFA device in addition to their usual credentials when attempting to
          perform specific actions on S3 bucket versions.
        </Paragraph>

        <TextList>
          <TextListItem>
            MFA Delete specifically applies to two actions in a versioned S3
            bucket:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Permanently Deleting an Object Version</Strong>: When you
            delete an object in a versioned bucket, S3 creates a delete marker,
            but the object version remains unless explicitly deleted. With MFA
            Delete, deleting a specific version of an object requires MFA.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Suspending Versioning on a Bucket</Strong>: Disabling or
            suspending versioning also requires MFA when MFA Delete is enabled.
          </IndentedTextListItem>
        </IndentedTextList>

        <SectionHeading id="s3-access-logs">S3 Access Logs</SectionHeading>

        <Paragraph>
          S3 Access Logs is a feature that allows you to track and record all
          the requests made to your S3 bucket. This includes requests for
          objects, such as GET, PUT, DELETE, and HEAD operations, as well as
          requests for bucket-level actions like creating or deleting a bucket.
          These logs provide detailed information about each request, which can
          be useful for security audits, troubleshooting, and analyzing usage
          patterns.
        </Paragraph>

        <SectionHeading id="pre-signed-urls">Pre-Signed URLs</SectionHeading>

        <Paragraph>
          AWS Pre-Signed URLs are URLs generated by AWS that grant temporary
          access to specific objects in an Amazon S3 bucket without requiring
          AWS credentials. These URLs are particularly useful for sharing
          private content, allowing users to download or upload files securely
          without exposing your S3 bucket to public access.
        </Paragraph>

        <SectionHeading id="s3-glacier-vault-lock">
          S3 Glacier Vault Lock
        </SectionHeading>

        <Paragraph>
          Amazon S3 Glacier Vault Lock is a feature that allows you to enforce
          compliance controls on an S3 Glacier vault with a "vault lock policy."
          Once configured and locked, this policy becomes immutable, meaning it
          cannot be altered or deleted, providing strong protection for your
          data in compliance with regulatory requirements that require
          write-once-read-many (WORM) storage.
        </Paragraph>

        <SectionHeading id="s3-object-lock">S3 Object Lock</SectionHeading>

        <Paragraph>
          Amazon S3 Object Lock is a feature that allows you to store objects
          using a write-once-read-many (WORM) model. This ensures that once an
          object is written, it cannot be altered or deleted for a specified
          period of time or indefinitely, depending on the settings. S3 Object
          Lock is used primarily to help organizations meet regulatory
          requirements and enhance data protection by enforcing immutability on
          critical data.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Retention Modes</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Governance Mode</Strong>: Allows you to protect objects from
            being deleted or altered during the retention period. However, users
            with special permissions (such as those with the
            s3:BypassGovernanceRetention permission) can still modify or delete
            the objects if needed.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Compliance Mode</Strong>: Provides a stricter level of
            protection where even the root user cannot delete or alter the
            objects during the retention period. This mode is used when you need
            to ensure that data cannot be tampered with, meeting stringent
            regulatory requirements.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Retention Period</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            You can set a retention period during which the objects are
            protected from deletion or modification. Once the retention period
            expires, the objects can be deleted or modified as usual.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Legal Hold</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Legal Hold prevents an object from being deleted or altered
            indefinitely, regardless of its retention period. This is useful in
            scenarios like litigation where you need to preserve data for an
            undefined period.
          </IndentedTextListItem>
        </IndentedTextList>

        <SectionHeading id="s3-access-points">S3 Access Points</SectionHeading>

        <Paragraph>
          Amazon S3 Access Points are a feature that simplifies and enhances how
          you manage access to your Amazon S3 buckets at scale. An S3 Access
          Point provides a unique and dedicated network endpoint to enforce
          distinct access policies and settings for a bucket, making it easier
          to control access patterns in large-scale applications or across
          multiple teams.
        </Paragraph>

        <PostImage src={S3AccessPoints} alt="S3 Access Points diagram" />

        <TertiaryHeading>Access Points - VPC Origin</TertiaryHeading>

        <Paragraph>
          Access Points can be configured to only allow access from specific
          Amazon Virtual Private Clouds (VPCs). This means you can ensure that
          data in your S3 buckets is only accessible from within your private
          network, enhancing security.
        </Paragraph>

        <PostImage
          src={S3AccessPointsVPCOrigin}
          alt="S3 Access Points VPC origin"
        />

        <SectionHeading id="s3-object-lambda">S3 Object Lambda</SectionHeading>

        <Paragraph>
          Amazon S3 Object Lambda is a feature that allows you to transform and
          process data as it is retrieved from Amazon S3, without needing to
          create and store additional copies of the data. By integrating AWS
          Lambda functions directly with S3, you can dynamically modify the
          content of objects in S3 based on custom logic before it is returned
          to the requester. This enables powerful use cases like data filtering,
          masking sensitive information, resizing images, and more.
        </Paragraph>

        <PostImage src={S3ObjectLambda} alt="S3 Object Lambda diagram" />

        <SectionHeading id="aws-snowball">Snowball</SectionHeading>

        <Paragraph>
          AWS Snowball is a service designed to facilitate secure, large-scale
          data transfer into and out of AWS. It is ideal for migrating large
          datasets where traditional methods (like the internet) would take too
          long or be cost-prohibitive. Snowball is a portable device to collect
          and process data at the edge, and migrate data into and out of AWS.
        </Paragraph>

        <Table columns={columns2} data={data2} />

        <SubSectionHeading>Snowball into Glacier</SubSectionHeading>

        <Paragraph>
          Snowball cannot import to Glacier directly so S3 must be used first,
          in combination with an S3 lifecycle policy.
        </Paragraph>

        <PostImage
          src={SnowballGlacier}
          alt="Snowball to Glacier lifecycle"
        />

        <SectionHeading id="aws-fsx">FSx</SectionHeading>

        <Paragraph>
          Amazon FSx is a fully managed file storage service from AWS that
          provides high-performance file systems optimized for a variety of
          workloads. It enables customers to run applications that require
          shared file storage without needing to manage the underlying
          infrastructure. FSx supports multiple file systems, allowing
          organizations to choose the best option for their needs.
        </Paragraph>

        <PostImage src={FSxSupport} alt="FSx supported file systems" />

        <TextList>
          <TextListItem>
            <Strong>Amazon FSx for Windows File Server</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Provides a Windows-native file system (SMB protocol).
          </IndentedTextListItem>
          <IndentedTextListItem>
            Integrates with Active Directory.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Supports DFS namespaces, NTFS permissions, and shadow copies.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Ideal for Windows-based applications, file shares, and home
            directories.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Can be mounted on Linux EC2 instances.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Amazon FSx for Lustre</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            High-performance file system optimized for high-throughput
            workloads.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Ideal for HPC, machine learning, analytics, and media processing.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Supports integration with Amazon S3 for hybrid workflows.
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>FSx File System Deployment Options</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Scratch File System</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>Temporary Storage.</IndentedTextListItem>
          <IndentedTextListItem>
            Data not replicated (doesn't persist if the server fails).
          </IndentedTextListItem>
          <IndentedTextListItem>High burst.</IndentedTextListItem>
          <IndentedTextListItem>
            Usage: short-term processing, optimise costs.
          </IndentedTextListItem>
        </IndentedTextList>

        <PostImage
          src={FSxScratchFileSystem}
          alt="FSx scratch file system"
        />

        <TextList>
          <TextListItem>
            <Strong>Persistent File System</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>Long term storage.</IndentedTextListItem>
          <IndentedTextListItem>
            Data is replicated within the same AZ.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Replaced failed files within minutes.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Usage: long term processing, sensitive data.
          </IndentedTextListItem>
        </IndentedTextList>

        <PostImage
          src={FSxPersistantFileSystem}
          alt="FSx persistent file system"
        />

        <TextList>
          <TextListItem>
            <Strong>Amazon FSx for NetApp ONTAP</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Fully managed NetApp ONTAP file system.
          </IndentedTextListItem>
          <IndentedTextListItem>Supports SMB, NFS, and iSCSI.</IndentedTextListItem>
          <IndentedTextListItem>
            Offers NetApp features like snapshots, replication, and
            deduplication.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Suitable for enterprise applications and hybrid cloud storage.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Point-in-time instantaneous cloning (helpful for testing new
            workloads).
          </IndentedTextListItem>
        </IndentedTextList>

        <PostImage src={FSxNetApp} alt="FSx for NetApp ONTAP" />

        <TextList>
          <TextListItem>
            <Strong>Amazon FSx for OpenZFS</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            High-performance ZFS-based file system.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Provides snapshot, cloning, and compression capabilities.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Ideal for DevOps, CI/CD, and data-intensive applications.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Point-in-time instantaneous cloning (helpful for testing new
            workloads).
          </IndentedTextListItem>
        </IndentedTextList>

        <PostImage src={FSxOpenZFS} alt="FSx for OpenZFS" />

        <SectionHeading id="aws-storage-gateway">
          Storage Gateway
        </SectionHeading>

        <Paragraph>
          Amazon Storage Gateway is a hybrid cloud storage service that enables
          on-premises applications to use AWS cloud storage securely,
          efficiently, and seamlessly. It helps businesses extend their existing
          on-premises storage to AWS, providing scalable, cost-effective storage
          for backups, disaster recovery, archiving, and cloud migration.
        </Paragraph>

        <SubSectionHeading>Types of Amazon Storage Gateways</SubSectionHeading>

        <TertiaryHeading>S3 File Gateway</TertiaryHeading>

        <TextList>
          <TextListItem>
            Configured S3 buckets are configured using the NFS and SMB protocol.
          </TextListItem>
          <TextListItem>
            Supports S3 Standard, S3 Standard IA, S3 One Zone A, S3 Intelligent
            Tiering.
          </TextListItem>
          <TextListItem>
            Transition to S3 Glacier using Lifecycle Policy.
          </TextListItem>
          <TextListItem>
            Bucket access using IAM roles for each File Gateway.
          </TextListItem>
          <TextListItem>
            SMB protocol has integration with Active Directory (AD) for
            authentication.
          </TextListItem>
        </TextList>

        <PostImage src={StorageGatewayS3} alt="S3 File Gateway diagram" />

        <TertiaryHeading>Volume Gateway</TertiaryHeading>

        <TextList>
          <TextListItem>
            Block storage using iSCSI protocol backed by S3.
          </TextListItem>
          <TextListItem>
            Backed by EBS snapshots which can help restore on-premises volumes.
          </TextListItem>
          <TextListItem>
            Cached volumes: low latency access to most recent data.
          </TextListItem>
          <TextListItem>
            Stored volumes: entire dataset is on premise, scheduled backups to
            S3.
          </TextListItem>
        </TextList>

        <PostImage src={VolumeGateway} alt="Volume Gateway diagram" />

        <TertiaryHeading>Tape Gateway</TertiaryHeading>

        <TextList>
          <TextListItem>
            Provides a virtual tape library (VTL) that integrates with existing
            backup applications.
          </TextListItem>
          <TextListItem>
            Stores virtual tapes in Amazon S3, with automatic tiering to Glacier
            for long-term archiving.
          </TextListItem>
          <TextListItem>
            Compatible with backup software like Veeam, Veritas, Commvault, and
            NetBackup.
          </TextListItem>
          <TextListItem>
            Use Cases: Backup, archival, disaster recovery.
          </TextListItem>
        </TextList>

        <PostImage src={TapeGateway} alt="Tape Gateway diagram" />

        <SubSectionHeading>Storage Gateway - Hardware appliance</SubSectionHeading>

        <Paragraph>
          Using Storage Gateway means you need on-premise virtualisation,
          otherwise you can use a Storage Gateway Hardware Appliance - which
          works with File Gateway, Volume Gateway and Tape Gateway.
        </Paragraph>

        <PostImage
          src={StorageGateway}
          alt="Storage Gateway hardware appliance"
        />

        <SectionHeading id="aws-transfer-family">
          Transfer Family
        </SectionHeading>

        <Paragraph>
          Amazon Transfer Family is a fully managed secure file transfer service
          that enables businesses to transfer files into and out of AWS using
          standard file transfer protocols such as SFTP (Secure File Transfer
          Protocol), FTPS (File Transfer Protocol over SSL/TLS), and FTP (File
          Transfer Protocol). It provides seamless integration with Amazon S3
          and Amazon EFS, enabling organizations to move, process, and store
          files efficiently in the AWS cloud.
        </Paragraph>

        <PostImage src={TransferFamily} alt="AWS Transfer Family diagram" />

        <SectionHeading id="aws-data-sync">Data Sync</SectionHeading>

        <Paragraph>
          Amazon DataSync is a fully managed data transfer service that helps
          organizations automate, accelerate, and securely move large amounts of
          data between on-premises storage, AWS services, and between AWS
          regions or accounts. It eliminates the need for manual data migration
          processes, making it easy to move files efficiently while ensuring
          security and integrity.
        </Paragraph>

        <TertiaryHeading>NFS/SMB to AWS (S3, EFS, FSx...)</TertiaryHeading>

        <PostImage src={NFSSMBToAWS} alt="DataSync NFS/SMB to AWS diagram" />

        <TertiaryHeading>Transfer between AWS storage services</TertiaryHeading>

        <PostImage
          src={AWSStorageServices}
          alt="DataSync between AWS storage services"
        />

        <SectionHeading id="storage-options-comparison">
          Storage Options Comparison
        </SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>S3</Strong>: Object Storage
          </TextListItem>
          <TextListItem>
            <Strong>S3 Glacier</Strong>: Object Archival
          </TextListItem>
          <TextListItem>
            <Strong>EBS Volumes</Strong>: Network storage for one EC2 instance
            at a time
          </TextListItem>
          <TextListItem>
            <Strong>Instance Storage</Strong>: Physical storage for your EC2
            instance (High IOPS)
          </TextListItem>
          <TextListItem>
            <Strong>EFS</Strong>: Network File System for Linux instances, POSIX
            filesystem
          </TextListItem>
          <TextListItem>
            <Strong>FSx for Windows</Strong>: Network File System for Windows
            servers
          </TextListItem>
          <TextListItem>
            <Strong>FSx for Lustre</Strong>: High Performance Computing Linux
            file system
          </TextListItem>
          <TextListItem>
            <Strong>FSx for NetApp ONTAP</Strong>: High OS Compatibility
          </TextListItem>
          <TextListItem>
            <Strong>FSx for OpenZFS</Strong>: Managed ZFS file system
          </TextListItem>
          <TextListItem>
            <Strong>Storage Gateway</Strong>: S3 & FSx File Gateway, Volume
            Gateway (cached and stored), Tape Gateway
          </TextListItem>
          <TextListItem>
            <Strong>Transfer Family</Strong>: FTP, FTPS, SFTP interface on top
            of S3 or EFS
          </TextListItem>
          <TextListItem>
            <Strong>DataSync</Strong>: Schedule data sync from on premises to
            AWS, or AWS to AWS
          </TextListItem>
          <TextListItem>
            <Strong>Snowcone / Snowball / Snowmobile</Strong>: Move large amount
            of data to the cloud, physically
          </TextListItem>
          <TextListItem>
            <Strong>Database</Strong>: For specific workloads, usually with
            indexing and querying
          </TextListItem>
        </TextList>

        <SectionHeading id="references">References</SectionHeading>

        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Simple Storage Service User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Simple Storage Service User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html"
              target="_blank"
              rel="noreferrer"
            >
              Assessing your storage activity and usage with Amazon S3 Storage Lens
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html"
              target="_blank"
              rel="noreferrer"
            >
              Protecting data with Amazon S3 Object Lock
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/transforming-objects.html"
              target="_blank"
              rel="noreferrer"
            >
              Transforming objects with S3 Object Lambda
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html"
              target="_blank"
              rel="noreferrer"
            >
              Selecting content from objects (S3 Select and Glacier Select)
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html"
              target="_blank"
              rel="noreferrer"
            >
              Using CORS with Amazon S3
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/snowball/latest/developer-guide/whatissnowball.html"
              target="_blank"
              rel="noreferrer"
            >
              What is AWS Snowball?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html"
              target="_blank"
              rel="noreferrer"
            >
              What is Amazon FSx?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html"
              target="_blank"
              rel="noreferrer"
            >
              What is AWS Transfer Family?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html"
              target="_blank"
              rel="noreferrer"
            >
              What is AWS DataSync?
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWS3;
