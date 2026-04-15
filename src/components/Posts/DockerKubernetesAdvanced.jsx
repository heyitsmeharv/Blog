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
import Carousel from "../Carousel/Carousel";

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
  IndentedTextList,
  IndentedTextListItem,
} from "../Typography/Typography";

// icons
import { DockerSVG, KubernetesSVG } from "../../resources/styles/icons";

const k8sDocs = "https://kubernetes.io/docs/home/";
const k8sPodSecurityDocs =
  "https://kubernetes.io/docs/concepts/security/pod-security-standards/";
const k8sStatefulSetDocs =
  "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/";
const k8sPVCDocs =
  "https://kubernetes.io/docs/concepts/storage/persistent-volumes/";
const k8sNamespacesDocs =
  "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/";
const k8sResourceQuotaDocs =
  "https://kubernetes.io/docs/concepts/policy/resource-quotas/";

// ─── Security ────────────────────────────────────────────────────────────────

const k8sPssNamespaceLabels = `# Apply Pod Security Admission labels to the demo namespace
kubectl label namespace demo pod-security.kubernetes.io/enforce=baseline --overwrite
kubectl label namespace demo pod-security.kubernetes.io/warn=restricted --overwrite
kubectl label namespace demo pod-security.kubernetes.io/audit=restricted --overwrite

# Confirm the labels were applied
kubectl get namespace demo --show-labels`;

const k8sPssTestViolation = `# Try to run a privileged container in the demo namespace
# This should be blocked by the baseline enforce label
kubectl run test-root --image=nginx --namespace=demo --overrides='{
  "spec": {
    "containers": [{
      "name": "test-root",
      "image": "nginx",
      "securityContext": { "privileged": true }
    }]
  }
}'`;

const k8sSecurityContextSnippet = `# k8s/node-api-deployment.yaml (securityContext section)
# Add this under the container spec
securityContext:
  allowPrivilegeEscalation: false
  runAsNonRoot: true
  capabilities:
    drop: ["ALL"]
  seccompProfile:
    type: RuntimeDefault`;

const k8sCheckSecurityContext = `# Confirm the securityContext is present on the running Pod
kubectl get pod -l app=node-api -o jsonpath='{.items[0].spec.containers[0].securityContext}'`;

const k8sApplyUpdatedDeployment = `kubectl apply -f k8s/node-api-deployment.yaml
kubectl rollout status deployment/node-api

# Confirm the Pod still starts and the app responds
curl http://localhost:8080/health`;

// ─── StatefulSets ─────────────────────────────────────────────────────────────

const k8sStatefulSetRedis = `# k8s/redis-statefulset.yaml
apiVersion: v1
kind: Service
metadata:
  name: redis
  namespace: demo
spec:
  clusterIP: None
  selector:
    app: redis
  ports:
    - port: 6379
      targetPort: 6379
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis
  namespace: demo
spec:
  serviceName: "redis"
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - name: redis
          image: redis:7-alpine
          ports:
            - containerPort: 6379
          volumeMounts:
            - name: redis-data
              mountPath: /data
  volumeClaimTemplates:
    - metadata:
        name: redis-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 256Mi`;

const k8sStatefulSetApply = `kubectl apply -f k8s/redis-statefulset.yaml
kubectl rollout status statefulset/redis

# Inspect what was created
kubectl get statefulset,pods,pvc -l app=redis -o wide`;

const k8sStatefulSetIdentity = `# StatefulSet Pods get stable, predictable names: redis-0, redis-1, etc.
kubectl get pods -l app=redis

# Describe the PersistentVolumeClaim that was created automatically
kubectl describe pvc redis-data-redis-0`;

const k8sStatefulSetScaleProof = `# Scale to 2 replicas - watch the ordered startup
kubectl scale statefulset/redis --replicas=2
kubectl get pods -l app=redis -w

# Scale back down - observe ordered termination (redis-1 goes first)
kubectl scale statefulset/redis --replicas=1
kubectl get pods -l app=redis -w`;

const k8sDeleteStatefulSetSafely = `# Deleting the StatefulSet does NOT delete the PVCs by default
kubectl delete statefulset redis

# The PVCs (and their data) survive
kubectl get pvc -l app=redis

# Clean up manually when you are ready
kubectl delete pvc redis-data-redis-0`;

