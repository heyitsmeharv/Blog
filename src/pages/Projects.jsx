import React, { useEffect } from 'react';
import styled from 'styled-components';

// helpers
import { Analytics } from "../helpers/analytics";

// components
import Project from '../components/Project/Project';

// images
import HarvsQuizzy from '../resources/images/Harvs-Quizzy.png';
import Coolours from '../resources/images/Coolours.png';
import Harvgram from '../resources/images/Harvgram.png';
import RockPaperScissors from '../resources/images/RockPaperScissors.png';


// gifs
import NavigationMenu from '../resources/gifs/navigation-menu.gif';
import TextBasedAdventure from '../resources/gifs/text-based-adventure.gif';

// animations
import SlideInBottom from "../animations/SlideInBottom";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-height: 100%;
  padding: 4rem 0;
  background: ${({ theme }) => theme.background};
  animation: ${SlideInBottom} 0.5s forwards;
  text-align: center;
  @media only screen and (max-width: 585px) {
    flex-direction: column;
  }
`;


export default function Projects() {

  useEffect(() => {
    Analytics.event('projects', { slug: 'projects-selection' });
  }, []);

  const projects = [
    {
      name: 'Text Based Adventure',
      image: TextBasedAdventure,
      github: "https://github.com/heyitsmeharv/react-text-based-adventure",
      hide: true
    },
    {
      name: 'Rock Paper Scissors',
      image: RockPaperScissors,
      link: "https://heyitsmeharv-rockpaperscissors.herokuapp.com/",
      github: "https://github.com/heyitsmeharv/rock-paper-scissors",
      hide: true
    },
    {
      name: 'Navigation-Menu',
      image: NavigationMenu,
      github: "https://github.com/heyitsmeharv/navigation-menu",
      hide: true
    },
    {
      name: 'Quiz',
      image: HarvsQuizzy,
      link: "https://harvs-quizzy.com/#/quizzy",
      github: "https://github.com/heyitsmeharv/quizzy",
      hide: false
    },
    {
      name: 'Coolours',
      image: Coolours,
      link: "https://upbeat-lichterman-47bd92.netlify.app",
      github: "https://github.com/heyitsmeharv/coolours",
      hide: false
    },
    {
      name: 'Harvgram',
      image: Harvgram,
      github: "https://github.com/heyitsmeharv/harvgram",
      hide: true
    }
  ];



  return (
    <Container>
      {projects.map((p, i) => {
        return <Project key={i} index={i} name={p.name} link={p.link} image={p.image} github={p.github} hide={p.hide} />
      })}
    </Container>
  );
}