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

// images
import dockerCliPng from "../../resources/images/blog/DockerKubernetes/docker-cli.png";
import dockerDesktopPng from "../../resources/images/blog/DockerKubernetes/docker-desktop.png";
import alpineShellPng from "../../resources/images/blog/DockerKubernetes/alpine-shell.png";
import nodeApiTestPng from "../../resources/images/blog/DockerKubernetes/node-api-test.png";
import dockerEnvVarsPng from "../../resources/images/blog/DockerKubernetes/docker-env-vars.png";
import nodeApiNotesPng from "../../resources/images/blog/DockerKubernetes/node-api-notes.png";
import nodeApiRedisPng from "../../resources/images/blog/DockerKubernetes/node-api-redis.png";
import dockerTaggingPng from "../../resources/images/blog/DockerKubernetes/docker-tagging.png";
import dockerTaggingCliPng from "../../resources/images/blog/DockerKubernetes/docker-tagging-cli.png";

const dockerDocs = "https://docs.docker.com/";
const dockerInstallation = "https://docs.docker.com/get-started/get-docker/";

const k8sDocs = "https://kubernetes.io/docs/home/";
const k8sOverview = "https://kubernetes.io/docs/concepts/overview/";
const k8sKubectl = "https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/";
const k8sMinikube = "https://kubernetes.io/docs/tutorials/hello-minikube/";
const k8sDeployments = "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/";
const k8sServices = "https://kubernetes.io/docs/concepts/services-networking/service/";
const k8sConfigMaps = "https://kubernetes.io/docs/concepts/configuration/configmap/";
const k8sSecrets = "https://kubernetes.io/docs/concepts/configuration/secret/";
const k8sDebug = "https://kubernetes.io/docs/tasks/debug/";

const playgroundRepo = "https://github.com/heyitsmeharv/docker-k8s-virtual-shell";

// -------------------- Docker commands --------------------
const verifyDocker = `docker version`;
const helloContainer = `docker run --rm -it alpine sh`;
const insideContainer = `# inside the container
ls

# What OS/users do I see in here?
cat /etc/os-release
whoami

# Am I on my host machine?
hostname

# What happens if I exit?
exit`;
const imageVsContainerQuickCheck = `docker images    # List images stored locally (your reusable "blueprints")
docker ps        # List running containers only (what's currently alive)
docker ps -a     # List all containers, including stopped/exited ones`;

const createNodeApiFolder = `# CMD / PowerShell
mkdir node-api
cd node-api`;

const npmInitNodeApi = `# initialise Node project
npm init -y`;

const nodeApiServer = `// server.js
import express from "express";

const app = express();

const PORT = Number(process.env.PORT || 8080);
const MESSAGE = process.env.MESSAGE || "API is running";

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/message", (_req, res) => {
  res.json({ message: MESSAGE });
});

app.listen(PORT, () => {
  console.log(\`[node-api] listening on http://0.0.0.0:\${PORT}\`);
});`;

const nodeApiPackageJson = `{
  "name": "node-api",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}`;

const dockerfileNodeApi = `# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests first (build caching)
COPY package*.json ./

# Install production deps
RUN npm ci --omit=dev

# Copy the rest of the app
COPY . .

EXPOSE 8080

CMD ["npm", "start"]`;

const dockerignoreNodeApi = `# .dockerignore
node_modules
npm-debug.log

.git
.github
*.md

.DS_Store
Thumbs.db`;

const runNodeApiLocally = `# run locally first (prove it works before Docker)
npm i
npm start`;

const testNodeApi = `# CMD / PowerShell
curl http://localhost:8080/health
curl http://localhost:8080/message`;

const buildNodeApiImage = `docker build -t node-api:dev .`;
const runNodeApiContainer = `docker run --rm -p 8080:8080 node-api:dev`;
const runNodeApiWithEnv = `docker run --rm -p 8080:8080 -e MESSAGE="Configured at runtime" node-api:dev`;

const portMappingMentalModel = `# Port mapping
# host (port on YOUR machine):container (port INSIDE the container)
#
docker run --rm -p 8080:8080 node-api:dev`;

const findContainerPort = `# See what ports (if any) are published
docker ps`;

const publishDifferentHostPort = `# Useful if 8080 is already taken on your machine
docker run --rm -p 3000:8080 node-api:dev
# then:
curl http://localhost:3000/health`;

const envVarWithPortOverride = `# You *can* change the internal port, but then your container must listen on it
# (our server reads PORT)
docker run --rm -p 9090:9090 -e PORT=9090 node-api:dev
curl http://localhost:9090/health`;

const quickTroubleshootPorts = `# Quick troubleshooting loop
docker ps
docker logs <container_name_or_id>
curl http://localhost:8080/health`;

const nodeApiWithStorage = `// server.js
import fs from "fs";
import path from "path";
import express from "express";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 8080);
const MESSAGE = process.env.MESSAGE || "API is running";

// Where we store data inside the container.
// We'll mount this path using a volume/bind mount.
const DATA_DIR = process.env.DATA_DIR || "/data";
const NOTES_FILE = path.join(DATA_DIR, "notes.txt");

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/message", (_req, res) => res.json({ message: MESSAGE }));

app.post("/notes", (req, res) => {
  const text = String(req.body?.text || "").trim();
  if (!text) return res.status(400).json({ error: "text is required" });

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.appendFileSync(NOTES_FILE, text + "\\n", "utf8");

  res.json({ ok: true, wrote: text });
});

app.get("/notes", (_req, res) => {
  try {
    const content = fs.readFileSync(NOTES_FILE, "utf8");
    res.type("text/plain").send(content);
  } catch {
    res.type("text/plain").send("");
  }
});

app.listen(PORT, () => {
  console.log(\`[node-api] listening on http://0.0.0.0:\${PORT}\`);
  console.log(\`[node-api] data dir: \${DATA_DIR}\`);
});`;

const rebuildNodeApiImage = `# from inside node-api/
docker build -t node-api:dev .`;

const writeNote = `# CMD (write a note)
curl -X POST http://localhost:8080/notes ^
  -H "Content-Type: application/json" ^
  -d "{\\"text\\":\\"first note from container\\"}"`;

