import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { AWSSVG, AWSVPCSVG } from "../../resources/styles/icons";

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

// components
import BackButton from "../Button/BackButton";
import Table from "../Table/Table";

// images
import VPCOctects from "../../resources/images/blog/AWSVPC/vpc_octets_memo.jpeg";
import VPCDefault from "../../resources/images/blog/AWSVPC/vpc_default.jpeg";
import VPCSubnets from "../../resources/images/blog/AWSVPC/vpc_subnets.jpeg";
import VPCInternetGateway from "../../resources/images/blog/AWSVPC/vpc_internet_gateway.jpeg";
import VPCBastionHost from "../../resources/images/blog/AWSVPC/vpc_bastion_host.jpeg";
import VPCNATGateWay from "../../resources/images/blog/AWSVPC/vpc_nat_gateway.jpeg";
import VPCNATGateWayHA from "../../resources/images/blog/AWSVPC/vpc_nat_gateway_ha.jpeg";
import VPCSGNACLS from "../../resources/images/blog/AWSVPC/vpc_sg_nacls.jpeg";
import VPCNACL from "../../resources/images/blog/AWSVPC/vpc_nacl.jpeg";
import VPCEphemeralPorts from "../../resources/images/blog/AWSVPC/vpc_ephemeral_ports.jpeg";
import VPCNACLEphemeralPorts from "../../resources/images/blog/AWSVPC/vpc_nacl_ephemeral_ports.jpeg";
import VPCPeering from "../../resources/images/blog/AWSVPC/vpc_peering.jpeg";
import VPCEndpoint from "../../resources/images/blog/AWSVPC/vpc_endpoint.jpeg";
import VPCEndpointPrivateLink from "../../resources/images/blog/AWSVPC/vpc_endpoint_private_link.jpeg";
import VPCGatewayEndpoint from "../../resources/images/blog/AWSVPC/vpc_gateway_endpoints.jpeg";
import VPCInterfaceEndpoint from "../../resources/images/blog/AWSVPC/vpc_interface_endpoints.jpeg";
import VPCFlowLogSyntax from "../../resources/images/blog/AWSVPC/vpc_flow_log_syntax.jpeg";
import VPCFlowLogs from "../../resources/images/blog/AWSVPC/vpc_flow_logs.jpeg";
import VPCSiteToSiteVPN from "../../resources/images/blog/AWSVPC/vpc_site_to_site_vpn.jpeg";
import VPCSiteToSitePublicPrivateIP from "../../resources/images/blog/AWSVPC/vpc_site_to_site_public_private_ip.jpeg";
import VPCSiteToSiteCloudHub from "../../resources/images/blog/AWSVPC/vpc_site_to_site_cloud_hub.jpeg";
import VPCDirectConnect from "../../resources/images/blog/AWSVPC/vpc_direct_connect.jpeg";
import VPCDirectConnectGateWay from "../../resources/images/blog/AWSVPC/vpc_direct_connect_gateway.jpeg";
import VPCDirectConnectEncryption from "../../resources/images/blog/AWSVPC/vpc_direct_connect_encryption.jpeg";
import VPCDirectConnectResilience from "../../resources/images/blog/AWSVPC/vpc_direct_connect_resilience.jpeg";
import VPCDirectConnectBackup from "../../resources/images/blog/AWSVPC/vpc_direct_connect_backup.jpeg";
import VPCDX from "../../resources/images/blog/AWSVPC/vpc_dx.jpeg";
import VPCTransitGateway from "../../resources/images/blog/AWSVPC/vpc_transit_gateway.jpeg";
import VPCTransitGatewayECMP from "../../resources/images/blog/AWSVPC/vpc_transit_gateway_ecmp.jpeg";
import VPCTransitGatewayMA from "../../resources/images/blog/AWSVPC/vpc_transit_gateway_multiple_accounts.jpeg";
import VPCTransitGatewayOverview from "../../resources/images/blog/AWSVPC/vpc_transit_gateway_overview.jpeg";
import VPCTrafficMirroring from "../../resources/images/blog/AWSVPC/vpc_traffic_mirroring.jpeg";
import VPCIPv6 from "../../resources/images/blog/AWSVPC/vpc_ipv6.jpeg";
import VPCEgressOnlyIG from "../../resources/images/blog/AWSVPC/vpc_egress_only_internet_gateway.jpeg";
import VPCIPv6Routing from "../../resources/images/blog/AWSVPC/vpc_ipv6_routing.jpeg";
import VPCNetworkingCosts from "../../resources/images/blog/AWSVPC/vpc_networking_costs.jpeg";
import VPCEgressTrafficNetworkingCosts from "../../resources/images/blog/AWSVPC/vpc_egress_traffic_networking_costs.jpeg";
import VPCNetworkFirewall from "../../resources/images/blog/AWSVPC/vpc_network_firewall.jpeg";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSVPC = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-vpc" });
  }, []);

  const natColumns = ["", "NAT Gateway", "NAT Instance"];
  const natData = [
    {
      "": "Availability",
      "NAT Gateway": "Highly available within AZ (create another in a different AZ)",
      "NAT Instance": "Use a script to manage failover between instances",
    },
    {
      "": "Bandwidth",
      "NAT Gateway": "Up to 100 Gbps",
      "NAT Instance": "Depends on EC2 instance type",
    },
    {
      "": "Maintenance",
      "NAT Gateway": "Managed by AWS",
      "NAT Instance": "Managed by you",
    },
    {
      "": "Cost",
      "NAT Gateway": "Per hour & amount of data transferred",
      "NAT Instance":
        "Per hour (EC2 instance type and size) + network / data transfer costs",
    },
    {
      "": "Public IPv4",
      "NAT Gateway": "✔️",
      "NAT Instance": "✔️",
    },
    {
      "": "Private IPv4",
      "NAT Gateway": "✔️",
      "NAT Instance": "✔️",
    },
    {
      "": "Security Groups",
      "NAT Gateway": "❌",
      "NAT Instance": "✔️",
    },
    {
      "": "Use as Bastion Host",
      "NAT Gateway": "❌",
      "NAT Instance": "✔️",
    },
  ];

  const sgNaclColumns = ["Security Group", "NACL"];
  const sgNaclData = [
    {
      "Security Group": "Operates at the instance level",
      NACL: "Operates at the subnet level",
    },
    {
      "Security Group": "Supports allow rules only",
      NACL: "Supports allow rules and deny rules",
    },
    {
      "Security Group":
        "Stateful: return traffic is automatically allowed, regardless of any rules",
      NACL: "Stateless: return traffic must be explicitly allowed by rules (ephemeral ports)",
    },
    {
      "Security Group":
        "All rules are evaluated before deciding whether to allow traffic",
      NACL:
        "Rules are evaluated in order (lowest to highest) and the first match wins",
    },
    {
      "Security Group":
        "Applies to an EC2 instance when the group is attached to its ENI",
      NACL:
        "Automatically applies to all ENIs / instances in the subnet that it is associated with",
    },
  ];

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Amazon Virtual Private Cloud (VPC)</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSVPCSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post we'll be diving into Amazon Virtual Private Cloud (VPC).
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#vpc-introduction">Amazon Virtual Private Cloud</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#cidr">Classless Inter-Domain Routing (CIDR)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#vpc-in-aws">VPC in AWS</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#subnets">Subnets</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#vpc-igw">Internet Gateway (IGW)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#vpc-bastion-hosts">Bastion Hosts</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#nat-gateway">NAT Gateway</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#sg-nacls">Security Groups &amp; NACLs</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#vpc-peering">VPC Peering</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#vpc-endpoint">VPC Endpoints</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#vpc-flow-logs">VPC Flow Logs</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#site-to-site-vpn">Site-to-Site VPN</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#direct-connect">Direct Connect (DX)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#transit-gateway">Transit Gateway</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#traffic-mirroring">Traffic Mirroring</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#ipv6">IPv6 in VPC</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#networking-costs">Networking Costs in AWS</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#network-protection">AWS Network Firewall</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#vpc-summary">VPC Summary</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="vpc-introduction">
          Amazon Virtual Private Cloud (VPC)
        </SectionHeading>
        <Paragraph>
          A Virtual Private Cloud (VPC) is a logically isolated section of the AWS Cloud
          where you can launch AWS resources (such as EC2 instances) within a virtual
          network that you define. A VPC lets you customise your network environment:
          choose your own IP address ranges, create subnets, configure route tables and
          gateways, and tightly control network access.
        </Paragraph>
        <PostImage src={VPCTransitGatewayOverview} alt="VPC and Transit Gateway overview" />

        <SectionHeading id="cidr">
          Classless Inter-Domain Routing (CIDR)
        </SectionHeading>
        <Paragraph>
          CIDR is a method used for allocating IP addresses and routing internet traffic.
          It underpins how you carve up address space inside a VPC.
        </Paragraph>

        <SubSectionHeading>IP Addressing</SubSectionHeading>
        <Paragraph>
          An IP address is a numerical label assigned to a device on a network. CIDR works
          with both IPv4 and IPv6, but is most commonly associated with IPv4 in VPC
          design.
        </Paragraph>

        <SubSectionHeading>CIDR Notation</SubSectionHeading>
        <Paragraph>
          CIDR notation consists of an IP address followed by a slash and a prefix length
          describing the network bits, for example: <Strong>192.168.1.0/24</Strong>.
        </Paragraph>
        <TextList>
          <TextListItem>192.168.1.0 - the network address.</TextListItem>
          <TextListItem>
            /24 - the first 24 bits are the network portion, leaving 8 bits for hosts.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Subnetting</SubSectionHeading>
        <Paragraph>
          CIDR allows you to create subnets by varying the prefix length. The smaller the
          prefix (e.g. /16 vs /24), the larger the network.
        </Paragraph>
        <TextList>
          <TextListItem>/0 - 0.0.0.0 (entire IPv4 space)</TextListItem>
          <TextListItem>/8 - 255.0.0.0</TextListItem>
          <TextListItem>/16 - 255.255.0.0</TextListItem>
          <TextListItem>/24 - 255.255.255.0</TextListItem>
          <TextListItem>/32 - 255.255.255.255 (single IP)</TextListItem>
        </TextList>
        <Paragraph>Example:</Paragraph>
        <TextList>
          <TextListItem>
            <Strong>192.168.1.0/24</Strong> - 256 IPs (192.168.1.0-192.168.1.255).
          </TextListItem>
          <TextListItem>
            <Strong>192.168.1.0/25</Strong> - two blocks of 128 IPs:
            192.168.1.0-192.168.1.127 and 192.168.1.128-192.168.1.255.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Understanding CIDR - Subnet Mask</SubSectionHeading>
        <PostImage src={VPCOctects} alt="CIDR and subnet masks memo" />
        <TextList>
          <TextListItem>192.168.0.0 /32 → 1 IP (192.168.0.0)</TextListItem>
          <TextListItem>192.168.0.0 /31 → 2 IPs (192.168.0.0-192.168.0.1)</TextListItem>
          <TextListItem>192.168.0.0 /30 → 4 IPs (192.168.0.0-192.168.0.3)</TextListItem>
          <TextListItem>192.168.0.0 /29 → 8 IPs (192.168.0.0-192.168.0.7)</TextListItem>
          <TextListItem>192.168.0.0 /28 → 16 IPs (192.168.0.0-192.168.0.15)</TextListItem>
          <TextListItem>192.168.0.0 /27 → 32 IPs (192.168.0.0-192.168.0.31)</TextListItem>
          <TextListItem>192.168.0.0 /26 → 64 IPs (192.168.0.0-192.168.0.63)</TextListItem>
          <TextListItem>192.168.0.0 /25 → 128 IPs (192.168.0.0-192.168.0.127)</TextListItem>
          <TextListItem>192.168.0.0 /24 → 256 IPs (192.168.0.0-192.168.0.255)</TextListItem>
          <TextListItem>192.168.0.0 /16 → 65,536 IPs (192.168.0.0-192.168.255.255)</TextListItem>
        </TextList>

        <SubSectionHeading>Public vs Private IPv4</SubSectionHeading>
        <Paragraph>
          The Internet Assigned Numbers Authority (IANA) defined specific address ranges
          for private use.
        </Paragraph>
        <TextList>
          <TextListItem>
            <Strong>Private ranges</Strong>:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>10.0.0.0/8 - large private networks</IndentedTextListItem>
          <IndentedTextListItem>
            172.16.0.0/12 - common for AWS default VPC ranges
          </IndentedTextListItem>
          <IndentedTextListItem>
            192.168.0.0/16 - common for home / small office networks
          </IndentedTextListItem>
        </IndentedTextList>
        <Paragraph>
          All other non-reserved addresses are generally routable on the public internet.
        </Paragraph>

        <SectionHeading id="vpc-in-aws">VPC in AWS</SectionHeading>
        <TextList>
          <TextListItem>You can have multiple VPCs per region (default soft limit is 5).</TextListItem>
          <TextListItem>
            Each VPC can have up to 5 IPv4 CIDR blocks (plus IPv6 CIDRs).
          </TextListItem>
          <TextListItem>
            Per CIDR block: minimum size /28 (16 IPs), maximum size /16 (65,536 IPs).
          </TextListItem>
          <TextListItem>
            Because a VPC is private, only private IPv4 ranges are allowed:
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>10.0.0.0/8</IndentedTextListItem>
          <IndentedTextListItem>172.16.0.0/12</IndentedTextListItem>
          <IndentedTextListItem>192.168.0.0/16</IndentedTextListItem>
        </IndentedTextList>
        <PostImage src={VPCDefault} alt="Default VPC overview" />

        <SectionHeading id="subnets">Subnets</SectionHeading>
        <Paragraph>
          You divide your VPC into subnets, which are slices of your VPC CIDR tied to
          specific Availability Zones. Subnets can be public (routable to the internet
          through an IGW) or private (no direct internet route).
        </Paragraph>
        <Paragraph>AWS reserves 5 IP addresses in each subnet:</Paragraph>
        <TextList>
          <TextListItem>.0 - Network address</TextListItem>
          <TextListItem>
            .1 - Reserved by AWS for the VPC router (e.g. 10.0.0.1)
          </TextListItem>
          <TextListItem>
            .2 - Reserved for Amazon-provided DNS (e.g. 10.0.0.2)
          </TextListItem>
          <TextListItem>.3 - Reserved by AWS for future use</TextListItem>
          <TextListItem>
            .255 - Network broadcast address (not used in VPC, but still reserved)
          </TextListItem>
        </TextList>
        <Paragraph>
          When sizing subnets, remember these reserved IPs. For example, if you need 29
          EC2 instances:
        </Paragraph>
        <TextList>
          <TextListItem>
            /27 (32 IPs) → 32 - 5 = 27 usable IPs → not enough.
          </TextListItem>
          <TextListItem>
            /26 (64 IPs) → 64 - 5 = 59 usable IPs → enough capacity.
          </TextListItem>
        </TextList>
        <PostImage src={VPCSubnets} alt="VPC subnets layout" />

        <SectionHeading id="vpc-igw">Internet Gateway (IGW)</SectionHeading>
        <Paragraph>
          To provide internet access for resources in your VPC, you attach an Internet
          Gateway. Routes in your route tables then send 0.0.0.0/0 (or specific prefixes)
          towards the IGW.
        </Paragraph>
        <TextList>
          <TextListItem>
            Allows resources in public subnets to connect to and be reached from the
            internet.
          </TextListItem>
          <TextListItem>Created separately and then attached to a VPC.</TextListItem>
          <TextListItem>One IGW attaches to exactly one VPC.</TextListItem>
          <TextListItem>On its own, it does nothing - you must update route tables.</TextListItem>
        </TextList>
        <PostImage src={VPCInternetGateway} alt="VPC Internet Gateway example" />

        <SectionHeading id="vpc-bastion-hosts">Bastion Hosts</SectionHeading>
        <Paragraph>
          A bastion host is a hardened entry point into your private network, typically
          used to SSH into private EC2 instances.
        </Paragraph>
        <TextList>
          <TextListItem>
            Bastion host lives in a public subnet with inbound SSH (port 22) allowed from
            a restricted IP/CIDR.
          </TextListItem>
          <TextListItem>
            Private instances allow SSH from the bastion's security group or private
            IP.
          </TextListItem>
          <TextListItem>
            Once connected to the bastion, you can hop into private instances.
          </TextListItem>
        </TextList>
        <PostImage src={VPCBastionHost} alt="VPC bastion host architecture" />

        <SectionHeading id="nat-gateway">NAT Gateway</SectionHeading>
        <Paragraph>
          A NAT Gateway lets instances in private subnets initiate outbound connections
          to the internet, while remaining unreachable from the internet.
        </Paragraph>
        <TextList>
          <TextListItem>Charged per hour and per GB processed.</TextListItem>
          <TextListItem>
            Deployed in a public subnet and associated with an Elastic IP.
          </TextListItem>
          <TextListItem>
            Used by instances in other (typically private) subnets via a route.
          </TextListItem>
          <TextListItem>
            Requires an attached IGW (Private Subnet → NAT GW → IGW).
          </TextListItem>
          <TextListItem>No security groups; you control access via NACLs + routes.</TextListItem>
        </TextList>
        <PostImage src={VPCNATGateWay} alt="VPC NAT Gateway example" />

        <SubSectionHeading>NAT Gateway High Availability</SubSectionHeading>
        <Paragraph>
          For high availability, deploy a NAT Gateway per AZ and configure private
          subnets to use the NAT Gateway in their own AZ.
        </Paragraph>
        <PostImage src={VPCNATGateWayHA} alt="NAT Gateway high-availability pattern" />

        <SubSectionHeading>NAT Gateway vs NAT Instance</SubSectionHeading>
        <Table columns={natColumns} data={natData} />

        <SectionHeading id="sg-nacls">Security Groups &amp; NACLs</SectionHeading>
        <Paragraph>
          Security groups and Network ACLs both control traffic, but at different layers
          and with different behaviour.
        </Paragraph>

        <SubSectionHeading>What is a NACL?</SubSectionHeading>
        <Paragraph>
          A Network ACL is a stateless firewall operating at the subnet level. Each subnet
          must be associated with a NACL (or the default NACL).
        </Paragraph>
        <TextList>
          <TextListItem>Controls inbound and outbound traffic at subnet level.</TextListItem>
          <TextListItem>Rules are evaluated in order (lowest rule number first).</TextListItem>
          <TextListItem>
            Supports both allow and deny rules; default action is deny.
          </TextListItem>
          <TextListItem>
            Default NACL allows all traffic; custom NACLs start with deny-all.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Statefulness</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>NACLs are stateless</Strong> - return traffic must be explicitly
            allowed.
          </TextListItem>
          <TextListItem>
            <Strong>Security groups are stateful</Strong> - return traffic is allowed
            automatically.
          </TextListItem>
        </TextList>

        <PostImage src={VPCNACL} alt="NACL overview" />

        <SubSectionHeading>Differences Between Security Groups and NACLs</SubSectionHeading>
        <Table columns={sgNaclColumns} data={sgNaclData} />
        <PostImage src={VPCSGNACLS} alt="Security groups vs NACLs diagram" />

        <SubSectionHeading>Ephemeral Ports</SubSectionHeading>
        <Paragraph>
          Ephemeral ports are short-lived client-side ports used when initiating outbound
          connections. Different OSes use different ranges:
        </Paragraph>
        <TextList>
          <TextListItem>IANA &amp; Windows 10: 49152-65535</TextListItem>
          <TextListItem>Linux: 32768-60999</TextListItem>
        </TextList>
        <PostImage src={VPCEphemeralPorts} alt="Ephemeral ports ranges" />
        <Paragraph>
          When defining NACL rules, you must explicitly allow these ephemeral port ranges
          for return traffic.
        </Paragraph>
        <PostImage
          src={VPCNACLEphemeralPorts}
          alt="NACL rules and ephemeral ports example"
        />

        <SectionHeading id="vpc-peering">VPC Peering</SectionHeading>
        <Paragraph>
          VPC Peering connects two VPCs so they can communicate using private IPs, as if
          they were part of the same network.
        </Paragraph>
        <TextList>
          <TextListItem>Supports same-account and cross-account peering.</TextListItem>
          <TextListItem>Supports same-region and cross-region peering.</TextListItem>
          <TextListItem>
            Connections are one-to-one; there is no transitive routing.
          </TextListItem>
          <TextListItem>
            CIDR ranges must not overlap between peered VPCs.
          </TextListItem>
          <TextListItem>
            You still use security groups and NACLs to control traffic.
          </TextListItem>
        </TextList>
        <PostImage src={VPCPeering} alt="VPC peering example" />

        <SectionHeading id="vpc-endpoint">VPC Endpoints</SectionHeading>
        <Paragraph>
          VPC Endpoints enable private connectivity from your VPC to supported AWS
          services and endpoint services without needing an IGW, NAT device, VPN, or
          Direct Connect. Traffic stays on the AWS network.
        </Paragraph>
        <PostImage src={VPCEndpoint} alt="VPC endpoint high-level view" />
        <PostImage
          src={VPCEndpointPrivateLink}
          alt="VPC endpoint with AWS PrivateLink"
        />

        <SubSectionHeading>Types of Endpoints</SubSectionHeading>

        <TertiaryHeading>Interface Endpoints (AWS PrivateLink)</TertiaryHeading>
        <TextList>
          <TextListItem>
            Create an Elastic Network Interface (ENI) with a private IP in your subnet.
          </TextListItem>
          <TextListItem>
            Used to access many AWS services and custom endpoint services via PrivateLink.
          </TextListItem>
          <TextListItem>
            Secured using security groups and NACLs like any other ENI.
          </TextListItem>
          <TextListItem>Charged per hour and per GB processed.</TextListItem>
        </TextList>
        <PostImage
          src={VPCInterfaceEndpoint}
          alt="Interface endpoint and PrivateLink example"
        />

        <TertiaryHeading>Gateway Endpoints</TertiaryHeading>
        <TextList>
          <TextListItem>
            Used specifically for <Strong>Amazon S3</Strong> and{" "}
            <Strong>Amazon DynamoDB</Strong>.
          </TextListItem>
          <TextListItem>
            Add a route in your route tables pointing service traffic to the endpoint.
          </TextListItem>
          <TextListItem>
            Highly available, fully managed and <Strong>free</Strong>.
          </TextListItem>
        </TextList>
        <PostImage src={VPCGatewayEndpoint} alt="Gateway endpoint to S3 example" />

        <SectionHeading id="vpc-flow-logs">VPC Flow Logs</SectionHeading>
        <Paragraph>
          VPC Flow Logs capture IP traffic going to and from ENIs in your VPC. Logs can be
          delivered to CloudWatch Logs, S3, or Kinesis Data Firehose for analysis.
        </Paragraph>
        <PostImage src={VPCFlowLogSyntax} alt="VPC flow log record syntax" />
        <PostImage src={VPCFlowLogs} alt="VPC flow logs high-level architecture" />

        <SectionHeading id="site-to-site-vpn">Site-to-Site VPN</SectionHeading>
        <Paragraph>
          A Site-to-Site VPN provides an encrypted IPSec tunnel between your on-premises
          network and your VPC over the public internet.
        </Paragraph>
        <PostImage src={VPCSiteToSiteVPN} alt="Site-to-site VPN example" />

        <SubSectionHeading>Components</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Virtual Private Gateway (VGW)</Strong> - AWS side VPN concentrator,
            attached to your VPC. You can customise its ASN.
          </TextListItem>
          <TextListItem>
            <Strong>Customer Gateway (CGW)</Strong> - your on-premises VPN device or
            software appliance.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Site-to-Site VPN Connections</SubSectionHeading>
        <Paragraph>
          If your CGW has a private IP, you typically use the NAT device's public IP
          for the tunnel; otherwise you use the CGW's public IP directly. Make sure
          you enable route propagation to the VGW in your route tables and open ICMP / any
          required ports in security groups.
        </Paragraph>
        <PostImage
          src={VPCSiteToSitePublicPrivateIP}
          alt="Site-to-site VPN public/private IP example"
        />

        <SubSectionHeading>VPN CloudHub</SubSectionHeading>
        <Paragraph>
          AWS VPN CloudHub allows you to connect multiple remote sites (branch offices) via
          a hub-and-spoke model using the same VGW. It's useful when sites need to
          talk to each other and to AWS.
        </Paragraph>
        <PostImage
          src={VPCSiteToSiteCloudHub}
          alt="VPN CloudHub multi-site connectivity"
        />
        <Paragraph>
          You configure multiple VPN connections on the same VGW, enable dynamic routing,
          and update route tables accordingly.
        </Paragraph>

        <SectionHeading id="direct-connect">Direct Connect (DX)</SectionHeading>
        <Paragraph>
          AWS Direct Connect provides a dedicated, private network connection from your
          on-premises environment to AWS, bypassing the public internet for more
          predictable performance.
        </Paragraph>
        <PostImage src={VPCDirectConnect} alt="Direct Connect basic architecture" />
        <Paragraph>
          To connect to one or more VPCs in different regions within the same account, you
          use a <Strong>Direct Connect Gateway</Strong>.
        </Paragraph>
        <PostImage
          src={VPCDirectConnectGateWay}
          alt="Direct Connect Gateway to multiple VPCs"
        />

        <SubSectionHeading>Connection Types</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Dedicated Connections</Strong> - 1, 10 or 100 Gbps.
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>
            Physical Ethernet port dedicated to a single customer.
          </IndentedTextListItem>
          <IndentedTextListItem>
            Requested from AWS then provisioned with a Direct Connect Partner.
          </IndentedTextListItem>
        </IndentedTextList>
        <TextList>
          <TextListItem>
            <Strong>Hosted Connections</Strong> - from 50 Mbps up to 10 Gbps.
          </TextListItem>
        </TextList>
        <IndentedTextList>
          <IndentedTextListItem>Provisioned by a Direct Connect Partner.</IndentedTextListItem>
          <IndentedTextListItem>
            Capacity can be scaled up or down on demand.
          </IndentedTextListItem>
        </IndentedTextList>
        <Paragraph>
          Lead times are often weeks+ to establish a new Direct Connect circuit.
        </Paragraph>

        <SubSectionHeading>Encryption</SubSectionHeading>
        <Paragraph>
          Direct Connect itself is private but not encrypted. For encryption, you can run
          a Site-to-Site VPN over Direct Connect.
        </Paragraph>
        <PostImage
          src={VPCDirectConnectEncryption}
          alt="Direct Connect with VPN encryption"
        />

        <SubSectionHeading>Resiliency</SubSectionHeading>
        <Paragraph>
          For critical workloads, design redundant DX connections (and potentially VPN
          backup) across multiple locations.
        </Paragraph>
        <PostImage
          src={VPCDirectConnectResilience}
          alt="Direct Connect resilient architectures"
        />

        <SubSectionHeading>Site-to-Site VPN as Backup</SubSectionHeading>
        <Paragraph>
          Instead of paying for a second DX connection, you can use a Site-to-Site VPN as
          a failover path if the DX link goes down.
        </Paragraph>
        <PostImage
          src={VPCDirectConnectBackup}
          alt="Direct Connect with VPN backup example"
        />
        <PostImage src={VPCDX} alt="Direct Connect overview diagram" />

        <SectionHeading id="transit-gateway">Transit Gateway</SectionHeading>
        <Paragraph>
          AWS Transit Gateway (TGW) provides a central hub to connect VPCs, on-premises
          networks and VPN/DX attachments at scale. It supports multicast (which VPC
          peering and other constructs do not).
        </Paragraph>
        <PostImage src={VPCTransitGateway} alt="Transit Gateway basic view" />

        <SubSectionHeading>Site-to-Site VPN ECMP</SubSectionHeading>
        <Paragraph>
          ECMP (Equal Cost Multi-Path) with TGW allows you to use multiple VPN tunnels in
          parallel to increase effective bandwidth.
        </Paragraph>
        <PostImage
          src={VPCTransitGatewayECMP}
          alt="Transit Gateway ECMP with VPN connections"
        />

        <SubSectionHeading>Direct Connect Across Multiple Accounts</SubSectionHeading>
        <PostImage
          src={VPCTransitGatewayMA}
          alt="Transit Gateway with Direct Connect across multiple accounts"
        />

        <SubSectionHeading>Transit Gateway Overview</SubSectionHeading>
        <PostImage
          src={VPCTransitGatewayOverview}
          alt="Full Transit Gateway overview diagram"
        />

        <SectionHeading id="traffic-mirroring">Traffic Mirroring</SectionHeading>
        <Paragraph>
          VPC Traffic Mirroring lets you capture and inspect network traffic from ENIs of
          your EC2 instances. You can send mirrored traffic to security appliances or
          monitoring tools for deep inspection.
        </Paragraph>
        <PostImage
          src={VPCTrafficMirroring}
          alt="VPC traffic mirroring architecture"
        />

        <SectionHeading id="ipv6">IPv6 in VPC</SectionHeading>
        <Paragraph>
          IPv6 is the successor to IPv4 and provides a vastly larger address space. In
          VPCs, IPv6 addresses are globally unique and effectively public, but security
          controls still apply via SGs and NACLs.
        </Paragraph>
        <Paragraph>
          You can enable dual-stack mode (IPv4 + IPv6). Instances then receive at least a
          private IPv4 and a public IPv6 address. IPv4 cannot currently be disabled in a
          VPC.
        </Paragraph>
        <PostImage src={VPCIPv6} alt="IPv6 addressing in VPC" />

        <SubSectionHeading>Egress-Only Internet Gateway</SubSectionHeading>
        <Paragraph>
          An Egress-Only Internet Gateway provides outbound-only internet access for IPv6
          traffic from your VPC. It is conceptually similar to a NAT Gateway but only for
          IPv6.
        </Paragraph>
        <PostImage
          src={VPCEgressOnlyIG}
          alt="Egress-only Internet Gateway example"
        />

        <SubSectionHeading>IPv6 Routing</SubSectionHeading>
        <PostImage src={VPCIPv6Routing} alt="IPv6 routing example in VPC" />

        <SectionHeading id="networking-costs">Networking Costs in AWS</SectionHeading>
        <SubSectionHeading>Networking Costs per GB - Simplified</SubSectionHeading>
        <Paragraph>
          In general, you save money and gain performance by keeping traffic inside AWS
          and inside the same AZ where possible.
        </Paragraph>
        <TextList>
          <TextListItem>
            Prefer private IP traffic over public IP for lower egress charges.
          </TextListItem>
          <TextListItem>
            Same-AZ traffic is cheaper than cross-AZ; cross-region and internet egress
            are the most expensive.
          </TextListItem>
        </TextList>
        <PostImage
          src={VPCNetworkingCosts}
          alt="Simplified networking cost overview"
        />

        <SubSectionHeading>Minimising Egress Traffic Network Costs</SubSectionHeading>
        <TextList>
          <TextListItem>
            <Strong>Egress:</Strong> outbound traffic (from AWS to outside).
          </TextListItem>
          <TextListItem>
            <Strong>Ingress:</Strong> inbound traffic (outside to AWS, typically free).
          </TextListItem>
        </TextList>
        <Paragraph>
          Keep as much traffic as possible within AWS. When using Direct Connect, locate
          your DX connection in the same region as your VPCs where possible to reduce
          charges.
        </Paragraph>
        <PostImage
          src={VPCEgressTrafficNetworkingCosts}
          alt="Egress traffic networking costs"
        />

        <SectionHeading id="network-protection">AWS Network Firewall</SectionHeading>
        <Paragraph>
          AWS Network Firewall is a managed network security service for your VPC. It
          provides stateful inspection, intrusion prevention and detection, and web
          filtering.
        </Paragraph>
        <PostImage src={VPCNetworkFirewall} alt="AWS Network Firewall in VPC" />

        <TertiaryHeading>Key Features</TertiaryHeading>
        <TextList>
          <TextListItem>
            <Strong>Traffic Filtering:</Strong> allow, block, or monitor traffic based on
            IPs, ports, protocols and domains.
          </TextListItem>
          <TextListItem>
            <Strong>Managed Rules:</Strong> use curated rule groups from AWS and partners,
            updated to address new threats.
          </TextListItem>
          <TextListItem>
            <Strong>Custom Rules:</Strong> define your own stateless and stateful rule
            groups.
          </TextListItem>
          <TextListItem>
            <Strong>Stateful &amp; Stateless:</Strong> combine stateless inspection with
            deeper stateful analysis.
          </TextListItem>
          <TextListItem>
            <Strong>Logging &amp; Monitoring:</Strong> send detailed logs to S3, CloudWatch
            Logs, or Kinesis Data Firehose.
          </TextListItem>
          <TextListItem>
            <Strong>Centralised Management:</Strong> integrate with AWS Firewall Manager to
            apply policies across multiple accounts and VPCs.
          </TextListItem>
        </TextList>

        <SectionHeading id="vpc-summary">VPC Summary</SectionHeading>
        <TextList>
          <TextListItem>
            <Strong>CIDR:</Strong> defines your IP ranges.
          </TextListItem>
          <TextListItem>
            <Strong>VPC:</Strong> container for your subnets, route tables, gateways and
            endpoints.
          </TextListItem>
          <TextListItem>
            <Strong>Subnets:</Strong> AZ-scoped slices of your VPC CIDR.
          </TextListItem>
          <TextListItem>
            <Strong>Internet Gateway:</Strong> internet access for IPv4 &amp; IPv6.
          </TextListItem>
          <TextListItem>
            <Strong>Route Tables:</Strong> direct traffic to IGWs, NAT GWs, peering links,
            endpoints, TGWs, etc.
          </TextListItem>
          <TextListItem>
            <Strong>Bastion Host:</Strong> public SSH entry point to private instances.
          </TextListItem>
          <TextListItem>
            <Strong>NAT Instance/Gateway:</Strong> outbound-only internet access for
            private IPv4 instances.
          </TextListItem>
          <TextListItem>
            <Strong>NACL:</Strong> stateless subnet-level firewall.
          </TextListItem>
          <TextListItem>
            <Strong>Security Groups:</Strong> stateful instance-level firewall.
          </TextListItem>
          <TextListItem>
            <Strong>VPC Peering:</Strong> non-transitive private connectivity between VPCs.
          </TextListItem>
          <TextListItem>
            <Strong>VPC Endpoints:</Strong> private access to AWS services over the AWS
            network.
          </TextListItem>
          <TextListItem>
            <Strong>VPC Flow Logs:</Strong> capture ACCEPT/REJECT traffic for analysis.
          </TextListItem>
          <TextListItem>
            <Strong>Site-to-Site VPN / CloudHub:</Strong> IPsec connectivity for on-prem
            and multi-site topologies.
          </TextListItem>
          <TextListItem>
            <Strong>Direct Connect / DX Gateway:</Strong> private, deterministic
            connectivity to AWS at scale.
          </TextListItem>
          <TextListItem>
            <Strong>PrivateLink:</Strong> private service endpoints without peering or
            internet.
          </TextListItem>
          <TextListItem>
            <Strong>Transit Gateway:</Strong> hub-and-spoke routing for VPCs, VPN, and DX.
          </TextListItem>
          <TextListItem>
            <Strong>Traffic Mirroring:</Strong> copy ENI traffic for inspection.
          </TextListItem>
          <TextListItem>
            <Strong>Egress-Only IGW:</Strong> outbound-only internet access for IPv6.
          </TextListItem>
        </TextList>

        <SubSectionHeading id="references">References</SubSectionHeading>
        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
              target="_blank"
              rel="noreferrer"
            >
              What is Amazon VPC?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html"
              target="_blank"
              rel="noreferrer"
            >
              VPCs and Subnets - Amazon VPC
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html"
              target="_blank"
              rel="noreferrer"
            >
              VPC Peering - User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-endpoints.html"
              target="_blank"
              rel="noreferrer"
            >
              VPC Endpoints and AWS PrivateLink
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html"
              target="_blank"
              rel="noreferrer"
            >
              VPC Flow Logs - User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Site-to-Site VPN
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Direct Connect - User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html"
              target="_blank"
              rel="noreferrer"
            >
              AWS Transit Gateway - What is TGW?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/vpc/latest/firewall/what-is-aws-network-firewall.html"
              target="_blank"
              rel="noreferrer"
            >
              What is AWS Network Firewall?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/vpc/latest/userguide/getting-started-ipv6.html"
              target="_blank"
              rel="noreferrer"
            >
              Getting Started with IPv6 for Amazon VPC
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSVPC;
