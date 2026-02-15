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


const dockerDocs = "https://docs.docker.com/";
const dockerInstallation = "https://docs.docker.com/get-started/get-docker/";
const dockerWhatIsContainer = "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/";
const dockerDockerfileRef = "https://docs.docker.com/reference/dockerfile/";
const dockerBestPractices = "https://docs.docker.com/build/building/best-practices/";
const dockerComposeDocs = "https://docs.docker.com/compose/";
const dockerComposeFileRef = "https://docs.docker.com/reference/compose-file/";

const k8sDocs = "https://kubernetes.io/docs/home/";
const k8sOverview = "https://kubernetes.io/docs/concepts/overview/";
const k8sTools = "https://kubernetes.io/docs/tasks/tools/";
const k8sHelloMinikube = "https://kubernetes.io/docs/tutorials/hello-minikube/";
const k8sDeployments = "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/";
const k8sServices = "https://kubernetes.io/docs/concepts/services-networking/service/";
const k8sConfigMaps = "https://kubernetes.io/docs/concepts/configuration/configmap/";
const k8sSecrets = "https://kubernetes.io/docs/concepts/configuration/secret/";
const k8sDebug = "https://kubernetes.io/docs/tasks/debug/";

const playgroundRepo = "https://github.com/heyitsmeharv/docker-k8s-virtual-shell";

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
const nodeApiWithStorage = `// server.js (add storage endpoints)
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



const composeUp = `docker compose -f compose/compose.yml up --build`;
const composeDown = `docker compose -f compose/compose.yml down`;

const verifyK8s = `kubectl version --client
kubectl cluster-info`;

const k8sApply = `kubectl apply -f k8s/
kubectl get pods
kubectl get svc`;

const k8sDebugLoop = `kubectl get pods
kubectl describe pod <pod>
kubectl logs <pod>
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl get svc,endpoints`;

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

        <Paragraph>
          Before we dive into building anything let's go explore the fundamentals.
        </Paragraph>

        <SectionHeading>What is Docker?</SectionHeading>

        <Paragraph>
          Docker is a way to package and run software as <Strong>containers</Strong>. A container is an{" "}
          <Strong>isolated process</Strong> for one part of your app, with its own filesystem view and the exact dependencies it needs.
          That means your React UI, your API, and your database can each run in their own 'boxed' environments without fighting over
          versions.
        </Paragraph>

        <Paragraph>
          Containers are powerful because they're designed to be:
          <TextList>
            <TextListItem><Strong>self-contained</Strong> - everything required to run is in the container</TextListItem>
            <TextListItem><Strong>isolated</Strong> - minimal influence on your host and other containers</TextListItem>
            <TextListItem><Strong>independent</Strong> - remove one container without breaking the others</TextListItem>
            <TextListItem><Strong>portable</Strong> - the same container behaves consistently on your laptop, in CI, or in the cloud</TextListItem>
          </TextList>
        </Paragraph>

        <Paragraph>Let's now look to setup docker on your machine.</Paragraph>

        <SectionHeading>Install, Setup and Configure</SectionHeading>

        <SubSectionHeading>Set up Docker</SubSectionHeading>
        <Paragraph>
          Install Docker using the <TextLink
            href={dockerInstallation}
            target="_blank"
            rel="noreferrer"
          >
            official docs
          </TextLink>, then verify the CLI is available.
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

        <Paragraph>
          Run this to start a node Linux container and drop into a shell:
        </Paragraph>

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
          What you're seeing: you've started a brand-new process with a minimal filesystem. It feels like a node machine because it has
          its own root directory and OS files, but it starts instantly because it's not booting a whole operating system.
        </Paragraph>

        <Paragraph>
          When you type <InlineHighlight>exit</InlineHighlight>, the container stops - and because we used{" "}
          <InlineHighlight>--rm</InlineHighlight>, Docker cleans it up automatically. That's the container lifecycle in one go:
          <Strong> run → interact → stop → disappear</Strong>.
        </Paragraph>

        <SubSectionHeading>Images vs Containers</SubSectionHeading>

        <Paragraph>
          When you typed <InlineHighlight>exit</InlineHighlight>, that shell stopped because the container stopped. That's the first big idea:
          containers are <Strong>temporary</Strong>. They're the running "instance" of something - not the thing itself.
        </Paragraph>

        <Paragraph>
          The "thing itself" is the <Strong>image</Strong>. If a container is a running process, an image is the{" "}
          <Strong>blueprint</Strong> of commands to run when it starts.
        </Paragraph>

        <Paragraph>
          So the relationship is simple:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Image</Strong> = what you <Strong>built</Strong> (a reusable snapshot you can ship)
          </TextListItem>
          <TextListItem>
            <Strong>Container</Strong> = what you <Strong>run</Strong> (a live instance created from an image)
          </TextListItem>
        </TextList>

        <Banner title="Quick Note" variant="info">
          <Paragraph>You'll need to have the alpine container running in a separate
            terminal before running these commands.</Paragraph>
        </Banner>

        <Paragraph>A quick test you can do that will help visualise the difference</Paragraph>

        <CodeBlockWithCopy code={imageVsContainerQuickCheck} />

        <SubSectionHeading>Writing your own Dockerfile</SubSectionHeading>

        <Paragraph>
          Right now we've been borrowing someone else's image (<InlineHighlight>alpine</InlineHighlight>).
          Next, we'll build our own image using a small Node/Express API so the steps stay simple and repeatable.
        </Paragraph>

        <TertiaryHeading>Setup</TertiaryHeading>

        <Paragraph>
          Let's create the environment to build our node API.
        </Paragraph>

        <CodeBlockWithCopy code={createNodeApiFolder} />
        <CodeBlockWithCopy code={npmInitNodeApi} />

        <TertiaryHeading>App files</TertiaryHeading>

        <Carousel
          items={[
            {
              title: "server.js",
              description: "A minimal Express API with /health and /message. It binds to 0.0.0.0 so it's reachable from inside a container.",
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
          A Dockerfile is a recipe. The key move is caching: copy dependency files first, install, then copy your source.
          That way you don't reinstall dependencies every time you change code.
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
          <InlineHighlight>docker build</InlineHighlight> turns the Dockerfile into an image.
          <InlineHighlight>docker run</InlineHighlight> starts a container from that image.
        </Paragraph>

        <CodeBlockWithCopy code={buildNodeApiImage} />
        <CodeBlockWithCopy code={runNodeApiContainer} />

        <Paragraph>
          Hit the same endpoints again - this time you're talking to the container, not your local Node process:
        </Paragraph>

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
          By default, a container lives in its own world. Your API might be running, but your laptop can't talk to it unless you explicitly
          publish a port.
        </Paragraph>

        <TertiaryHeading>Port mapping: host vs container</TertiaryHeading>

        <Paragraph>
          The mental model is simple: <Strong>host:container</Strong>.
          The left side is a port on <Strong>your machine</Strong>. The right side is the port the app listens on <Strong>inside the container</Strong>.
        </Paragraph>

        <CodeBlockWithCopy code={portMappingMentalModel} />

        <Banner title="Common mistake" variant="warning">
          <Paragraph>
            If you forget <InlineHighlight>-p</InlineHighlight>, the container can still be running - but it won't be reachable from your browser or curl.
          </Paragraph>
        </Banner>

        <Paragraph>
          You can sanity-check what's running and whether ports are published with:
        </Paragraph>

        <CodeBlockWithCopy code={findContainerPort} />

        <TertiaryHeading>When a port is already taken</TertiaryHeading>

        <Paragraph>
          If something on your machine already uses 8080, publish a different host port and keep the container port the same.
          This is normal in real projects.
        </Paragraph>

        <CodeBlockWithCopy code={publishDifferentHostPort} />

        <TertiaryHeading>Optional: overriding the internal port</TertiaryHeading>

        <Paragraph>
          You can also change the port the app listens on (inside the container) by setting <InlineHighlight>PORT</InlineHighlight>.
          If you do that, make sure the port mapping matches.
        </Paragraph>

        <CodeBlockWithCopy code={envVarWithPortOverride} />

        <TertiaryHeading>Quick troubleshooting loop</TertiaryHeading>

        <Paragraph>
          If something doesn't respond, don't guess. Check: is it running, what does it log, and does the endpoint respond?
        </Paragraph>

        <CodeBlockWithCopy code={quickTroubleshootPorts} />

        <SubSectionHeading>Make it remember (volumes + bind mounts)</SubSectionHeading>

        <Paragraph>
          Containers are designed to be disposable. That's great - until you realise you need to keep something:
          uploads, database files, logs, cache… anything that shouldn't vanish when the container stops.
        </Paragraph>

        <Paragraph>
          Docker gives you two ways to persist data: <Strong>volumes</Strong> and <Strong>bind mounts</Strong>.
          They look similar, but they're used for different reasons.
        </Paragraph>

        <TertiaryHeading>Give the API something to persist</TertiaryHeading>

        <Paragraph>
          To make the difference obvious, we'll add two tiny endpoints:
          one that appends a line to a file (<InlineHighlight>POST /notes</InlineHighlight>),
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

        <Paragraph>
          Rebuild the image after updating the file:
        </Paragraph>

        <CodeBlockWithCopy code={rebuildNodeApiImage} />

        <TertiaryHeading>What happens without persistence</TertiaryHeading>

        <Paragraph>
          Start the container normally, write a note, read it back, then stop the container and run it again.
          Because we're using <InlineHighlight>--rm</InlineHighlight>, the container is removed - and the file disappears with it.
        </Paragraph>

        <CodeBlockWithCopy code={runNoPersistence} />

        <Banner title="Windows note" variant="info">
          <Paragraph>
            In this post I'm using <Strong>CMD</Strong>. PowerShell has different syntax for HTTP requests.
            If you're using PowerShell, use the PowerShell examples below (Invoke-RestMethod) instead of curl flags like -Method.
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
          Volumes are managed by Docker. You don't care where the files live on disk - Docker handles it.
          This is the normal choice for data you want to persist without wiring your app to your local filesystem layout.
        </Paragraph>

        <CodeBlockWithCopy code={createNamedVolume} />
        <CodeBlockWithCopy code={runWithVolume} />
        <CodeBlockWithCopy code={writeNote} />
        <CodeBlockWithCopy code={readNotes} />

        <Paragraph>
          You can inspect where Docker stores the volume:
        </Paragraph>

        <CodeBlockWithCopy code={inspectVolume} />

        <TertiaryHeading>Option 2: Bind mounts (use your local folder)</TertiaryHeading>

        <Paragraph>
          Bind mounts map a folder from your machine into the container. This is perfect for dev workflows because you can see
          and edit files directly on your host.
        </Paragraph>

        <CodeBlockWithCopy code={runWithBindMount} />
        <CodeBlockWithCopy code={writeNote} />
        <CodeBlockWithCopy code={readNotes} />

        <Banner title="Rule of thumb" variant="info">
          <Paragraph>
            Use <Strong>bind mounts</Strong> for local development loops. Use <Strong>volumes</Strong> when you want Docker-managed persistence.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Make it a system (multi-container + Compose)</SubSectionHeading>
        <Paragraph>
          A real app is rarely one container. Compose becomes the "system definition" - services, networking, ports, environment -
          and a single command to run the whole playground.
        </Paragraph>
        <CodeBlockWithCopy code={composeUp} />
        <CodeBlockWithCopy code={composeDown} />

        <Carousel
          items={[
            {
              title: "compose/compose.yml",
              description: "Your local system contract: services + wiring in one place.",
              code: `# TODO: compose.yml here`,
            },
          ]}
        />

        <SubSectionHeading>Make it shippable (best practices)</SubSectionHeading>
        <Paragraph>
          Once it works, we tidy it: smaller builds, fewer surprises, and (optionally) multi-stage builds.
        </Paragraph>

        <SubSectionHeading>Docker wrap-up</SubSectionHeading>
        <Paragraph>
          Docker is now "done": you can rebuild the playground, run it as a container, run it as a system with Compose,
          and ship the image anywhere.
        </Paragraph>

        <SectionHeading>Kubernetes (managing containerized workloads)</SectionHeading>

        <SubSectionHeading>Why Kubernetes exists</SubSectionHeading>
        <Paragraph>
          Kubernetes doesn't replace Docker fundamentals - it builds on them. You still ship images.
          Kubernetes manages running them declaratively: scheduling, desired state, and stable networking.
        </Paragraph>

        <SubSectionHeading>Set up a local cluster + kubectl</SubSectionHeading>
        <Paragraph>Install the tools and verify cluster access.</Paragraph>
        <CodeBlockWithCopy code={verifyK8s} />

        <SubSectionHeading>Deploy the playground (Deployment)</SubSectionHeading>
        <Paragraph>
          We describe the playground as a Deployment and let Kubernetes converge reality to match.
        </Paragraph>
        <Carousel
          items={[
            {
              title: "k8s/deployment.yaml",
              description: "The playground, declared as desired state.",
              code: `# TODO: deployment.yaml here`,
            },
          ]}
        />

        <SubSectionHeading>Expose the playground (Service)</SubSectionHeading>
        <Paragraph>
          Pods come and go - Services provide stable access.
        </Paragraph>
        <Carousel
          items={[
            {
              title: "k8s/service.yaml",
              description: "Stable access to a moving set of Pods.",
              code: `# TODO: service.yaml here`,
            },
          ]}
        />

        <TertiaryHeading>Apply and observe</TertiaryHeading>
        <CodeBlockWithCopy code={k8sApply} />

        <SubSectionHeading>Configure it properly (ConfigMaps + Secrets)</SubSectionHeading>
        <Paragraph>
          Keep configuration out of images. Use ConfigMaps for non-sensitive config and Secrets for sensitive values.
        </Paragraph>

        <Carousel
          items={[
            { title: "k8s/configmap.yaml", description: "Non-sensitive configuration.", code: `# TODO` },
            { title: "k8s/secret.yaml", description: "Sensitive configuration.", code: `# TODO` },
          ]}
        />

        <SubSectionHeading>The debugging loop</SubSectionHeading>
        <Paragraph>
          Kubernetes becomes manageable when you have a repeatable loop: inspect resources, describe failures, read logs, and check events.
        </Paragraph>
        <CodeBlockWithCopy code={k8sDebugLoop} />

        <SectionHeading>Next steps: a deeper sandbox repo</SectionHeading>

        <Paragraph>
          If you want a bigger playground after this post, here's a follow-up repo that turns these ideas into a mini system you can containerise,
          run with Compose, and later deploy to Kubernetes.
        </Paragraph>

        <Paragraph>
          <TextLink href={playgroundRepo} target="_blank" rel="noreferrer">
            <InlineHighlight>docker-k8s-virtual-shell</InlineHighlight>
          </TextLink>
        </Paragraph>

        <SectionHeading>References (official docs)</SectionHeading>

        <TextList>
          <TextListItem><TextLink href={dockerDocs} target="_blank" rel="noreferrer">Docker Docs</TextLink></TextListItem>
          <TextListItem><TextLink href={k8sDocs} target="_blank" rel="noreferrer">Kubernetes Docs</TextLink></TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default DockerKubernetes;