const readNotes = `# CMD (read notes)
curl http://localhost:8080/notes`;

const runNoPersistence = `# No mounts → data disappears when the container is removed
docker run --rm -p 8080:8080 node-api:dev`;

const createNamedVolume = `# Create a Docker-managed volume
docker volume create node-api-data
docker volume ls`;

const runWithVolume = `# Named volume → data survives container lifecycles
docker run --rm -p 8080:8080 -v node-api-data:/data node-api:dev`;

const runWithBindMount = `# Bind mount → store data on your machine (in this folder)
# This maps .\\data (host) -> /data (container)
mkdir data
docker run --rm -p 8080:8080 -v "%cd%\\data:/data" node-api:dev`;

const inspectVolume = `# See where Docker stores the volume on your machine
docker volume inspect node-api-data`;

const cleanupVolume = `# Remove the volume if you want to reset state
docker volume rm node-api-data`;

const nodeApiWithRedis = `// server.js
import express from "express";
import { createClient } from "redis";

const app = express();

const PORT = Number(process.env.PORT || 8080);
const MESSAGE = process.env.MESSAGE || "API is running";

// In Compose, this will be something like: redis://redis:6379
const REDIS_URL = process.env.REDIS_URL || "";

let redis = null;

async function getRedis() {
  if (!REDIS_URL) return null;

  if (!redis) {
    redis = createClient({ url: REDIS_URL });
    redis.on("error", (err) => console.log("[redis] error", err?.message || err));
    await redis.connect();
    console.log("[redis] connected");
  }

  return redis;
}

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/message", (_req, res) => res.json({ message: MESSAGE }));

// A tiny "system" demo: shared state via Redis
app.post("/counter/incr", async (_req, res) => {
  const client = await getRedis();
  if (!client) return res.status(503).json({ error: "Redis not configured" });

  const next = await client.incr("counter");
  res.json({ counter: Number(next) });
});

app.get("/counter", async (_req, res) => {
  const client = await getRedis();
  if (!client) return res.status(503).json({ error: "Redis not configured" });

  const value = await client.get("counter");
  res.json({ counter: Number(value || 0) });
});

app.listen(PORT, () => {
  console.log(\`[node-api] listening on http://0.0.0.0:\${PORT}\`);
  console.log(\`[node-api] redis: \${REDIS_URL ? "enabled" : "disabled"}\`);
});`;

const installRedisClient = `# from inside node-api/
npm install redis`;

const composeNodeApi = `# compose.yml
services:
  api:
    build: .
    image: node-api:compose
    ports:
      - "8080:8080"
    environment:
      - MESSAGE=Running via Compose
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  redis_data:`;

const composeUp = `# from inside node-api/
docker compose up --build`;

const composeDownWithVolumes = `# removes volumes too (resets Redis state)
docker compose down -v`;

const testCounterCmd = `# CMD
curl -X POST http://localhost:8080/counter/incr
curl http://localhost:8080/counter`;

const composePs = `docker compose ps`;
const composeLogs = `docker compose logs -f --tail 50`;
const composeDown = `docker compose down`;

const dockerfileNodeApiShippable = `# Dockerfile

FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Copy dependency manifests first (build caching)
COPY package*.json ./

# Install production deps only, in a deterministic way
RUN npm ci --omit=dev && npm cache clean --force

# Copy the rest of the source
COPY . .

# Run as a non-root user (node image includes a 'node' user)
USER node

EXPOSE 8080

# Run node directly (less overhead than "npm start")
CMD ["node", "server.js"]`;

const buildNodeApiProd = `# from inside node-api/
docker build -t node-api:prod .`;

const compareImageSizes = `docker images node-api`;
const inspectImage = `docker inspect node-api:prod`;
const viewLayers = `docker history node-api:prod`;
const runNodeApiProd = `docker run --rm -p 8080:8080 node-api:prod`;

const tagForRegistry = `# Example: tag for pushing (Docker Hub / ECR etc)
docker tag node-api:prod repo/node-api:1.0.0`;

const dockerCommands = `docker ps                           # what's running
docker ps -a                        # what ran (and exited)
docker images                       # what images you have locally
docker logs <container>             # what the container printed
docker exec -it <container> sh      # jump inside a running container (if it has a shell)
docker inspect <image-or-container> # verify config (ports, env, cmd, user, mounts)`;

// -------------------- Kubernetes / Minikube commands --------------------
const verifyK8s = `kubectl version --client`;
const verifyMinikube = `minikube version`;

const minikubeCreateCluster = `# Create a local Kubernetes cluster
minikube start`;

const minikubeCheckCluster = `# Minikube's view
minikube status

# kubectl's view
kubectl config use-context minikube
kubectl get nodes
kubectl get pods -A
kubectl cluster-info`;

const createNamespace = `kubectl create namespace demo
kubectl config set-context --current --namespace=demo`;

const minikubeBuildNodeApiImage = `# Build the image DIRECTLY into Minikube's container runtime
# Run this from inside your node-api/ folder (where the Dockerfile is)
minikube image build -t node-api:dev .`;

const minikubeListImages = `# Sanity check: is the image inside the cluster runtime?
minikube image ls`;

const k8sApplyNodeApiDeployment = `# Create the Deployment
kubectl apply -f k8s/node-api-deployment.yaml

# Check: Deployment created + Pod started
kubectl get deploy
kubectl get pods -l app=node-api -o wide`;

const k8sApplyNodeApiService = `# Create the Service (stable endpoint to the Pods)
kubectl apply -f k8s/node-api-service.yaml

# Check: Service exists
kubectl get svc
kubectl describe svc node-api`;

const k8sPortForwardNodeApi = `kubectl port-forward svc/node-api 8080:8080`;

const testNodeApiFromHost = `curl http://localhost:8080/health
curl http://localhost:8080/message`;

const minikubeDashboard = `# Opens the Kubernetes dashboard in your browser
minikube dashboard

# If you prefer a URL you can copy/paste:
minikube dashboard --url`;

const minikubeEnableAddons = `# List available addons
minikube addons list

# Enable metrics-server (common + useful)
minikube addons enable metrics-server

# Verify it's running in kube-system
kubectl get pod,svc -n kube-system`;

