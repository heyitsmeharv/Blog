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

// const verifyDocker = `docker version`;
// const helloContainer = `docker run --rm -it alpine sh`;
// const insideContainer = `# inside the container
// ls

// # What OS/users do I see in here?
// cat /etc/os-release
// whoami

// # Am I on my host machine?
// hostname

// # What happens if I exit?
// exit`;
// const imageVsContainerQuickCheck = `docker images    # List images stored locally (your reusable "blueprints")
// docker ps        # List running containers only (what's currently alive)
// docker ps -a     # List all containers, including stopped/exited ones`;

// const createNodeApiFolder = `# CMD / PowerShell
// mkdir node-api
// cd node-api`;

// const npmInitNodeApi = `# initialise Node project
// npm init -y`;

// const nodeApiServer = `// server.js
// import express from "express";

// const app = express();

// const PORT = Number(process.env.PORT || 8080);
// const MESSAGE = process.env.MESSAGE || "API is running";

// app.get("/health", (_req, res) => {
//   res.json({ ok: true });
// });

// app.get("/message", (_req, res) => {
//   res.json({ message: MESSAGE });
// });

// app.listen(PORT, () => {
//   console.log(\`[node-api] listening on http://0.0.0.0:\${PORT}\`);
// });`;

// const nodeApiPackageJson = `{
//   "name": "node-api",
//   "version": "1.0.0",
//   "type": "module",
//   "main": "server.js",
//   "scripts": {
//     "start": "node server.js"
//   },
//   "dependencies": {
//     "express": "^4.19.2"
//   }
// }`;

// const dockerfileNodeApi = `# Dockerfile
// FROM node:20-alpine

// WORKDIR /app

// # Copy dependency manifests first (build caching)
// COPY package*.json ./

// # Install production deps
// RUN npm ci --omit=dev

// # Copy the rest of the app
// COPY . .

// EXPOSE 8080

// CMD ["npm", "start"]`;

// const dockerignoreNodeApi = `# .dockerignore
// node_modules
// npm-debug.log

// .git
// .github
// *.md

// .DS_Store
// Thumbs.db`;

// const runNodeApiLocally = `# run locally first (prove it works before Docker)
// npm i
// npm start`;

// const testNodeApi = `# CMD / PowerShell
// curl http://localhost:8080/health
// curl http://localhost:8080/message`;

// const buildNodeApiImage = `docker build -t node-api:dev .`;
// const runNodeApiContainer = `docker run --rm -p 8080:8080 node-api:dev`;
// const runNodeApiWithEnv = `docker run --rm -p 8080:8080 -e MESSAGE="Configured at runtime" node-api:dev`;

// const portMappingMentalModel = `# Port mapping
// # host (port on YOUR machine):container (port INSIDE the container)
// #
// docker run --rm -p 8080:8080 node-api:dev`;

// const findContainerPort = `# See what ports (if any) are published
// docker ps`;

// const publishDifferentHostPort = `# Useful if 8080 is already taken on your machine
// docker run --rm -p 3000:8080 node-api:dev
// # then:
// curl http://localhost:3000/health`;

// const envVarWithPortOverride = `# You *can* change the internal port, but then your container must listen on it
// # (our server reads PORT)
// docker run --rm -p 9090:9090 -e PORT=9090 node-api:dev
// curl http://localhost:9090/health`;

// const quickTroubleshootPorts = `# Quick troubleshooting loop
// docker ps
// docker logs <container_name_or_id>
// curl http://localhost:8080/health`;

// const nodeApiWithStorage = `// server.js
// import fs from "fs";
// import path from "path";
// import express from "express";

// const app = express();
// app.use(express.json());

// const PORT = Number(process.env.PORT || 8080);
// const MESSAGE = process.env.MESSAGE || "API is running";

// // Where we store data inside the container.
// // We'll mount this path using a volume/bind mount.
// const DATA_DIR = process.env.DATA_DIR || "/data";
// const NOTES_FILE = path.join(DATA_DIR, "notes.txt");

// app.get("/health", (_req, res) => res.json({ ok: true }));
// app.get("/message", (_req, res) => res.json({ message: MESSAGE }));

// app.post("/notes", (req, res) => {
//   const text = String(req.body?.text || "").trim();
//   if (!text) return res.status(400).json({ error: "text is required" });

//   fs.mkdirSync(DATA_DIR, { recursive: true });
//   fs.appendFileSync(NOTES_FILE, text + "\\n", "utf8");

//   res.json({ ok: true, wrote: text });
// });

// app.get("/notes", (_req, res) => {
//   try {
//     const content = fs.readFileSync(NOTES_FILE, "utf8");
//     res.type("text/plain").send(content);
//   } catch {
//     res.type("text/plain").send("");
//   }
// });

// app.listen(PORT, () => {
//   console.log(\`[node-api] listening on http://0.0.0.0:\${PORT}\`);
//   console.log(\`[node-api] data dir: \${DATA_DIR}\`);
// });`;

// const rebuildNodeApiImage = `# from inside node-api/
// docker build -t node-api:dev .`;

// const writeNote = `# CMD (write a note)
// curl -X POST http://localhost:8080/notes ^
//   -H "Content-Type: application/json" ^
//   -d "{\\"text\\":\\"first note from container\\"}"`;

// const readNotes = `# CMD (read notes)
// curl http://localhost:8080/notes`;

// const runNoPersistence = `# No mounts → data disappears when the container is removed
// docker run --rm -p 8080:8080 node-api:dev`;

// const createNamedVolume = `# Create a Docker-managed volume
// docker volume create node-api-data
// docker volume ls`;

// const runWithVolume = `# Named volume → data survives container lifecycles
// docker run --rm -p 8080:8080 -v node-api-data:/data node-api:dev`;

// const runWithBindMount = `# Bind mount → store data on your machine (in this folder)
// # This maps .\\data (host) -> /data (container)
// mkdir data
// docker run --rm -p 8080:8080 -v "%cd%\\data:/data" node-api:dev`;

// const inspectVolume = `# See where Docker stores the volume on your machine
// docker volume inspect node-api-data`;

// const cleanupVolume = `# Remove the volume if you want to reset state
// docker volume rm node-api-data`;

// const nodeApiWithRedis = `// server.js
// import express from "express";
// import { createClient } from "redis";

// const app = express();

// const PORT = Number(process.env.PORT || 8080);
// const MESSAGE = process.env.MESSAGE || "API is running";

// // In Compose, this will be something like: redis://redis:6379
// const REDIS_URL = process.env.REDIS_URL || "";

// let redis = null;

// async function getRedis() {
//   if (!REDIS_URL) return null;

//   if (!redis) {
//     redis = createClient({ url: REDIS_URL });
//     redis.on("error", (err) => console.log("[redis] error", err?.message || err));
//     await redis.connect();
//     console.log("[redis] connected");
//   }

//   return redis;
// }

// app.get("/health", (_req, res) => res.json({ ok: true }));

// app.get("/message", (_req, res) => res.json({ message: MESSAGE }));

// // A tiny "system" demo: shared state via Redis
// app.post("/counter/incr", async (_req, res) => {
//   const client = await getRedis();
//   if (!client) return res.status(503).json({ error: "Redis not configured" });

//   const next = await client.incr("counter");
//   res.json({ counter: Number(next) });
// });

// app.get("/counter", async (_req, res) => {
//   const client = await getRedis();
//   if (!client) return res.status(503).json({ error: "Redis not configured" });

//   const value = await client.get("counter");
//   res.json({ counter: Number(value || 0) });
// });

// app.listen(PORT, () => {
//   console.log(\`[node-api] listening on http://0.0.0.0:\${PORT}\`);
//   console.log(\`[node-api] redis: \${REDIS_URL ? "enabled" : "disabled"}\`);
// });`;

// const installRedisClient = `# from inside node-api/
// npm install redis`;

// const composeNodeApi = `# compose.yml
// services:
//   api:
//     build: .
//     image: node-api:compose
//     ports:
//       - "8080:8080"
//     environment:
//       - MESSAGE=Running via Compose
//       - REDIS_URL=redis://redis:6379
//     depends_on:
//       - redis

//   redis:
//     image: redis:7-alpine
//     volumes:
//       - redis_data:/data

// volumes:
//   redis_data:`;

// const composeUp = `# from inside node-api/
// docker compose up --build`;

// const composeDownWithVolumes = `# removes volumes too (resets Redis state)
// docker compose down -v`;

// const testCounterCmd = `# CMD
// curl -X POST http://localhost:8080/counter/incr
// curl http://localhost:8080/counter`;

// const composePs = `docker compose ps`;
// const composeLogs = `docker compose logs -f --tail 50`;
// const composeDown = `docker compose down`;

// const dockerfileNodeApiShippable = `# Dockerfile

// FROM node:20-alpine

// ENV NODE_ENV=production
// WORKDIR /app

// # Copy dependency manifests first (build caching)
// COPY package*.json ./

// # Install production deps only, in a deterministic way
// RUN npm ci --omit=dev && npm cache clean --force

// # Copy the rest of the source
// COPY . .

// # Run as a non-root user (node image includes a 'node' user)
// USER node

// EXPOSE 8080

// # Run node directly (less overhead than "npm start")
// CMD ["node", "server.js"]`;

// const buildNodeApiProd = `# from inside node-api/
// docker build -t node-api:prod .`;

// const compareImageSizes = `docker images node-api`;
// const inspectImage = `docker inspect node-api:prod`;
// const viewLayers = `docker history node-api:prod`;
// const runNodeApiProd = `docker run --rm -p 8080:8080 node-api:prod`;

// const tagForRegistry = `# Example: tag for pushing (Docker Hub / ECR etc)
// docker tag node-api:prod repo/node-api:1.0.0`;

// const dockerCommands = `docker ps                           # what's running
// docker ps -a                        # what ran (and exited)
// docker images                       # what images you have locally
// docker logs <container>             # what the container printed
// docker exec -it <container> sh      # jump inside a running container (if it has a shell)
// docker inspect <image-or-container> # verify config (ports, env, cmd, user, mounts)`;

// // -------------------- Kubernetes / Minikube commands --------------------
// const verifyK8s = `kubectl version --client`;
// const verifyMinikube = `minikube version`;

// const minikubeCreateCluster = `# Create a local Kubernetes cluster
// minikube start`;

// const minikubeCheckCluster = `# Minikube's view
// minikube status

// # kubectl's view
// kubectl config use-context minikube
// kubectl get nodes
// kubectl get pods -A
// kubectl cluster-info`;

// const createNamespace = `kubectl create namespace demo
// kubectl config set-context --current --namespace=demo`;

// const minikubeBuildNodeApiImage = `# Build the image DIRECTLY into Minikube's container runtime
// # Run this from inside your node-api/ folder (where the Dockerfile is)
// minikube image build -t node-api:dev .`;

// const minikubeListImages = `# Sanity check: is the image inside the cluster runtime?
// minikube image ls`;

// const k8sApplyNodeApiDeployment = `# Create the Deployment
// kubectl apply -f k8s/node-api-deployment.yaml

// # Check: Deployment created + Pod started
// kubectl get deploy
// kubectl get pods -l app=node-api -o wide`;

// const k8sApplyNodeApiService = `# Create the Service (stable endpoint to the Pods)
// kubectl apply -f k8s/node-api-service.yaml

// # Check: Service exists
// kubectl get svc
// kubectl describe svc node-api`;

// const k8sPortForwardNodeApi = `kubectl port-forward svc/node-api 8080:8080`;

// const testNodeApiFromHost = `curl http://localhost:8080/health
// curl http://localhost:8080/message`;

// const minikubeDashboard = `# Opens the Kubernetes dashboard in your browser
// minikube dashboard

// # If you prefer a URL you can copy/paste:
// minikube dashboard --url`;

// const minikubeEnableAddons = `# List available addons
// minikube addons list

// # Enable metrics-server (common + useful)
// minikube addons enable metrics-server

// # Verify it's running in kube-system
// kubectl get pod,svc -n kube-system`;

// const k8sTopIfMetricsServer = `# Once metrics-server is ready, these should work:
// kubectl top nodes
// kubectl top pods -A`;

// const k8sDebugLoop = `kubectl get pods
// kubectl describe pod <pod>
// kubectl logs <pod>
// kubectl get events --sort-by=.metadata.creationTimestamp`;

// // Learn Kubernetes Basics - Explore Your App
// const k8sExploreGetEverything = `# What exists in the current namespace?
// kubectl get all

// # A clearer view for app resources
// kubectl get deploy,rs,pods,svc -o wide`;

// const k8sExploreLabels = `# Labels are the glue (selectors match labels)
// kubectl get pods --show-labels

// # Prove the selector works:
// kubectl get pods -l app=node-api -o wide`;

// const k8sExploreDescribe = `# "describe" explains state + events
// kubectl describe deployment node-api
// kubectl describe pods -l app=node-api`;

// const k8sExploreLogs = `# Logs from the Pod(s) created by the Deployment
// kubectl logs -l app=node-api --tail=50

// # Follow logs live (Ctrl+C to stop)
// kubectl logs -l app=node-api -f`;

// const k8sExploreServiceEndpoints = `# Service config
// kubectl get svc node-api -o yaml

// # Which Pod IPs does the Service point to?
// kubectl get endpoints node-api -o wide`;

// const k8sExploreExec = `# Jump inside a running Pod (like docker exec)
// kubectl get pods -l app=node-api
// kubectl exec -it <pod-name> -- sh

// # inside the pod:
// env | grep -E "MESSAGE|PORT"
// wget -qO- http://localhost:8080/health
// exit`;

// const k8sCleanup = `# Optional: switch your default namespace back to default
// kubectl config set-context --current --namespace=default

// # Delete everything we created in demo
// kubectl delete namespace demo

// # Stop or delete the cluster
// minikube stop
// minikube delete`;

// const k8sDeploymentNodeApi = `# k8s/node-api-deployment.yaml
// apiVersion: apps/v1
// kind: Deployment
// metadata:
//   name: node-api
// spec:
//   replicas: 1
//   selector:
//     matchLabels:
//       app: node-api
//   template:
//     metadata:
//       labels:
//         app: node-api
//     spec:
//       containers:
//         - name: node-api
//           image: node-api:dev
//           imagePullPolicy: IfNotPresent
//           ports:
//             - containerPort: 8080
//           env:
//             - name: MESSAGE
//               value: "Running in Kubernetes"`;

