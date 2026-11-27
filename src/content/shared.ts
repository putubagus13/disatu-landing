// Non-text data shared by both locales. Replace placeholders (example.com, prices) with real values.
export const shared = {
  videoSrc: '/assets/tutorial_backtest_v2.mp4',
  videoPoster: '/assets/tutorial_backtest_poster.jpg',
  contact: { phone: '+6282184677520', email: 'ptbagusraditya@gmail.com' },
  packages: [
    { id: 'starter', price: 149000, originalPrice: undefined, checkoutUrl: 'https://example.com/checkout/starter' },
    { id: 'pro', price: 299000, originalPrice: 399000, checkoutUrl: 'https://example.com/checkout/pro', highlighted: true },
    { id: 'mentor', price: 599000, originalPrice: undefined, checkoutUrl: 'https://example.com/checkout/mentor' },
  ],
  // Hidden for now (shown nowhere while empty). Add { label, url } entries to bring them back.
  socials: [] as { label: string; url: string }[],
  skills: {
    frontend: ['HTML', 'CSS', 'Tailwind CSS', 'Daisy UI', 'Shadcn UI', 'Material UI', 'Styled Components', 'JavaScript', 'TypeScript', 'React', 'Redux/Redux Toolkit', 'Zustand', 'React Query', 'Next.js'],
    backend: ['Node.js', 'Express.js', 'Prisma ORM', 'Sequelize ORM'],
    database: ['MySQL', 'PostgreSQL'],
    blockchain: ['Solidity'],
    trading: ['Smart Money Concept'],
  },
  serviceIcons: ['web', 'mobile', 'backend', 'webapp'] as const,
  founderPhoto: '/assets/profile-picture.JPG',
  foundedYear: '2024',
  icons: ['chart', 'bolt', 'layers', 'shield', 'clock', 'target'] as const,
}