const k8sTopIfMetricsServer = `# Once metrics-server is ready, these should work:
kubectl top nodes
kubectl top pods -A`;

const k8sDebugLoop = `kubectl get pods
kubectl describe pod <pod>
kubectl logs <pod>
kubectl get events --sort-by=.metadata.creationTimestamp`;

// Learn Kubernetes Basics - Explore Your App
const k8sExploreGetEverything = `# What exists in the current namespace?
kubectl get all

# A clearer view for app resources
kubectl get deploy,rs,pods,svc -o wide`;

const k8sExploreLabels = `# Labels are the glue (selectors match labels)
kubectl get pods --show-labels

# Prove the selector works:
kubectl get pods -l app=node-api -o wide`;

const k8sExploreDescribe = `# "describe" explains state + events
kubectl describe deployment node-api
kubectl describe pods -l app=node-api`;

const k8sExploreLogs = `# Logs from the Pod(s) created by the Deployment
kubectl logs -l app=node-api --tail=50

# Follow logs live (Ctrl+C to stop)
kubectl logs -l app=node-api -f`;

const k8sExploreServiceEndpoints = `# Service config
kubectl get svc node-api -o yaml

# Which Pod IPs does the Service point to?
kubectl get endpoints node-api -o wide`;

const k8sExploreExec = `# Jump inside a running Pod (like docker exec)
kubectl get pods -l app=node-api
kubectl exec -it <pod-name> -- sh

# inside the pod:
env | grep -E "MESSAGE|PORT"
wget -qO- http://localhost:8080/health
exit`;

const k8sCleanup = `# Optional: switch your default namespace back to default
kubectl config set-context --current --namespace=default

# Delete everything we created in demo
kubectl delete namespace demo

# Stop or delete the cluster
minikube stop
minikube delete`;

const k8sDeploymentNodeApi = `# k8s/node-api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: node-api
  template:
    metadata:
      labels:
        app: node-api
    spec:
      containers:
        - name: node-api
          image: node-api:dev
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
          env:
            - name: MESSAGE
              value: "Running in Kubernetes"`;

const k8sServiceNodeApi = `# k8s/node-api-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: node-api
spec:
  selector:
    app: node-api
  ports:
    - name: http
      port: 8080
      targetPort: 8080`;