// ─── Cluster management ───────────────────────────────────────────────────────

const k8sNamespacesOverview = `# List all namespaces in the cluster
kubectl get namespaces

# What is currently running in kube-system (the control plane namespace)?
kubectl get all -n kube-system`;

const k8sCreateNamespace = `# Create a new namespace for a separate environment
kubectl create namespace staging

# Create a namespace declaratively (preferred for real environments)
# k8s/namespace-staging.yaml
# apiVersion: v1
# kind: Namespace
# metadata:
#   name: staging`;

const k8sContextSwitching = `# Check which namespace kubectl is using right now
kubectl config view --minify --output "jsonpath={..namespace}"

# Switch to a different namespace without creating a new context
kubectl config set-context --current --namespace=staging

# Switch back
kubectl config set-context --current --namespace=demo

# List all available contexts (useful if you have multiple clusters)
kubectl config get-contexts`;

const k8sResourceQuota = `# k8s/demo-quota.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: demo-quota
  namespace: demo
spec:
  hard:
    requests.cpu: "2"
    requests.memory: 2Gi
    limits.cpu: "4"
    limits.memory: 4Gi
    pods: "10"`;

const k8sApplyQuota = `kubectl apply -f k8s/demo-quota.yaml

# Inspect what the quota covers and how much is used
kubectl describe resourcequota demo-quota -n demo`;

const k8sResourceRequests = `# k8s/node-api-deployment.yaml (resources section)
# Add this under the container spec
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "250m"
    memory: "256Mi"`;

const k8sTopPods = `# See actual resource usage once metrics-server is enabled
kubectl top pods -n demo
kubectl top nodes`;

const k8sNamespaceCleanup = `# Delete a namespace and everything inside it
# WARNING: this removes all resources in the namespace
kubectl delete namespace staging`;

