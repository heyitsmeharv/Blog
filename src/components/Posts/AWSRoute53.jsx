import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { AWSSVG, AWSRoute53SVG } from "../../resources/styles/icons";

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
} from "../Typography/Typography";

// images
import DNSExample from "../../resources/images/blog/AWSRoute53/route53_dns_example.jpeg";
import DNSBreakdown from "../../resources/images/blog/AWSRoute53/route53_dns_breakdown.jpeg";
import DNSWorking from "../../resources/images/blog/AWSRoute53/route53_dns_working.jpeg";
import Route53Example from "../../resources/images/blog/AWSRoute53/route53_example.jpeg";
import Route53PublicHostedZone from "../../resources/images/blog/AWSRoute53/route53_public_hosted_zone.jpeg";
import Route53PrivateHostedZone from "../../resources/images/blog/AWSRoute53/route53_private_hosted_zone.jpeg";
import Route53AliasExample from "../../resources/images/blog/AWSRoute53/route53_alias_example.jpeg";
import Route53SimpleRouting from "../../resources/images/blog/AWSRoute53/route53_simple_routing.jpeg";
import Route53WeightedRouting from "../../resources/images/blog/AWSRoute53/route53_weighted_routing.jpeg";
import Route53IPRouting from "../../resources/images/blog/AWSRoute53/route53_ip_routing.jpeg";
import Route53MultiValueRouting from "../../resources/images/blog/AWSRoute53/route53_multi_value_routing.jpeg";
import Route53HealthCheck from "../../resources/images/blog/AWSRoute53/route53_health_check.jpeg";
import Route53MonitorEndpoint from "../../resources/images/blog/AWSRoute53/route53_monitor_endpoint.jpeg";
import Route53CalculatedHealthChecks from "../../resources/images/blog/AWSRoute53/route53_calculated_health_checks.jpeg";
import Route53HealthCheckPrivateHostedZone from "../../resources/images/blog/AWSRoute53/route53_health_check_private_hosted_zone.jpeg";
import Route53FailOverRouting from "../../resources/images/blog/AWSRoute53/route53_failover_routing.jpeg";

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSRoute53 = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-route53" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle id="aws-route53-title">AWS Route 53</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSRoute53SVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          Amazon Route 53 is a scalable and highly available Domain Name System
          (DNS). It is designed to route end-user requests to internet
          applications hosted on AWS infrastructure, as well as external
          resources. Overall, Amazon Route 53 is a robust solution for DNS
          management, domain registration, and traffic routing, ensuring high
          availability and performance for applications hosted both on AWS and
          elsewhere. Here are the key features and components of Route 53:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>DNS Service</Strong>: Route 53 translates domain names
            (e.g. www.example.com) into IP addresses (e.g. 192.0.2.1), allowing
            computers to connect to each other.
          </TextListItem>
          <TextListItem>
            <Strong>Domain Registration</Strong>: Route 53 allows users to
            register new domain names directly through AWS. It supports various
            top-level domains (TLDs).
          </TextListItem>
          <TextListItem>
            <Strong>Traffic Routing Policies</Strong>: Route 53 offers several
            routing policies to determine how traffic is directed:
          </TextListItem>
        </TextList>

        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Simple Routing</Strong>: Routes traffic to a single
            resource.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Weighted Routing</Strong>: Distributes traffic across
            multiple resources based on assigned weights.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Latency-based Routing</Strong>: Routes traffic to the region
            with the lowest latency.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Failover Routing</Strong>: Configures active-passive
            failover setups to ensure high availability.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Geolocation Routing</Strong>: Directs traffic based on the
            geographic location of users.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Geoproximity Routing</Strong>: Routes traffic based on the
            proximity of users to resources and can bias routing towards certain
            locations.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>IP-Based Routing</Strong>: Routes traffic based on the IP
            address of the user, allowing for precise control over request
            handling.
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Multivalue Answer Routing</Strong>: Returns multiple values,
            such as IP addresses, and can be used with health checks to ensure
            traffic is directed to healthy resources.
          </IndentedTextListItem>
        </IndentedTextList>

        <TextList>
          <TextListItem>
            <Strong>Health Checks and Monitoring</Strong>: Route 53 can monitor
            the health and performance of resources and redirect traffic if a
            resource becomes unavailable. It uses health checks to determine
            resource availability and can be integrated with CloudWatch for
            detailed monitoring.
          </TextListItem>
          <TextListItem>
            <Strong>Domain Name Management</Strong>: Route 53 allows full
            control over DNS records, including A, AAAA, CNAME, MX, PTR, SRV,
            and TXT records, among others. Users can manage these records
            through the AWS Management Console, AWS CLI, or API.
          </TextListItem>
          <TextListItem>
            <Strong>Integration with AWS Services</Strong>: Route 53 integrates
            seamlessly with other AWS services like Elastic Load Balancing
            (ELB), Amazon S3, and CloudFront, making it easier to manage and
            optimize your applications.
          </TextListItem>
          <TextListItem>
            <Strong>Scalability and Reliability</Strong>: As part of AWS's
            global infrastructure, Route 53 is designed to handle a large number
            of DNS queries with low latency and high reliability.
          </TextListItem>
          <TextListItem>
            <Strong>DNSSEC Support</Strong>: Route 53 supports Domain Name
            System Security Extensions (DNSSEC), which provides an additional
            layer of security by ensuring that the responses to DNS queries have
            not been tampered with.
          </TextListItem>
        </TextList>

        <SectionHeading id="what-is-dns">What is a DNS?</SectionHeading>

        <Paragraph>
          Before we dive into this service we should first clarify what exactly
          a 'DNS' is. So what is a 'DNS'? Well, let's expand from the bullet
          point above. A 'DNS' stands for <Strong>Domain Name System</Strong>{" "}
          which translates the human friendly hostnames into a machine IP
          address. Meaning that every URL has a IP address which acts as a
          location or address, so when we navigate to that URL the computer
          knows where to direct traffic to.
        </Paragraph>

        <PostImage src={DNSExample} alt="DNS high-level example" />

        <Paragraph>
          The domain can be broken down into individual parts as the Domain Name
          System uses a hierarchical naming structure all of which encompasses
          the URL.
        </Paragraph>

        <PostImage src={DNSBreakdown} alt="DNS name breakdown" />

        <Paragraph>Let's break down some terminology.</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Domain Registrar</Strong>: Amazon Route 53, GoDaddy,
            NameCheap. (This is where you can register your domain name).
          </TextListItem>
          <TextListItem>
            <Strong>DNS Records</Strong>: A, AAAA, CNAME, NS, ...
          </TextListItem>
          <TextListItem>
            <Strong>Zone File</Strong>: Contains DNS records. (This is how
            hostnames are matched to IP addresses).
          </TextListItem>
          <TextListItem>
            <Strong>Name Server</Strong>: Resolves DNS queries. (Authoritative
            or Non-Authoritative).
          </TextListItem>
          <TextListItem>
            <Strong>Top Level Domain (TLD)</Strong>: .com, .co.uk, .gov, .org,
            ...
          </TextListItem>
          <TextListItem>
            <Strong>Second Level Domain (SLD)</Strong>: amazon.com, google.com,
            ...
          </TextListItem>
        </TextList>

        <SectionHeading id="how-dns-works">How DNS Works</SectionHeading>

        <Paragraph>
          Now that we have some basic understanding of what a DNS is, let's look
          at what happens behind the scenes. Let's break it down into steps.
        </Paragraph>


        <PostImage src={DNSWorking} alt="How DNS works end-to-end" />

        <TextList>
          <TextListItem>
            <Strong>1</Strong>: The first step is to ping your internet
            service provider (ISP) and essentially ask if it's seen
            'example.com' before.
          </TextListItem>
          <TextListItem>
            <Strong>2</Strong>: Assuming that a lookup is required the Root
            DNS Server will be asked the same question. The server will
            respond with the named server (NS) so in this example it would
            be '.com', along with a public IP.
          </TextListItem>
          <TextListItem>
            <Strong>3</Strong>: The Top Level Domain (TLD) DNS Server then
            gets pinged with the public IP asking the same question. If
            again, not found that server will return the TLD with another
            public IP.
          </TextListItem>
          <TextListItem>
            <Strong>4</Strong>: The same process happens and the Second
            Level Domain (SLD) DNS Server should have the record entry and
            will return the IP address.
          </TextListItem>
          <TextListItem>
            <Strong>5</Strong>: The Local DNS Server will cache the results
            for a specified amount of time so when next time the question is
            asked, it won't have to recursively ping DNS servers to find the
            answer.
          </TextListItem>
          <TextListItem>
            <Strong>6</Strong>: The answer is sent back to the web browser
            which it caches.
          </TextListItem>
          <TextListItem>
            <Strong>7</Strong>: The IP address is used to access the web
            server.
          </TextListItem>
        </TextList>

        <SectionHeading id="route53">Route 53</SectionHeading>

        <Paragraph>
          A fun fact - why did Amazon name this service 'Route 53'? Well, 53 is
          a reference to the traditional DNS port. Here's a diagram to depict
          what I've hopefully already explained above:
        </Paragraph>

        <PostImage src={Route53Example} alt="Route 53 example diagram" />

        <SubSectionHeading>Records</SubSectionHeading>

        <Paragraph>
          In Route 53 you will define records. These records state how the
          traffic will be routed to the domain. Each record contains:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Domain/Subdomain Name</Strong>: e.g. example.com
          </TextListItem>
          <TextListItem>
            <Strong>Record Type</Strong>: A or AAAA
          </TextListItem>
          <TextListItem>
            <Strong>Value</Strong>: e.g. 12.34.56.78
          </TextListItem>
          <TextListItem>
            <Strong>Routing Policy</Strong>: How Route 53 responds to queries.
          </TextListItem>
          <TextListItem>
            <Strong>TTL (Time To Live)</Strong>: The amount of time the record
            is cached at DNS Resolvers.
          </TextListItem>
        </TextList>

        <Paragraph>
          Route 53 supports a lot of record types but these are the main ones to
          remember:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>A</Strong>: Maps hostname to IPV4 address
          </TextListItem>
          <TextListItem>
            <Strong>AAAA</Strong>: Maps hostname to IPV6 address
          </TextListItem>
          <TextListItem>
            <Strong>CNAME</Strong>: Maps hostname to another hostname
          </TextListItem>
          <TextListItem>
            <Strong>NS</Strong>: Name servers for the hosted zone which control
            how traffic is routed for a domain.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Hosted Zones</SubSectionHeading>

        <Paragraph>
          Hosted Zones are essentially a container for records that define how
          to route traffic to a domain and its subdomains. There are two types
          of Hosted Zones, <Strong>Public Hosted Zones</Strong> and{" "}
          <Strong>Private Hosted Zones</Strong>.
        </Paragraph>

        <PostImage
          src={Route53PublicHostedZone}
          alt="Route 53 public hosted zone example"
        />

        <Paragraph>
          Public Hosted Zones contains records that specify how to route traffic
          on the internet (public domain names).
        </Paragraph>

        <PostImage
          src={Route53PrivateHostedZone}
          alt="Route 53 private hosted zone example"
        />

        <Paragraph>
          Private Hosted Zones contains records that specify how to route
          traffic within one or more VPCs (private domain names).
        </Paragraph>

        <SubSectionHeading>TTL (Time To Live)</SubSectionHeading>

        <Paragraph>
          TTL is mandatory for each record type apart from Alias. As mentioned
          before TTL is the time that the DNS resolvers will cache the record
          for. A high TTL would be days which would result in less traffic on
          Route 53 but there's a higher chance of retrieving outdated records. A
          low TTL would be seconds which results in more traffic, and therefore
          it's more expensive, but there's a slim chance of the record being
          outdated.
        </Paragraph>

        <SubSectionHeading>CNAME vs Alias</SubSectionHeading>

        <Paragraph>
          AWS Resources whether it is a Load Balancer or an API Gateway it will
          have an AWS hostname exposed. An example would be
          '1b1-1234.us.east-2.elb.amazon.com'. CNAME allows you to point to
          another hostname but it's important to note that the hostname must not
          be a root domain. For example app.mydomain.com would work but
          mydomain.com would not. Aliases are specific to Route 53 and works
          with root domains as well as non-root domains, they are always of type
          A/AAAA. An alias is used to point a hostname to an AWS resource
          (app.mydomain.com {'=>'} 1b1-1234.us.east-2.elb.amazon.com). It's worth
          mentioning that aliases are free of charge and they have native health
          check capabilities.
        </Paragraph>

        <SubSectionHeading>Alias Records</SubSectionHeading>

        <Paragraph>
          A good thing to know about Alias records is that they automatically
          recognise changes in the resources IP address so you won't need to
          edit the record in Route 53. As noted before you can't set a TTL for
          this record.
        </Paragraph>

        <PostImage src={Route53AliasExample} alt="Alias record example" />

        <SectionHeading>Routing Policies</SectionHeading>

        <SubSectionHeading>Routing Policies - Simple Routing</SubSectionHeading>

        <Paragraph>
          This policy is typically used to route traffic to a single resource,
          but you can specify multiple values in the same record. If there are
          multiple values, a random one is chosen by the client. If Alias is
          enabled, you should specify only one AWS resource. You can't associate
          health checks with this policy.
        </Paragraph>

        <PostImage
          src={Route53SimpleRouting}
          alt="Route 53 simple routing policy"
        />

        <SubSectionHeading>
          Routing Policies - Weighted Routing
        </SubSectionHeading>

        <Paragraph>
          This policy is pretty self explanatory in that you can control the
          percentage i.e. weight of requests to each resource. Each record will
          need a weight assigned which doesn't need to sum up to 100. The DNS
          records will need to be the same name and type in order for this
          policy to work. If a record is assigned 0 then traffic will not be
          sent to that resource, if they are all set to 0 then it will be
          distributed equally. You can associate health checks with this policy.
          Good use cases for this would be testing new application versions and
          load balancing between regions.
        </Paragraph>

        <PostImage
          src={Route53WeightedRouting}
          alt="Route 53 weighted routing policy"
        />

        <SubSectionHeading>
          Routing Policies - Latency-based Routing
        </SubSectionHeading>

        <Paragraph>
          This is another self explanatory policy where users are directed to
          resources that have the least latency. A user from the UK could be
          directed to a load balancer in the US if that is deemed to have the
          lowest latency. This can be associated with health checks and has
          failover capacity.
        </Paragraph>

        <SubSectionHeading>
          Routing Policies - Failover Routing
        </SubSectionHeading>

        <Paragraph>
          There are two instances, a primary and secondary, if the primary
          instance is deemed unhealthy then the secondary instance is used.
        </Paragraph>

        <PostImage
          src={Route53FailOverRouting}
          alt="Route 53 failover routing policy"
        />

        <SubSectionHeading>
          Routing Policies - Geolocation based Routing
        </SubSectionHeading>

        <Paragraph>
          This is different from Latency-based - as it's based on the users
          location. So regardless if it's a better connection elsewhere you'll
          be routed to a specified record for a location. There should be a
          default record set in case there's no match on the user's location.
          Good use cases would be website localization and restrict content
          distribution. This policy can be associated with health checks.
        </Paragraph>

        <SubSectionHeading>
          Routing Policies - Geoproximity based Routing
        </SubSectionHeading>

        <Paragraph>
          This policy is based on users proximity to the resource. Traffic is
          distributed based on how close users are to the resource. The resource
          can be assigned a bias which can be used to direct/shift more or less
          traffic to it. You can specify a latitude and longitude for non AWS
          resources. You must use Route 53 Traffic Flow to use this policy.
        </Paragraph>

        <SubSectionHeading>
          Routing Policies - IP-based Routing
        </SubSectionHeading>

        <Paragraph>
          This policy is based on the clients IP addresses. You provide a CIDR
          block for your clients and the corresponding endpoints/locations. You
          should use this policy for when you want to route end users from a
          particular ISP to a specific endpoint.
        </Paragraph>

        <PostImage src={Route53IPRouting} alt="Route 53 IP-based routing" />

        <SubSectionHeading>
          Routing Policies - Multi Value based Routing
        </SubSectionHeading>

        <Paragraph>
          This policy should be used when you're routing traffic to multiple
          resources. There are 8 records returned for each multi-value query.
          This policy can be associated with health checks.
        </Paragraph>

        <PostImage
          src={Route53MultiValueRouting}
          alt="Route 53 multi value routing"
        />

        <SectionHeading>Health Checks</SectionHeading>

        <Paragraph>
          HTTP Health Checks are only for public resources and the reason you
          would want to assign health checks to these resources is to have
          automated DNS failover. There are three options on what you can
          monitor with health checks:
        </Paragraph>

        <TextList>
          <TextListItem>
            Endpoint monitoring (application, server or other AWS resources)
          </TextListItem>
          <TextListItem>
            Calculated health check - A health check that monitors another
            health check
          </TextListItem>
          <TextListItem>
            CloudWatch Alarms - You can monitor an alarm which could be any
            custom metric (helpful for private resources)
          </TextListItem>
        </TextList>

        <PostImage
          src={Route53HealthCheck}
          alt="Route 53 health checks overview"
        />

        <SubSectionHeading>Health Checks - Monitor an Endpoint</SubSectionHeading>

        <Paragraph>
          There are about 15 global health checkers that will check the endpoint
          health.
        </Paragraph>

        <TextList>
          <TextListItem>
            You can configure the healthy/unhealthy threshold which the default
            is set to 3.
          </TextListItem>
          <TextListItem>
            The interval is 30 seconds but can be adjusted to 10 seconds but
            would incur a higher cost.
          </TextListItem>
          <TextListItem>
            The supported protocols are: HTTP, HTTPS and TCP.
          </TextListItem>
          <TextListItem>
            If there is 18% or more healthy responses, Route 53 will consider it
            healthy, otherwise it's deemed unhealthy.
          </TextListItem>
          <TextListItem>
            Health checks pass only when the endpoint responds with 200 to 300
            status codes.
          </TextListItem>
          <TextListItem>
            If the response from the checker returns text, the first 5120 bytes
            will be checked for a pass or fail.
          </TextListItem>
        </TextList>

        <PostImage
          src={Route53MonitorEndpoint}
          alt="Route 53 monitor endpoint example"
        />

        <SubSectionHeading>
          Health Checks - Calculated Health Checks
        </SubSectionHeading>

        <Paragraph>
          With calculated health checks you can combine the results up to 256
          child health checks into a single health check. You can specify how
          many child health checks need to pass to make the parent pass its
          health check. This uses logic gates such as OR, AND, or NOT.
        </Paragraph>

        <PostImage
          src={Route53CalculatedHealthChecks}
          alt="Route 53 calculated health checks"
        />

        <SubSectionHeading>
          Health Checks - Private Hosted Zones
        </SubSectionHeading>

        <Paragraph>
          Because the Route 53 health checkers live outside of the VPC they
          can't access private resources. To get around this you can associate a
          health checker to a CloudWatch alarm which can monitor a metric of
          private resources.
        </Paragraph>

        <PostImage
          src={Route53HealthCheckPrivateHostedZone}
          alt="Route 53 private hosted zone health checks"
        />

        <SectionHeading id="references">References</SectionHeading>

        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Route 53 Developer Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://aws.amazon.com/route53/faqs/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Route 53 FAQs
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://www.cloudflare.com/learning/dns/what-is-dns/"
              target="_blank"
              rel="noreferrer"
            >
              What is DNS? – Cloudflare Learning Center
            </TextLink>
          </TextListItem>
        </TextList>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default AWSRoute53;