const playgroundTree = `docker-k8s-virtual-shell/
├─ app/
│  ├─ ui/
│  └─ api/
├─ docker/
│  ├─ Dockerfile
│  └─ .dockerignore
├─ compose/
│  └─ compose.yml
├─ k8s/
│  ├─ api-deployment.yaml
│  ├─ api-service.yaml
│  ├─ ui-deployment.yaml
│  ├─ ui-service.yaml
│  ├─ configmap.yaml
│  └─ secret.yaml
└─ README.md`;

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const DockerKubernetes = () => {
  useEffect(() => {
    Analytics.event("blog_opened", { slug: "introduction-to-docker-kubernetes" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Introduction to Docker & Kubernetes</PageTitle>
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
          This post is a hands-on learning path through Docker fundamentals first, then Kubernetes.
          We'll keep the examples intentionally small so you can run everything locally and build intuition without getting lost in a big project.
        </Paragraph>

        <Paragraph>Before we dive into building anything let's go explore the fundamentals.</Paragraph>

        <SectionHeading>What is Docker?</SectionHeading>

        <Paragraph>
          Docker is a way to package and run software as <Strong>containers</Strong>. A container is an{" "}
          <Strong>isolated process</Strong> for one part of your app, with its own filesystem view and the exact dependencies it needs.
          That means your React UI, your API, and your database can each run in their own 'boxed' environments without fighting over versions.
        </Paragraph>

        <Paragraph>
          Containers are powerful because they're designed to be:
          <TextList>
            <TextListItem>
              <Strong>self-contained</Strong> - everything required to run is in the container
            </TextListItem>
            <TextListItem>
              <Strong>isolated</Strong> - minimal influence on your host and other containers
            </TextListItem>
            <TextListItem>
              <Strong>independent</Strong> - remove one container without breaking the others
            </TextListItem>
            <TextListItem>
              <Strong>portable</Strong> - the same container behaves consistently on your laptop, in CI, or in the cloud
            </TextListItem>
          </TextList>
        </Paragraph>

        <Paragraph>Let's now look to setup docker on your machine.</Paragraph>

        <SectionHeading>Install, Setup and Configure</SectionHeading>

        <SubSectionHeading>Set up Docker</SubSectionHeading>
        <Paragraph>
          Install Docker using the{" "}
          <TextLink href={dockerInstallation} target="_blank" rel="noreferrer">
            official docs
          </TextLink>
          , then verify the CLI is available.
        </Paragraph>

        <Banner title="Warning" variant="warning">
          <Paragraph>Please note that I'll be running the docker commands in CMD and PowerShell - The commands won't work in other terminals.</Paragraph>
        </Banner>

        <CodeBlockWithCopy code={verifyDocker} />

        <Carousel
          items={[
            {
              title: "Docker CLI",
              description:
                "Quick sanity check: the CLI can talk to the Docker Engine. If you see both Client and Server, you're ready to run containers.",
              src: dockerCliPng,
              alt: "Terminal showing docker version output",
            },
            {
              title: "Docker Desktop GUI",
              description:
                "Visual confirmation: Docker Desktop is running and managing the local engine. Handy for seeing images, containers, and logs at a glance.",
              src: dockerDesktopPng,
              alt: "Docker Desktop showing the Docker engine running and containers/images list",
            },
          ]}
        />

        <SubSectionHeading>Meet the container</SubSectionHeading>
        <Paragraph>
          Before containerising anything, run an interactive container. As you will see the container is an isolated process with its own filesystem view.
        </Paragraph>

        <Paragraph>Run this to start a node Linux container and drop into a shell:</Paragraph>

        <CodeBlockWithCopy code={helloContainer} />

        <TertiaryHeading>Breaking down the command</TertiaryHeading>

        <TextList>
          <TextListItem>
            <InlineHighlight>docker run</InlineHighlight> - create a new container from an image and start it.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>alpine</InlineHighlight> - the image we're running (a node Linux distribution).
          </TextListItem>
          <TextListItem>
            <InlineHighlight>sh</InlineHighlight> - the command to run <Strong>inside</Strong> the container (a shell).
          </TextListItem>
          <TextListItem>
            <InlineHighlight>-i</InlineHighlight> - keep STDIN open so you can type into the container.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>-t</InlineHighlight> - allocate a pseudo-terminal so it behaves like a real interactive shell.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>--rm</InlineHighlight> - when the process exits, delete the container automatically.
          </TextListItem>
        </TextList>

        <Paragraph>After running the command What you should now see is a docker container up and running in the Docker GUI.</Paragraph>

        <Carousel
          items={[
            {
              title: "alpine sh",
              description: "A shell inside a container.",
              src: alpineShellPng,
              alt: "Alpine shell running inside a Docker container",
            },
          ]}
        />

        <Paragraph>
          Now let's explore what we're able to do <Strong>inside</Strong> the container. These commands are simple, but the output is the lesson:
        </Paragraph>

        <CodeBlockWithCopy code={insideContainer} />

        <Paragraph>
          What you're seeing: you've started a brand-new process with a minimal filesystem. It feels like a node machine because it has its own root
          directory and OS files, but it starts instantly because it's not booting a whole operating system.
        </Paragraph>

        <Paragraph>
          When you type <InlineHighlight>exit</InlineHighlight>, the container stops - and because we used{" "}
          <InlineHighlight>--rm</InlineHighlight>, Docker cleans it up automatically. That's the container lifecycle in one go:
          <Strong> run → interact → stop → disappear</Strong>.
        </Paragraph>

        <SubSectionHeading>Images vs Containers</SubSectionHeading>

        <Paragraph>
          When you typed <InlineHighlight>exit</InlineHighlight>, that shell stopped because the container stopped. That's the first big idea: containers
          are <Strong>temporary</Strong>. They're the running "instance" of something - not the thing itself.
        </Paragraph>

        <Paragraph>
          The "thing itself" is the <Strong>image</Strong>. If a container is a running process, an image is the <Strong>blueprint</Strong> of commands to
          run when it starts.
        </Paragraph>

        <Paragraph>So the relationship is simple:</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Image</Strong> = what you <Strong>built</Strong> (a reusable snapshot you can ship)
          </TextListItem>
          <TextListItem>
            <Strong>Container</Strong> = what you <Strong>run</Strong> (a live instance created from an image)
          </TextListItem>
        </TextList>

        <Banner title="Quick Note" variant="info">
          <Paragraph>You'll need to have the alpine container running in a separate terminal before running these commands.</Paragraph>
        </Banner>

        <Paragraph>A quick test you can do that will help visualise the difference</Paragraph>

        <CodeBlockWithCopy code={imageVsContainerQuickCheck} />

        <SubSectionHeading>Writing your own Dockerfile</SubSectionHeading>

        <Paragraph>
          Right now we've been borrowing someone else's image (<InlineHighlight>alpine</InlineHighlight>). Next, we'll build our own image using a small
          Node/Express API so the steps stay simple and repeatable.
        </Paragraph>

        <TertiaryHeading>Setup</TertiaryHeading>

        <Paragraph>Let's create the environment to build our node API.</Paragraph>

        <CodeBlockWithCopy code={createNodeApiFolder} />
        <CodeBlockWithCopy code={npmInitNodeApi} />

        <TertiaryHeading>App files</TertiaryHeading>

        <Carousel
          items={[
            {
              title: "server.js",
              description:
                "A minimal Express API with /health and /message. It binds to 0.0.0.0 so it's reachable from inside a container.",
              code: nodeApiServer,
            },
            {
              title: "package.json",
              description: "ES modules + a start script. Keep it boring: one command that always starts the service.",
              code: nodeApiPackageJson,
            },
          ]}
        />

        <Paragraph>Now let's run it and ping it to test that it works as intended.</Paragraph>

        <CodeBlockWithCopy code={runNodeApiLocally} />
        <CodeBlockWithCopy code={testNodeApi} />

        <Carousel
          items={[
            {
              title: "Node API Test",
              description: "The API should return a response when hitting /health and /message",
              src: nodeApiTestPng,
            },
          ]}
        />

        <TertiaryHeading>Write the Dockerfile</TertiaryHeading>

        <Paragraph>
          A Dockerfile is a recipe. The key move is caching: copy dependency files first, install, then copy your source. That way you don't reinstall
          dependencies every time you change code.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "Dockerfile",
              description: "Node base image → install deps → copy code → expose 8080 → start the server.",
              code: dockerfileNodeApi,
            },
            {
              title: ".dockerignore",
              description: "Keeps builds fast by excluding node_modules and repo noise from the build context.",
              code: dockerignoreNodeApi,
            },
          ]}
        />

        <TertiaryHeading>Build and run the container</TertiaryHeading>

        <Paragraph>
          <InlineHighlight>docker build</InlineHighlight> turns the Dockerfile into an image. <InlineHighlight>docker run</InlineHighlight> starts a container
          from that image.
        </Paragraph>

        <CodeBlockWithCopy code={buildNodeApiImage} />
        <CodeBlockWithCopy code={runNodeApiContainer} />

        <Paragraph>Hit the same endpoints again - this time you're talking to the container, not your local Node process:</Paragraph>

        <CodeBlockWithCopy code={testNodeApi} />

        <TertiaryHeading>Configuration without rebuilding (env vars)</TertiaryHeading>

        <Paragraph>
          A key container habit: build once, configure per environment. Here we override the message at runtime without rebuilding the image.
        </Paragraph>

        <CodeBlockWithCopy code={runNodeApiWithEnv} />

        <Carousel
          items={[
            {
              title: "Override at runtime",
              description: "The API returns the override message",
              src: dockerEnvVarsPng,
            },
          ]}
        />

        <SubSectionHeading>Make it reachable (ports + env)</SubSectionHeading>

        <Paragraph>
          By default, a container lives in its own world. Your API might be running, but your laptop can't talk to it unless you explicitly publish a port.
        </Paragraph>

        <TertiaryHeading>Port mapping: host vs container</TertiaryHeading>

        <Paragraph>
          The mental model is simple: <Strong>host:container</Strong>. The left side is a port on <Strong>your machine</Strong>. The right side is the port
          the app listens on <Strong>inside the container</Strong>.
        </Paragraph>

        <CodeBlockWithCopy code={portMappingMentalModel} />

        <Banner title="Common mistake" variant="warning">
          <Paragraph>
            If you forget <InlineHighlight>-p</InlineHighlight>, the container can still be running - but it won't be reachable from your browser or curl.
          </Paragraph>
        </Banner>

        <Paragraph>You can sanity-check what's running and whether ports are published with:</Paragraph>

        <CodeBlockWithCopy code={findContainerPort} />

        <TertiaryHeading>When a port is already taken</TertiaryHeading>

        <Paragraph>
          If something on your machine already uses 8080, publish a different host port and keep the container port the same. This is normal in real
          projects.
        </Paragraph>

        <CodeBlockWithCopy code={publishDifferentHostPort} />

        <TertiaryHeading>Optional: overriding the internal port</TertiaryHeading>

        <Paragraph>
          You can also change the port the app listens on (inside the container) by setting <InlineHighlight>PORT</InlineHighlight>. If you do that, make
          sure the port mapping matches.
        </Paragraph>

        <CodeBlockWithCopy code={envVarWithPortOverride} />

        <TertiaryHeading>Quick troubleshooting loop</TertiaryHeading>

        <Paragraph>If something doesn't respond, don't guess. Check: is it running, what does it log, and does the endpoint respond?</Paragraph>

        <CodeBlockWithCopy code={quickTroubleshootPorts} />

        <SubSectionHeading>Make it remember (volumes + bind mounts)</SubSectionHeading>

        <Paragraph>
          Containers are designed to be disposable. That's great - until you realise you need to keep something: uploads, database files, logs, cache…
          anything that shouldn't vanish when the container stops.
        </Paragraph>

        <Paragraph>
          Docker gives you two ways to persist data: <Strong>volumes</Strong> and <Strong>bind mounts</Strong>. They look similar, but they're used for
          different reasons.
        </Paragraph>

        <TertiaryHeading>Give the API something to persist</TertiaryHeading>

        <Paragraph>
          To make the difference obvious, we'll add two tiny endpoints: one that appends a line to a file (<InlineHighlight>POST /notes</InlineHighlight>),
          and one that reads it back (<InlineHighlight>GET /notes</InlineHighlight>).
        </Paragraph>

        <Carousel
          items={[
            {
              title: "server.js (storage endpoints)",
              description: "Writes notes to /data/notes.txt so we can mount /data and prove persistence.",
              code: nodeApiWithStorage,
            },
          ]}
        />

        <Paragraph>Rebuild the image after updating the file:</Paragraph>

        <CodeBlockWithCopy code={rebuildNodeApiImage} />

        <TertiaryHeading>What happens without persistence</TertiaryHeading>

        <Paragraph>
          Start the container normally, write a note, read it back, then stop the container and run it again. Because we're using{" "}
          <InlineHighlight>--rm</InlineHighlight>, the container is removed - and the file disappears with it.
        </Paragraph>

        <CodeBlockWithCopy code={runNoPersistence} />

        <Banner title="Windows note" variant="info">
          <Paragraph>
            In this post I'm using <Strong>CMD</Strong>. PowerShell has different syntax for HTTP requests. If you're using PowerShell, use the PowerShell
            examples below (Invoke-RestMethod) instead of curl flags like -Method.
          </Paragraph>
        </Banner>

        <CodeBlockWithCopy code={writeNote} />
        <CodeBlockWithCopy code={readNotes} />

        <Carousel
          items={[
            {
              title: "Playing with data",
              description: "The API should return a response when hitting GET /notes and POST /notes",
              src: nodeApiNotesPng,
            },
          ]}
        />

        <Banner title="What you should notice" variant="warning">
          <Paragraph>
            If you stop the container and start it again, your notes will be gone. That's not a bug - it's the default container lifecycle.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Option 1: Named volumes (Docker-managed storage)</TertiaryHeading>

        <Paragraph>
          Volumes are managed by Docker. You don't care where the files live on disk - Docker handles it. This is the normal choice for data you want to
          persist without wiring your app to your local filesystem layout.
        </Paragraph>

        <CodeBlockWithCopy code={createNamedVolume} />
        <CodeBlockWithCopy code={runWithVolume} />
        <CodeBlockWithCopy code={writeNote} />
        <CodeBlockWithCopy code={readNotes} />

        <Paragraph>You can inspect where Docker stores the volume:</Paragraph>

        <CodeBlockWithCopy code={inspectVolume} />

        <TertiaryHeading>Option 2: Bind mounts (use your local folder)</TertiaryHeading>

        <Paragraph>
          Bind mounts map a folder from your machine into the container. This is perfect for dev workflows because you can see and edit files directly on
          your host.
        </Paragraph>

        <CodeBlockWithCopy code={runWithBindMount} />
        <CodeBlockWithCopy code={writeNote} />
        <CodeBlockWithCopy code={readNotes} />

        <TertiaryHeading>Resetting state (when you want a clean slate)</TertiaryHeading>

        <Paragraph>
          If you're experimenting and want to wipe everything and start fresh, remove the named volume. Docker will recreate it next time you run with{" "}
          <InlineHighlight>-v node-api-data:/data</InlineHighlight>.
        </Paragraph>

        <CodeBlockWithCopy code={cleanupVolume} />

        <Banner title="Rule of thumb" variant="info">
          <Paragraph>
            Use <Strong>bind mounts</Strong> for local development loops. Use <Strong>volumes</Strong> when you want Docker-managed persistence.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Make it a system (multi-container + Compose)</SubSectionHeading>

        <Paragraph>
          Most real apps aren't one container. You'll usually have an API, a database, maybe a cache, maybe a worker. Compose is how you define that whole
          local system in one file - then start it with one command.
        </Paragraph>

        <Paragraph>
          In this example, we'll add Redis as a second service. Not because Redis is required - but because it's a clean way to learn container networking
          and shared state without introducing a full database.
        </Paragraph>

        <TertiaryHeading>Step 1: Add a Redis client to the API</TertiaryHeading>

        <Paragraph>
          We'll add two endpoints: one increments a counter, one reads it back. The counter lives in Redis, so it survives API restarts.
        </Paragraph>

        <CodeBlockWithCopy code={installRedisClient} />

        <Carousel
          items={[
            {
              title: "server.js (Compose version)",
              description: "Adds Redis-backed /counter endpoints. When REDIS_URL is set, the API becomes part of a small system.",
              code: nodeApiWithRedis,
            },
          ]}
        />

        <Paragraph>Rebuild the image so the new dependency is included:</Paragraph>

        <CodeBlockWithCopy code={buildNodeApiImage} />

        <TertiaryHeading>Step 2: Define the system in compose.yml</TertiaryHeading>

        <Paragraph>
          Compose gives you a private network automatically. Each service name becomes a DNS name. That's why the API can connect to Redis at{" "}
          <InlineHighlight>redis://redis:6379</InlineHighlight>.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "compose.yml",
              description:
                "Two services, one network. API talks to Redis by service name, and Redis persists data via a named volume.",
              code: composeNodeApi,
            },
          ]}
        />

        <TertiaryHeading>Step 3: Run the system</TertiaryHeading>

        <CodeBlockWithCopy code={composeUp} />

        <Paragraph>In another terminal, hit the counter endpoints:</Paragraph>

        <CodeBlockWithCopy code={testCounterCmd} />

        <Carousel
          items={[
            {
              title: "Recording data with Redis",
              description: "The API should return a response when hitting GET /counter and POST /counter/incr",
              src: nodeApiRedisPng,
            },
          ]}
        />

        <Banner title="What just happened?" variant="info">
          <Paragraph>
            You didn't expose Redis to your machine - only the API. Redis is reachable privately inside the Compose network. That's a common real-world
            setup: internal services stay internal.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Useful Compose commands</TertiaryHeading>
        <Paragraph>Show the current state of the Compose stack (which services are up, container names, ports):</Paragraph>
        <CodeBlockWithCopy code={composePs} />
        <Paragraph>Stream the last 50 log lines from all services (Ctrl+C to stop). Great for debugging startup issues:</Paragraph>
        <CodeBlockWithCopy code={composeLogs} />
        <Paragraph>Stop and remove the containers + network created by Compose:</Paragraph>
        <CodeBlockWithCopy code={composeDown} />
        <Paragraph>If you want to reset Redis state completely, bring it down and remove volumes:</Paragraph>
        <CodeBlockWithCopy code={composeDownWithVolumes} />

        <SubSectionHeading>Moving to Production</SubSectionHeading>

        <Paragraph>
          Once something runs, it's tempting to stop. But "shippable" containers have a few boring qualities that make them reliable: predictable installs,
          small images, clean defaults, and no running as root unless you absolutely have to.
        </Paragraph>

        <TertiaryHeading>What we're improving</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Build caching</Strong> - don't reinstall dependencies on every code change.
          </TextListItem>
          <TextListItem>
            <Strong>Deterministic installs</Strong> - <InlineHighlight>npm ci</InlineHighlight> uses the lockfile for repeatable builds.
          </TextListItem>
          <TextListItem>
            <Strong>Production defaults</Strong> - set <InlineHighlight>NODE_ENV=production</InlineHighlight> and omit dev deps.
          </TextListItem>
          <TextListItem>
            <Strong>Non-root runtime</Strong> - reduce the blast radius if something goes wrong.
          </TextListItem>
          <TextListItem>
            <Strong>Simple entrypoint</Strong> - run Node directly instead of shelling through npm.
          </TextListItem>
        </TextList>

        <Paragraph>Here's a cleaned-up Dockerfile that keeps the same behaviour, but is more production-friendly:</Paragraph>

        <Carousel
          items={[
            {
              title: "Dockerfile (production)",
              description: "Same app, better defaults: deterministic installs, production deps only, and a non-root runtime.",
              code: dockerfileNodeApiShippable,
            },
          ]}
        />

        <TertiaryHeading>Build and sanity-check</TertiaryHeading>

        <CodeBlockWithCopy code={buildNodeApiProd} />
        <CodeBlockWithCopy code={runNodeApiProd} />

        <Banner title="docker compose vs run" variant="warning">
          <Paragraph>
            <Strong>docker compose down</Strong> only stops/removes containers that were created by <Strong>docker compose up</Strong>. If you start your
            production container with <Strong>docker run</Strong> (like <Strong>docker run --rm -p 8080:8080 node-api:prod</Strong>), it's not part of a
            Compose project, so Compose won't touch it.
          </Paragraph>
        </Banner>

        <Paragraph>Now compare the image size and look at what's inside:</Paragraph>

        <CodeBlockWithCopy code={compareImageSizes} />
        <CodeBlockWithCopy code={viewLayers} />

        <Paragraph>If you want to confirm the image has the runtime settings you expect (user, ports, env, command), inspect it:</Paragraph>

        <CodeBlockWithCopy code={inspectImage} />

        <Banner title="Why docker history matters" variant="info">
          <Paragraph>
            If your image grows unexpectedly, <InlineHighlight>docker history</InlineHighlight> usually makes the culprit obvious (large COPY steps,
            unnecessary files, caches, etc.).
          </Paragraph>
        </Banner>

        <TertiaryHeading>Tagging</TertiaryHeading>

        <Paragraph>Shipping usually means pushing to a registry (Docker Hub, ECR, GHCR). Tagging is how you create a clean, versioned artifact.</Paragraph>

        <CodeBlockWithCopy code={tagForRegistry} />

        <Paragraph>You now should be able to see tags you've made in Docker Desktop or by running the cli command:</Paragraph>

        <Carousel
          items={[
            {
              title: "Tags via Docker Desktop ",
              description: "Showing existing tags made for images in Docker Desktop.",
              src: dockerTaggingPng,
            },
            {
              title: "Tags via CLI",
              description: "Running 'docker images node-api'",
              src: dockerTaggingCliPng,
            },
          ]}
        />

        <SubSectionHeading>Docker wrap-up</SubSectionHeading>

        <Paragraph>
          At this point, we've covered the full Docker loop: you can run containers, build images, wire services together, persist data, and make an image
          that's actually safe to ship.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Image</Strong> = a reusable blueprint you can build once and ship.
          </TextListItem>
          <TextListItem>
            <Strong>Container</Strong> = a running instance created from an image (disposable by default).
          </TextListItem>
          <TextListItem>
            <Strong>Ports</Strong> = how your machine reaches a process inside a container (<InlineHighlight>host:container</InlineHighlight>).
          </TextListItem>
          <TextListItem>
            <Strong>Env vars</Strong> = configuration at runtime (build once, configure per environment).
          </TextListItem>
          <TextListItem>
            <Strong>Volumes / bind mounts</Strong> = how containers “remember” and how dev loops stay fast.
          </TextListItem>
          <TextListItem>
            <Strong>Compose</Strong> = the local system definition (multiple containers, one command).
          </TextListItem>
        </TextList>

        <TertiaryHeading>Quick commands you'll reuse constantly</TertiaryHeading>

        <Paragraph>These are the ones you'll keep coming back to when something isn't behaving:</Paragraph>

        <CodeBlockWithCopy code={dockerCommands} />

        <TertiaryHeading>Key takeaway</TertiaryHeading>

        <Paragraph>
          Docker gives you a repeatable way to package and run software. Once you can reliably produce an image and run it locally (and as a small system),
          you're ready for the next problem: running containers in a way that survives machines, restarts, and scale.
        </Paragraph>

        <Paragraph>
          That's where Kubernetes comes in. You still ship images - Kubernetes is the layer that runs them declaratively and keeps them running.
        </Paragraph>

        <SectionHeading>Kubernetes (managing containerised workloads)</SectionHeading>

        <Paragraph>
          Docker helped us build and run containers. Kubernetes solves the next problem: how do you run containers in a reliable way when it's not just your
          laptop anymore?
        </Paragraph>

        <Paragraph>
          Kubernetes is a system for running containerised applications using <Strong>desired state</Strong>. Instead of "run this container", you declare
          "I want 1 copy of this API running" - and Kubernetes continuously works to make reality match.
        </Paragraph>

        <SubSectionHeading>Hello Minikube (local Kubernetes cluster)</SubSectionHeading>

        <Paragraph>
          Before we deploy anything, we need two tools: <Strong>kubectl</Strong> (the CLI that talks to Kubernetes) and <Strong>Minikube</Strong> (a local
          Kubernetes cluster you can run on your machine).
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>kubectl</Strong> - the command line tool you use to create resources, inspect them, and debug them. Think of it as "the Kubernetes
            remote control":{" "}
            <TextLink href={k8sKubectl} target="_blank" rel="noreferrer">
              Kubernetes tools install docs
            </TextLink>
          </TextListItem>
          <TextListItem>
            <Strong>Minikube</Strong> - gives you a real Kubernetes cluster locally so you can practice without needing cloud infrastructure:{" "}
            <TextLink href={k8sMinikube} target="_blank" rel="noreferrer">
              Hello Minikube
            </TextLink>
          </TextListItem>
        </TextList>

        <TertiaryHeading>Check installation</TertiaryHeading>

        <Paragraph>
          Install <InlineHighlight>kubectl</InlineHighlight> first. Once installed, we want to confirm it's on your PATH and runnable from CMD / PowerShell.
        </Paragraph>

        <CodeBlockWithCopy code={verifyK8s} />

        <Banner title="If kubectl isn't found" variant="warning">
          <Paragraph>
            If <InlineHighlight>kubectl version --client</InlineHighlight> returns nothing, it means kubectl isn't on your PATH. Re-run the install steps
            and make sure the kubectl install location is added to PATH.
          </Paragraph>
        </Banner>

        <Paragraph>
          Next, confirm Minikube is installed:
        </Paragraph>
        <CodeBlockWithCopy code={verifyMinikube} />

        <TertiaryHeading>Create a Minikube cluster</TertiaryHeading>

        <Paragraph>This starts (or resumes) a single-node Kubernetes cluster locally.</Paragraph>

        <CodeBlockWithCopy code={minikubeCreateCluster} />

        <TertiaryHeading>Check the cluster status</TertiaryHeading>

        <Paragraph>
          We check from two angles: Minikube's view (<InlineHighlight>minikube status</InlineHighlight>) and Kubernetes' view (
          <InlineHighlight>kubectl get nodes</InlineHighlight>, <InlineHighlight>kubectl get pods -A</InlineHighlight>).
        </Paragraph>

        <CodeBlockWithCopy code={minikubeCheckCluster} />

        <TertiaryHeading>Keep things tidy (namespace)</TertiaryHeading>

        <Paragraph>We'll use a <InlineHighlight>demo</InlineHighlight> namespace so it's easy to clean up at the end.</Paragraph>

        <CodeBlockWithCopy code={createNamespace} />

        <Banner title="Key idea" variant="info">
          <Paragraph>
            Minikube runs its own container runtime. If you build an image on your laptop, Kubernetes won't automatically see it. We'll solve that by
            building the image directly into Minikube.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Build the node-api image inside Minikube</TertiaryHeading>

        <Paragraph>
          Run this from inside the <InlineHighlight>node-api/</InlineHighlight> folder (where your Dockerfile lives). This makes{" "}
          <InlineHighlight>node-api:dev</InlineHighlight> available to the cluster without pushing to a registry.
        </Paragraph>

        <CodeBlockWithCopy code={minikubeBuildNodeApiImage} />
        <CodeBlockWithCopy code={minikubeListImages} />

        <SubSectionHeading>Create a Deployment (node-api)</SubSectionHeading>

        <Paragraph>
          A <Strong>Deployment</Strong> declares desired state: “keep 1 copy of this app running”. Kubernetes then creates Pods and keeps them healthy.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "k8s/node-api-deployment.yaml",
              description:
                "Desired state: run 1 replica of node-api. imagePullPolicy IfNotPresent allows Minikube to use the locally built image.",
              code: k8sDeploymentNodeApi,
            },
          ]}
        />

        <CodeBlockWithCopy code={k8sApplyNodeApiDeployment} />

        <SubSectionHeading>Create a Service (stable networking)</SubSectionHeading>

        <Paragraph>
          Pods come and go. A <Strong>Service</Strong> gives you a stable name and port that always points at the right Pods. Our Service is internal by
          default, so we'll use port-forwarding to access it from your machine.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "k8s/node-api-service.yaml",
              description: "Stable access to node-api Pods. The Service selects Pods by label and forwards traffic to port 8080.",
              code: k8sServiceNodeApi,
            },
          ]}
        />

        <CodeBlockWithCopy code={k8sApplyNodeApiService} />

        <TertiaryHeading>Access the Service locally (port-forward)</TertiaryHeading>

        <Paragraph>
          Port-forward creates a temporary tunnel from your machine to the Service inside the cluster. Keep it running in one terminal, and test the API
          from another.
        </Paragraph>

        <CodeBlockWithCopy code={k8sPortForwardNodeApi} />
        <CodeBlockWithCopy code={testNodeApiFromHost} />

        <TertiaryHeading>Open the Dashboard</TertiaryHeading>

        <Paragraph>The dashboard is a great way to see what Kubernetes created (Deployments, Pods, Services) without memorising every command.</Paragraph>

        <CodeBlockWithCopy code={minikubeDashboard} />

        <TertiaryHeading>Enable addons (metrics-server)</TertiaryHeading>

        <Paragraph>
          Addons are optional cluster features Minikube can enable for you. We'll enable <InlineHighlight>metrics-server</InlineHighlight> so you can use{" "}
          <InlineHighlight>kubectl top</InlineHighlight>.
        </Paragraph>

        <CodeBlockWithCopy code={minikubeEnableAddons} />

        <Banner title="Note" variant="info">
          <Paragraph>
            Metrics can take a moment to become available after enabling the addon. If <InlineHighlight>kubectl top</InlineHighlight> fails at first, wait a
            bit and try again.
          </Paragraph>
        </Banner>

        <CodeBlockWithCopy code={k8sTopIfMetricsServer} />

        <SectionHeading>Understanding Kubernetes (what you just created)</SectionHeading>

        <Paragraph>
          You now have a real cluster and a real app running. Next we stop "following steps" and start building intuition: what Kubernetes created, how
          traffic reaches your Pods, and how to debug issues without guessing.
        </Paragraph>

        <SubSectionHeading>Explore Your App</SubSectionHeading>

        <Paragraph>
          We already have a running <InlineHighlight>Deployment</InlineHighlight> and <InlineHighlight>Service</InlineHighlight>. Now let's learn what
          Kubernetes actually created and how the pieces connect.
        </Paragraph>

        <TertiaryHeading>What did Kubernetes create?</TertiaryHeading>
        <Paragraph>
          Start with <InlineHighlight>kubectl get all</InlineHighlight>. This gives you the “map” of what exists in the namespace.
        </Paragraph>
        <CodeBlockWithCopy code={k8sExploreGetEverything} />

        <TertiaryHeading>Follow the chain (Deployment → ReplicaSet → Pod)</TertiaryHeading>
        <Paragraph>
          Deployments don't run containers directly — they create ReplicaSets, which create Pods. When something breaks,{" "}
          <InlineHighlight>describe</InlineHighlight> usually tells you why.
        </Paragraph>
        <CodeBlockWithCopy code={k8sExploreDescribe} />

        <TertiaryHeading>Labels are the glue</TertiaryHeading>
        <Paragraph>
          Services don't 'know' about Deployments. They match Pods using labels. If the labels don't match, traffic goes nowhere.
        </Paragraph>
        <CodeBlockWithCopy code={k8sExploreLabels} />

        <TertiaryHeading>Logs (your first debugging superpower)</TertiaryHeading>
        <Paragraph>If your app is crashing, logs are step one. If it's not starting, events are step two.</Paragraph>
        <CodeBlockWithCopy code={k8sExploreLogs} />

        <TertiaryHeading>How does a Service actually route traffic?</TertiaryHeading>
        <Paragraph>
          A Service becomes a stable name + virtual IP. Under the hood it tracks endpoints (Pod IPs). No endpoints usually means: wrong selector, Pods not
          Ready, or Pods not running.
        </Paragraph>
        <CodeBlockWithCopy code={k8sExploreServiceEndpoints} />

        <TertiaryHeading>Exec into a Pod</TertiaryHeading>
        <Paragraph>
          This is the Kubernetes equivalent of <InlineHighlight>docker exec</InlineHighlight>. It's invaluable for sanity checks.
        </Paragraph>
        <CodeBlockWithCopy code={k8sExploreExec} />

        <Banner title="Mini challenge" variant="info">
          <Paragraph>
            Edit <InlineHighlight>k8s/node-api-service.yaml</InlineHighlight> and deliberately break the selector (e.g.{" "}
            <InlineHighlight>app: node-api-broken</InlineHighlight>), apply it, then check endpoints. Then fix it and re-apply. Watching endpoints appear
            and disappear is how Services start to click.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Debugging loop (when stuff goes wrong)</SubSectionHeading>

        <Paragraph>If your Pod isn't running, use this loop: list pods → describe the failing one → read logs → check events.</Paragraph>

        <CodeBlockWithCopy code={k8sDebugLoop} />

        <TertiaryHeading>Clean up</TertiaryHeading>

        <Paragraph>Tear down what we created so your cluster stays tidy. You can stop Minikube to save resources, or delete it completely.</Paragraph>

        <CodeBlockWithCopy code={k8sCleanup} />

        <SectionHeading>References (official docs)</SectionHeading>

        <TextList>
          <TextListItem>
            <TextLink href={dockerDocs} target="_blank" rel="noreferrer">
              Docker Docs
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href={k8sDocs} target="_blank" rel="noreferrer">
              Kubernetes Docs
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href={k8sOverview} target="_blank" rel="noreferrer">
              Kubernetes Overview
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href={k8sDeployments} target="_blank" rel="noreferrer">
              Deployments
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href={k8sServices} target="_blank" rel="noreferrer">
              Services
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href={k8sConfigMaps} target="_blank" rel="noreferrer">
              ConfigMaps
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href={k8sSecrets} target="_blank" rel="noreferrer">
              Secrets
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href={k8sDebug} target="_blank" rel="noreferrer">
              Debugging
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default DockerKubernetes;