// ─── Component ────────────────────────────────────────────────────────────────

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const DockerKubernetesAdvanced = () => {
  useEffect(() => {
    Analytics.pageview({ slug: "docker-kubernetes-security-stateful-cluster" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>
            Docker & Kubernetes: Security, StatefulSets, and Cluster Management
          </PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <DockerSVG />
            </HeaderIcon>
            <HeaderIcon>
              <KubernetesSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          This post continues from{" "}
          <TextLink href="/blog/intro-to-docker-kubernetes">
            Introduction to Docker and Kubernetes
          </TextLink>
          . It assumes you have a running Minikube cluster, a working{" "}
          <InlineHighlight>node-api</InlineHighlight> Deployment, and a{" "}
          <InlineHighlight>demo</InlineHighlight> namespace as the active
          context.
        </Paragraph>

        <Paragraph>
          The three topics here all build on the foundation from that post, but
          each deals with a different concern: making workloads safer to run,
          managing applications that need stable identity and persistent
          storage, and organising a cluster beyond a single namespace.
        </Paragraph>

        <SectionHeading>Security</SectionHeading>

        <Paragraph>
          Container security in Kubernetes is layered. The broadest layer is
          what the cluster allows at all. The next layer is what each namespace
          allows. The innermost layer is what each container is configured to
          do. This section works from namespace-level policy down to
          container-level settings.
        </Paragraph>

        <SubSectionHeading>Pod Security Standards</SubSectionHeading>

        <Paragraph>
          Kubernetes ships with a built-in admission controller called Pod
          Security Admission (PSA). It enforces one of three predefined{" "}
          <TextLink href={k8sPodSecurityDocs} target="_blank" rel="noreferrer">
            Pod Security Standards
          </TextLink>{" "}
          at the namespace level:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>privileged</Strong> - no restrictions (the cluster default)
          </TextListItem>
          <TextListItem>
            <Strong>baseline</Strong> - blocks the most dangerous capabilities
            (privileged containers, host network access, etc.)
          </TextListItem>
          <TextListItem>
            <Strong>restricted</Strong> - enforces current hardening best
            practice (non-root, dropped capabilities, seccomp)
          </TextListItem>
        </TextList>

        <Paragraph>Each standard can be applied in three modes:</Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>enforce</Strong> - violating Pods are rejected
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>warn</Strong> - violating Pods are allowed but a warning is
            returned to kubectl
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>audit</Strong> - violations are recorded in the audit log
            but not blocked or warned
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          A practical starting point is to enforce baseline (blocking the worst
          offenders) while warning on restricted (signalling what you should aim
          for without breaking things yet).
        </Paragraph>

        <CodeBlockWithCopy code={k8sPssNamespaceLabels} />

        <Paragraph>
          Once baseline enforcement is in place, you can test it by trying to
          run something it should block:
        </Paragraph>

        <CodeBlockWithCopy code={k8sPssTestViolation} />

        <Banner title="What to expect" variant="info">
          <Paragraph>
            The privileged container should be rejected with an admission error.
            The node-api Deployment should still work because it does not
            request any elevated capabilities. If it fails after adding these
            labels, you will need to add a proper{" "}
            <InlineHighlight>securityContext</InlineHighlight> to the container
            spec.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Container security context</SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>securityContext</InlineHighlight> field in a
          container spec is where you configure the behaviour of that specific
          container. Adding one is what allows the node-api Deployment to run
          cleanly under the restricted standard.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "k8s/node-api-deployment.yaml (securityContext)",
              description:
                "This disables privilege escalation, enforces non-root execution, drops all Linux capabilities, and applies the RuntimeDefault seccomp profile.",
              code: k8sSecurityContextSnippet,
            },
          ]}
        />

        <CodeBlockWithCopy code={k8sApplyUpdatedDeployment} />

        <Paragraph>
          After applying, confirm the security context is actually set on the
          running Pod:
        </Paragraph>

        <CodeBlockWithCopy code={k8sCheckSecurityContext} />

        <TertiaryHeading>What each setting does</TertiaryHeading>

        <IndentedTextList>
          <IndentedTextListItem>
            <InlineHighlight>allowPrivilegeEscalation: false</InlineHighlight> -
            prevents the process from gaining more privileges than it started
            with
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>runAsNonRoot: true</InlineHighlight> - Kubernetes
            will refuse to start the container if the image's default user is
            root
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>capabilities.drop: ["ALL"]</InlineHighlight> -
            removes all Linux capabilities that a process could use to interact
            with the kernel
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>
              seccompProfile.type: RuntimeDefault
            </InlineHighlight>{" "}
            - applies the container runtime's default system call filter,
            blocking unusual syscalls without needing a custom profile
          </IndentedTextListItem>
        </IndentedTextList>

        <Banner
          title="Why the Dockerfile USER instruction matters here"
          variant="warning"
        >
          <Paragraph>
            The <InlineHighlight>runAsNonRoot: true</InlineHighlight> check
            happens at admission time, not build time. If your Dockerfile does
            not have a <InlineHighlight>USER</InlineHighlight> instruction, the
            image defaults to root and Kubernetes will reject it. The production
            Dockerfile from part one already includes{" "}
            <InlineHighlight>USER node</InlineHighlight>, so node-api passes
            this check.
          </Paragraph>
        </Banner>

        <SubSectionHeading>A note on AppArmor</SubSectionHeading>

        <Paragraph>
          AppArmor is a Linux Security Module that can restrict what files,
          network access, and capabilities a process can use, based on a named
          profile loaded on the host. Kubernetes supports referencing AppArmor
          profiles from a Pod's annotation or security context.
        </Paragraph>

        <Paragraph>
          In practice, AppArmor support in Minikube is limited and depends on
          the underlying host OS. On Linux hosts, Minikube can expose AppArmor.
          On Windows or macOS, the VM layer means AppArmor profiles are not
          available by default. It is worth knowing the mechanism exists, but
          the seccomp RuntimeDefault profile covers the most common hardening
          need without requiring host-level setup.
        </Paragraph>

        <SectionHeading>StatefulSets</SectionHeading>

        <Paragraph>
          Everything we have deployed so far has been stateless. A Deployment
          treats its Pods as interchangeable: any Pod can be created on any
          node, given any IP, and replaced by any other identical Pod. That is
          what makes scaling and rolling updates straightforward.
        </Paragraph>

        <Paragraph>
          Some applications cannot be treated that way. A database replica needs
          to know which replica it is. A distributed cache node needs a stable
          hostname so other nodes can find it. A storage system needs its data
          to survive across Pod restarts. These requirements are what{" "}
          <Strong>StatefulSets</Strong> address.
        </Paragraph>

        <TertiaryHeading>
          What StatefulSets guarantee that Deployments do not
        </TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Stable network identity</Strong> - Pods are named
            predictably (<InlineHighlight>redis-0</InlineHighlight>,{" "}
            <InlineHighlight>redis-1</InlineHighlight>, etc.) and keep those
            names across restarts
          </TextListItem>
          <TextListItem>
            <Strong>Ordered startup and shutdown</Strong> - Pods start in order
            (0, 1, 2) and terminate in reverse order (2, 1, 0)
          </TextListItem>
          <TextListItem>
            <Strong>Per-Pod persistent storage</Strong> - each Pod gets its own
            PersistentVolumeClaim, not a shared one
          </TextListItem>
        </TextList>

        <Paragraph>
          The tradeoff is that StatefulSets are more constrained. Scaling is
          slower. Updates are sequential. Deleting a StatefulSet does not delete
          the underlying storage by default. These are all intentional: data
          safety takes priority over operational convenience.
        </Paragraph>

        <SubSectionHeading>
          Replacing the Redis Deployment with a StatefulSet
        </SubSectionHeading>

        <Paragraph>
          Redis stores the counter state we set up in part one. Using a
          Deployment for Redis works for learning, but it means data is lost
          whenever the Pod is replaced. A StatefulSet with a
          PersistentVolumeClaim changes that.
        </Paragraph>

        <Paragraph>
          There are two differences from the Deployment version:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            the Service uses <InlineHighlight>clusterIP: None</InlineHighlight>{" "}
            (a headless Service), which gives each Pod a stable DNS entry rather
            than a shared ClusterIP
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>volumeClaimTemplates</InlineHighlight> tells
            Kubernetes to create a PVC for each Pod automatically
          </IndentedTextListItem>
        </IndentedTextList>

        <Carousel
          items={[
            {
              title: "k8s/redis-statefulset.yaml",
              description:
                "A headless Service gives each Pod a stable DNS name. The volumeClaimTemplate creates a dedicated PVC per replica, so redis-0 always gets redis-data-redis-0.",
              code: k8sStatefulSetRedis,
            },
          ]}
        />

        <Paragraph>
          Before applying this, delete the existing Redis Deployment and Service
          if they are still running:
        </Paragraph>

        <CodeBlockWithCopy
          code={`kubectl delete deployment redis\nkubectl delete svc redis`}
        />

        <CodeBlockWithCopy code={k8sStatefulSetApply} />

        <SubSectionHeading>Observe the stable identity</SubSectionHeading>

        <Paragraph>
          Unlike a Deployment, the Pod name is not a random suffix. It is the
          StatefulSet name plus an ordinal index.
        </Paragraph>

        <CodeBlockWithCopy code={k8sStatefulSetIdentity} />

        <Paragraph>
          The PVC is also named predictably:{" "}
          <InlineHighlight>redis-data-redis-0</InlineHighlight>. That naming
          convention is how Kubernetes can reattach the correct storage to the
          correct Pod when the Pod is rescheduled.
        </Paragraph>

        <Banner title="What stable identity enables" variant="info">
          <Paragraph>
            Because the Pod name and DNS entry are stable, other components of
            the system can address individual replicas directly. For Redis
            replication, that means a replica can be configured to follow{" "}
            <InlineHighlight>redis-0</InlineHighlight> by name, and that
            reference does not break when Pods are rescheduled.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Observe ordered scaling</SubSectionHeading>

        <Paragraph>
          Scale the StatefulSet to two replicas and watch the startup order:
        </Paragraph>

        <CodeBlockWithCopy code={k8sStatefulSetScaleProof} />

        <Paragraph>
          The second Pod (<InlineHighlight>redis-1</InlineHighlight>) will not
          start until <InlineHighlight>redis-0</InlineHighlight> is ready. When
          scaling back down, <InlineHighlight>redis-1</InlineHighlight>{" "}
          terminates first. This is the key operational difference from a
          Deployment, where Pods come and go without ordering.
        </Paragraph>

        <SubSectionHeading>Data survives Pod replacement</SubSectionHeading>

        <Paragraph>
          Increment the counter through node-api a few times, then delete the
          Redis Pod directly:
        </Paragraph>

        <CodeBlockWithCopy
          code={`# Increment the counter a few times
curl -X POST http://localhost:8080/counter/incr
curl -X POST http://localhost:8080/counter/incr
curl -X POST http://localhost:8080/counter/incr

# Delete the Pod (the StatefulSet will recreate it)
kubectl delete pod redis-0

# Wait for the Pod to come back
kubectl get pods -l app=redis -w

# Check the counter - the data should still be there
curl http://localhost:8080/counter`}
        />

        <Paragraph>
          With a plain Deployment, this would return zero. The Redis process
          restarted without its data. With a StatefulSet and a PVC, the same
          volume is reattached to the new Pod, and the counter value survives.
        </Paragraph>

        <Banner title="When to use StatefulSets" variant="warning">
          <Paragraph>
            Not every application that writes data needs a StatefulSet. If your
            application writes to an external database or object store, a
            Deployment is usually the right choice. StatefulSets are for
            applications that <Strong>are</Strong> the storage layer: databases,
            caches, message queues, and distributed systems where identity and
            ordering matter.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Cleaning up StatefulSet storage</TertiaryHeading>

        <Paragraph>
          This is the one gotcha worth knowing before moving on. Deleting a
          StatefulSet does not delete its PersistentVolumeClaims. This is
          intentional: Kubernetes assumes you do not want storage deleted
          automatically when a controller is removed.
        </Paragraph>

        <CodeBlockWithCopy code={k8sDeleteStatefulSetSafely} />

        <Paragraph>
          In a production cluster, this means decommissioning a StatefulSet is a
          two-step process: remove the controller, then explicitly clean up the
          storage when you are ready.
        </Paragraph>

        <SectionHeading>Cluster Management</SectionHeading>

        <Paragraph>
          We have been working in a single{" "}
          <InlineHighlight>demo</InlineHighlight> namespace throughout both
          posts. In a real cluster, namespaces are how you separate workloads,
          apply different policies, and give teams isolated working areas
          without needing separate clusters.
        </Paragraph>

        <SubSectionHeading>What namespaces actually do</SubSectionHeading>

        <Paragraph>
          A namespace is a virtual partition inside a cluster. Resources in
          different namespaces are isolated by default: a Service in{" "}
          <InlineHighlight>staging</InlineHighlight> cannot be reached from{" "}
          <InlineHighlight>production</InlineHighlight>
          using a short name. They do share the same nodes, networking hardware,
          and control plane. Namespaces are logical separation, not physical.
        </Paragraph>

        <CodeBlockWithCopy code={k8sNamespacesOverview} />

        <Paragraph>
          Every Minikube cluster starts with four namespaces:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            <InlineHighlight>default</InlineHighlight> - where resources go if
            you do not specify a namespace
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>kube-system</InlineHighlight> - the control plane
            and built-in cluster services
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>kube-public</InlineHighlight> - publicly readable
            cluster information
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>kube-node-lease</InlineHighlight> - node heartbeat
            objects
          </IndentedTextListItem>
        </IndentedTextList>

        <SubSectionHeading>Creating and using namespaces</SubSectionHeading>

        <CodeBlockWithCopy code={k8sCreateNamespace} />

        <Paragraph>
          Switching the active namespace changes where{" "}
          <InlineHighlight>kubectl</InlineHighlight> sends commands by default.
          This avoids having to append{" "}
          <InlineHighlight>-n namespace</InlineHighlight> to every command.
        </Paragraph>

        <CodeBlockWithCopy code={k8sContextSwitching} />

        <Banner title="Context vs namespace" variant="info">
          <Paragraph>
            A <Strong>context</Strong> in kubectl is a named combination of
            cluster, user, and namespace. If you have multiple clusters (a local
            Minikube cluster and a staging cluster, for example), you switch
            between them by switching context. If you have one cluster but want
            to change your active namespace, you can update the current
            context's namespace without switching context entirely.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Resource quotas</SubSectionHeading>

        <Paragraph>
          A ResourceQuota sets limits on the total resources that can be
          consumed within a namespace. It is how you prevent one team or one
          workload from taking more than its fair share of the cluster.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "k8s/demo-quota.yaml",
              description:
                "This caps the total CPU and memory requests and limits in the demo namespace, and limits the number of Pods that can run at once.",
              code: k8sResourceQuota,
            },
          ]}
        />

        <CodeBlockWithCopy code={k8sApplyQuota} />

        <Paragraph>
          Once a quota is in place, Pods that do not declare resource requests
          and limits will be rejected. That is the intended behaviour: the quota
          forces workloads to be explicit about what they need.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "k8s/node-api-deployment.yaml (resources)",
              description:
                "Declaring requests and limits makes the scheduler's job easier and satisfies namespace quotas. Requests are what the scheduler uses to find a node; limits are the ceiling.",
              code: k8sResourceRequests,
            },
          ]}
        />

        <Banner title="Requests vs limits" variant="info">
          <Paragraph>
            A <Strong>request</Strong> is what Kubernetes reserves for the Pod
            when scheduling it - the scheduler finds a node with at least that
            much available. A <Strong>limit</Strong> is the ceiling: the
            container cannot use more CPU than its limit (it gets throttled),
            and if it exceeds its memory limit, the process is killed and
            restarted. Setting limits without requests is allowed but unusual.
            Setting requests without limits is common in development.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Checking actual usage</SubSectionHeading>

        <Paragraph>
          Resource requests and limits are what you declare. Actual consumption
          is different. The metrics-server addon (enabled in part one) lets you
          see real numbers:
        </Paragraph>

        <CodeBlockWithCopy code={k8sTopPods} />

        <Paragraph>
          This is useful for calibrating your requests. If a Pod consistently
          uses 30m CPU but you have requested 100m, the difference is being
          reserved but wasted on the node. If actual usage regularly hits the
          limit, the Pod is being throttled.
        </Paragraph>

        <SubSectionHeading>Namespace cleanup</SubSectionHeading>

        <Paragraph>
          Namespaces are a convenient cleanup tool as well. Deleting a namespace
          removes everything inside it in one operation. Use this with care in
          real clusters, but it is useful for tearing down a learning
          environment cleanly.
        </Paragraph>

        <CodeBlockWithCopy code={k8sNamespaceCleanup} />

        <SectionHeading>Where to go next</SectionHeading>

        <Paragraph>
          These two posts have taken node-api from a local process to a fully
          managed Kubernetes workload with persistent state, namespace
          isolation, and security policy. The concepts that follow build on this
          foundation rather than introducing a separate set of ideas.
        </Paragraph>

        <TertiaryHeading>Topics worth exploring next</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Ingress controllers</Strong> - a single entry point that
            routes HTTP traffic to multiple Services by path or hostname,
            replacing the need for a separate LoadBalancer per Service
          </TextListItem>
          <TextListItem>
            <Strong>Horizontal Pod Autoscaler</Strong> - automatically adjusts
            replica count based on CPU or custom metrics, which builds directly
            on the scaling concepts from part one
          </TextListItem>
          <TextListItem>
            <Strong>Secrets</Strong> - the Kubernetes equivalent of ConfigMaps
            for sensitive values; the storage and access model is different
            enough to be worth understanding separately
          </TextListItem>
          <TextListItem>
            <Strong>Network policies</Strong> - namespace-level firewall rules
            that control which Pods can talk to which Services, extending the
            isolation that namespaces provide to the network layer
          </TextListItem>
          <TextListItem>
            <Strong>Helm</Strong> - a package manager for Kubernetes that
            templates YAML and manages versioned application releases, useful
            once your manifest set grows beyond a handful of files
          </TextListItem>
        </TextList>

        <Paragraph>
          The pattern for all of these is the same as what you have already
          seen: declare the desired state, Kubernetes reconciles it, and you
          inspect the result to understand what actually happened.
        </Paragraph>
      </PostContainer>
    </PageWrapper>
  );
};

export default DockerKubernetesAdvanced;
