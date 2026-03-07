import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { AWSSVG, AWSEC2SVG } from "../../resources/styles/icons";

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
import InstanceNamingConvention from "../../resources/images/blog/AWSElasticComputeCloud/instance-type-name.jpeg";
import SecurityGroup from "../../resources/images/blog/AWSElasticComputeCloud/security_group.jpeg";
import SecurityGroup2 from "../../resources/images/blog/AWSElasticComputeCloud/security_group_2.jpeg";
import SecurityGroup3 from "../../resources/images/blog/AWSElasticComputeCloud/security_group_3.jpeg";
import AMI from "../../resources/images/blog/AWSElasticComputeCloud/ami_example.jpeg";
import IPv4 from "../../resources/images/blog/AWSElasticComputeCloud/IPv4.jpeg";
import Cluster from "../../resources/images/blog/AWSElasticComputeCloud/cluster_example.jpeg";
import Spread from "../../resources/images/blog/AWSElasticComputeCloud/spread_example.jpeg";
import Partition from "../../resources/images/blog/AWSElasticComputeCloud/partition_example.jpeg";
import ElasticNetworkInterface from "../../resources/images/blog/AWSElasticComputeCloud/elastic_network_interface_example.jpeg";
import Snapshot from "../../resources/images/blog/AWSElasticComputeCloud/snapshot_example.jpeg";
import Hibernate from "../../resources/images/blog/AWSElasticComputeCloud/hibernate_example.jpeg";
import Encryption from "../../resources/images/blog/AWSElasticComputeCloud/encryption_example.jpeg";
import ElasticFileSystem from "../../resources/images/blog/AWSElasticComputeCloud/elastic_file_system_example.jpeg";
import HealthCheck from "../../resources/images/blog/AWSElasticComputeCloud/health_check_example.jpeg";
import LoadBalancerSecurityGroup from "../../resources/images/blog/AWSElasticComputeCloud/load_balancer_sg_example.jpeg";
import ApplicationLoadBalancerHTTP from "../../resources/images/blog/AWSElasticComputeCloud/application_load_balancer_http_example.jpeg";
import ApplicationLoadBalancerQuery from "../../resources/images/blog/AWSElasticComputeCloud/application_load_balancer_query_param_example.jpeg";
import NetworkLoadBalancer from "../../resources/images/blog/AWSElasticComputeCloud/network_load_balancer_example.jpeg";
import GatewayLoadBalancer from "../../resources/images/blog/AWSElasticComputeCloud/gateway_load_balancer_example.jpeg";
import CrossloadBalancing from "../../resources/images/blog/AWSElasticComputeCloud/cross_load_balancing_example.jpeg";
import SSLTLS from "../../resources/images/blog/AWSElasticComputeCloud/ssl_tls_example.jpeg";
import ServerNameIndicationExample from "../../resources/images/blog/AWSElasticComputeCloud/sni_example.jpeg";
import AutoScalingGroup from "../../resources/images/blog/AWSElasticComputeCloud/auto_scaling_group_example.jpeg";
import AutoScalingGroupLaunchTemplate from "../../resources/images/blog/AWSElasticComputeCloud/auto_scaling_group_launch_template_example.jpeg";

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSElasticComputeCloud = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "aws-ec2" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>Amazon Elastic Compute Cloud (EC2)</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSEC2SVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          I'll be touching on these core subjects which covers the majority of
          EC2's capability:
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#what-is-ec2">EC2 Overview</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#sg">
              Security and traffic flow using security groups (SG)
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#rent">Options for renting virtual machines</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#ami">Amazon Machine Images (AMI)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#ip">Public and Private IP Addresses</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#placement-group">Placement Groups</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#eni">Networking (ENI)</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#ebs">
              Storing data on virtual drives with (EBS)
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#efs">
              Create and configure shared file systems (EFS)
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#elb">
              Distributing load across machines (ELB)
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#asg">
              Scaling the services using an auto-scaling group (ASG)
            </TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="what-is-ec2">What is an EC2?</SectionHeading>

        <Paragraph>
          In this blog post we'll be going through the Elastic Compute Cloud
          service, also known as EC2 which can be defined as an infrastructure as
          a Service (IaaS). In short EC2 is a virtual service in the AWS cloud.
          Why would you need this? Well, any time you need to compute a task this
          service will be handy.
        </Paragraph>

        <SectionHeading>Configuration</SectionHeading>

        <Paragraph>
          What does this EC2 instance consist of? Well it's just a server,
          albeit sitting in one of Amazon's many data centers that we can
          purchase. When we are &quot;purchasing&quot; this service, we're
          asked to choose how we would like it to be configured. This can vary
          from the list below:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Operating System (OS)</Strong>: Windows, Mac OS, Linux
          </TextListItem>
          <TextListItem>
            <Strong>CPU</Strong>: How much compute power and cores.
          </TextListItem>
          <TextListItem>
            <Strong>RAM</Strong>: How much random access memory.
          </TextListItem>
          <TextListItem>
            <Strong>Storage</Strong>: Network (EBS &amp; EFS) and/or hardware.
          </TextListItem>
          <TextListItem>
            <Strong>Network</Strong>: Type of connectivity.
          </TextListItem>
          <TextListItem>
            <Strong>Firewall Rules</Strong>: Security groups.
          </TextListItem>
        </TextList>

        <SectionHeading>EC2 User Data</SectionHeading>

        <Paragraph>
          Another thing to note is that you can bootstrap the EC2 server using a
          EC2 User data script. What this means is that you can launch commands
          when the EC2 server starts. It can be seen as a one time use for
          prepping your server for your needs such as installing any custom
          software you may want.
        </Paragraph>

        <SectionHeading>EC2 Instance Types</SectionHeading>

        <Paragraph>
          Now let's go through the instance types. I won't be listing
          all of the possible types you can choose from, but I'll be going
          through the main categories and what each category is suited for. If
          you want to see all the possible choices, this ain't it. If you
          would like to see all of the categories and types then you can go see{" "}
          <TextLink
            href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html"
            target="_blank"
            rel="noreferrer"
          >
            amazon's documentation.
          </TextLink>
        </Paragraph>

        <SubSectionHeading>Naming Convention</SubSectionHeading>

        <Paragraph>
          Before I go through each category, it might be beneficial first show you
          amazon's instance naming convention. The picture below denotes how
          the instance type is called, specifying the <Strong>instance</Strong>,{" "}
          <Strong>generation</Strong>, <Strong>processor</Strong> and{" "}
          <Strong>size</Strong>.
        </Paragraph>

        <PostImage src={InstanceNamingConvention} alt="EC2 instance naming convention" />

        <SubSectionHeading>Which Instance Type is Right?</SubSectionHeading>

        <Paragraph>
          This depends on the scenario you're facing. Each instance has
          it's strengths and weaknesses and generally speaking they all are
          suited for a particular tasks. As I stated above I'm not going to
          be going through all of the possible instance types but I'll be
          covering the basics.
        </Paragraph>

        <SubSectionHeading>General Purpose</SubSectionHeading>

        <Paragraph>
          General purpose instances provide a balance of compute, memory, and
          networking resources, and can be used for a wide range of workloads.
        </Paragraph>

        <SubSectionHeading>Compute Optimized</SubSectionHeading>

        <Paragraph>
          Compute optimized instances are ideal for compute-bound applications
          that benefit from high-performance processors.
        </Paragraph>

        <Paragraph>Use cases:</Paragraph>

        <TextList>
          <TextListItem>Batch processing workloads.</TextListItem>
          <TextListItem>Media transcoding.</TextListItem>
          <TextListItem>High performance web servers.</TextListItem>
          <TextListItem>High performance computing (HPC).</TextListItem>
          <TextListItem>Science modeling &amp; machine learning.</TextListItem>
          <TextListItem>Dedicated gaming servers.</TextListItem>
        </TextList>

        <SubSectionHeading>Memory Optimized</SubSectionHeading>

        <Paragraph>
          Memory optimized instances are designed to deliver fast performance for
          workloads that process large data sets in memory.
        </Paragraph>

        <Paragraph>Use cases:</Paragraph>

        <TextList>
          <TextListItem>
            High performance, relational/non-relational databases.
          </TextListItem>
          <TextListItem>Distributed web scale cache stores.</TextListItem>
          <TextListItem>
            In memory databases optimized for business intelligence (BI).
          </TextListItem>
          <TextListItem>
            Applications performing real-time processing of big unstructured data.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Storage Optimized</SubSectionHeading>

        <Paragraph>
          Storage optimized instances are designed for workloads that require
          high, sequential read and write access to very large data sets on local
          storage. They are optimized to deliver tens of thousands of
          low-latency, random I/O operations per second (IOPS) to applications.
        </Paragraph>

        <Paragraph>Use cases:</Paragraph>

        <TextList>
          <TextListItem>
            High frequency online transaction processing (OLTP) systems.
          </TextListItem>
          <TextListItem>Relational databases.</TextListItem>
          <TextListItem>NoSQL databases.</TextListItem>
          <TextListItem>
            Cache for in-memory databases (for example, Redis).
          </TextListItem>
          <TextListItem>Data warehousing applications.</TextListItem>
          <TextListItem>Distributed file systems.</TextListItem>
        </TextList>

        <SectionHeading id="sg">Security Groups</SectionHeading>

        <Paragraph>
          Security groups are used for controlling traffic in and out of an EC2
          server, it's essentially how we handle the security aspect i.e.
          what the instance is allowed to talk to. It's worth mentioning that
          security groups only contain <Strong>allow rules</Strong>. These rules
          can reference an IP address or by other security groups.
        </Paragraph>

        <PostImage src={SecurityGroup} alt="Security group as firewall" />

        <Paragraph>
          As you can see here the security group is acting as a &quot;firewall&quot;
          making sure that the traffic going in and out is what you expect. They
          don't just regulate the traffic coming in and out but also port
          ranges and IP ranges (IPv4, IPv6).
        </Paragraph>

        <PostImage src={SecurityGroup2} alt="Security group ports and IP ranges" />

        <SubSectionHeading>Good to Know</SubSectionHeading>

        <TextList>
          <TextListItem>Security groups can be attached to multiple instances.</TextListItem>
          <TextListItem>Locked down to a region/VPC combination.</TextListItem>
          <TextListItem>Lives outside the EC2.</TextListItem>
          <TextListItem>
            If your application is not accessible due to time out, then it's
            most likely a security group issue.
          </TextListItem>
          <TextListItem>The source IP address 0.0.0.0/0 refers to everything.</TextListItem>
          <TextListItem>All inbound traffic is blocked by default.</TextListItem>
          <TextListItem>All outbound traffic is allowed by default.</TextListItem>
        </TextList>

        <SubSectionHeading>Referencing Other Security Groups</SubSectionHeading>

        <Paragraph>
          This is a simple diagram depicting how referencing multiple EC2
          instances and how attaching different security groups would work.
        </Paragraph>

        <PostImage src={SecurityGroup3} alt="Referencing multiple security groups" />

        <SubSectionHeading>Ports</SubSectionHeading>

        <Paragraph>
          Now that we have explained the traffic flow it might be useful to go
          through some common port numbers and what they mean. Not all
          connections are the same, you can connect to an EC2 instance through
          different types of transportation.
        </Paragraph>

        <TextList>
          <TextListItem>
            22 = SSH (Secure Shell) - Log into a linux instance.
          </TextListItem>
          <TextListItem>
            21 = FTP (File Transfer Protocol) - Upload files into a file share.
          </TextListItem>
          <TextListItem>
            22 = SFTP (Secure File Transfer Protocol) - Upload files using SSH.
          </TextListItem>
          <TextListItem>
            80 = HTTP (Web Traffic) - Access unsecure websites.
          </TextListItem>
          <TextListItem>
            443 = HTTPS (Web Traffic) - Access secure websites.
          </TextListItem>
          <TextListItem>
            3389 = RDP (Remote Desktop Protocol) - Log into a windows instance.
          </TextListItem>
        </TextList>

        <SectionHeading id="rent">EC2 Purchasing Options</SectionHeading>

        <Paragraph>
          Earlier in the post I mentioned &quot;purchasing&quot;, well when you
          purchase a EC2 server you have different options to choose from. These
          options are suited for particular scenarios which you should consider
          based on your business/individual needs. Let's explore these
          options and why you might want to choose them.
        </Paragraph>

        <SubSectionHeading>On-Demand Instance</SubSectionHeading>

        <Paragraph>
          With On-Demand Instances, you pay for compute capacity by the second
          with no long-term commitments. You have full control over the
          instance's lifecycle—you decide when to launch, stop, hibernate,
          start, reboot, or terminate it.
        </Paragraph>

        <TextList>
          <TextListItem>Pay for what you use.</TextListItem>
          <TextListItem>Has the highest cost but no upfront payment.</TextListItem>
          <TextListItem>No long term commitment.</TextListItem>
          <TextListItem>
            Recommended for short-term and un-interrupted workloads, where you
            can predict how the application will behave.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Reserved Instance</SubSectionHeading>

        <Paragraph>
          Reserved Instances provide you with significant savings on your Amazon
          EC2 costs compared to On-Demand Instance pricing. Reserved Instances
          are not physical instances, but rather a billing discount applied to
          the use of On-Demand Instances in your account. These On-Demand
          Instances must match certain attributes, such as instance type and
          Region, in order to benefit from the billing discount.
        </Paragraph>

        <TextList>
          <TextListItem>
            Heavily discounted compared to On-Demand instances.
          </TextListItem>
          <TextListItem>
            Reservation period - 1 year (+discount) or 3 years (+++discount).
          </TextListItem>
          <TextListItem>
            Payment options - No upfront (+), Partial upfront (++) or All
            upfront (+++).
          </TextListItem>
          <TextListItem>
            You can buy and sell in the reserved instance marketplace.
          </TextListItem>
          <TextListItem>
            Recommended for steady-state usage applications (databases).
          </TextListItem>
        </TextList>

        <SubSectionHeading>Spot Instance</SubSectionHeading>

        <Paragraph>
          A Spot Instance is an instance that uses spare EC2 capacity that is
          available for less than the On-Demand price. Because Spot Instances
          enable you to request unused EC2 instances at steep discounts, you can
          lower your Amazon EC2 costs significantly. The hourly price for a Spot
          Instance is called a Spot price. The Spot price of each instance type
          in each Availability Zone is set by Amazon EC2, and is adjusted
          gradually based on the long-term supply of and demand for Spot
          Instances. Your Spot Instance runs whenever capacity is available.
        </Paragraph>

        <TextList>
          <TextListItem>The MOST cost-efficient instance in AWS.</TextListItem>
          <TextListItem>
            You could lose the server at any point if your max price is less
            than the current spot price.
          </TextListItem>
          <TextListItem>Useful for workloads that are resilient to failure.</TextListItem>
          <TextListItem>
            Well-suited for data analysis, batch jobs, background processing, and
            optional tasks.
          </TextListItem>
          <TextListItem>Not suitable for critical jobs or databases.</TextListItem>
        </TextList>

        <SubSectionHeading>Dedicated Hosts</SubSectionHeading>

        <Paragraph>
          Dedicated Hosts support different configurations (physical cores,
          sockets, and VCPUs) that allow you to run instances of different
          families and sizes. When you allocate a Dedicated Host in your account,
          you can choose a configuration that supports either a single instance
          type, or multiple instance types within the same instance family. The
          number of instances that you can run on a host depends on the
          configuration you choose.
        </Paragraph>

        <TextList>
          <TextListItem>The MOST expensive option.</TextListItem>
          <TextListItem>
            Useful for software that has complicated licensing models.
          </TextListItem>
          <TextListItem>
            For companies that have strong regulatory or compliance needs.
          </TextListItem>
          <TextListItem>Purchase options - On-Demand or Reserved.</TextListItem>
        </TextList>

        <SectionHeading id="ami">Amazon Machine Image (AMI)</SectionHeading>

        <Paragraph>
          AMI's are a customization of an EC2 instance. Much like user data
          scripts, AMI's are used to pre-package any software you want on
          your EC2 instance. This could be from operating systems to monitoring
          software etc. This is advantageous as it can result in faster boot
          times. You can also purchase Public AMI's from the marketplace if
          you don't want/need to create and maintain your own.
        </Paragraph>

        <PostImage src={AMI} alt="AMI example" />

        <SectionHeading id="ip">Public vs Private IP</SectionHeading>

        <Paragraph>
          Amazon EC2 and Amazon VPC support both the IPv4 and IPv6 addressing
          protocols. In this blog post we'll be sticking to IPv4 addresses
          which look like this - 127.0.0.1 (four numbers separated by three
          dots). Each number could range from 0 to 255 so this could look like
          anything from '[0-255].[0-255].[0-255].[0-255]'. IPv4
          allows for 3.7 billion different addresses in the public space and
          it's almost running out!
        </Paragraph>

        <Paragraph>
          Lets go through how IPv4 addresses work in a public and private
          scenario.
        </Paragraph>

        <PostImage src={IPv4} alt="IPv4 public vs private" />

        <Paragraph>
          For public servers, be it EC2 or not, it will have an IPv4 address and
          using this address these servers can communicate to one another. For
          private networks, they will have a private IP range and all the
          computers within that private network can communicate to each other
          using the private IP. In order to access other servers the private
          network would need to go through an Internet Gateway which has a
          public IP address assigned.
        </Paragraph>

        <SubSectionHeading>Public IP Addresses</SubSectionHeading>

        <TextList>
          <TextListItem>Server can be identified via the internet.</TextListItem>
          <TextListItem>
            Must be unique across the whole web (servers cannot share a public IP
            address).
          </TextListItem>
          <TextListItem>
            IP addresses can be geo-located (you can find out where that server
            lives).
          </TextListItem>
        </TextList>

        <SubSectionHeading>Private IP Addresses</SubSectionHeading>

        <TextList>
          <TextListItem>
            Server can only be identified on a private network.
          </TextListItem>
          <TextListItem>Must be unique across the private network.</TextListItem>
          <TextListItem>
            Only a specified range of IPs can be used as a private IP.
          </TextListItem>
          <TextListItem>
            Servers in a private network communicate out using a internet gateway
            (proxy).
          </TextListItem>
        </TextList>

        <SectionHeading id="placement-group">Placement Groups</SectionHeading>

        <Paragraph>
          We've talked about what an EC2 instance is, how to configure it,
          what your options are on purchase and how they communicate. Let's
          talk about placement strategy! When deploying an EC2 instance you can
          specify a group to put them in. These strategies consist of:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Cluster</Strong> - cluster instances are a low-latency group
            in a single availability zone.
          </TextListItem>
        </TextList>

        <PostImage src={Cluster} alt="Cluster placement group" />

        <Paragraph>
          Cluster groups can be great for big data jobs and for applications
          which need low latency and high network throughput. However, if the
          rack fails, all instances fail at the same time.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Spread</Strong> - spreads instances across underlying
            hardware (max 7 instances per group and per availability zone) for
            critical applications.
          </TextListItem>
        </TextList>

        <PostImage src={Spread} alt="Spread placement group" />

        <Paragraph>
          Spread groups can span across availability zone (AZ). That means
          there's a reduced risk of simultaneous failure. Instances are
          isolated from each other as there on separate hardware.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Partition</Strong> - spreads instances across many different
            partitions (which rely on different sets of racks) within an AZ. Can
            scale to hundreds of EC2s per group.
          </TextListItem>
        </TextList>

        <PostImage src={Partition} alt="Partition placement group" />

        <Paragraph>
          You can have up to seven partitions per availability zone (AZ) which
          can span across multiple AZs in the same region. You can have up to
          hundreds of instances that can access the same partition information as
          metadata.
        </Paragraph>

        <SectionHeading id="eni">Elastic Network Interfaces (ENI)</SectionHeading>

        <Paragraph>
          Let's talk about Elastic Network Interfaces which are a logical
          component that represents a virtual network card. This is what give EC2
          instances access to the network. It's worth noting that they are
          also used outside of EC2 instances.
        </Paragraph>

        <PostImage src={ElasticNetworkInterface} alt="ENI example" />

        <Paragraph>
          You can create ENI's independently and attach them on the fly on
          EC2 instances, however they are bound to the availability zone (AZ)
          that the ENI has been created in. The ENI can have the following
          attributes:
        </Paragraph>

        <TextList>
          <TextListItem>
            Primary private IPv4, one or more secondary IPv4.
          </TextListItem>
          <TextListItem>One Elastic IP (IPv4) per private IPv4.</TextListItem>
          <TextListItem>One Public IPv4.</TextListItem>
          <TextListItem>One or more security groups.</TextListItem>
          <TextListItem>A MAC address.</TextListItem>
        </TextList>

        <SectionHeading id="ebs">Elastic Block Store (EBS)</SectionHeading>

        <Paragraph>
          An EBS volume is a network drive that you can attach to an EC2 instance
          whilst they run. It allows the instance to persist data, even after
          their termination. It is essentially a &quot;network USB stick&quot;.
          EBS volumes can be be removed and attached to EC2 instances, they're
          not limited to the first instance they're associated with. Much
          like a ENI the EBS is also bound to an AZ, however we can use the
          snapshot feature which will allow you to get around this limitation.
        </Paragraph>

        <SubSectionHeading>Snapshots</SubSectionHeading>

        <Paragraph>
          Snapshots are a backup of an EBS volume at a point in time which you
          aren't required to detach the volume to snapshot it.
        </Paragraph>

        <PostImage src={Snapshot} alt="Snapshot example" />

        <Paragraph>
          For snapshotting there are different features which are suited for
          particular use-cases. Let's go through them:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Archive</Strong> - Moving a snapshot to the archive tier is
            75% cheaper and takes within 24 to 72 hours for restoring the
            archive.
          </TextListItem>
          <TextListItem>
            <Strong>Recycle Bin</Strong> - Setup rules to retain deleted
            snapshots so you can recover them after an accidental deletion. The
            retention could be from 1 day to 1 year.
          </TextListItem>
          <TextListItem>
            <Strong>Fast Snapshot Restore</Strong> - Force full initialisation of
            the snapshot to have no latency on the first use. This is the most
            costly feature.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Hibernate</SubSectionHeading>

        <Paragraph>
          EC2 hibernate is a feature which allows the preservation of instance
          memory. What does this actually mean? Well when we terminate an
          instance, any Elastic Block Store volumes (EBS) attached at the root
          will be destroyed. When we stop an instance the EBS volume is kept
          intact for when it starts up again. So you might be asking, what is the
          point of the hibernation feature? Well, whenever an EC2 instance starts
          it has a couple of tasks to complete before it's ready, that
          includes the operating system boot time and any user data scripts which
          can take time! This is where hibernation comes in as it preserves the
          in-memory (RAM) state so the boot up time is much faster. The only
          catch is that the EBS volume <Strong>needs to be encrypted</Strong> and{" "}
          <Strong>big enough to store the memory</Strong>.
        </Paragraph>

        <PostImage src={Hibernate} alt="Hibernate example" />

        <SubSectionHeading>Instance Store</SubSectionHeading>

        <Paragraph>
          It's worth mentioning that there is an alternative to &quot;network
          drives&quot; if you're needing better I/O performance. EC2
          Instance Store is a high-performance hardware disk (physically attached
          to the hardware), this has better performance but there is a risk of
          data loss if the hardware fails. If you were to need this you'd
          want to backup the storage regularly to prevent risk of data loss.
        </Paragraph>

        <SubSectionHeading>Volume Types</SubSectionHeading>

        <Paragraph>
          There are six types of EBS volumes to choose from, each suited for a
          particular task/scenario.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>gp2 / gp3 (SSD)</Strong>: General purpose SSD volume that
            balances price and performance for a wide variety of workloads.
          </TextListItem>
          <TextListItem>
            <Strong>io1 / io2 (SSD)</Strong>: Highest-performance SSD volume for
            mission-critical low-latency or high throughput workloads.
          </TextListItem>
          <TextListItem>
            <Strong>st1 (HDD)</Strong>: Low cost HDD volume designed for
            frequently accessed, throughput-intensive workloads.
          </TextListItem>
          <TextListItem>
            <Strong>sc1 (HDD)</Strong>: Lowest cost HDD volume designed for less
            frequently accessed workloads.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Multi-Attach (io1 / io2)</SubSectionHeading>

        <Paragraph>
          The multi-attach feature is only for the io1/io2 family. This feature
          allows the same EBS volume to be attached to multiple EC2 instances in
          the same AZ. It can be attached up to 16 instances at a time. Use cases
          for this feature would be to achieve higher application availability.
        </Paragraph>

        <SubSectionHeading>Encryption</SubSectionHeading>

        <Paragraph>
          You have the option to encrypt any EBS volumes using KMS (AES-256)
          keys. Any snapshots of encrypted volumes are encrypted. Here's an
          example for when an EBS volume already exists (unencrypted) and you
          want to encrypt it.
        </Paragraph>

        <PostImage src={Encryption} alt="EBS encryption example" />

        <SectionHeading id="efs">Elastic File System (EFS)</SectionHeading>

        <Paragraph>
          An Elastic File System is a network file system which is highly
          available, scalable and it can be mounted on many EC2 instances in
          different AZs if needed. The use cases for using this feature would be
          for content management, web serving, and/or data sharing. This feature
          is only compatible with linux based AMIs.
        </Paragraph>

        <PostImage src={ElasticFileSystem} alt="EFS example" />

        <SectionHeading id="elb">Elastic Load Balancers (ELB)</SectionHeading>

        <Paragraph>
          What is load balancing? Well Load balancers are servers that forward
          traffic to multiple different servers. Their purpose is essentially to
          control the flow of user traffic to an instance, if you have hundreds
          of users trying to access a server, the load balancer is there to make
          sure that load is spread across multiple servers to handle the traffic.
        </Paragraph>

        <SubSectionHeading>Why would we want to use a load balancer?</SubSectionHeading>

        <Paragraph>
          There are actually a lot of advantages to using a load balancer as it
          does do a lot of heavy lifting for us when it comes to scaling our EC2
          usage. As I've already mentioned it helps spread the load across
          multiple instances but it can also do the following:
        </Paragraph>

        <TextList>
          <TextListItem>
            Acts as a single point of access (DNS) to your application.
          </TextListItem>
          <TextListItem>Carries out health checks to the instances.</TextListItem>
          <TextListItem>Provides SSL (HTTPS) to your websites.</TextListItem>
          <TextListItem>Enforces stickiness with cookies.</TextListItem>
          <TextListItem>Separates public and private traffic.</TextListItem>
        </TextList>

        <SubSectionHeading>Health Checks</SubSectionHeading>

        <Paragraph>
          Health checks are an important feature of load balancing. Before the
          load balancer can forward traffic through to the EC2 instance, it needs
          to know if the instance itself is healthy and stable. It can know this
          by sending regular pings to the server on a desired port and route. If
          the request sent gets a response (200), it knows that the instance is
          healthy and ready to receive traffic, otherwise it's marked as
          unhealthy and traffic will not be forwarded. Health checks are
          supported for the <Strong>TCP</Strong>, <Strong>HTTP</Strong> and{" "}
          <Strong>HTTPS</Strong> protocols.
        </Paragraph>

        <PostImage src={HealthCheck} alt="Health check example" />

        <SubSectionHeading>Target Groups</SubSectionHeading>

        <Paragraph>
          You can point a load balancer to multiple different target groups. A
          target group could be an EC2 instance, ECS task, Lambda function and IP
          addresses (private). It's possible for an network load balancer to
          sit infront of an application load balancer so you're able to have
          the fixed IP addresses and the rule handling around HTTP traffic.
        </Paragraph>

        <SubSectionHeading>Load Balancers and Security Groups</SubSectionHeading>

        <Paragraph>
          Let's map out the flow showing how users would connect to a load
          balancer to then be forwarded onto the instance. There are two things
          to note, one being that the load balancer will have it's own
          security group in which it could allow users to connect on ports 80
          (HTTP) and 443 (HTTPS). Secondly, the EC2 instance will have a separate
          security group which can reference the one created for the load
          balancer which means that it will only accept traffic which has
          originated from the load balancer.
        </Paragraph>

        <PostImage
          src={LoadBalancerSecurityGroup}
          alt="Load balancer and security group example"
        />

        <SubSectionHeading>Types of Load Balancers</SubSectionHeading>

        <Paragraph>
          There are three kinds of managed load balancers which allow different
          types of traffic:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Application Load Balancer</Strong> - HTTP, HTTPS, WebSocket
          </TextListItem>
          <TextListItem>
            <Strong>Network Load Balancer</Strong> - TCP, TLS, UDP
          </TextListItem>
          <TextListItem>
            <Strong>Gateway Load Balancer</Strong> - IP
          </TextListItem>
        </TextList>

        <SubSectionHeading>Application Load Balancer</SubSectionHeading>

        <Paragraph>
          Application load balancers (ALB) are suited for micro services &amp;
          container based applications (Docker and Amazon ECS). ALB's have
          the capability to route to different target groups based on pathing.
          This routing can be based on:
        </Paragraph>

        <TextList>
          <TextListItem>
            Path URL (example.com/users or example.com/posts).
          </TextListItem>
          <TextListItem>
            Hostname in URL (one.example.com or two.example.com).
          </TextListItem>
          <TextListItem>
            Query String Headers (example.com/users?id=123).
          </TextListItem>
        </TextList>

        <PostImage
          src={ApplicationLoadBalancerHTTP}
          alt="Application load balancer HTTP example"
        />
        <PostImage
          src={ApplicationLoadBalancerQuery}
          alt="Application load balancer query param example"
        />

        <SubSectionHeading>Good to Know</SubSectionHeading>

        <TextList>
          <TextListItem>
            Fixed hostname (xxx.region.elb.amazonaws.com).
          </TextListItem>
          <TextListItem>
            The application servers don't see the IP of the client directly.
          </TextListItem>
          <TextListItem>
            The IP of the client is inserted in the header X-Forwarded-For.
          </TextListItem>
          <TextListItem>
            The port of the client is inserted in the header X-Forwarded-Port.
          </TextListItem>
          <TextListItem>
            The protocol of the client is inserted in the header X-Forwarded-Proto.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Network Load Balancer</SubSectionHeading>

        <Paragraph>
          Network load balancers allows TCP and UDP traffic. This load balancer
          is for high performance and is capable of handling million requests per
          second. NLB's only have one static IP per AZ but you're able
          to assign elastic IP.
        </Paragraph>

        <PostImage
          src={NetworkLoadBalancer}
          alt="Network load balancer example"
        />

        <SubSectionHeading>Gateway Load Balancer</SubSectionHeading>

        <Paragraph>
          Gateway load balancers are great for when you want to screen your
          traffic for any potentially harmful software. Before the traffic can
          reach it's destination the gateway load balancer can filter
          traffic through instances which could act as a firewall or inspection
          system. The traffic operates on port 6081 with the GENEVE protocol.
        </Paragraph>

        <PostImage
          src={GatewayLoadBalancer}
          alt="Gateway load balancer example"
        />

        <SubSectionHeading>Sticky Sessions</SubSectionHeading>

        <Paragraph>
          Sticky sessions exist to make sure that users are always directed to
          the same instance behind the load balancer. Sticky sessions are
          compatible with Application and Network load balancers. Sticky sessions
          work by attaching a cookie to the user's session. You can
          configure the cookie to control the expiry date. It's worth
          mentioning that enabling sticky sessions could lead to an imbalance to
          the load across the instances.
        </Paragraph>

        <Paragraph>There are two types of cookies to choose from:</Paragraph>

        <TextList>
          <TextListItem>Application-based cookies</TextListItem>
          <TextListItem>
            Application Cookie
            <TextList>
              <TextListItem>Generated by the load balancer</TextListItem>
              <TextListItem>Called 'AWSALBAPP'</TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>
            Custom Cookie
            <TextList>
              <TextListItem>Generated by the target</TextListItem>
              <TextListItem>
                Cookie name must be specified for each individual target group
              </TextListItem>
              <TextListItem>
                Don't use any reserved words used by the load balancer
                'AWSALB', 'AWSALBAPP', 'AWSALBTG'
              </TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>Duration-based cookies</TextListItem>
          <TextListItem>
            <TextList>
              <TextListItem>Generated by the load balancer</TextListItem>
              <TextListItem>Called 'AWSALB'</TextListItem>
            </TextList>
          </TextListItem>
        </TextList>

        <SubSectionHeading>Cross-Zone Load Balancing</SubSectionHeading>

        <Paragraph>
          It's possible to distribute traffic across multiple AZ's. The
          difference being between load balancers is that the Application load
          balancer is enabled by default and is free but for the Network load
          balancer you are charged and it's disabled by default.
        </Paragraph>

        <PostImage
          src={CrossloadBalancing}
          alt="Cross-zone load balancing example"
        />

        <SubSectionHeading>SSL &amp; TLS</SubSectionHeading>

        <Paragraph>
          An SSL certificate allows traffic between users and load balancers to
          be encrypted in transit. SSL refers to <Strong>Secrure Socket Layer</Strong>{" "}
          and TLS refers to <Strong>Transport Layer Security</Strong> which is a
          newer version of SSL. You can purchase a SSL/TLS certificate from any
          certificate authority such as ACM (Amazon Certificate Manager) or
          namecheap and GoDaddy. Once you have purchased a certificate you will
          have to renew after the expiration date.
        </Paragraph>

        <PostImage src={SSLTLS} alt="SSL / TLS example" />

        <SubSectionHeading>Server Name Indication</SubSectionHeading>

        <Paragraph>
          What would happen if a user needs to reach a specific website which is
          hosted on a server with multiple other sites? Well, SNI solves this
          problem of loading multiple SSL/TLS certificates onto one server. This
          is only compatible for Application load balancers and Network load
          balancers and it requires the user to indicate the hostname in the
          inital SSL/TLS handshake. The server will return the desired
          certificate or return the default set.
        </Paragraph>

        <PostImage
          src={ServerNameIndicationExample}
          alt="Server Name Indication example"
        />

        <SectionHeading id="asg">Auto Scaling Groups (ASG)</SectionHeading>

        <Paragraph>
          Auto Scaling Groups are for automating the scaling and management of
          EC2 instances. The size of an Auto Scaling Group depends on the number
          of instances that you set as the desired capacity. You can adjust its
          size to meet demand, either manually or by using automatic scaling. An
          Auto Scaling Group starts by launching enough instances to meet its
          desired capacity. It maintains this number of instances by performing
          periodic health checks on the instances in the group. The Auto Scaling
          Group continues to maintain a fixed number of instances even if an
          instance becomes unhealthy. If an instance becomes unhealthy, the group
          terminates the unhealthy instance and launches another instance to
          replace it.
        </Paragraph>

        <PostImage src={AutoScalingGroup} alt="Auto Scaling Group example" />

        <SubSectionHeading>Key features</SubSectionHeading>

        <Paragraph>Here's a list of things you can essentially achieve with ASG's:</Paragraph>

        <TextList>
          <TextListItem>
            Scale out (add EC2 instances) to match an increased load.
          </TextListItem>
          <TextListItem>
            Scale in (remove EC2 instances) to match a decreased load.
          </TextListItem>
          <TextListItem>
            Set a minimum and maximum number of EC2 instances running.
          </TextListItem>
          <TextListItem>
            Automatically register new instances to a load balancer.
          </TextListItem>
          <TextListItem>
            Re-create an EC2 instance in case a previous one is terminated.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Auto Scaling Group Attributes</SubSectionHeading>

        <ContentRow>
          <InlinePostImage
            src={AutoScalingGroupLaunchTemplate}
            alt="Auto Scaling Group launch template"
          />
          <Paragraph>
            You might be wondering how you can set up an Auto Scaling Group for
            your collection of EC2 instance. You can do this by creating a{" "}
            <Strong>Launch Template</Strong>. This will specify information such
            as the AMI ID, instance type, key pair, security groups, and block
            device mapping for your instances.
          </Paragraph>
        </ContentRow>

        <SubSectionHeading>CloudWatch Alarms &amp; Scaling</SubSectionHeading>

        <Paragraph>
          I've not talked about CloudWatch yet but I think this is a
          fundamental feature of ASG's that I'd like to talk about.
          That being you can scale ASG's based on CloudWatch Alarms. An
          alarm could be as simple as monitoring a metric such as the average
          CPU. With that example we could create a scaling policy based on the
          alarm i.e. if the average CPU limit for the overall ASG instances hits
          above 75%, we can ask the ASG to deploy more instances (scale out).
        </Paragraph>

        <SectionHeading id="references">References</SectionHeading>

        <TextList>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/ec2/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon EC2 User Guide
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html"
              target="_blank"
              rel="noreferrer"
            >
              What is Amazon EC2?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html"
              target="_blank"
              rel="noreferrer"
            >
              EC2 instance types
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon EC2 security groups
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon EBS volumes
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html"
              target="_blank"
              rel="noreferrer"
            >
              Amazon EBS volume types
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/elasticloadbalancing/"
              target="_blank"
              rel="noreferrer"
            >
              Elastic Load Balancing documentation
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://docs.aws.amazon.com/autoscaling/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon EC2 Auto Scaling documentation
            </TextLink>
          </TextListItem>
        </TextList>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default AWSElasticComputeCloud;
