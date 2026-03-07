import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { AWSSVG, AWSCloudfrontSVG } from "../../resources/styles/icons";

// shared layout
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
} from "../Typography/Typography";

// images
import CloudFrontHighLevelOverview from "../../resources/images/blog/AWSCloudFront/cloudfront_high_level_overview.jpeg";
import CloudFrontS3Origin from "../../resources/images/blog/AWSCloudFront/cloudfront_s3_origin.jpeg";
import CloudFrontALBOrigin from "../../resources/images/blog/AWSCloudFront/cloudfront_alb_origin.jpeg";
import CloudFrontCacheInvalidation from "../../resources/images/blog/AWSCloudFront/cloudfront_cache_invalidation.jpeg";
import CloudFrontGlobalAccelerator from "../../resources/images/blog/AWSCloudFront/cloudfront_global_accelerator.jpeg";

// buttons
import BackButton from "../Button/BackButton";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSCloudFront = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-cloudfront" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>AWS CloudFront</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSCloudfrontSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post we'll be diving into Amazon CloudFront.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#cloudfront-overview">CloudFront Overview</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#s3-as-origin">S3 as an Origin</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#alb-as-origin">ALB as an Origin</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#geo-restriction">Geo Restriction</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#price-classes">Price Classes</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#cache-invalidation">Cache Invalidation</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#global-accelerator">Global Accelerator</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="cloudfront-overview">AWS CloudFront</SectionHeading>

        <Paragraph>
          Amazon CloudFront is a content delivery network (CDN) service that
          securely delivers data, videos, applications, and APIs to customers
          globally with low latency and high transfer speeds. CloudFront
          integrates with other AWS services to give developers and businesses
          an easy way to distribute content to end users with minimal delay.
        </Paragraph>

        <TertiaryHeading>Key features:</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Global Network of Edge Locations</Strong>: CloudFront uses a
            network of globally distributed edge locations and regional edge
            caches to cache copies of your content close to your users.
          </TextListItem>
          <TextListItem>
            <Strong>High Performance</Strong>: Provides low latency and high
            data transfer speeds by serving content from edge locations near
            your users.
          </TextListItem>
          <TextListItem>
            <Strong>Security</Strong>: Offers several features to protect your
            data and applications, such as AWS Shield for DDoS protection,
            SSL/TLS encryption, and integration with AWS Web Application
            Firewall (WAF).
          </TextListItem>
          <TextListItem>
            <Strong>Integration with AWS Services</Strong>: Seamlessly
            integrates with Amazon S3, Amazon EC2, Elastic Load Balancing, and
            AWS Lambda for custom code execution at edge locations.
          </TextListItem>
          <TextListItem>
            <Strong>Real-Time Metrics and Logging</Strong>: Provides real-time
            monitoring and logging of your content delivery network's
            performance and security metrics through CloudWatch and AWS
            CloudTrail.
          </TextListItem>
          <TextListItem>
            <Strong>Customizable Content Delivery</Strong>: Supports multiple
            ways to customize content delivery, including geographic
            restrictions, content versioning, and custom headers.
          </TextListItem>
        </TextList>

        <TertiaryHeading>How it works:</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Content Request</Strong>: Content Request: When a user
            requests content, the request is routed to the nearest CloudFront
            edge location based on latency.
          </TextListItem>
          <TextListItem>
            <Strong>Cache Check</Strong>: CloudFront checks if the content is
            already cached at the edge location.
          </TextListItem>
          <TextListItem>
            <Strong>Content Delivery</Strong>: If the content is cached, it is
            delivered directly to the user. If not, CloudFront retrieves the
            content from the origin server (e.g., S3, EC2) and caches it at the
            edge location for future requests.
          </TextListItem>
          <TextListItem>
            <Strong>Continuous Monitoring</Strong>: CloudFront continuously
            monitors and manages the edge locations to ensure optimal
            performance and availability.
          </TextListItem>
        </TextList>

        <SubSectionHeading>High level Overview</SubSectionHeading>
        <PostImage
          src={CloudFrontHighLevelOverview}
          alt="High-level overview diagram of Amazon CloudFront"
        />

        <SectionHeading id="s3-as-origin">S3 as an Origin</SectionHeading>
        <Paragraph>
          Here is an example detailing how Cloudfront uses an S3 bucket at an
          origin. The S3 bucket will use a Origin Access Control (OAC) along
          with a bucket policy to permit distributions through the S3 bucket.
        </Paragraph>
        <PostImage
          src={CloudFrontS3Origin}
          alt="Diagram of CloudFront using S3 as an origin with OAC"
        />

        <SectionHeading id="alb-as-origin">ALB as an Origin</SectionHeading>
        <Paragraph>
          It's possible for CloudFront to access any HTTP backend like an
          EC2 instance or a load balancer. There is no private VPC connectivity
          within CloudFront so security groups must be setup to allow traffic
          between edge locations and the instance you want to connect to.
        </Paragraph>
        <PostImage
          src={CloudFrontALBOrigin}
          alt="Diagram of CloudFront using an Application Load Balancer as origin"
        />

        <SectionHeading id="geo-restriction">Geo-Restriction</SectionHeading>
        <Paragraph>
          AWS CloudFront Geo-Restriction, also known as geo-blocking, allows you
          to control the distribution of your content based on the geographic
          location of your viewers. This feature enables you to restrict access
          to your content to specific countries or regions, enhancing content
          security, ensuring compliance with regional regulations, and managing
          content distribution rights.
        </Paragraph>

        <TertiaryHeading>Key features:</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Whitelist or Blacklist Countries</Strong>: You can specify a
            list of countries where your content is allowed (whitelist) or
            specify countries where access is denied (blacklist).
          </TextListItem>
          <TextListItem>
            <Strong>Custom Error Pages</Strong>: You can configure custom error
            pages to be displayed when a user from a restricted location tries
            to access your content.
          </TextListItem>
          <TextListItem>
            <Strong>Edge Locations</Strong>: CloudFront uses its global network
            of edge locations to determine the geographic location of the
            request and enforce geo-restrictions accordingly.
          </TextListItem>
        </TextList>

        <TertiaryHeading>How it works:</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Request from Viewer</Strong>: A viewer requests content from
            your CloudFront distribution.
          </TextListItem>
          <TextListItem>
            <Strong>Geo-Location Determination</Strong>: CloudFront determines
            the geographic location of the request using the viewer's IP
            address.
          </TextListItem>
          <TextListItem>
            <Strong>Geo-Restriction Check</Strong>: CloudFront checks the
            geo-restriction settings for your distribution to see if the
            viewer's location is allowed to access the content.
          </TextListItem>
          <TextListItem>
            <Strong>Content Delivery or Denial</Strong>: CloudFront
            continuously monitors and manages the edge locations to ensure
            optimal performance and availability.
          </TextListItem>
          <TextListItem>
            If the viewer's location is allowed, CloudFront serves the
            requested content from the nearest edge location.
          </TextListItem>
          <TextListItem>
            If the viewer's location is restricted, CloudFront returns an
            HTTP 403 (Forbidden) status code, optionally displaying a custom
            error page if configured.
          </TextListItem>
        </TextList>

        <SectionHeading id="price-classes">Pricing</SectionHeading>
        <Paragraph>
          There are three price classes for CloudFront. Essentially the lower
          number of edge locations you use, the less it will cost to distribute
          your content. These classes are:
        </Paragraph>
        <TextList>
          <TextListItem>
            <Strong>Price Class All</Strong>: All regions - best performance.
          </TextListItem>
          <TextListItem>
            <Strong>Price Class 200</Strong>: Most regions, but excludes the
            most expensive regions.
          </TextListItem>
          <TextListItem>
            <Strong>Price Class 100</Strong>: Only the least expensive regions.
          </TextListItem>
        </TextList>

        <SectionHeading id="cache-invalidation">Cache Invalidation</SectionHeading>
        <Paragraph>
          AWS CloudFront cache invalidation is a feature that allows you to
          remove objects from CloudFront edge caches before they expire. This is
          useful when you need to ensure that viewers receive the most
          up-to-date content, such as after updating a website, modifying static
          assets, or fixing errors in distributed content. You can invalidate
          all files with a '*'.
        </Paragraph>
        <PostImage
          src={CloudFrontCacheInvalidation}
          alt="Diagram showing cache invalidation in Amazon CloudFront"
        />

        <SectionHeading id="global-accelerator">Global Accelerator</SectionHeading>
        <Paragraph>
          AWS Global Accelerator is a networking service that improves the
          availability and performance of your applications with global users.
          It uses the AWS global network to optimize the path to your
          application, providing two static IP addresses that act as a fixed
          entry point to your application endpoints (e.g., EC2 instances, Load
          Balancers, or Elastic IPs) in multiple AWS Regions. This helps reduce
          latency, improve availability, and provide seamless failover.
        </Paragraph>
        <PostImage
          src={CloudFrontGlobalAccelerator}
          alt="Diagram of AWS Global Accelerator working with multiple regions"
        />

        <TertiaryHeading>Key features:</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Global Network</Strong>: Uses the AWS global network, which
            is optimized for performance and reliability, to route user traffic.
          </TextListItem>
          <TextListItem>
            <Strong>Static IP Addresses</Strong>: Provides two static IP
            addresses that act as a fixed entry point for your application,
            simplifying DNS management and improving resilience.
          </TextListItem>
          <TextListItem>
            <Strong>Traffic Distribution</Strong>: Routes user traffic to the
            nearest healthy endpoint based on performance, geography, or
            user-defined policies.
          </TextListItem>
          <TextListItem>
            <Strong>Health Checks</Strong>: Continuously monitors the health of
            your application endpoints and routes traffic only to healthy
            endpoints.
          </TextListItem>
          <TextListItem>
            <Strong>DDoS Protection</Strong>: Integrated with AWS Shield,
            providing protection against DDoS attacks.
          </TextListItem>
          <TextListItem>
            <Strong>Custom Routing</Strong>: Allows you to configure traffic
            routing policies, such as weighted routing, to distribute traffic
            according to your need.
          </TextListItem>
        </TextList>

        <TertiaryHeading>How it works:</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Static IP Allocation</Strong>: When you create an
            accelerator, Global Accelerator assigns two static IP addresses (or
            you can bring your own IPs) that serve as the entry points for your
            application traffic.
          </TextListItem>
          <TextListItem>
            <Strong>Endpoint Grouping</Strong>: You define endpoint groups,
            which are collections of endpoints (e.g., EC2 instances, load
            balancers) in different AWS regions.
          </TextListItem>
          <TextListItem>
            <Strong>Traffic Routing</Strong>: Global Accelerator uses the AWS
            global network to route incoming traffic to the optimal endpoint
            based on health, geography, and performance.
          </TextListItem>
          <TextListItem>
            <Strong>Health Monitoring</Strong>: Continuously monitors the health
            of endpoints and automatically re-routes traffic to healthy
            endpoints as needed.
          </TextListItem>
        </TextList>

        <SubSectionHeading id="references">References</SubSectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon CloudFront Developer Guide - Introduction
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html"
              target="_blank"
              rel="noreferrer"
            >
              Restricting the geographic distribution of your content with
              CloudFront
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html"
              target="_blank"
              rel="noreferrer"
            >
              Choosing the price class for a CloudFront distribution
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html"
              target="_blank"
              rel="noreferrer"
            >
              Invalidating files in Amazon CloudFront
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Global Accelerator - What is AWS Global Accelerator?
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSCloudFront;
