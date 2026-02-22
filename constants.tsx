export const CONTENT = {
  site: {
    name: "Brittek",
    brandLine: "Systems-driven studio",
    location: "Sydney",
    tagline: "We design and build modern digital systems with clarity and precision.",
    homeHref: "/",
    contacts: {
      email: "hello@brittek.net",
      phone: "+61 415 266 553",
    },
    footer: {
      statement: "Push boundaries.",
      copyright: `© ${new Date().getFullYear()} Brittek Digital • Sydney`,
      social: [
        { label: "GitHub", href: "https://github.com/brittek" },
        { label: "Instagram", href: "https://www.instagram.com/brittekdgtl/" },
        { label: "CodePen", href: "https://codepen.io/brittek" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/brittek-digital/" },
      ],
    },
  },

  navigation: {
    top: [
      { label: "Artifacts", href: "#artifacts" },
      { label: "Expertise", href: "#expertise" },
      { label: "Repository", href: "#repository" },
      { label: "Enquire", href: "#contact", isCta: true },
    ],
    heroActions: [
      { label: "Enquire", href: "#contact", variant: "primary" },
      { label: "Studio", href: "#about", variant: "ghost" },
      { label: "Work", href: "#artifacts", variant: "ghost" },
    ],
  },

  assets: {
    logo: "https://assets.codepen.io/9806267/brittek-mark_orange_transparent.png",
    heroVideo: "https://assets.codepen.io/9806267/SydneyCityTimelapse_5mb.mp4",
    portfolioVideo: "https://assets.codepen.io/9806267/PortfolioHero.mp4",
  },
} as const;