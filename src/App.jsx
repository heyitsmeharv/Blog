import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

// helpers
import { Analytics, Consent } from "./helpers/analytics";

// context
import { LanguageContext } from "./context/languageContext";
import { UserContext } from "./context/userContext";

// hooks
import { useThemeMode } from "./hooks/useThemeMode";
import { useLanguageMode } from "./hooks/useLanguageMode";

// styles
import { ThemeProvider } from "styled-components";
import {
  lightTheme,
  darkTheme,
  blueTheme,
  redTheme,
  greenTheme,
} from "./resources/styles/theme";
import { GlobalStyles } from "./resources/styles/global";

// pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

// components
import ConsentGate from "./components/Consent/ConsentGate";
import Navbar from "./components/Navbar/AccessibleNavbar";

// blog posts
import TheStart from "./components/Posts/TheStart.jsx";
import JavaScriptArray from "./components/Posts/JavaScriptArray";
import JavaScriptObjects from "./components/Posts/JavaScriptObjects.jsx";
import ReactAdventureGame from "./components/Posts/ReactAdventureGame.jsx";
import AWSIdentityAccessManagement from "./components/Posts/AWSIdentityAccessManagement";
import AWSElasticComputeCloud from "./components/Posts/AWSElasticComputeCloud";
import AWSDatabases from "./components/Posts/AWSDatabases";
import AWSRoute53 from "./components/Posts/AWSRoute53";
import AWSS3 from "./components/Posts/AWSS3.jsx";
import AWSCloudFront from "./components/Posts/AWSCloudFront";
import AWSSQS from "./components/Posts/AWSSQS.jsx";
import AWSSNS from "./components/Posts/AWSSNS.jsx";
import AWSContainers from "./components/Posts/AWSContainers";
import AWSVPC from "./components/Posts/AWSVPC.jsx";
import AWSKinesis from "./components/Posts/AWSKinesis";
import AWSDataAnalytics from "./components/Posts/AWSDataAnalytics";
import AWSServerless from "./components/Posts/AWSServerless.jsx";
import AWSMachineLearning from "./components/Posts/AWSMachineLearning.jsx";
import AWSMonitoringAudit from "./components/Posts/AWSMonitoringAudit";
import AWSSecurityEncryption from "./components/Posts/AWSSecurityEncryption.jsx";
import BashScripting from "./components/Posts/BashScripting";
import GitHubCICD from "./components/Posts/GitHubCICD";
import DockerKubernetes from "./components/Posts/DockerKubernetes";
import DockerKubernetesAdvanced from "./components/Posts/DockerKubernetesAdvanced";
import IaCTerraform from "./components/Posts/IaCTerraform";
import ConventionalCommits from "./components/Posts/ConventionalCommits.jsx";
import { posts } from "./data/posts";

