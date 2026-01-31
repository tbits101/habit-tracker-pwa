# Habit Tracker

A Progressive Web App for building and tracking daily habits.

## Features

- 🎯 **Habit Management**: Create, edit, and organize custom habits
- 📊 **Progress Tracking**: Visual progress indicators and streaks
- 📱 **PWA Support**: Install on your device, works offline
- 📈 **Analytics**: Charts and insights about your progress
- 🔔 **Smart Reminders**: Push notifications for habit completion
- 🌙 **Dark Mode**: Customizable theme support

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or use a cloud provider)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd habits
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database URL and other secrets
```

4. Set up the database:
```bash
npx prisma db push
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **PWA**: Service Workers, Web App Manifest
- **Authentication**: NextAuth.js (planned)
- **State Management**: Zustand, React Query

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/        # React components
│   ├── ui/           # Reusable UI components
│   └── habits/       # Habit-specific components
├── lib/              # Utility functions
└── types/            # TypeScript type definitions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:studio` - Open Prisma Studio
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations

### Database Management

Use Prisma Studio to view and edit your data:
```bash
npm run db:studio
```

## PWA Features

This app includes Progressive Web App capabilities:

- ✅ Offline functionality
- ✅ Install to home screen
- ✅ Push notifications
- ✅ Background sync
- ✅ Fast loading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [x] Basic habit tracking
- [ ] User authentication
- [ ] Analytics dashboard
- [ ] Social features
- [ ] Mobile apps
- [ ] AI-powered insights