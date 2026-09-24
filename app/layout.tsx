import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'ECO-MISSION AI',
  description: 'Digital extension for ECO-MISSION board game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}