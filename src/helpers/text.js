export const introductionText = (language) => {
  let text;
  switch (language) {
    case "EN":
      text =
        "Hello 👋, my name is Adam. I'm a software engineer from Oxford, England.";
      break;
    case "ES":
      text =
        "Hola 👋, me llamo Adam. Soy un ingeniero de software de Oxford, Inglaterra.";
      break;
  }
  return text;
};

export const contactMe = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Contact Me";
      break;
    case "ES":
      text = "Contáctame";
      break;
  }
  return text;
};

export const curriculumVitaeButtonText = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Curriculum Vitae";
      break;
    case "ES":
      text = "Currículum Vitae";
      break;
  }
  return text;
};

export const contactMeText = (language) => {
  let text;
  switch (language) {
    case "EN":
      text =
        "Contact me for more information on my own work experiences and services and any business enquiries.";
      break;
    case "ES":
      text =
        "Ponte en contacto conmigo para obtener más información sobre mis experiencias laborales y servicios, y cualquier consulta comercial.";
      break;
  }
  return text;
};

export const nameInput = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Name *";
      break;
    case "ES":
      text = "Nombre *";
      break;
  }
  return text;
};

export const emailInput = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Email *";
      break;
    case "ES":
      text = "Correo electrónico *";
      break;
  }
  return text;
};

export const phoneInput = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Telephone";
      break;
    case "ES":
      text = "Teléfono";
      break;
  }
  return text;
};

export const companyInput = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Company";
      break;
    case "ES":
      text = "Compañía";
      break;
  }
  return text;
};

export const messageInput = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Message *";
      break;
    case "ES":
      text = "Mensaje *";
      break;
  }
  return text;
};

export const sendMessageText = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Send Message";
      break;
    case "ES":
      text = "Enviar Mensaje";
      break;
  }
  return text;
};

export const aboutMe = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "About Me";
      break;
    case "ES":
      text = "Sobre Mí";
      break;
  }
  return text;
};

export const aboutMeText = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = `I started my professional career as a front-end developer after graduating with a degree in software for games. 
     I have since branched out into various roles, taking on both problem-solving, client-facing, and leadership roles. 
     I would describe myself as a fun, friendly, and enthusiastic problem solver with an inquisitive mindset, who has a 
     proven track record of delivering large-scale commercialised web applications written in React.js hosted on AWS cloud infrastructure.`;
      break;
    case "ES":
      text = `Comencé mi carrera profesional como desarrollador front-end tras graduarme en software para videojuegos. 
      Desde entonces, he desarrollado diversas funciones, asumiendo tanto la resolución de problemas como la atención 
      al cliente y el liderazgo. Me describiría como una persona divertida, amigable y entusiasta, con una mentalidad 
      inquisitiva, capaz de resolver problemas y con una trayectoria comprobada en la creación de aplicaciones web comercializadas 
      a gran escala, escritas en React.js y alojadas en la infraestructura de la nube de AWS.`;
      break;
  }
  return text;
};

export const aliveText = (language, age) => {
  let text;
  switch (language) {
    case "EN":
      text = `I've been alive for ${age.years} years, ${age.days} days, ${age.hours} hours, ${age.minutes} minutes and ${age.seconds} seconds...`;
      break;
    case "ES":
      text = `Estoy vivo desde hace ${age.years} años, ${age.days} días, ${age.hours} horas, ${age.minutes} minutos y ${age.seconds} segundos...`;
      break;
  }
  return text;
};

export const experienceText = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Experience";
      break;
    case "ES":
      text = "Experiencia";
      break;
  }
  return text;
};

export const skillsText = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Skills";
      break;
    case "ES":
      text = "Habilidades";
      break;
  }
  return text;
};

export const skillsListText = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Here's a list of technologies I've used:";
      break;
    case "ES":
      text = "Aquí hay una lista de tecnologías que he usado:";
      break;
  }
  return text;
};

export const comment = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Comment";
      break;
    case "ES":
      text = "Comentario";
      break;
  }
  return text;
};

export const commentText = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Feel free to leave me a comment below 👇";
      break;
    case "ES":
      text = "Siéntase libre de dejarme un comentario a continuación 👇";
      break;
  }
  return text;
};

export const commentPrompt = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "What are your thoughts?";
      break;
    case "ES":
      text = "¿Cuáles son tus pensamientos?";
      break;
  }
  return text;
};

export const cancel = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Cancel";
      break;
    case "ES":
      text = "Cancelar";
      break;
  }
  return text;
};

export const submit = (language) => {
  let text;
  switch (language) {
    case "EN":
      text = "Submit";
      break;
    case "ES":
      text = "Entregar";
      break;
  }
  return text;
};
