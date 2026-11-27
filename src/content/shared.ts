// Non-text data shared by both locales.
export const shared = {
  contact: { phone: '+6282184677520', email: 'ptbagusraditya@gmail.com' },
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
}