// const k8sServiceNodeApi = `# k8s/node-api-service.yaml
// apiVersion: v1
// kind: Service
// metadata:
//   name: node-api
// spec:
//   selector:
//     app: node-api
//   ports:
//     - name: http
//       port: 8080
//       targetPort: 8080`;

// // -------------------- Core path upgrades (node-api becomes "observable") --------------------
// const nodeApiServerK8sUpgraded = `// server.js (upgrade for Kubernetes learning)
// import os from "os";
// import fs from "fs";
// import express from "express";

// const app = express();
// app.use(express.json());

// const PORT = Number(process.env.PORT || 8080);
// const MESSAGE = process.env.MESSAGE || "API is running";
// const VERSION = process.env.VERSION || "dev";

// // Downward API (set in Deployment)
// const POD_NAME = process.env.POD_NAME || "";
// const POD_IP = process.env.POD_IP || "";

// // Optional: config file mount demo (ConfigMap volume)
// const SETTINGS_PATH = process.env.SETTINGS_PATH || "/etc/node-api/settings.json";

// app.get("/health", (_req, res) => res.json({ ok: true }));

// app.get("/message", (_req, res) => {
//   res.json({ message: MESSAGE, version: VERSION });
// });

// // Make scaling + load balancing visible
// app.get("/identity", (_req, res) => {
//   res.json({
//     hostname: os.hostname(),
//     podName: POD_NAME || os.hostname(),
//     podIP: POD_IP,
//     version: VERSION,
//   });
// });

// // ConfigMap file mount demo (reads file each request so updates become visible)
// app.get("/settings", (_req, res) => {
//   try {
//     const raw = fs.readFileSync(SETTINGS_PATH, "utf8");
//     res.type("application/json").send(raw);
//   } catch (e) {
//     res.status(404).json({ error: "settings file not found", path: SETTINGS_PATH });
//   }
// });

// // Graceful shutdown demo (termination behavior)
// const server = app.listen(PORT, () => {
//   console.log(\`[node-api] listening on http://0.0.0.0:\${PORT}\`);
//   console.log(\`[node-api] version: \${VERSION}\`);
// });

// process.on("SIGTERM", () => {
//   console.log("[node-api] SIGTERM received, draining...");
//   server.close(() => {
//     console.log("[node-api] drained, exiting");
//     process.exit(0);
//   });

//   // Safety net: don't hang forever
//   setTimeout(() => process.exit(1), 15000).unref();
// });`;

// // Deployment upgraded: readiness, graceful termination hooks, downward API
// const k8sDeploymentNodeApiUpgraded = `# k8s/node-api-deployment.yaml
// apiVersion: apps/v1
// kind: Deployment
// metadata:
//   name: node-api
// spec:
//   replicas: 1
//   selector:
//     matchLabels:
//       app: node-api
//   template:
//     metadata:
//       labels:
//         app: node-api
//     spec:
//       terminationGracePeriodSeconds: 30
//       containers:
//         - name: node-api
//           image: node-api:1.0.0
//           imagePullPolicy: IfNotPresent
//           ports:
//             - containerPort: 8080
//           env:
//             - name: MESSAGE
//               value: "Running in Kubernetes"
//             - name: VERSION
//               value: "1.0.0"
//             - name: POD_NAME
//               valueFrom:
//                 fieldRef:
//                   fieldPath: metadata.name
//             - name: POD_IP
//               valueFrom:
//                 fieldRef:
//                   fieldPath: status.podIP
//             - name: SETTINGS_PATH
//               value: "/etc/node-api/settings.json"
//           readinessProbe:
//             httpGet:
//               path: /health
//               port: 8080
//             initialDelaySeconds: 2
//             periodSeconds: 5
//             timeoutSeconds: 2
//           livenessProbe:
//             httpGet:
//               path: /health
//               port: 8080
//             initialDelaySeconds: 10
//             periodSeconds: 10
//           lifecycle:
//             preStop:
//               exec:
//                 command: ["sh", "-c", "sleep 5"]
//           securityContext:
//             allowPrivilegeEscalation: false
//             runAsNonRoot: true
//             capabilities:
//               drop: ["ALL"]
//             seccompProfile:
//               type: RuntimeDefault`;

// // Service types for "Expose publicly"
// const k8sServiceNodeApiClusterIP = `# k8s/node-api-service.yaml
// apiVersion: v1
// kind: Service
// metadata:
//   name: node-api
// spec:
//   type: ClusterIP
//   selector:
//     app: node-api
//   ports:
//     - name: http
//       port: 8080
//       targetPort: 8080`;

// const k8sServiceNodeApiNodePort = `# k8s/node-api-nodeport.yaml
// apiVersion: v1
// kind: Service
// metadata:
//   name: node-api-nodeport
// spec:
//   type: NodePort
//   selector:
//     app: node-api
//   ports:
//     - name: http
//       port: 8080
//       targetPort: 8080
//       # optional: pick a stable port in the NodePort range
//       # nodePort: 30080`;

// const k8sServiceNodeApiLoadBalancer = `# k8s/node-api-loadbalancer.yaml
// apiVersion: v1
// kind: Service
// metadata:
//   name: node-api-lb
// spec:
//   type: LoadBalancer
//   selector:
//     app: node-api
//   ports:
//     - name: http
//       port: 8080
//       targetPort: 8080`;

// // Access patterns in Minikube
// const minikubeServiceUrl = `# Get a reachable URL for a NodePort/LoadBalancer service
// minikube service node-api-nodeport --url`;

// const minikubeTunnel = `# Mimic cloud LoadBalancer behavior (keeps running)
// minikube tunnel
// # in another terminal:
// kubectl get svc node-api-lb -o wide`;

// // Scaling + update commands
// const k8sScaleUp = `kubectl scale deployment/node-api --replicas=3
// kubectl get pods -l app=node-api -o wide`;

// const k8sScaleDown = `kubectl scale deployment/node-api --replicas=1
// kubectl get pods -l app=node-api -o wide`;

// const curlIdentityLoopCmd = `# CMD: hit identity multiple times (you should see different pods when scaled)
// for /L %i in (1,1,10) do @curl -s http://localhost:8080/identity & echo.`;

// const curlIdentityLoopPowerShell = `# PowerShell: hit identity multiple times
// 1..10 | ForEach-Object { (Invoke-WebRequest http://localhost:8080/identity).Content }`;

// const minikubeBuildV100 = `# Build image into Minikube runtime (tagged)
// minikube image build -t node-api:1.0.0 .`;

// const minikubeBuildV101 = `minikube image build -t node-api:1.0.1 .`;

// const k8sRolloutUpdate = `kubectl set image deployment/node-api node-api=node-api:1.0.1
// kubectl rollout status deployment/node-api
// kubectl rollout history deployment/node-api`;

// const k8sRolloutRollback = `kubectl rollout undo deployment/node-api
// kubectl rollout status deployment/node-api`;

// // ConfigMaps
// const k8sConfigMapMessageCmd = `# Create/Update a ConfigMap (idempotent pattern)
// kubectl create configmap node-api-config \\
//   --from-literal=MESSAGE="Hello from ConfigMap" \\
//   -o yaml --dry-run=client | kubectl apply -f -`;

// const k8sDeploymentUseConfigMapSnippet = `# Patch idea: env var from ConfigMap
// # (put this under container.env in your Deployment)
// - name: MESSAGE
//   valueFrom:
//     configMapKeyRef:
//       name: node-api-config
//       key: MESSAGE`;

// const k8sRolloutRestart = `# Env var ConfigMap updates require new Pods to pick up values
// kubectl rollout restart deployment/node-api
// kubectl rollout status deployment/node-api`;

// // ConfigMap file mount demo
// const k8sConfigMapFileCreate = `# Create settings.json locally, then:
// kubectl create configmap node-api-settings \\
//   --from-file=settings.json=./k8s/settings.json \\
//   -o yaml --dry-run=client | kubectl apply -f -`;

// const k8sDeploymentMountConfigMapSnippet = `# Mount ConfigMap as a file (put under container + volumes)
// volumeMounts:
//   - name: settings
//     mountPath: /etc/node-api
// volumes:
//   - name: settings
//     configMap:
//       name: node-api-settings`;

// // Redis via ConfigMap (ties to your Compose storyline)
// const k8sRedisManifests = `# k8s/redis.yaml
// apiVersion: v1
// kind: Service
// metadata:
//   name: redis
// spec:
//   selector:
//     app: redis
//   ports:
//     - port: 6379
//       targetPort: 6379
// ---
// apiVersion: apps/v1
// kind: Deployment
// metadata:
//   name: redis
// spec:
//   replicas: 1
//   selector:
//     matchLabels:
//       app: redis
//   template:
//     metadata:
//       labels:
//         app: redis
//     spec:
//       containers:
//         - name: redis
//           image: redis:7-alpine
//           ports:
//             - containerPort: 6379`;

// const k8sConfigMapRedisUrlCmd = `kubectl create configmap node-api-redis \\
//   --from-literal=REDIS_URL="redis://redis:6379" \\
//   -o yaml --dry-run=client | kubectl apply -f -`;

// // Sidecar mental model
// const k8sSidecarExample = `# k8s/node-api-sidecar.yaml (concept demo)
// apiVersion: v1
// kind: Pod
// metadata:
//   name: node-api-with-sidecar
//   labels:
//     app: node-api-sidecar
// spec:
//   volumes:
//     - name: shared
//       emptyDir: {}
//   containers:
//     - name: app
//       image: node-api:1.0.0
//       imagePullPolicy: IfNotPresent
//       volumeMounts:
//         - name: shared
//           mountPath: /shared
//     - name: sidecar
//       image: busybox:1.36
//       command: ["sh","-c","while true; do echo sidecar-alive $(date) >> /shared/sidecar.log; sleep 2; done"]
//       volumeMounts:
//         - name: shared
//           mountPath: /shared`;

// // Pod Security Standards / PSA (namespace-level)
// const k8sPssNamespaceLabels = `# Apply Pod Security Admission labels to the namespace (safe place to start)
// kubectl label namespace demo pod-security.kubernetes.io/enforce=baseline --overwrite
// kubectl label namespace demo pod-security.kubernetes.io/warn=restricted --overwrite
// kubectl label namespace demo pod-security.kubernetes.io/audit=restricted --overwrite
// kubectl get namespace demo --show-labels`;

// // AppArmor + seccomp
// const k8sSeccompSnippet = `# Container securityContext example (already included in upgraded Deployment)
// securityContext:
//   allowPrivilegeEscalation: false
//   runAsNonRoot: true
//   capabilities:
//     drop: ["ALL"]
//   seccompProfile:
//     type: RuntimeDefault`;

// const k8sAppArmorHighLevel = `# AppArmor is Linux-host specific.
// # Typical flow:
// # 1) Load an AppArmor profile on the node
// # 2) Reference it from the Pod/Container
// #
// # In Minikube, you may need:
// minikube ssh
// # then on the node:
// sudo apparmor_status
// # load a profile (example in the Kubernetes tutorial)
// # exit`;

// // Services deep dive helpers
// const k8sDnsAndEnv = `# Prove Service discovery works (DNS + env vars)
// kubectl run -it --rm netshoot --image=nicolaka/netshoot -- sh

// # inside:
// nslookup redis
// nslookup node-api
// env | grep -i redis
// exit`;

// const k8sWatchEndpoints = `# Watch endpoints change live (great for termination behavior + readiness)
// kubectl get endpoints node-api -w`;

// // Source IP demo concept
// const k8sSourceIpNotes = `# Source IP behavior depends on Service type + kube-proxy behavior.
// # For NodePort/LoadBalancer you can explore externalTrafficPolicy:
// kubectl get svc node-api-nodeport -o yaml
// # Try patching:
// kubectl patch svc node-api-nodeport -p "{\\"spec\\":{\\"externalTrafficPolicy\\":\\"Local\\"}}"`;

// // Stateless / Stateful example entrypoints (short + honest)
// const k8sGuestbookApply = `# Guestbook example (official)
// # (URLs can change over time; use the Kubernetes docs if a file path moves)
// kubectl apply -f https://k8s.io/examples/application/guestbook/redis-leader-deployment.yaml
// kubectl apply -f https://k8s.io/examples/application/guestbook/redis-leader-service.yaml
// kubectl apply -f https://k8s.io/examples/application/guestbook/redis-follower-deployment.yaml
// kubectl apply -f https://k8s.io/examples/application/guestbook/redis-follower-service.yaml
// kubectl apply -f https://k8s.io/examples/application/guestbook/frontend-deployment.yaml
// kubectl apply -f https://k8s.io/examples/application/guestbook/frontend-service.yaml`;

// const k8sStatefulSetBasics = `# k8s/statefulset-basics.yaml (tiny illustration)
// apiVersion: v1
// kind: Service
// metadata:
//   name: web
// spec:
//   clusterIP: None
//   selector:
//     app: web
//   ports:
//     - port: 80
// ---
// apiVersion: apps/v1
// kind: StatefulSet
// metadata:
//   name: web
// spec:
//   serviceName: "web"
//   replicas: 2
//   selector:
//     matchLabels:
//       app: web
//   template:
//     metadata:
//       labels:
//         app: web
//     spec:
//       containers:
//         - name: nginx
//           image: nginx:1.27
//           ports:
//             - containerPort: 80`;

// // Cluster management (namespaces is the best learning-value item here)
// const k8sNamespacesWalkthrough = `kubectl get namespaces
// kubectl create namespace sandbox
// kubectl get all -n sandbox
// kubectl config set-context --current --namespace=sandbox
// kubectl config view --minify | findstr /i namespace
// kubectl config set-context --current --namespace=demo`;

// const k8sSwapNote = `# Kubernetes expects swap off on Linux nodes.
// # Minikube usually handles this for you.
// # On a Linux node (FYI):
// sudo swapoff -a`;

