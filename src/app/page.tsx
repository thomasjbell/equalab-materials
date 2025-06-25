import MaterialGrid from '../components/MaterialGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <MaterialGrid />
      </div>
    </main>
  );
}