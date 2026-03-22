import HarvsQuizzy from "../resources/images/Harvs-Quizzy.png";
import Coolours from "../resources/images/Coolours.png";
import Harvgram from "../resources/images/Harvgram.png";
import RockPaperScissors from "../resources/images/RockPaperScissors.png";
import NavigationMenu from "../resources/gifs/navigation-menu.gif";
import TextBasedAdventure from "../resources/gifs/text-based-adventure.gif";
import FantasyFightPicker from "../resources/images/ffp.png";

export const projects = [
  {
    name: "Fantasy Fight Picker",
    description:
      "Fantasy Fight Picker is a prediction app built with React and AWS. Browse upcoming fight cards, research fighters, make picks before lock, and earn points based on prediction accuracy. ",
    image: FantasyFightPicker,
    github: "https://github.com/heyitsmeharv/fantasy-fight-picker",
    link: "https://d18kh2aenn5ywj.cloudfront.net",
    tags: ["AWS", "React"],
  },
  {
    name: "Harvgram",
    description:
      "A full-stack Instagram clone with image uploads, likes, and a followers feed.",
    image: Harvgram,
    github: "https://github.com/heyitsmeharv/harvgram",
    tags: ["AWS", "React", "Node.js"],
  },
  {
    name: "Text Based Adventure",
    description:
      "A choose-your-own-adventure game built in React with branching narrative paths.",
    image: TextBasedAdventure,
    github: "https://github.com/heyitsmeharv/react-text-based-adventure",
    tags: ["React"],
  },
  {
    name: "Coolours",
    description:
      "A colour palette generator inspired by Coolors, letting users lock and randomise beautiful palettes.",
    image: Coolours,
    github: "https://github.com/heyitsmeharv/coolours",
    link: "https://upbeat-lichterman-47bd92.netlify.app",
    tags: ["React"],
  },
  {
    name: "Quiz App",
    description:
      "A full-stack trivia quiz with multiple categories and a leaderboard.",
    image: HarvsQuizzy,
    github: "https://github.com/heyitsmeharv/quizzy",
    link: "https://harvs-quizzy.com/#/quizzy",
    tags: ["React", "Node.js"],
  },
  {
    name: "Rock Paper Scissors",
    description:
      "A classic Rock Paper Scissors game with score tracking and animated results.",
    image: RockPaperScissors,
    github: "https://github.com/heyitsmeharv/rock-paper-scissors",
    link: "https://heyitsmeharv-rockpaperscissors.herokuapp.com/",
    tags: ["React"],
  },
  {
    name: "Navigation Menu",
    description:
      "An animated responsive navigation menu component with smooth hover transitions.",
    image: NavigationMenu,
    github: "https://github.com/heyitsmeharv/navigation-menu",
    tags: ["JavaScript", "CSS"],
  },
];