// const k8sDraNote = `# DRA (Device Resource Assignment) is an advanced feature for allocating hardware devices.
// # It's platform/driver dependent - treat it as a later "platform engineering" module.`;

// // Cluster-level PSA (advanced / depends on how cluster is started)
// const minikubeStartWithPodSecurity = `# If you need to explicitly enable PodSecurity admission in Minikube:
// minikube delete
// minikube start --extra-config=apiserver.enable-admission-plugins=PodSecurity`;

const verifyDocker = `docker version`;

const verifyDockerInfo = `docker info`;

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

const containerLifecycleProof = `# Terminal A
docker run --rm -it alpine sh

# Terminal B (while it is running)
docker ps

# Back in Terminal A
exit

# Terminal B (after exit)
docker ps
docker ps -a
docker images alpine`;

const inspectImageVsContainer = `# Inspect the IMAGE (blueprint)
docker image inspect alpine

# Run a container and inspect the CONTAINER (runtime instance)
docker run -d --name alpine-demo alpine sleep 300
docker inspect alpine-demo

# Cleanup
docker rm -f alpine-demo`;

const dockerBuildWithContext = `# Build the image from the current folder (the '.' is the build context)
docker build -t node-api:dev .`;

const inspectNodeApiImage = `# Inspect the built image
docker image inspect node-api:dev`;

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

const runNodeApiContainer = `docker run --rm -p 8080:8080 node-api:dev`;

const testNodeApi = `# CMD / PowerShell
curl http://localhost:8080/health
curl http://localhost:8080/message`;

const runNodeApiWithEnv = `docker run --rm -p 8080:8080 -e MESSAGE="Configured at runtime" node-api:dev`;

const portMappingMentalModel = `# Port mapping
# host (port on YOUR machine):container (port INSIDE the container)

docker run --rm -p 8080:8080 node-api:dev`;

const exposeDoesNotPublish = `# Dockerfile EXPOSE is documentation/metadata.
# It does NOT publish a port to your machine by itself.

# This still won't make the app reachable from your host unless you publish a port:
docker run --rm node-api:dev`;

const inspectPublishedPorts = `# Show running containers and their published ports
docker ps

# Inspect the container config in more detail
docker run -d --name node-api-ports -p 8080:8080 node-api:dev
docker inspect node-api-ports
docker rm -f node-api-ports`;

const publishDifferentHostPort = `# Useful if 8080 is already taken on your machine
docker run --rm -p 3000:8080 node-api:dev
# then:
curl http://localhost:3000/health`;

const envVarWithPortOverride = `# You *can* change the internal port, but then your container must listen on it
# (our server reads PORT)
docker run --rm -p 9090:9090 -e PORT=9090 node-api:dev
curl http://localhost:9090/health`;

const containerReachabilityChecklist = `# Fast reachability checklist
docker ps
curl http://localhost:8080/health
docker logs <container_name_or_id>`;

const quickTroubleshootPorts = `# Quick troubleshooting loop
docker ps
docker logs <container_name_or_id>
curl http://localhost:8080/health`;

const runNoPersistence = `# No mounts → data disappears when the container is removed
docker run --rm -p 8080:8080 node-api:dev`;

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

const createNamedVolume = `# Create a Docker-managed volume
docker volume create node-api-data
docker volume ls`;

const runWithVolume = `# Named volume → data survives container lifecycles
docker run --rm -p 8080:8080 -v node-api-data:/data node-api:dev`;

const inspectVolume = `# See where Docker stores the volume on your machine
docker volume inspect node-api-data`;

const inspectContainerMounts = `# Start a container with a named volume
docker run -d --name node-api-vol-demo -p 8080:8080 -v node-api-data:/data node-api:dev

# Inspect the mounts attached to the container
docker inspect node-api-vol-demo

# Cleanup
docker rm -f node-api-vol-demo`;

const runWithBindMount = `# Bind mount → store data on your machine (in this folder)
# This maps .\\data (host) -> /data (container)
mkdir data
docker run --rm -p 8080:8080 -v "%cd%\\data:/data" node-api:dev`;

const volumeVsBindMountSummary = `# Named volume = Docker-managed storage
docker run --rm -p 8080:8080 -v node-api-data:/data node-api:dev

# Bind mount = your local folder mapped into the container
docker run --rm -p 8080:8080 -v "%cd%\\data:/data" node-api:dev`;

const cleanupVolume = `# Remove the volume if you want to reset state
docker volume rm node-api-data`;

const composeInspect = `# Show the Compose project resources
docker compose ps
docker compose logs -f --tail 50`;

const composeNetworkProof = `# Compose creates a private network for the project.
# Service names become DNS names on that network.

# In this example:
# - api can reach redis at redis://redis:6379
# - your machine reaches only the published api port`;

const composeProjectResources = `# Bring the project up
docker compose up --build

# In another terminal
docker compose ps
docker compose logs -f --tail 50

# Bring it down
docker compose down

# Bring it down AND remove named volumes
docker compose down -v`;

const installRedisClient = `# from inside node-api/
npm install redis`;

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

const testCounterCmd = `# CMD
curl -X POST http://localhost:8080/counter/incr
curl http://localhost:8080/counter`;

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

const runNodeApiProd = `docker run --rm -p 8080:8080 node-api:prod`;

const inspectProdImageConfig = `# Confirm the image metadata and runtime config
docker image inspect node-api:prod`;

const compareImageSizes = `docker images node-api`;

const viewLayers = `docker history node-api:prod`;

const inspectProdRunState = `# Start the production image and inspect the running container
docker run -d --name node-api-prod -p 8080:8080 node-api:prod
docker inspect node-api-prod
docker rm -f node-api-prod`;

const tagForRegistry = `# Example: tag for pushing (Docker Hub / ECR etc)
docker tag node-api:prod repo/node-api:1.0.0`;

const tagSameImageTwice = `# Create another tag pointing at the same image
docker tag node-api:prod node-api:1.0.0

# Show tags and image IDs
docker images node-api`;

const dockerCommands = `docker ps                           # what's running
docker ps -a                        # what ran (and exited)
docker images                       # what images you have locally
docker logs <container>             # what the container printed
docker exec -it <container> sh      # jump inside a running container (if it has a shell)
docker inspect <image-or-container> # verify config (ports, env, cmd, user, mounts)`;

// -------------------------------------- KUBERNETES -------------------------------------------------

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

const k8sNamespaceCheck = `# Confirm which namespace kubectl is using
kubectl config view --minify --output "jsonpath={..namespace}"`;

const minikubeBuildNodeApiImage = `# Build the image DIRECTLY into Minikube's container runtime
# Run this from inside your node-api/ folder (where the Dockerfile is)
minikube image build -t node-api:dev .`;

const minikubeListImages = `# Sanity check: is the image inside the cluster runtime?
minikube image ls`;

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

const k8sApplyNodeApiDeployment = `# Create the Deployment
kubectl apply -f k8s/node-api-deployment.yaml

# Check: Deployment created + Pod started
kubectl get deploy
kubectl get pods -l app=node-api -o wide`;

const k8sDeployChainProof = `# After applying a Deployment, inspect the chain it creates
kubectl get deploy,rs,pods -o wide`;

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

const k8sApplyNodeApiService = `# Create the Service (stable endpoint to the Pods)
kubectl apply -f k8s/node-api-service.yaml

# Check: Service exists
kubectl get svc
kubectl describe svc node-api`;

const k8sServiceProof = `# After applying a Service, inspect both the Service and its endpoints
kubectl get svc,endpoints node-api -o wide`;

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

const k8sExploreGetEverything = `# What exists in the current namespace?
kubectl get all

# A clearer view for app resources
kubectl get deploy,rs,pods,svc -o wide`;

const k8sGetWide = `# A fuller view of the main objects
kubectl get deploy,rs,pods,svc,endpoints -o wide`;

const k8sExploreDescribe = `# "describe" explains state + events
kubectl describe deployment node-api
kubectl describe pods -l app=node-api`;

const k8sExploreLabels = `# Labels are the glue (selectors match labels)
kubectl get pods --show-labels

# Prove the selector works:
kubectl get pods -l app=node-api -o wide`;

const k8sExploreServiceEndpoints = `# Service config
kubectl get svc node-api -o yaml

# Which Pod IPs does the Service point to?
kubectl get endpoints node-api -o wide`;

const k8sDescribeService = `# Read the Service like a routing rule
kubectl describe svc node-api`;

const k8sExploreLogs = `# Logs from the Pod(s) created by the Deployment selected by the label
kubectl logs -l app=node-api --tail=50

# Follow logs live (Ctrl+C to stop)
kubectl logs -l app=node-api -f`;

const k8sExecChecks = `# Find the Pod name first
kubectl get pods -l app=node-api

# Then open a shell inside it
kubectl exec -it <pod-name> -- sh

# inside the Pod:
hostname
env | grep -E "MESSAGE|PORT"
wget -qO- http://localhost:8080/health
wget -qO- http://localhost:8080/message
exit`;

const k8sBrokenSelectorExercise = `# Edit the Service selector to something that matches nothing, then re-apply
kubectl apply -f k8s/node-api-service.yaml

# Now inspect the result
kubectl get svc,endpoints node-api -o wide
kubectl describe svc node-api`;

const k8sDebugLoop = `kubectl get pods
kubectl describe pod <pod>
kubectl logs <pod>
kubectl get events --sort-by=.metadata.creationTimestamp`;

const k8sServiceNodeApiNodePort = `# k8s/node-api-nodeport.yaml
apiVersion: v1
kind: Service
metadata:
  name: node-api-nodeport
spec:
  type: NodePort
  selector:
    app: node-api
  ports:
    - name: http
      port: 8080
      targetPort: 8080`;

const k8sServiceNodeApiLoadBalancer = `# k8s/node-api-loadbalancer.yaml
apiVersion: v1
kind: Service
metadata:
  name: node-api-lb
spec:
  type: LoadBalancer
  selector:
    app: node-api
  ports:
    - name: http
      port: 8080
      targetPort: 8080`;

const k8sApplyNodePortService = `kubectl apply -f k8s/node-api-nodeport.yaml
kubectl get svc node-api-nodeport -o wide`;

const k8sApplyLoadBalancerService = `kubectl apply -f k8s/node-api-loadbalancer.yaml
kubectl get svc node-api-lb -o wide`;

const minikubeServiceUrl = `# Get a reachable URL for the NodePort service
minikube service node-api-nodeport --url --namespace=demo`;

const minikubeTunnel = `# Keep this running in a separate terminal
minikube tunnel

# In another terminal, inspect the LoadBalancer service
kubectl get svc node-api-lb -o wide`;

const k8sDeleteExposeServices = `kubectl delete svc node-api-nodeport
kubectl delete svc node-api-lb`;

const k8sPortForwardVsService = `# Port-forward is a temporary tunnel from your machine into the cluster
kubectl port-forward svc/node-api 8080:8080

# NodePort / LoadBalancer are cluster-level exposure mechanisms
kubectl get svc -o wide`;

const k8sScaleUp = `# Scale from 1 replica to 3
kubectl scale deployment/node-api --replicas=3
kubectl get deploy,pods -l app=node-api -o wide`;

const k8sScaleDown = `# Scale back down to 1 replica
kubectl scale deployment/node-api --replicas=1
kubectl get deploy,pods -l app=node-api -o wide`;

const nodeApiServerWithIdentity = `// server.js
import os from "os";
import express from "express";

const app = express();

const PORT = Number(process.env.PORT || 8080);
const MESSAGE = process.env.MESSAGE || "API is running";
const VERSION = process.env.VERSION || "dev";

// These can be supplied later by Kubernetes via env vars.
// If they are missing, we fall back to sensible defaults.
const POD_NAME = process.env.POD_NAME || os.hostname();
const POD_IP = process.env.POD_IP || "";

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/message", (_req, res) => {
  res.json({ message: MESSAGE, version: VERSION });
});

app.get("/identity", (_req, res) => {
  res.json({
    podName: POD_NAME,
    podIP: POD_IP,
    hostname: os.hostname(),
    version: VERSION,
  });
});

app.listen(PORT, () => {
  console.log(\`[node-api] listening on http://0.0.0.0:\${PORT}\`);
});`;

const k8sScaleWatch = `# Watch the Pods change as scaling happens
kubectl get pods -l app=node-api -w`;

const k8sScaleServiceEndpoints = `# Watch which Pod IPs the Service can route to
kubectl get endpoints node-api -w`;

const k8sIdentityLoopCmd = `# CMD: hit the app several times and compare responses
for /L %i in (1,1,8) do @curl -s http://localhost:8080/identity & echo.`;