const slugFromPath = (p) => {
  const m = (p || "").match(/^\/blog\/([^/?#]+)/);
  return m ? m[1] : null;
};

const getDocumentTitle = (pathname) => {
  if (pathname === "/") {
    return "Adam Harvey | Portfolio";
  }

  if (pathname === "/blog") {
    return "Blog | Adam Harvey";
  }

  if (pathname === "/projects") {
    return "Projects | Adam Harvey";
  }

  const slug = slugFromPath(pathname);
  const post = posts.find((item) => item.navigate === slug);

  if (post) {
    return `${post.title} | Adam Harvey`;
  }

  return "Adam Harvey";
};

const SkipLink = styled.a`
  position: absolute;
  top: -5rem;
  left: 1.6rem;
  z-index: 1000;
  padding: 1rem 1.4rem;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 700;
  border-radius: 0.6rem;

  &:focus {
    top: 1.2rem;
  }
`;

const AppMain = styled.main`
  min-height: calc(100vh - 6.5rem);
`;

const TrackingGate = ({ location, mainRef, children }) => {
  const skipFirstPv = useRef(true); // avoid double PV with the initial one fired in Analytics.start()

  useEffect(() => {
    document.title = getDocumentTitle(location.pathname);

    const id = setTimeout(() => {
      mainRef?.current?.focus({ preventScroll: true });
    }, 0);

    return () => clearTimeout(id);
  }, [location, mainRef]);

  useEffect(() => {
    if (!Consent.isGranted()) return; // only after Accept
    if (skipFirstPv.current) {
      // first PV already sent by start()
      skipFirstPv.current = false;
      return;
    }

    const path = location.pathname + location.search;
    const slug = slugFromPath(path);
    const id = setTimeout(() => {
      Analytics.pageview({ path, slug });
    }, 0);
    return () => clearTimeout(id);
  }, [location]);

  return children;
};

const App = () => {
  /* ---------------------------- language toggle ----------------------------  */
  const [language, toggleLanguage] = useLanguageMode();

  /* ---------------------------- theme toggle ----------------------------  */
  const [theme, toggleTheme, componentMounted] = useThemeMode();
  let themeMode;
  const mainRef = useRef(null);

  const getTheme = (theme) => {
    switch (theme) {
      case "light":
        return lightTheme;
      case "dark":
        return darkTheme;
      case "blue":
        return blueTheme;
      case "red":
        return redTheme;
      case "green":
        return greenTheme;
      default:
        return lightTheme;
    }
  };

  themeMode = getTheme(theme);

  useEffect(() => {
    document.documentElement.lang = language === "ES" ? "es" : "en";
  }, [language]);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <UserContext.Provider>
      <LanguageContext.Provider value={language}>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <ConsentGate>
            <Router>
              <SkipLink href="#main-content">Skip to main content</SkipLink>
              <Route
                render={({ location }) => {
                  return (
                    <TrackingGate location={location} mainRef={mainRef}>
                      <Navbar
                        currentLanguage={language}
                        currentTheme={theme}
                        toggleTheme={toggleTheme}
                        toggleLanguage={toggleLanguage}
                      />
                      <AppMain id="main-content" ref={mainRef} tabIndex="-1">
                        <Switch location={location}>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/projects" component={Projects} />
                          <Route exact path="/blog" component={Blog} />
                          {/* Add blog posts here */}
                          <Route
                            exact
                            path="/blog/the-start"
                            component={TheStart}
                          />
                          <Route
                            exact
                            path="/blog/javascript-arrays"
                            component={JavaScriptArray}
                          />
                          <Route
                            exact
                            path="/blog/javascript-objects"
                            component={JavaScriptObjects}
                          />
                          <Route
                            exact
                            path="/blog/react-text-based-adventure"
                            component={ReactAdventureGame}
                          />
                          <Route
                            exact
                            path="/blog/aws-identity-access-management"
                            component={AWSIdentityAccessManagement}
                          />
                          <Route
                            exact
                            path="/blog/aws-elastic-compute-cloud"
                            component={AWSElasticComputeCloud}
                          />
                          <Route
                            exact
                            path="/blog/aws-databases"
                            component={AWSDatabases}
                          />
                          <Route
                            exact
                            path="/blog/aws-route53"
                            component={AWSRoute53}
                          />
                          <Route exact path="/blog/aws-s3" component={AWSS3} />
                          <Route
                            exact
                            path="/blog/aws-cloudfront"
                            component={AWSCloudFront}
                          />
                          <Route
                            exact
                            path="/blog/aws-sqs"
                            component={AWSSQS}
                          />
                          <Route
                            exact
                            path="/blog/aws-sns"
                            component={AWSSNS}
                          />
                          <Route
                            exact
                            path="/blog/aws-kinesis"
                            component={AWSKinesis}
                          />
                          <Route
                            exact
                            path="/blog/aws-containers"
                            component={AWSContainers}
                          />
                          <Route
                            exact
                            path="/blog/aws-vpc"
                            component={AWSVPC}
                          />
                          <Route
                            exact
                            path="/blog/aws-data-analytics"
                            component={AWSDataAnalytics}
                          />
                          <Route
                            exact
                            path="/blog/aws-serverless"
                            component={AWSServerless}
                          />
                          <Route
                            exact
                            path="/blog/aws-machine-learning"
                            component={AWSMachineLearning}
                          />
                          <Route
                            exact
                            path="/blog/aws-monitoring-audit"
                            component={AWSMonitoringAudit}
                          />
                          <Route
                            exact
                            path="/blog/aws-security-encryption"
                            component={AWSSecurityEncryption}
                          />
                          <Route
                            exact
                            path="/blog/getting-started-with-bash-scripting"
                            component={BashScripting}
                          />
                          <Route
                            exact
                            path="/blog/github-ci-cd"
                            component={GitHubCICD}
                          />
                          <Route
                            exact
                            path="/blog/intro-to-docker-kubernetes"
                            component={DockerKubernetes}
                          />
                          <Route
                            exact
                            path="/blog/docker-kubernetes-advanced"
                            component={DockerKubernetesAdvanced}
                          />
                          <Route
                            exact
                            path="/blog/infrastructure-as-code-with-terraform"
                            component={IaCTerraform}
                          />
                          <Route
                            exact
                            path="/blog/semantic-versioning-with-conventional-commits"
                            component={ConventionalCommits}
                          />
                          <Route component={NotFound} />
                        </Switch>
                      </AppMain>
                    </TrackingGate>
                  );
                }}
              />
            </Router>
          </ConsentGate>
        </ThemeProvider>
      </LanguageContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
