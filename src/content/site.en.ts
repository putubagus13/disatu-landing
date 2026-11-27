import type { SiteContent } from "./types";
import { shared } from "./shared";

export const siteEn: SiteContent = {
  meta: {
    homeTitle: "Disatu — Website & App Development",
    homeDescription:
      "Disatu builds company profile websites, mobile apps, backend systems, and web apps such as e-commerce, shaped around your business.",
    aboutTitle: "About Disatu",
    aboutDescription:
      "Disatu builds websites, mobile apps, backend systems, and web apps. Founded in 2024 by Putu Bagus Raditya.",
  },
  ui: {
    menuOpen: "Open menu",
    menuClose: "Close menu",
    skipToContent: "Skip to content",
    themeLight: "Light theme",
    themeDark: "Dark theme",
    themeSystem: "System theme",
    switchLanguage: "Switch language",
    visualLabel:
      "Animated three-dimensional lines that change shape every few seconds. Move your cursor to interact",
    experienceTitle: "Experience",
    skillsTitle: "Skills",
    educationTitle: "Education",
    whatsapp: "WhatsApp",
    email: "Email",
    consult: "Consult",
    seeServices: "See services",
    aboutCta: "Talk about your project",
  },
  brand: {
    name: "Disatu",
    tagline: "Websites and apps built around what you need.",
  },
  nav: [
    { label: "Services", page: "home", hash: "services" },
    { label: "Portfolio", page: "home", hash: "portfolio" },
    { label: "Process", page: "home", hash: "process" },
    { label: "Products", page: "home", hash: "products" },
    { label: "About", page: "about" },
  ],
  hero: {
    eyebrow: "Disatu · Website & App Development",
    title: "Websites and apps built around your business.",
    subtitle:
      "From company profiles to mobile apps and backend systems, Disatu designs and builds your digital product, from the first conversation to after launch.",
  },
  services: {
    title: "Disatu Services",
    subtitle:
      "From company profiles to backend systems, we help turn your idea into a digital product that fits your needs.",
    contactLead: "Got a project? Get in touch.",
    items: [
      {
        title: "Company Profile Websites",
        description: "Clean, fast company websites that reflect your brand.",
        icon: shared.serviceIcons[0],
      },
      {
        title: "Mobile Apps",
        description: "Mobile apps designed around your business and its users.",
        icon: shared.serviceIcons[1],
      },
      {
        title: "Backend Systems",
        description:
          "APIs and behind-the-scenes systems that are reliable and ready to grow.",
        icon: shared.serviceIcons[2],
      },
      {
        title: "Web Apps and E-Commerce",
        description:
          "Custom web apps such as online stores, dashboards, and other business systems.",
        icon: shared.serviceIcons[3],
      },
    ],
  },
  portfolio: {
    tag: "Portfolio",
    title: "Projects we have built",
    subtitle:
      "Company profile websites and organisation management dashboard, each for a different need.",
    items: [
      {
        id: "captivad",
        name: "Captivad",
        kind: "Company profile website",
        description:
          "A company profile website for a digital agency that connects brands with the right audiences through data, media and AI-powered experiences. The look is dark and confident, with one clear message up front so visitors see what is on offer right away.",
        highlights: [
          "A large headline message on the front page",
          "Menu straight to profile, services, work, AI Experience and contact",
          "A dark look that puts the technology side forward",
        ],
        imageAlt:
          'Captivad website front page: a large "Where Reach Meets Intelligence" headline on a dark background',
        visit: "Visit captivad.co",
      },
      {
        id: "geoarthasemesta",
        name: "PT GEO Artha Semesta",
        kind: "Company profile website",
        description:
          "A company profile website for a national offshore and subsea services company, from operations and maintenance (O&M) to construction support. Services, equipment and project experience are laid out so prospective clients in oil & gas can judge the company's capability quickly.",
        highlights: [
          "An offshore operations photo opens the page",
          "Sections for services, equipment and project experience",
          "Language choice right in the menu",
        ],
        imageAlt:
          "PT GEO Artha Semesta website front page: a vessel and offshore platform with a subsea solutions headline",
        visit: "Visit geoarthasemesta.com",
      },
      {
        id: "organization-dashboard",
        name: "Organisation Management Dashboard",
        kind: "Web application",
        description:
          "A dashboard for running an organisation in one place: member records, finances, and incoming and outgoing letters. Officers record bookkeeping, loans and member dues, then see a financial summary per period.",
        highlights: [
          "Member management, roles and access rights",
          "Finance: bookkeeping, loans and member dues",
          "Creating incoming and outgoing letters",
          "Period financial summary that can be exported",
        ],
        imageAlt:
          "Financial Summary page of an organisation dashboard: total cash, cash account balances and recent transactions",
      },
    ],
  },
  process: {
    tag: "How we work",
    title: "Five steps from idea to launch",
    subtitle:
      "Every project follows the same order, so you always know what is being worked on and what comes next.",
    stepWord: "Step",
    next: "Next step",
    cta: "Start a consultation",
    steps: [
      {
        id: "discovery",
        label: "Discovery call",
        title: "First, understand what you need",
        description:
          "We start with a conversation: your business goals, who the users are, and the problem to solve.",
        points: [
          {
            label: "Goals and users",
            text: "What you want to achieve, and who will use it.",
          },
          {
            label: "Feature needs",
            text: "The features you need from day one, and the ones that can follow.",
          },
        ],
      },
      {
        id: "proposal",
        label: "Scope & proposal",
        title: "A clear plan before we start",
        description:
          "We turn those needs into a plan: the scope of work, the stages, and a proposal.",
        points: [
          {
            label: "Scope of work",
            text: "What is included, and what is not.",
          },
          {
            label: "Stages and timeline",
            text: "The order of the work and an estimate for each stage.",
          },
        ],
      },
      {
        id: "build",
        label: "Design & build",
        title: "Designed first, then built in stages",
        description:
          "The look is designed first, then built piece by piece. You see the progress and give feedback at every stage.",
        points: [
          {
            label: "Interface design",
            text: "Page and flow designs you approve before they are built.",
          },
          {
            label: "Built in stages",
            text: "Features are built bit by bit, not all at once at the end.",
          },
          {
            label: "Regular reviews",
            text: "You review progress regularly, so there are no surprises at the end.",
          },
        ],
      },
      {
        id: "launch",
        label: "Test & launch",
        title: "Tested first, then launched",
        description:
          "Every feature is tested before users get it. Once ready, your product goes live.",
        points: [
          {
            label: "Testing",
            text: "Features are checked against the design on different devices.",
          },
          {
            label: "Launch",
            text: "Your website goes live on your domain, your app on the app stores.",
          },
        ],
      },
      {
        id: "support",
        label: "Post-launch support",
        title: "Still with you after launch",
        description:
          "Launch is not the end. We help with fixes and further development as your needs grow.",
        points: [
          {
            label: "Fixes",
            text: "We help resolve issues that come up after launch.",
          },
          {
            label: "Further development",
            text: "New features can be added as your business grows.",
          },
        ],
      },
    ],
  },
  products: {
    tag: "Disatu products",
    title: "Products we build ourselves",
    subtitle: "Disatu also builds and runs digital products of its own.",
    items: [
      {
        id: "chartlab",
        name: "ChartLab",
        badge: "Built by Disatu",
        description:
          "A crypto trading platform for analyzing the market and testing trading systems. Every feature is free.",
        features: [
          "Free backtesting with Bar Replay",
          "Backtest statistics",
          "Best R:R recommendation",
        ],
        cta: "Visit ChartLab",
      },
    ],
  },
  aboutTeaser: {
    tag: "About Disatu",
    title: "Founded in 2024",
    text: "Disatu was founded by Putu Bagus Raditya, a software engineer.",
    cta: "More about Disatu",
  },
  contactCta: {
    title: "Got a project? Tell us about it",
    subtitle:
      "Tell us what you need over WhatsApp or email. We will help find the solution that fits.",
  },
  about: {
    company: {
      title: "About Disatu",
      tag: "Founded in 2024",
      intro:
        "Disatu builds company-profile websites, mobile apps, backend systems, and web apps such as e-commerce. We also develop ChartLab, a crypto trading platform that is free to use.",
      principleTitle: "Client needs come first",
      principle:
        "Disatu always puts the client’s needs first and looks for the best solution for every project.",
      facts: [
        { label: "Founded", value: shared.foundedYear },
        { label: "Founder", value: "Putu Bagus Raditya" },
      ],
    },
    founder: {
      name: "Putu Bagus Raditya",
      role: "Founder of Disatu",
      summary: "A crypto trader and a software engineer at NoLimit Indonesia.",
      location: "Bandung City, West Java",
      photo: shared.founderPhoto,
      education: [
        { degree: "Bachelor’s in Physics", school: "University of Lampung" },
      ],
      skills: [
        { group: "Frontend", items: shared.skills.frontend },
        { group: "Backend", items: shared.skills.backend },
        { group: "Database", items: shared.skills.database },
        { group: "Blockchain", items: shared.skills.blockchain },
        { group: "Trading", items: shared.skills.trading },
      ],
      experiences: [
        {
          role: "Software Engineer",
          company: "NoLimit Indonesia",
          period: "Oct 2023 — Present",
          description: "Working as a software engineer.",
          highlights: [],
        },
        {
          role: "Crypto Trader",
          company: "Crypto market",
          period: "~3 years",
          description: "Trading crypto with the Smart Money Concept approach.",
          highlights: [],
        },
      ],
    },
    contact: shared.contact,
    socials: shared.socials,
  },
  footer: { note: "© Disatu" },
};
