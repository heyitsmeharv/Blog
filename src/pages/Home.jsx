import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import { LanguageContext } from "../context/languageContext";

// components
import Introduction from "../components/Introduction/AccessibleIntroduction";
import AboutMe from "../components/AboutMe/AboutMe";
import ProfessionalExperience from "../components/ProfessionalExperience/AccessibleProfessionalExperience";
import FeaturedProjects from "../components/FeaturedProjects/LocalizedFeaturedProjects";
import FeaturedBlogPosts from "../components/FeaturedBlogPosts/LocalizedFeaturedBlogPosts";
import ContactMe from "../components/ContactMe/ContactMe";
import Skills from "../components/Skills/Skills";
import GitHubActivity from "../components/GitHubActivity/GitHubActivity";

const Container = styled.div``;

const Home = () => {
  const [open, setOpen] = useState(false);
  const language = useContext(LanguageContext);

  return (
    <Container>
      <ToastContainer />
      <Introduction language={language} open={open} setOpen={setOpen} />
      <ContactMe language={language} open={open} setOpen={setOpen} />
      <AboutMe language={language} />
      <ProfessionalExperience language={language} />
      <FeaturedBlogPosts language={language} />
      <FeaturedProjects language={language} />
      <Skills language={language} />
      <GitHubActivity language={language} />
    </Container>
  );
};

export default Home;