const k8sScaleExplain = `# Inspect desired vs current state
kubectl get deployment node-api -o yaml`;

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
          This post is a hands-on path through Docker first, then Kubernetes.
          The goal is to understand what changes on your machine when you build an image, run a container, publish a port, or wire services together.
        </Paragraph>

        <SectionHeading>What Docker actually does</SectionHeading>

        <Paragraph>
          Docker lets you run software as a <Strong>process</Strong> with an isolated view of the world: its own filesystem,
          its own network namespace, and a controlled set of resources. It's not a VM - you're not booting an OS - you're starting a process
          with a different "view" of the host.
        </Paragraph>

        <Paragraph>
          You'll hear two words constantly:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Image</Strong> - a packaged filesystem + metadata that describes how to start something (a reusable blueprint).
          </TextListItem>
          <TextListItem>
            <Strong>Container</Strong> - a running instance created from an image (a process with isolation + a writable layer).
          </TextListItem>
        </TextList>

        <Paragraph>
          A useful way to think about it is: images are <Strong>artifacts</Strong> you build and ship; containers are <Strong>runtime</Strong> instances you start and stop.
        </Paragraph>

        <SectionHeading>Install, Setup and Configure</SectionHeading>

        <SubSectionHeading>Set up Docker</SubSectionHeading>

        <Paragraph>
          Install Docker using the{" "}
          <TextLink href={dockerInstallation} target="_blank" rel="noreferrer">
            official docs
          </TextLink>
          , then verify the CLI can talk to the Docker Engine.
        </Paragraph>

        <Banner title="Warning" variant="warning">
          <Paragraph>
            I'll be running commands in CMD and PowerShell. Some copy/paste examples won't work in other terminals.
          </Paragraph>
        </Banner>

        <Paragraph>
          First: check version output. Second: check the engine details (runtime, storage driver, etc). If both work, you're ready.
        </Paragraph>

        <CodeBlockWithCopy code={verifyDocker} />
        <CodeBlockWithCopy code={verifyDockerInfo} />

        <Carousel
          items={[
            {
              title: "Docker CLI",
              description:
                "If you can see both Client and Server versions, your CLI is talking to the engine.",
              src: dockerCliPng,
              alt: "Terminal showing docker version output",
            },
            {
              title: "Docker Desktop GUI",
              description:
                "Docker Desktop is just the UI layer. The important part is the engine underneath (containers/images/logs live there).",
              src: dockerDesktopPng,
              alt: "Docker Desktop showing the Docker engine running and containers/images list",
            },
          ]}
        />

        <SubSectionHeading>Meet the container</SubSectionHeading>

        <Paragraph>
          Before we containerise our own app, we'll run a tiny Linux image and drop into a shell.
          This is the simplest way to see what a container is: a process with an isolated filesystem + hostname + networking.
        </Paragraph>

        <Paragraph>
          Run this to start an Alpine Linux container and open a shell inside it:
        </Paragraph>

        <CodeBlockWithCopy code={helloContainer} />

        <TertiaryHeading>What the command is really doing</TertiaryHeading>

        <TextList>
          <TextListItem>
            <InlineHighlight>docker run</InlineHighlight> creates a container from an image and starts it.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>alpine</InlineHighlight> is the image (a minimal Linux distribution).
          </TextListItem>
          <TextListItem>
            <InlineHighlight>sh</InlineHighlight> is the process that runs inside the container (the shell).
          </TextListItem>
          <TextListItem>
            <InlineHighlight>-it</InlineHighlight> attaches your terminal so it behaves like an interactive shell.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>--rm</InlineHighlight> deletes the container metadata when the process exits (the image remains).
          </TextListItem>
        </TextList>

        <Paragraph>
          Once you're inside the container, run these. The output is the lesson:
        </Paragraph>

        <CodeBlockWithCopy code={insideContainer} />

        <Paragraph>
          What you should notice:
        </Paragraph>

        <TextList>
          <TextListItem>
            The filesystem is tiny and looks like a "fresh machine", but it starts instantly because nothing is booting.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>hostname</InlineHighlight> shows you're in a different namespace than your host.
          </TextListItem>
          <TextListItem>
            When the shell exits, the container stops - because the container's lifetime is tied to the main process you started.
          </TextListItem>
        </TextList>

        <Carousel
          items={[
            {
              title: "alpine sh",
              description: "A shell running inside a container (a process with an isolated view).",
              src: alpineShellPng,
              alt: "Alpine shell running inside a Docker container",
            },
          ]}
        />

        <TertiaryHeading>Prove the lifecycle</TertiaryHeading>

        <Paragraph>
          This is a quick observation loop: start a container, see it running, exit, then confirm it disappeared because of <InlineHighlight>--rm</InlineHighlight>.
        </Paragraph>

        <CodeBlockWithCopy code={containerLifecycleProof} />

        <SubSectionHeading>Images vs Containers</SubSectionHeading>

        <Paragraph>
          This is the distinction that makes the rest of Docker make sense:
        </Paragraph>

        <TextList>
          <TextListItem>
            An <Strong>image</Strong> is a stored artifact. You build it once, tag it, and reuse it.
          </TextListItem>
          <TextListItem>
            A <Strong>container</Strong> is what happens when you start the image. It has a writable layer and a running process.
          </TextListItem>
        </TextList>

        <Paragraph>
          A simple rule: if you delete a container, you haven't deleted the image. If you delete the image tag, you haven't necessarily deleted the underlying layers
          if another tag still points to them.
        </Paragraph>

        <Paragraph>
          You can verify the difference by inspecting each one:
        </Paragraph>

        <CodeBlockWithCopy code={inspectImageVsContainer} />

        <Banner title="Observation" variant="info">
          <Paragraph>
            If you ran containers with <InlineHighlight>--rm</InlineHighlight>, they won't show up in <InlineHighlight>docker ps -a</InlineHighlight>.
            That's not Docker "hiding" them - you told Docker to remove them when they stop.
          </Paragraph>
        </Banner>

        <Paragraph>
          Next we'll build our own image so we control the filesystem, the dependencies, and the startup command - and we'll keep using this same idea:
          images are what you build, containers are what you run.
        </Paragraph>

        <SubSectionHeading>Writing your own Dockerfile</SubSectionHeading>

        <Paragraph>
          So far we've been running somebody else's image. Now we'll build our own so we control three important things:
        </Paragraph>

        <TextList>
          <TextListItem>
            the <Strong>filesystem</Strong> the app runs with
          </TextListItem>
          <TextListItem>
            the <Strong>dependencies</Strong> installed inside that filesystem
          </TextListItem>
          <TextListItem>
            the <Strong>startup command</Strong> used when the container begins
          </TextListItem>
        </TextList>

        <Paragraph>
          This is where Docker starts becoming useful rather than just interesting. Instead of depending on whatever happens to be installed on your machine,
          you describe the runtime environment in a Dockerfile and turn that into a reusable image.
        </Paragraph>

        <TertiaryHeading>Step 1: Create a tiny app worth containerising</TertiaryHeading>

        <Paragraph>
          We'll use a very small Node/Express API so the moving parts stay obvious. It has just enough surface area to teach the important bits:
          a server process, a port, and a response we can verify.
        </Paragraph>

        <CodeBlockWithCopy code={createNodeApiFolder} />
        <CodeBlockWithCopy code={npmInitNodeApi} />

        <Carousel
          items={[
            {
              title: "server.js",
              description:
                "A minimal API with /health and /message. The important detail is that it listens on 0.0.0.0, which makes it reachable from outside the container.",
              code: nodeApiServer,
            },
            {
              title: "package.json",
              description:
                "A simple start command and one dependency. Keeping this boring is useful - it makes Docker behaviour easier to see.",
              code: nodeApiPackageJson,
            },
          ]}
        />

        <TertiaryHeading>Step 2: Prove the app works before Docker is involved</TertiaryHeading>

        <Paragraph>
          This matters more than people think. If the app doesn't work locally first, Docker just adds another layer of confusion.
          Always separate "my app is broken" from "my container setup is broken".
        </Paragraph>

        <CodeBlockWithCopy code={runNodeApiLocally} />
        <CodeBlockWithCopy code={testNodeApi} />

        <Carousel
          items={[
            {
              title: "Node API Test",
              description: "Before Docker enters the picture, prove the app responds locally.",
              src: nodeApiTestPng,
            },
          ]}
        />

        <Banner title="What this proves" variant="info">
          <Paragraph>
            At this point you know Node, Express, your routes, and your port are all fine on the host.
            If the container later fails, the problem is likely in the container boundary - not the app logic itself.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Step 3: Describe the runtime in a Dockerfile</TertiaryHeading>

        <Paragraph>
          A Dockerfile is not "Docker magic" - it's just a recipe for building an image layer by layer.
          Each instruction changes the image filesystem or metadata, and Docker can cache those steps to avoid unnecessary rebuilds.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "Dockerfile",
              description:
                "Base image → working directory → install dependencies → copy app code → expose a port → define the startup command.",
              code: dockerfileNodeApi,
            },
            {
              title: ".dockerignore",
              description:
                "The build context is whatever you send to Docker. .dockerignore stops you sending junk like node_modules, Git metadata, and editor noise.",
              code: dockerignoreNodeApi,
            },
          ]}
        />

        <Paragraph>
          The order of instructions matters. We copy <InlineHighlight>package.json</InlineHighlight> first and install dependencies before copying the rest of the source
          because dependency installs are expensive and app code changes more often.
        </Paragraph>

        <Paragraph>
          That means Docker can often reuse the cached dependency layer when only your application code changes.
        </Paragraph>

        <TertiaryHeading>Step 4: Build the image</TertiaryHeading>

        <Paragraph>
          Building turns the Dockerfile into an image stored on your machine. The final dot matters - it means "use this folder as the build context".
        </Paragraph>

        <CodeBlockWithCopy code={dockerBuildWithContext} />

        <Paragraph>
          Once the build finishes, you now have a reusable image called <InlineHighlight>node-api:dev</InlineHighlight>.
          Nothing is running yet - you've created an artifact, not started a process.
        </Paragraph>

        <CodeBlockWithCopy code={inspectNodeApiImage} />

        <Banner title="Important distinction" variant="info">
          <Paragraph>
            <Strong>docker build</Strong> creates an image. <Strong>docker run</Strong> starts a container from that image.
            Mixing those two ideas up is where a lot of Docker confusion starts.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Step 5: Run the image as a container</TertiaryHeading>

        <Paragraph>
          Now we take the stored image and start a container from it. This launches the Node process inside the isolated filesystem created from the image.
        </Paragraph>

        <CodeBlockWithCopy code={runNodeApiContainer} />

        <Paragraph>
          The port mapping is the key part here: <InlineHighlight>8080:8080</InlineHighlight> means "listen on port 8080 on my machine,
          and forward that traffic to port 8080 inside the container".
        </Paragraph>

        <Paragraph>
          Test the same endpoints again:
        </Paragraph>

        <CodeBlockWithCopy code={testNodeApi} />

        <Paragraph>
          The responses look the same as before, but the execution environment is different now:
        </Paragraph>

        <TextList>
          <TextListItem>
            the process is running <Strong>inside the container</Strong>, not directly on your host
          </TextListItem>
          <TextListItem>
            the dependencies came from the <Strong>image build</Strong>, not your host machine's state
          </TextListItem>
          <TextListItem>
            the container only becomes reachable because you explicitly <Strong>published a port</Strong>
          </TextListItem>
        </TextList>

        <Paragraph>In both cases, you're running the same app code. The difference is where the process gets its filesystem, dependencies, and startup config from.</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Local process</Strong> - npm start
          </TextListItem>
          <TextListItem>
            <Strong>Containerised process</Strong> - docker run --rm -p 8080:8080 node-api:dev
          </TextListItem>
        </TextList>

        <Banner title="What changed - and what didn't" variant="warning">
          <Paragraph>
            The application code did not suddenly become different because of Docker. What changed is the runtime boundary:
            filesystem, startup command, dependency installation, and network exposure are now described by the image/container setup rather than assumed from your machine.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Configuration without rebuilding (environment variables)</TertiaryHeading>

        <Paragraph>
          One of the main benefits of containers is that you can build the application image once, then change its behaviour at runtime
          without rebuilding it. That is the job of environment variables.
        </Paragraph>

        <Paragraph>
          This is an important separation:
        </Paragraph>

        <TextList>
          <TextListItem>
            the <Strong>image</Strong> contains the application code and runtime dependencies
          </TextListItem>
          <TextListItem>
            the <Strong>container</Strong> supplies environment-specific configuration when it starts
          </TextListItem>
        </TextList>

        <Paragraph>
          In our API, the <InlineHighlight>MESSAGE</InlineHighlight> value is read from{" "}
          <InlineHighlight>process.env.MESSAGE</InlineHighlight>. That means the code stays the same, but the container can behave differently
          depending on how you start it.
        </Paragraph>

        <CodeBlockWithCopy code={runNodeApiWithEnv} />

        <Paragraph>
          Hit the <InlineHighlight>/message</InlineHighlight> route again and the response changes - not because the image changed,
          but because the container started with different configuration.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "Override at runtime",
              description: "The same image can return a different message because configuration is supplied when the container starts.",
              src: dockerEnvVarsPng,
            },
          ]}
        />

        <Banner title="Why this matters" variant="info">
          <Paragraph>
            This is the container pattern you'll keep using later in Compose, Kubernetes, and cloud platforms:
            <Strong> build once, configure per environment</Strong>.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Make it reachable (ports + networking)</SubSectionHeading>

        <Paragraph>
          At this point the app is running inside a container, but that does not automatically make it reachable from your machine.
          Containers have their own network namespace, so Docker has to explicitly forward traffic from the host into the container.
        </Paragraph>

        <TertiaryHeading>Host port vs container port</TertiaryHeading>

        <Paragraph>
          The syntax is:
        </Paragraph>

        <CodeBlockWithCopy code={portMappingMentalModel} />

        <Paragraph>
          Read it left to right:
        </Paragraph>

        <TextList>
          <TextListItem>
            the <Strong>left side</Strong> is the port on <Strong>your machine</Strong>
          </TextListItem>
          <TextListItem>
            the <Strong>right side</Strong> is the port the app listens on <Strong>inside the container</Strong>
          </TextListItem>
        </TextList>

        <Paragraph>
          So <InlineHighlight>-p 8080:8080</InlineHighlight> means: "listen on port 8080 on my host, and forward that traffic to port 8080 in the container".
        </Paragraph>

        <Banner title="Important distinction" variant="warning">
          <Paragraph>
            <InlineHighlight>EXPOSE 8080</InlineHighlight> in the Dockerfile does <Strong>not</Strong> publish the port to your machine.
            It is image metadata - useful documentation, but not the thing that opens host access.
          </Paragraph>
        </Banner>

        <CodeBlockWithCopy code={exposeDoesNotPublish} />

        <TertiaryHeading>Why 0.0.0.0 matters</TertiaryHeading>

        <Paragraph>
          There's a subtle but important detail in your <InlineHighlight>server.js</InlineHighlight>: the app listens on{" "}
          <InlineHighlight>0.0.0.0</InlineHighlight>, not <InlineHighlight>localhost</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          Inside a container, <InlineHighlight>localhost</InlineHighlight> means "only accept connections from inside this container".
          If your app binds to <InlineHighlight>127.0.0.1</InlineHighlight>, Docker can publish the port on the host and it still won't be reachable from outside.
        </Paragraph>

        <Paragraph>
          Binding to <InlineHighlight>0.0.0.0</InlineHighlight> means "listen on all interfaces inside the container", which allows the published port to work.
        </Paragraph>

        <TertiaryHeading>Prove which ports are published</TertiaryHeading>

        <Paragraph>
          If you're unsure whether Docker is actually forwarding traffic, inspect the running container rather than guessing.
        </Paragraph>

        <CodeBlockWithCopy code={inspectPublishedPorts} />

        <Paragraph>
          The useful habit here is simple:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>docker ps</InlineHighlight> tells you whether the container is running and which host ports are published
          </TextListItem>
          <TextListItem>
            <InlineHighlight>curl</InlineHighlight> tells you whether the application is actually responding
          </TextListItem>
          <TextListItem>
            <InlineHighlight>docker logs</InlineHighlight> tells you what the process inside the container thinks is happening
          </TextListItem>
        </TextList>

        <TertiaryHeading>When the host port changes</TertiaryHeading>

        <Paragraph>
          The host port and container port do not have to match. This is useful when the host port you want is already in use.
        </Paragraph>

        <CodeBlockWithCopy code={publishDifferentHostPort} />

        <Paragraph>
          Here the application still listens on port <InlineHighlight>8080</InlineHighlight> inside the container.
          Only the <Strong>host-side entry point</Strong> changed.
        </Paragraph>

        <TertiaryHeading>When the container port changes</TertiaryHeading>

        <Paragraph>
          You can also change the port the app listens on inside the container, but then the mapping must match that new internal port.
        </Paragraph>

        <CodeBlockWithCopy code={envVarWithPortOverride} />

        <Paragraph>
          This works because your server reads <InlineHighlight>PORT</InlineHighlight> from the environment.
          If the app ignored that variable and kept listening on 8080, the container would still start - but the published port would point at the wrong place.
        </Paragraph>

        <Banner title="A common failure pattern" variant="warning">
          <Paragraph>
            "My container is running but the app doesn't respond" usually comes down to one of three things:
            the app is listening on the wrong internal port, the host port was never published, or the app is bound to localhost inside the container.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Fast troubleshooting loop</TertiaryHeading>

        <Paragraph>
          When the app is unreachable, avoid random changes. Check the runtime state in this order:
        </Paragraph>

        <CodeBlockWithCopy code={containerReachabilityChecklist} />

        <Paragraph>
          If the container is <Strong>not running</Strong>, check the startup logs. If it <Strong>is running</Strong> but the route fails,
          compare the published host port with the internal app port, then confirm the app is listening on <InlineHighlight>0.0.0.0</InlineHighlight>.
        </Paragraph>

        <CodeBlockWithCopy code={quickTroubleshootPorts} />

        <SubSectionHeading>Make it remember (volumes + bind mounts)</SubSectionHeading>

        <Paragraph>
          Containers are designed to be disposable. That's a feature, not a flaw - but it also means you need to be very clear about
          <Strong> where data lives</Strong>.
        </Paragraph>

        <Paragraph>
          By default, when a process inside a container writes to disk, it writes into the container's <Strong>writable layer</Strong>.
          That writable layer belongs to that specific container instance. If the container is removed, that layer disappears with it.
        </Paragraph>

        <Paragraph>
          That is why "my app worked until I restarted the container" is such a common Docker problem. The process restarted, but the data was never stored anywhere persistent.
        </Paragraph>

        <TertiaryHeading>Step 1: Give the API something to persist</TertiaryHeading>

        <Paragraph>
          To make persistence visible, we'll extend the API with two endpoints:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>POST /notes</InlineHighlight> appends a line to a file
          </TextListItem>
          <TextListItem>
            <InlineHighlight>GET /notes</InlineHighlight> reads the file back
          </TextListItem>
        </TextList>

        <Paragraph>
          The important detail is that the file is written to <InlineHighlight>/data/notes.txt</InlineHighlight>.
          That gives us a single path we can leave unmanaged, attach to a volume, or map to a host folder.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "server.js (storage endpoints)",
              description:
                "The API now writes to /data/notes.txt so we can see exactly what survives container removal and what does not.",
              code: nodeApiWithStorage,
            },
          ]}
        />

        <Paragraph>Rebuild the image after changing the app:</Paragraph>

        <CodeBlockWithCopy code={rebuildNodeApiImage} />

        <TertiaryHeading>Step 2: Observe the default behaviour (no persistence)</TertiaryHeading>

        <Paragraph>
          First, do nothing special. Run the container normally, write a note, read it back, then stop the container and start it again.
        </Paragraph>

        <CodeBlockWithCopy code={runNoPersistence} />

        <Banner title="Windows note" variant="info">
          <Paragraph>
            I'm using <Strong>CMD</Strong> syntax for the request examples. PowerShell uses different HTTP request syntax, so adjust accordingly if you're not in CMD.
          </Paragraph>
        </Banner>

        <CodeBlockWithCopy code={writeNote} />
        <CodeBlockWithCopy code={readNotes} />

        <Carousel
          items={[
            {
              title: "Playing with data",
              description: "You can write notes and read them back while this container instance exists.",
              src: nodeApiNotesPng,
            },
          ]}
        />

        <Paragraph>
          Now stop the container, run it again, and hit <InlineHighlight>/notes</InlineHighlight> one more time.
          The file will be gone.
        </Paragraph>

        <Banner title="Why the note disappeared" variant="warning">
          <Paragraph>
            The file was written into the container's writable layer. Because you ran the container with <InlineHighlight>--rm</InlineHighlight>,
            Docker removed the container - and its writable layer - when it stopped.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Option 1: Named volumes (Docker-managed persistence)</TertiaryHeading>

        <Paragraph>
          A <Strong>named volume</Strong> moves the important data out of the container's writable layer and into storage that Docker manages separately.
          The container can come and go; the volume remains.
        </Paragraph>

        <Paragraph>
          This is usually the right choice when you want persistence but don't care exactly where the files live on your machine.
          Databases are the classic example.
        </Paragraph>

        <CodeBlockWithCopy code={createNamedVolume} />

        <Paragraph>
          Now run the API again, but mount the named volume at <InlineHighlight>/data</InlineHighlight>:
        </Paragraph>

        <CodeBlockWithCopy code={runWithVolume} />
        <CodeBlockWithCopy code={writeNote} />
        <CodeBlockWithCopy code={readNotes} />

        <Paragraph>
          Stop the container, run it again with the same volume, and read the notes back. This time the file survives because it was written into the volume, not the container layer.
        </Paragraph>

        <CodeBlockWithCopy code={inspectVolume} />

        <Paragraph>
          You can also inspect the container and see that the mount exists:
        </Paragraph>

        <CodeBlockWithCopy code={inspectContainerMounts} />

        <Banner title="What changed" variant="info">
          <Paragraph>
            The app still writes to <InlineHighlight>/data/notes.txt</InlineHighlight>. The difference is that <InlineHighlight>/data</InlineHighlight>
            is no longer ordinary container storage - it is backed by a volume that lives independently of the container.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Option 2: Bind mounts (use your local filesystem directly)</TertiaryHeading>

        <Paragraph>
          A <Strong>bind mount</Strong> maps a real folder from your machine into the container. Instead of Docker managing the storage location,
          <Strong> you</Strong> choose it.
        </Paragraph>

        <Paragraph>
          This is especially useful in development because you can inspect the files directly on your host, edit them, back them up, or delete them without going through Docker.
        </Paragraph>

        <CodeBlockWithCopy code={runWithBindMount} />
        <CodeBlockWithCopy code={writeNote} />
        <CodeBlockWithCopy code={readNotes} />

        <Paragraph>
          If you open the local <InlineHighlight>data</InlineHighlight> folder on your machine, you should see the file appear there.
          The container and your host are now both looking at the same underlying directory.
        </Paragraph>

        <CodeBlockWithCopy code={volumeVsBindMountSummary} />

        <TertiaryHeading>Which one should you use?</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Named volume</Strong> - use when you want Docker-managed persistence and don't need to care about the exact host path.
          </TextListItem>
          <TextListItem>
            <Strong>Bind mount</Strong> - use when you want the container to work directly against files on your machine.
          </TextListItem>
        </TextList>

        <Paragraph>
          They solve similar problems, but they are not interchangeable in intent:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            volumes are better for <Strong>runtime data</Strong>
          </IndentedTextListItem>
          <IndentedTextListItem>
            bind mounts are better for <Strong>development workflows</Strong>
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Resetting state</TertiaryHeading>

        <Paragraph>
          If you want to deliberately wipe the named volume and start fresh, remove it. The next container run will create it again.
        </Paragraph>

        <CodeBlockWithCopy code={cleanupVolume} />

        <Banner title="Key distinction" variant="warning">
          <Paragraph>
            Containers are disposable. Volumes are not. That separation is exactly what makes containers safe to replace without losing important state.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Make it a system (multi-container + Compose)</SubSectionHeading>

        <Paragraph>
          Up to now, we've been running one container at a time. That's useful for learning, but it's not how most real applications are structured.
          Usually you have several cooperating processes: an API, a database, a cache, maybe a worker.
        </Paragraph>

        <Paragraph>
          Docker Compose is a way to describe that <Strong>whole local system</Strong> in one file:
          which services exist, which images they use, which ports are published, which environment variables they receive,
          which volumes they mount, and which networks they share.
        </Paragraph>

        <TertiaryHeading>Why we're adding Redis</TertiaryHeading>

        <Paragraph>
          Redis gives us a clean way to show that one container can depend on another without dragging in a full database setup.
          The API will increment and read a counter, but the actual state will live in Redis.
        </Paragraph>

        <Paragraph>
          That means we'll be proving something important: the API container is not "remembering" the counter itself.
          It is talking to another service over the network.
        </Paragraph>

        <TertiaryHeading>Step 1: Extend the API so it can use Redis</TertiaryHeading>

        <Paragraph>
          The app now reads <InlineHighlight>REDIS_URL</InlineHighlight>. If that variable is missing, Redis behaviour is disabled.
          If it is present, the API connects to Redis and uses it as shared state.
        </Paragraph>

        <CodeBlockWithCopy code={installRedisClient} />

        <Carousel
          items={[
            {
              title: "server.js (Compose version)",
              description:
                "The API gains /counter and /counter/incr. Redis becomes an external dependency supplied at runtime via REDIS_URL.",
              code: nodeApiWithRedis,
            },
          ]}
        />

        <Paragraph>
          Rebuild the image so the Redis client dependency is included:
        </Paragraph>

        <CodeBlockWithCopy code={rebuildNodeApiImage} />

        <Banner title="What changed" variant="info">
          <Paragraph>
            The app is no longer just "a Node process responding to HTTP". It is now a process that may depend on another service being reachable.
            That is the beginning of system-level behaviour.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Step 2: Describe the system in compose.yml</TertiaryHeading>

        <Paragraph>
          This is the big shift. Instead of starting containers one by one with long <InlineHighlight>docker run</InlineHighlight> commands,
          we describe the whole setup declaratively in a single Compose file.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "compose.yml",
              description:
                "Two services, one private network, one named volume. The API gets configuration at startup and Redis persists its own data.",
              code: composeNodeApi,
            },
          ]}
        />

        <Paragraph>
          Read the file as a system description:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>api</Strong> is built from the current folder and publishes port 8080 to your machine
          </TextListItem>
          <TextListItem>
            <Strong>redis</Strong> runs from an existing Redis image and stores its data in a named volume
          </TextListItem>
          <TextListItem>
            both services are attached to the same project network automatically
          </TextListItem>
        </TextList>

        <CodeBlockWithCopy code={composeNetworkProof} />

        <TertiaryHeading>Why the hostname is just 'redis'</TertiaryHeading>

        <Paragraph>
          Compose creates a private network for the project and gives each service a DNS name that matches its service name.
          That is why the API can connect using <InlineHighlight>redis://redis:6379</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          There is no magic here: the hostname <InlineHighlight>redis</InlineHighlight> works because both containers are on the same Compose network.
          Your laptop is not resolving that name - the containers are.
        </Paragraph>

        <TertiaryHeading>Step 3: Start the whole system</TertiaryHeading>

        <Paragraph>
          Now start both services together:
        </Paragraph>

        <CodeBlockWithCopy code={composeUp} />

        <Paragraph>
          Once the project is up, inspect what Compose created:
        </Paragraph>

        <CodeBlockWithCopy code={composeInspect} />

        <Paragraph>
          In another terminal, hit the counter endpoints:
        </Paragraph>

        <CodeBlockWithCopy code={testCounterCmd} />

        <Carousel
          items={[
            {
              title: "Recording data with Redis",
              description:
                "The API increments a counter, but the state actually lives in Redis. That is why the value survives API restarts.",
              src: nodeApiRedisPng,
            },
          ]}
        />

        <Paragraph>
          What you've just proved:
        </Paragraph>

        <TextList>
          <TextListItem>
            the API container is serving HTTP
          </TextListItem>
          <TextListItem>
            the API can resolve and reach the Redis container by service name
          </TextListItem>
          <TextListItem>
            the counter value lives outside the API process, so it behaves like shared state
          </TextListItem>
        </TextList>

        <Banner title="A useful note" variant="info">
          <Paragraph>
            Notice that only the API publishes a host port. Redis does not need to be reachable from your machine to do its job.
            It only needs to be reachable from the API inside the project network.
          </Paragraph>
        </Banner>

        <TertiaryHeading>What depends_on does - and what it does not do</TertiaryHeading>

        <Paragraph>
          The <InlineHighlight>depends_on</InlineHighlight> line is helpful, but it is often misunderstood.
          It controls startup order, not application readiness. It does NOT guarantee that Redis is fully ready to accept connections.
          That means the API may still need retry logic or reconnection logic if Redis takes a moment to become ready.
        </Paragraph>

        <Paragraph>
          In other words: Compose can start the Redis container before the API container, but that does not guarantee Redis is fully ready at the exact moment the API first tries to connect.
        </Paragraph>

        <Paragraph>
          In simple demos this is often fine. In real systems, the application usually also needs retry or reconnect logic.
        </Paragraph>

        <TertiaryHeading>Useful Compose commands</TertiaryHeading>

        <Paragraph>
          These are the commands that matter most when you're trying to understand what Compose actually created:
        </Paragraph>

        <CodeBlockWithCopy code={composeProjectResources} />

        <Paragraph>
          Use them to answer:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            Which services are running?
          </IndentedTextListItem>
          <IndentedTextListItem>
            Which ports are published to the host?
          </IndentedTextListItem>
          <IndentedTextListItem>
            What is each process logging?
          </IndentedTextListItem>
          <IndentedTextListItem>
            Did the project create named volumes that will preserve state?
          </IndentedTextListItem>
        </IndentedTextList>

        <Banner title="Why Compose matters" variant="info">
          <Paragraph>
            Compose is not just a shorter way to type <InlineHighlight>docker run</InlineHighlight>.
            It is a way to describe a repeatable local environment where multiple services, networks, and volumes come up together with predictable names and wiring.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Moving to Production</SubSectionHeading>

        <Paragraph>
          Getting a container to run is only the beginning. A production image should be predictable, small enough to move around efficiently,
          safe enough to run with sensible defaults, and simple enough to inspect when something looks wrong.
        </Paragraph>

        <Paragraph>
          In practice, that usually means improving five things:
        </Paragraph>

        <TextList>
          <TextListItem>
            how dependencies are installed
          </TextListItem>
          <TextListItem>
            what environment defaults are set
          </TextListItem>
          <TextListItem>
            which user the process runs as
          </TextListItem>
          <TextListItem>
            how much unnecessary data ends up in the image
          </TextListItem>
          <TextListItem>
            how the final artifact is tagged and reasoned about
          </TextListItem>
        </TextList>

        <TertiaryHeading>What we are improving</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Deterministic installs</Strong> - <InlineHighlight>npm ci</InlineHighlight> uses the lockfile and avoids the "it worked differently on another machine" problem.
          </TextListItem>
          <TextListItem>
            <Strong>Production defaults</Strong> - <InlineHighlight>NODE_ENV=production</InlineHighlight> makes the runtime intent explicit.
          </TextListItem>
          <TextListItem>
            <Strong>Smaller attack surface</Strong> - running as a non-root user reduces the damage a compromised process can do.
          </TextListItem>
          <TextListItem>
            <Strong>Cleaner layers</Strong> - fewer unnecessary files means faster pulls, less storage, and easier inspection.
          </TextListItem>
          <TextListItem>
            <Strong>Simpler startup</Strong> - running Node directly removes an unnecessary layer between Docker and your application process.
          </TextListItem>
        </TextList>

        <Paragraph>
          None of these changes alter what the app does. They improve how confidently you can build, move, run, and inspect it.
        </Paragraph>

        <TertiaryHeading>Production Dockerfile</TertiaryHeading>

        <Paragraph>
          This version keeps the same app behaviour, but makes the image more disciplined:
        </Paragraph>

        <Carousel
          items={[
            {
              title: "Dockerfile (production)",
              description:
                "Deterministic installs, production defaults, non-root runtime, and a direct startup command.",
              code: dockerfileNodeApiShippable,
            },
          ]}
        />

        <Paragraph>
          A few details are worth calling out explicitly:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            <InlineHighlight>npm ci</InlineHighlight> is for repeatable installs from the lockfile
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>--omit=dev</InlineHighlight> keeps development-only dependencies out of the runtime image
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>USER node</InlineHighlight> means the application no longer runs as root
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>CMD ["node", "server.js"]</InlineHighlight> makes the application process the container's main process directly
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Build the production image</TertiaryHeading>

        <Paragraph>
          Build a separate tag for the production-style image:
        </Paragraph>

        <CodeBlockWithCopy code={buildNodeApiProd} />

        <Paragraph>
          At this point you now have a second image tag: one for local/dev learning and one for a more production-oriented build.
          The important distinction is that a <Strong>tag</Strong> is just a human-friendly pointer to an image ID.
        </Paragraph>

        <TertiaryHeading>Run it and verify the behaviour</TertiaryHeading>

        <Paragraph>
          The app should behave the same at the HTTP level. What changed is the quality of the runtime package, not the route responses.
        </Paragraph>

        <CodeBlockWithCopy code={runNodeApiProd} />
        <CodeBlockWithCopy code={testNodeApi} />

        <Banner title="What production means here" variant="info">
          <Paragraph>
            "Production" in this section does not mean "ready for the public internet on its own".
            It means the image itself is built with cleaner runtime defaults and is easier to reason about as a deployable artifact.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Inspect the image instead of trusting it</TertiaryHeading>

        <Paragraph>
          A useful habit is to stop treating images like black boxes. Docker gives you enough metadata to confirm what is actually inside and how it is expected to run.
        </Paragraph>

        <Paragraph>
          Start with image-level metadata:
        </Paragraph>

        <CodeBlockWithCopy code={inspectProdImageConfig} />

        <Paragraph>
          This tells you things like:
        </Paragraph>

        <TextList>
          <TextListItem>
            the default user
          </TextListItem>
          <TextListItem>
            the startup command
          </TextListItem>
          <TextListItem>
            the configured environment variables
          </TextListItem>
          <TextListItem>
            the exposed port metadata
          </TextListItem>
        </TextList>

        <Paragraph>
          Then compare the image tags and look at the layer history:
        </Paragraph>

        <CodeBlockWithCopy code={compareImageSizes} />
        <CodeBlockWithCopy code={viewLayers} />

        <Paragraph>
          The history output shows how the image was assembled. If an image grows unexpectedly, this is often the fastest way to see whether the cause is:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            copying too much source into the image
          </IndentedTextListItem>
          <IndentedTextListItem>
            leaving cache files behind
          </IndentedTextListItem>
          <IndentedTextListItem>
            installing more dependencies than you intended
          </IndentedTextListItem>
        </IndentedTextList>

        <Banner title="Why layer history matters" variant="warning">
          <Paragraph>
            Image size problems are usually build-logic problems. <InlineHighlight>docker history</InlineHighlight> shows you where that logic added weight.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Inspect the running container as well</TertiaryHeading>

        <Paragraph>
          Image metadata tells you what Docker <Strong>plans</Strong> to run. Container inspection tells you what is actually running right now.
        </Paragraph>

        <CodeBlockWithCopy code={inspectProdRunState} />

        <Paragraph>
          That distinction becomes important later when you start injecting runtime configuration, mounting volumes, or overriding commands.
        </Paragraph>

        <TertiaryHeading>Tagging (what a tag actually is)</TertiaryHeading>

        <Paragraph>
          Shipping usually means pushing an image to a registry such as Docker Hub, GHCR, or ECR.
          Tags are how you give that artifact meaningful names.
        </Paragraph>

        <CodeBlockWithCopy code={tagForRegistry} />

        <Paragraph>
          The important thing to understand is that tagging does <Strong>not</Strong> create a second copy of the image layers.
          It creates another label pointing at the same image ID.
        </Paragraph>

        <CodeBlockWithCopy code={tagSameImageTwice} />

        <Paragraph>
          That is why one image can have multiple tags:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            <InlineHighlight>node-api:prod</InlineHighlight> for a human-friendly local name
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>node-api:1.0.0</InlineHighlight> for a versioned local tag
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>repo/node-api:1.0.0</InlineHighlight> for a registry-ready push target
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          You should now be able to see those tags in Docker Desktop or in the CLI:
        </Paragraph>

        <Carousel
          items={[
            {
              title: "Tags via Docker Desktop",
              description: "Multiple tags can point at the same underlying image.",
              src: dockerTaggingPng,
            },
            {
              title: "Tags via CLI",
              description: "docker images shows tags alongside the image ID they reference.",
              src: dockerTaggingCliPng,
            },
          ]}
        />

        <TertiaryHeading>Container lifecycle: docker run vs docker compose</TertiaryHeading>

        <Paragraph>
          One final distinction matters here because it affects how you stop and manage the container later.
        </Paragraph>

        <Paragraph>
          If you start the production image like this:
        </Paragraph>

        <CodeBlockWithCopy code={runNodeApiProd} />

        <Paragraph>
          then Docker creates a plain container outside of any Compose project. That means <InlineHighlight>docker compose down</InlineHighlight>
          will not stop or remove it, because Compose only manages containers it created itself.
        </Paragraph>

        <Banner title="Why this catches people out" variant="warning">
          <Paragraph>
            <InlineHighlight>docker run</InlineHighlight> and <InlineHighlight>docker compose up</InlineHighlight> can both start containers,
            but they do not create the same management boundary. A Compose project has its own resources, names, and lifecycle.
          </Paragraph>
        </Banner>

        <Paragraph>
          That does not make <InlineHighlight>docker run</InlineHighlight> wrong - it just means you should be clear whether you are testing an image directly
          or managing a multi-service application through Compose.
        </Paragraph>

        <SubSectionHeading>Docker wrap-up</SubSectionHeading>

        <Paragraph>
          At this point, Docker should feel less like a list of commands and more like a way of reasoning about runtime boundaries.
          You've built images, started containers, published ports, injected configuration, persisted data, and described a small multi-service system with Compose.
        </Paragraph>

        <Paragraph>
          More importantly, each of those actions changed something specific:
        </Paragraph>

        <TextList>
          <TextListItem>
            building an <Strong>artifact</Strong> you can reuse
          </TextListItem>
          <TextListItem>
            running a <Strong>process</Strong> from that artifact
          </TextListItem>
          <TextListItem>
            publishing a port creating a <Strong>host-to-container network path</Strong>
          </TextListItem>
          <TextListItem>
            mounting storage showing <Strong>where data lives</Strong>
          </TextListItem>
          <TextListItem>
            Compose described a <Strong>whole local system</Strong>, not just one container
          </TextListItem>
        </TextList>

        <TertiaryHeading>What you should now be able to explain</TertiaryHeading>

        <IndentedTextList>
          <IndentedTextListItem>
            why an image and a container are not the same thing
          </IndentedTextListItem>
          <IndentedTextListItem>
            why an app can be running in a container but still unreachable
          </IndentedTextListItem>
          <IndentedTextListItem>
            why data disappears by default unless you mount storage explicitly
          </IndentedTextListItem>
          <IndentedTextListItem>
            why Compose makes service-to-service networking easier to reason about
          </IndentedTextListItem>
          <IndentedTextListItem>
            why a production image is more than "the same image with a different tag"
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Useful commands</TertiaryHeading>

        <CodeBlockWithCopy code={dockerCommands} />

        <Paragraph>
          A useful habit is to map each command to the kind of problem it solves:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            <InlineHighlight>docker ps</InlineHighlight> - what is actually running?
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>docker logs</InlineHighlight> - what does the process think is happening?
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>docker inspect</InlineHighlight> - what config, ports, env vars, mounts, and entrypoint does Docker see?
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>docker exec</InlineHighlight> - what does the world look like from inside the container?
          </IndentedTextListItem>
        </IndentedTextList>

        <Banner title="The useful question" variant="info">
          <Paragraph>
            When something fails, avoid asking "which command do I try next?". Ask "what boundary is involved here - process, network, filesystem, or configuration?".
            That usually tells you where to inspect first.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Where Docker stops</TertiaryHeading>

        <Paragraph>
          Docker solves packaging and local runtime really well. It gives you a repeatable way to build an application and run it as isolated processes.
          But it does not, by itself, answer the next set of questions:
        </Paragraph>

        <TextList>
          <TextListItem>
            what keeps the app running if the process dies?
          </TextListItem>
          <TextListItem>
            how do multiple copies of the app get managed?
          </TextListItem>
          <TextListItem>
            how does traffic get routed to healthy instances only?
          </TextListItem>
          <TextListItem>
            how do updates happen without taking everything down at once?
          </TextListItem>
          <TextListItem>
            what happens when the app is no longer on just one machine?
          </TextListItem>
        </TextList>

        <Paragraph>
          That is the gap Kubernetes is designed to fill.
        </Paragraph>

        <SectionHeading>Kubernetes (what it adds on top of containers)</SectionHeading>

        <Paragraph>
          Kubernetes does not replace containers. It assumes you already have them.
          The image you built with Docker is still the thing that runs - Kubernetes is the system that decides <Strong>where</Strong> it runs,
          <Strong> how many copies</Strong> exist, <Strong>how they are exposed</Strong>, and <Strong>what should happen when reality drifts from what you declared</Strong>.
        </Paragraph>

        <Paragraph>
          The shift in thinking is this: with Docker, you often say "run this container".
          With Kubernetes, you declare something closer to "I want one healthy copy of this application available behind a stable endpoint",
          and Kubernetes keeps working until that becomes true.
        </Paragraph>

        <TertiaryHeading>What Kubernetes is really managing</TertiaryHeading>

        <Paragraph>
          Under the hood, Kubernetes is constantly reconciling desired state against actual state.
          That sounds abstract, but in practice it means:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            if a Pod dies, something notices and creates another one
          </IndentedTextListItem>
          <IndentedTextListItem>
            if you ask for three replicas instead of one, Kubernetes works to make three exist
          </IndentedTextListItem>
          <IndentedTextListItem>
            if a Pod is not healthy, it should stop receiving traffic
          </IndentedTextListItem>
          <IndentedTextListItem>
            if you update an image, Kubernetes can roll that change out gradually rather than all at once
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>The core objects we'll keep coming back to</TertiaryHeading>

        <TextList>
          <TextListItem>
            <Strong>Pod</Strong> - the smallest unit Kubernetes runs; usually one main container, sometimes more
          </TextListItem>
          <TextListItem>
            <Strong>Deployment</Strong> - manages Pods for stateless applications and keeps the requested number running
          </TextListItem>
          <TextListItem>
            <Strong>Service</Strong> - provides a stable network identity for a changing set of Pods
          </TextListItem>
          <TextListItem>
            <Strong>ConfigMap</Strong> - supplies non-secret configuration
          </TextListItem>
          <TextListItem>
            <Strong>Secret</Strong> - supplies sensitive configuration
          </TextListItem>
        </TextList>

        <Paragraph>
          If Docker taught you how to package and run one process well, Kubernetes is the layer that turns those processes into a managed application.
        </Paragraph>

        <Banner title="What we are trying to learn next" variant="warning">
          <Paragraph>
            The goal is not to memorise more YAML. It is to understand what Kubernetes creates in response to what you declare,
            how those pieces relate to each other, and where to look when the outcome is not what you expected.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Hello Minikube (local Kubernetes cluster)</SubSectionHeading>

        <Paragraph>
          Before we can learn Kubernetes properly, we need a cluster to point at. Minikube gives you that locally:
          a small single-node Kubernetes environment running on your machine so you can work through the same ideas you would use in a larger cluster.
        </Paragraph>

        <Paragraph>
          There are two tools involved here, and they do different jobs:
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href={k8sKubectl} target="_blank" rel="noreferrer">
              kubectl
            </TextLink> is the client. It sends requests to the Kubernetes API.
          </TextListItem>
          <TextListItem>
            <TextLink href={k8sMinikube} target="_blank" rel="noreferrer">
              Minikube
            </TextLink> creates and runs the local cluster that receives those requests.
          </TextListItem>
        </TextList>

        <Paragraph>
          That distinction matters. <InlineHighlight>kubectl</InlineHighlight> does not "run Kubernetes" - it talks to a cluster that already exists.
        </Paragraph>

        <TertiaryHeading>Step 1: Check the tools exist</TertiaryHeading>

        <Paragraph>
          First confirm the client is installed, then confirm Minikube is installed. At this point we are only proving the tools exist - not that the cluster is running yet.
        </Paragraph>

        <CodeBlockWithCopy code={verifyK8s} />
        <CodeBlockWithCopy code={verifyMinikube} />

        <Banner title="What this proves" variant="info">
          <Paragraph>
            If these commands work, your machine has the Kubernetes client and the local cluster runtime available.
            The next step is creating a cluster for them to work against.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Step 2: Create the cluster</TertiaryHeading>

        <Paragraph>
          This starts a local Kubernetes cluster. In Minikube terms, you can think of this as bringing up a small environment that includes
          the control plane and a worker node all packaged for local use.
        </Paragraph>

        <CodeBlockWithCopy code={minikubeCreateCluster} />

        <Paragraph>
          Once that finishes, Kubernetes now has somewhere to store objects like Deployments and Services.
          Before this point, there was nothing for <InlineHighlight>kubectl</InlineHighlight> to talk to.
        </Paragraph>

        <TertiaryHeading>Step 3: Check cluster health from two angles</TertiaryHeading>

        <Paragraph>
          We now verify the cluster from two perspectives:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            <Strong>Minikube's view</Strong> - is the local cluster process up?
          </IndentedTextListItem>
          <IndentedTextListItem>
            <Strong>Kubernetes' view</Strong> - does the API respond, and does the node look healthy?
          </IndentedTextListItem>
        </IndentedTextList>

        <CodeBlockWithCopy code={minikubeCheckCluster} />

        <Paragraph>
          The most important signals here are:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>minikube status</InlineHighlight> tells you whether the local cluster runtime is up
          </TextListItem>
          <TextListItem>
            <InlineHighlight>kubectl get nodes</InlineHighlight> tells you whether Kubernetes sees a node it can schedule onto
          </TextListItem>
          <TextListItem>
            <InlineHighlight>kubectl get pods -A</InlineHighlight> shows system Pods already running in the cluster
          </TextListItem>
        </TextList>

        <Paragraph>
          Those system Pods are useful proof that Kubernetes is already doing work before your application exists.
        </Paragraph>

        <TertiaryHeading>Step 4: Use a namespace on purpose</TertiaryHeading>

        <Paragraph>
          A namespace is a logical boundary inside the cluster. It helps separate one set of resources from another.
          We'll use a <InlineHighlight>demo</InlineHighlight> namespace so the objects for this post stay grouped together.
        </Paragraph>

        <CodeBlockWithCopy code={createNamespace} />
        <CodeBlockWithCopy code={k8sNamespaceCheck} />

        <Banner title="Why this matters" variant="info">
          <Paragraph>
            Namespace mistakes are one of the easiest ways to confuse yourself in Kubernetes.
            If something seems to have disappeared, check whether you are looking in the right namespace before assuming it was deleted.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Step 5: Make the image available to the cluster</TertiaryHeading>

        <Paragraph>
          This is the first place where Kubernetes feels different from plain Docker.
          Your cluster has its own container runtime, so the image you built on your host is not automatically visible inside the cluster.
        </Paragraph>

        <Paragraph>
          That is why we build the image directly into Minikube:
        </Paragraph>

        <CodeBlockWithCopy code={minikubeBuildNodeApiImage} />
        <CodeBlockWithCopy code={minikubeListImages} />

        <Paragraph>
          The important change here is not "the image got rebuilt". The important change is: the cluster can now see a tag called{" "}
          <InlineHighlight>node-api:dev</InlineHighlight> and is able to start Pods from it.
        </Paragraph>

        <TertiaryHeading>Step 6: Create a Deployment</TertiaryHeading>

        <Paragraph>
          A Deployment does not run containers directly. It declares how many copies of an application you want and which Pod template should be used.
          Kubernetes then works backwards from that declaration.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "k8s/node-api-deployment.yaml",
              description:
                "This declares the desired application state: one replica, one image, one label set, one container port.",
              code: k8sDeploymentNodeApi,
            },
          ]}
        />

        <Paragraph>
          Apply the Deployment:
        </Paragraph>

        <CodeBlockWithCopy code={k8sApplyNodeApiDeployment} />

        <Paragraph>
          What should happen after that?
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            the Deployment object is stored by the API server
          </IndentedTextListItem>
          <IndentedTextListItem>
            the Deployment controller creates a ReplicaSet
          </IndentedTextListItem>
          <IndentedTextListItem>
            the ReplicaSet creates a Pod
          </IndentedTextListItem>
          <IndentedTextListItem>
            the scheduler places that Pod on the node
          </IndentedTextListItem>
          <IndentedTextListItem>
            the kubelet starts the container on that node
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          You can prove that chain instead of just assuming it happened:
        </Paragraph>

        <CodeBlockWithCopy code={k8sDeployChainProof} />

        <Banner title="What to look for" variant="warning">
          <Paragraph>
            If you see a Deployment but no Pod, the problem is somewhere between the controller and the scheduler.
            If you see a Pod but it is not ready, the problem is usually image pull, startup, or application health.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Step 7: Create a Service</TertiaryHeading>

        <Paragraph>
          Pods are replaceable. Their IPs are not meant to be your stable access point.
          A Service solves that by giving you one stable name and one stable virtual IP that points at whichever Pods match its selector.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "k8s/node-api-service.yaml",
              description:
                "The Service does not 'know' about the Deployment. It finds Pods by label and forwards traffic to them.",
              code: k8sServiceNodeApi,
            },
          ]}
        />

        <CodeBlockWithCopy code={k8sApplyNodeApiService} />

        <Paragraph>
          The most important idea here is that Services do not attach to Deployments directly. They attach to <Strong>Pods via labels</Strong>.
          That is why selectors matter so much later on.
        </Paragraph>

        <CodeBlockWithCopy code={k8sServiceProof} />

        <Paragraph>
          If the Service exists but the endpoints list is empty, the Service itself is not the problem.
          It means the selector matched nothing useful.
        </Paragraph>

        <TertiaryHeading>Step 8: Reach the Service from your machine</TertiaryHeading>

        <Paragraph>
          Right now the Service is internal to the cluster. To test it locally, we use port-forwarding.
          This creates a temporary path from your machine into that Service without changing the Service type.
        </Paragraph>

        <CodeBlockWithCopy code={k8sPortForwardNodeApi} />
        <CodeBlockWithCopy code={testNodeApiFromHost} />

        <Paragraph>
          At this point, the request path is:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            your browser or curl sends traffic to localhost:8080
          </IndentedTextListItem>
          <IndentedTextListItem>
            kubectl port-forward carries that traffic into the cluster
          </IndentedTextListItem>
          <IndentedTextListItem>
            the Service receives it
          </IndentedTextListItem>
          <IndentedTextListItem>
            the Service forwards it to a matching Pod
          </IndentedTextListItem>
          <IndentedTextListItem>
            the container inside that Pod answers the request
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Step 9: Look at the cluster through the dashboard</TertiaryHeading>

        <Paragraph>
          The dashboard is useful because it lets you see the same objects visually: Deployments, ReplicaSets, Pods, Services, and their status.
          It is not a replacement for <InlineHighlight>kubectl</InlineHighlight>, but it can help you connect the names and relationships more quickly.
        </Paragraph>

        <CodeBlockWithCopy code={minikubeDashboard} />

        <TertiaryHeading>Step 10: Enable metrics</TertiaryHeading>

        <Paragraph>
          Addons are optional cluster features. We'll enable the metrics server so the cluster can report resource usage back through the API.
        </Paragraph>

        <CodeBlockWithCopy code={minikubeEnableAddons} />

        <Paragraph>
          Once it is ready, these commands start telling you how much CPU and memory the node and Pods are using:
        </Paragraph>

        <CodeBlockWithCopy code={k8sTopIfMetricsServer} />

        <Banner title="What changed" variant="info">
          <Paragraph>
            Before the addon, the cluster could run workloads but had no metrics API available for <InlineHighlight>kubectl top</InlineHighlight>.
            After the addon is running, resource usage becomes another signal you can inspect.
          </Paragraph>
        </Banner>

        <SectionHeading>Understanding Kubernetes (what you just created)</SectionHeading>

        <Paragraph>
          At this point, the cluster is no longer empty. You have created application objects, and Kubernetes has reacted by creating more objects on your behalf.
          This is the part that matters most: if you can explain what now exists and how those pieces connect, you stop treating Kubernetes as a black box.
        </Paragraph>

        <Paragraph>
          The easiest mistake to make is thinking "I created a Deployment, so Kubernetes ran my app".
          That skips the interesting part. A Deployment is only the starting point.
        </Paragraph>

        <SubSectionHeading>Explore Your App</SubSectionHeading>

        <TertiaryHeading>Step 1: List what exists</TertiaryHeading>

        <Paragraph>
          Start by listing the main resources in the namespace. This gives you the shape of the system before you zoom in on any one object.
        </Paragraph>

        <CodeBlockWithCopy code={k8sExploreGetEverything} />
        <CodeBlockWithCopy code={k8sGetWide} />

        <Paragraph>
          What you should expect to see:
        </Paragraph>

        <TextList>
          <TextListItem>
            a <Strong>Deployment</Strong> describing the desired application state
          </TextListItem>
          <TextListItem>
            a <Strong>ReplicaSet</Strong> created by that Deployment
          </TextListItem>
          <TextListItem>
            one or more <Strong>Pods</Strong> created by the ReplicaSet
          </TextListItem>
          <TextListItem>
            a <Strong>Service</Strong> providing a stable network entry point
          </TextListItem>
          <TextListItem>
            <Strong>endpoints</Strong> showing which Pod IPs the Service can currently send traffic to
          </TextListItem>
        </TextList>

        <TertiaryHeading>Step 2: Follow the ownership chain</TertiaryHeading>

        <Paragraph>
          Kubernetes objects are often connected by responsibility:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            the <Strong>Deployment</Strong> owns the rollout strategy and replica intent
          </IndentedTextListItem>
          <IndentedTextListItem>
            the <Strong>ReplicaSet</Strong> owns the current set of matching Pods
          </IndentedTextListItem>
          <IndentedTextListItem>
            the <Strong>Pod</Strong> is where the container actually runs
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          That is why a Pod disappearing is not automatically a problem. If the Deployment still wants one replica, Kubernetes will create another Pod to replace it.
        </Paragraph>

        <CodeBlockWithCopy code={k8sExploreDescribe} />

        <Paragraph>
          When you run <InlineHighlight>describe</InlineHighlight>, you are reading the object's current state plus the recent events that shaped it.
          This is usually more useful than staring at YAML once the resource already exists.
        </Paragraph>

        <Banner title="What to notice" variant="info">
          <Paragraph>
            In the Deployment description, look for the selector and the Pod template. In the Pod description, look for container state, restart count,
            image name, IP address, and the events at the bottom.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Step 3: Labels are how objects find each other</TertiaryHeading>

        <Paragraph>
          Kubernetes does not wire the Service to the Deployment by name. It wires things together through labels and selectors.
          That is one of the most important ideas in the whole platform.
        </Paragraph>

        <CodeBlockWithCopy code={k8sExploreLabels} />

        <Paragraph>
          In this example:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            the Pod has a label such as <InlineHighlight>app=node-api</InlineHighlight>
          </IndentedTextListItem>
          <IndentedTextListItem>
            the Service selector says "send traffic to Pods with <InlineHighlight>app=node-api</InlineHighlight>"
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          If those two do not line up, the Service still exists - but it has nowhere useful to send traffic.
        </Paragraph>

        <TertiaryHeading>Step 4: Read the Service as a routing rule</TertiaryHeading>

        <Paragraph>
          A Service is best understood as "stable address + selector + port mapping".
          It does not run code. It points traffic at Pods that match its selector and are ready to receive requests.
        </Paragraph>

        <CodeBlockWithCopy code={k8sExploreServiceEndpoints} />
        <CodeBlockWithCopy code={k8sDescribeService} />

        <Paragraph>
          The crucial output here is the endpoints list.
        </Paragraph>

        <TextList>
          <TextListItem>
            If endpoints are present, the Service has at least one Pod it can route to.
          </TextListItem>
          <TextListItem>
            If endpoints are empty, either the selector matched nothing, the Pods are not ready, or you are looking in the wrong namespace.
          </TextListItem>
        </TextList>

        <Banner title="Useful distinction" variant="warning">
          <Paragraph>
            A Service existing is not proof that routing works. Endpoints are the proof.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Step 5: Read logs from the application, not just object status</TertiaryHeading>

        <Paragraph>
          Kubernetes object state tells you whether something exists and what condition it is in. Application logs tell you what the process itself is experiencing.
        </Paragraph>

        <CodeBlockWithCopy code={k8sExploreLogs} />

        <Paragraph>
          This distinction matters:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            <InlineHighlight>kubectl get</InlineHighlight> answers "what exists?"
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>kubectl describe</InlineHighlight> answers "why is it in this state?"
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>kubectl logs</InlineHighlight> answers "what is the process actually doing?"
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Step 6: Inspect the world from inside the Pod</TertiaryHeading>

        <Paragraph>
          Sometimes the best way to stop guessing is to step inside the Pod and inspect what the application can see from its own point of view.
          This is the Kubernetes equivalent of <InlineHighlight>docker exec</InlineHighlight>.
        </Paragraph>

        <CodeBlockWithCopy code={k8sExecChecks} />

        <Paragraph>
          Inside the Pod, you are checking three things:
        </Paragraph>

        <TextList>
          <TextListItem>
            the container really started
          </TextListItem>
          <TextListItem>
            the expected environment variables are present
          </TextListItem>
          <TextListItem>
            the application responds on localhost from inside its own container
          </TextListItem>
        </TextList>

        <Paragraph>
          That helps separate "the app is broken" from "networking into the app is broken".
        </Paragraph>

        <TertiaryHeading>Step 7: Break one thing on purpose</TertiaryHeading>

        <Paragraph>
          This is where the section becomes useful rather than just descriptive. Deliberately break the Service selector, apply it, and inspect the result.
          Watching traffic disappear for a clear reason is much more memorable than reading "selectors matter".
        </Paragraph>

        <CodeBlockWithCopy code={k8sBrokenSelectorExercise} />

        <Paragraph>
          What should happen after you break the selector:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            the Service object still exists
          </IndentedTextListItem>
          <IndentedTextListItem>
            the Pods still exist
          </IndentedTextListItem>
          <IndentedTextListItem>
            the endpoints become empty
          </IndentedTextListItem>
          <IndentedTextListItem>
            requests through the Service stop working
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          Then restore the correct selector and re-apply the Service. The endpoints should return and traffic should start flowing again.
        </Paragraph>

        <Banner title="Why this exercise matters" variant="info">
          <Paragraph>
            It proves that Service routing is not "magic networking". It is label matching plus a current list of healthy endpoints.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Debugging loop</SubSectionHeading>

        <Paragraph>
          When the result is not what you expected, use a consistent order instead of jumping between random commands.
        </Paragraph>

        <CodeBlockWithCopy code={k8sDebugLoop} />

        <Paragraph>
          Read that loop as a sequence of questions:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            <InlineHighlight>get</InlineHighlight> - what exists right now?
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>describe</InlineHighlight> - why is that object in this condition?
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>logs</InlineHighlight> - what does the process say is happening?
          </IndentedTextListItem>
          <IndentedTextListItem>
            <InlineHighlight>events</InlineHighlight> - what changed recently at the cluster level?
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          That order matters because it narrows the problem:
          object existence first, object condition second, application behaviour third, surrounding cluster context last.
        </Paragraph>

        <SectionHeading>Expose Your App Publicly</SectionHeading>

        <Paragraph>
          So far, we've reached the application using <InlineHighlight>kubectl port-forward</InlineHighlight>. That is useful, but it is not the same thing as the cluster exposing the app itself.
        </Paragraph>

        <Paragraph>
          Port-forward creates a temporary path from <Strong>your machine</Strong> into the cluster. A Service of type <Strong>NodePort</Strong> or <Strong>LoadBalancer</Strong>{` `}
          changes the cluster's own network surface.
        </Paragraph>

        <TertiaryHeading>What changes when you expose a Service</TertiaryHeading>

        <Paragraph>
          The application Pods do not change. The Deployment does not change. What changes is the <Strong>way traffic is allowed into the Service</Strong>.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>ClusterIP</Strong> - internal only, reachable from inside the cluster
          </TextListItem>
          <TextListItem>
            <Strong>NodePort</Strong> - opens a port on the cluster node and forwards traffic to the Service
          </TextListItem>
          <TextListItem>
            <Strong>LoadBalancer</Strong> - asks the platform for an external IP in front of the Service
          </TextListItem>
        </TextList>

        <Paragraph>
          In a cloud environment, <InlineHighlight>LoadBalancer</InlineHighlight> usually means "create a real external load balancer".
          In Minikube, we simulate that behaviour locally.
        </Paragraph>

        <CodeBlockWithCopy code={k8sPortForwardVsService} />

        <Banner title="Useful distinction" variant="info">
          <Paragraph>
            <InlineHighlight>port-forward</InlineHighlight> is a client-side tunnel for testing. Service types such as <InlineHighlight>NodePort</InlineHighlight> and{" "}
            <InlineHighlight>LoadBalancer</InlineHighlight> are part of the cluster's own networking configuration.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Option 1: Expose the app with NodePort</TertiaryHeading>

        <Paragraph>
          A NodePort Service makes the application reachable through a port on the cluster node itself. In Minikube, that gives you a concrete URL you can request
          without keeping a port-forward session open.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "k8s/node-api-nodeport.yaml",
              description:
                "This keeps the same selector and target port as the ClusterIP Service, but changes the Service type so the node itself exposes an entry point.",
              code: k8sServiceNodeApiNodePort,
            },
          ]}
        />

        <Paragraph>
          Apply it, then inspect the Service:
        </Paragraph>

        <CodeBlockWithCopy code={k8sApplyNodePortService} />

        <Paragraph>
          The important thing to notice is that the Service now has a NodePort allocated. The cluster is exposing a port at the node layer, not just inside the cluster.
        </Paragraph>

        <Paragraph>
          Ask Minikube for a usable URL:
        </Paragraph>

        <CodeBlockWithCopy code={minikubeServiceUrl} />

        <Paragraph>
          At that point, the request path becomes:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            your browser or curl sends traffic to the Minikube node
          </IndentedTextListItem>
          <IndentedTextListItem>
            the NodePort forwards traffic into the Service
          </IndentedTextListItem>
          <IndentedTextListItem>
            the Service forwards traffic to a matching endpoint
          </IndentedTextListItem>
          <IndentedTextListItem>
            the Pod answers the request
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Option 2: Expose the app with LoadBalancer</TertiaryHeading>

        <Paragraph>
          A LoadBalancer Service is the cluster saying: "place an external IP in front of this Service".
          In a managed cloud cluster, that usually creates a real load balancer through the cloud provider API.
        </Paragraph>

        <Paragraph>
          Minikube cannot provision a cloud load balancer, so it uses <InlineHighlight>minikube tunnel</InlineHighlight> to simulate the same access pattern locally.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "k8s/node-api-loadbalancer.yaml",
              description:
                "This asks the platform for an external access point in front of the Service. In Minikube, tunnel mode provides that behaviour locally.",
              code: k8sServiceNodeApiLoadBalancer,
            },
          ]}
        />

        <CodeBlockWithCopy code={k8sApplyLoadBalancerService} />

        <Paragraph>
          If you inspect the Service before running the tunnel, you may see that the external IP is still pending. That is expected in a local environment.
        </Paragraph>

        <CodeBlockWithCopy code={minikubeTunnel} />

        <Paragraph>
          Once the tunnel is active, the Service should gain an external IP and behave much more like a cloud LoadBalancer Service.
        </Paragraph>

        <Banner title="What this proves" variant="warning">
          <Paragraph>
            The application code and Pod are still the same. The only thing that changed is the Service type and the path traffic takes to reach it.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Which exposure method should you use here?</TertiaryHeading>

        <TextList>
          <TextListItem>
            use <Strong>port-forward</Strong> when you are testing quickly from your own machine
          </TextListItem>
          <TextListItem>
            use <Strong>NodePort</Strong> when you want the cluster node itself to expose the Service
          </TextListItem>
          <TextListItem>
            use <Strong>LoadBalancer</Strong> when you want the cluster/platform to provide an external entry point
          </TextListItem>
        </TextList>

        <Paragraph>
          For local learning, NodePort is usually the clearest first step because you can see the change immediately.
          LoadBalancer becomes more useful when you want to understand how cloud-style service exposure works.
        </Paragraph>

        <TertiaryHeading>Clean up the extra Services when you are done</TertiaryHeading>

        <Paragraph>
          We only need these additional Service types for learning. Remove them when you are finished so the namespace stays tidy.
        </Paragraph>

        <CodeBlockWithCopy code={k8sDeleteExposeServices} />

        <SubSectionHeading>Update the API so each Pod can identify itself</SubSectionHeading>

        <Paragraph>
          Before scaling the Deployment, we need the application to tell us <Strong>which Pod</Strong> answered the request.
          Otherwise, we can see more Pods in Kubernetes, but we cannot prove traffic is actually being spread across them.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "server.js (/identity endpoint)",
              description:
                "This adds an endpoint that returns Pod identity information, which makes scaling and rollouts observable from the application itself.",
              code: nodeApiServerWithIdentity,
            },
          ]}
        />

        <Paragraph>
          After updating the file, rebuild the image and make it available to Minikube again:
        </Paragraph>

        <CodeBlockWithCopy code={minikubeBuildNodeApiImage} />

        <Paragraph>
          Then restart the Deployment so the Pods use the new image:
        </Paragraph>

        <CodeBlockWithCopy code={`kubectl rollout restart deployment/node-api 
kubectl rollout status deployment/node-api`} />

        <Paragraph>
          You can now test the new endpoint:
        </Paragraph>

        <CodeBlockWithCopy code={`curl http://localhost:8080/identity`} />

        <Banner title="Why this matters" variant="info">
          <Paragraph>
            The <InlineHighlight>/identity</InlineHighlight> route turns scaling and updates into something you can observe directly.
            Repeated requests should start showing different Pod names once multiple replicas exist.
          </Paragraph>
        </Banner>

        <SectionHeading>Scale Your App</SectionHeading>

        <Paragraph>
          Scaling is where Kubernetes starts to feel different from running containers manually.
          You are no longer saying "start another container". You are changing the desired replica count and letting Kubernetes work out the rest.
        </Paragraph>

        <Paragraph>
          The important thing to understand is that scaling changes the number of <Strong>Pods</Strong>, not the Service.
          The Service stays stable while the set of endpoints behind it grows or shrinks.
        </Paragraph>

        <TertiaryHeading>What changes when you scale</TertiaryHeading>

        <IndentedTextList>
          <IndentedTextListItem>
            the <Strong>Deployment</Strong> desired replica count changes
          </IndentedTextListItem>
          <IndentedTextListItem>
            the <Strong>ReplicaSet</Strong> creates or removes Pods to match that count
          </IndentedTextListItem>
          <IndentedTextListItem>
            the <Strong>Service endpoints</Strong> update as Pods become ready or disappear
          </IndentedTextListItem>
          <IndentedTextListItem>
            the Service name and access path stay the same
          </IndentedTextListItem>
        </IndentedTextList>

        <Paragraph>
          That stability is the useful part. Clients keep talking to the same Service while Kubernetes changes the Pod fleet behind it.
        </Paragraph>

        <TertiaryHeading>Step 1: Watch the current state</TertiaryHeading>

        <Paragraph>
          Before changing anything, open a watch so you can see the Pods update in real time.
        </Paragraph>

        <CodeBlockWithCopy code={k8sScaleWatch} />

        <Paragraph>
          In another terminal, it is also useful to watch the Service endpoints. That shows which Pod IPs are currently eligible to receive traffic.
        </Paragraph>

        <CodeBlockWithCopy code={k8sScaleServiceEndpoints} />

        <TertiaryHeading>Step 2: Scale up</TertiaryHeading>

        <Paragraph>
          Now increase the replica count from one Pod to three:
        </Paragraph>

        <CodeBlockWithCopy code={k8sScaleUp} />

        <Paragraph>
          What should happen after this:
        </Paragraph>

        <TextList>
          <TextListItem>
            the Deployment desired state changes from 1 to 3
          </TextListItem>
          <TextListItem>
            Kubernetes creates two additional Pods
          </TextListItem>
          <TextListItem>
            those Pods are scheduled onto the node
          </TextListItem>
          <TextListItem>
            once they are ready, the Service endpoints list expands
          </TextListItem>
        </TextList>

        <Paragraph>
          The useful thing to observe is that the Service itself does not get "scaled".
          It simply gains more healthy endpoints to route to.
        </Paragraph>

        <CodeBlockWithCopy code={k8sScaleExplain} />

        <Banner title="What to look for" variant="info">
          <Paragraph>
            The Deployment should show the new desired replica count quickly, but the Pods may take a moment to appear and become ready.
            Readiness is what decides when the Service can start sending traffic to them.
          </Paragraph>
        </Banner>

        <TertiaryHeading>Step 3: Prove traffic is being distributed</TertiaryHeading>

        <Paragraph>
          This is where the <InlineHighlight>/identity</InlineHighlight> endpoint becomes useful. Repeated requests should now show different Pods answering over time.
        </Paragraph>

        <CodeBlockWithCopy code={k8sIdentityLoopCmd} />

        <Paragraph>
          If the responses show different Pod names or hostnames, you've proved that:
        </Paragraph>

        <IndentedTextList>
          <IndentedTextListItem>
            multiple Pods are running
          </IndentedTextListItem>
          <IndentedTextListItem>
            the Service sees them as endpoints
          </IndentedTextListItem>
          <IndentedTextListItem>
            traffic is being spread across that set rather than pinned to one Pod
          </IndentedTextListItem>
        </IndentedTextList>

        <TertiaryHeading>Why scaling is not just "more containers"</TertiaryHeading>

        <Paragraph>
          With plain Docker, running more copies usually means manually starting more containers and then figuring out how traffic should reach them.
          In Kubernetes, scaling is tied to a controller.
        </Paragraph>

        <Paragraph>
          That means the replica count becomes part of the declared application state, and Kubernetes keeps trying to make reality match it.
          If one scaled Pod dies, Kubernetes does not say "you used to have three". It says "you asked for three, and I currently only have two".
        </Paragraph>

        <TertiaryHeading>Step 4: Scale back down</TertiaryHeading>

        <Paragraph>
          Now reduce the replica count again:
        </Paragraph>

        <CodeBlockWithCopy code={k8sScaleDown} />

        <Paragraph>
          As the extra Pods terminate, the endpoints list should shrink as well. The Service remains stable, but fewer Pods sit behind it.
        </Paragraph>

        <Banner title="The main idea" variant="warning">
          <Paragraph>
            Scaling changes the size of the backend set, not the identity of the frontend entry point.
            Clients keep using the same Service while Kubernetes adjusts the number of Pods behind it.
          </Paragraph>
        </Banner>

      </PostContainer>
    </PageWrapper>
  );
};

export default DockerKubernetes;