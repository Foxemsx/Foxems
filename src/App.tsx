import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimeStats from './components/AnimeStats';
import TierDisplay from './components/TierDisplay';
import GamingLibrary from './components/GamingLibrary';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import SidebarNavigation from './components/SidebarNavigation';
import './styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
           <Hero />
           <AnimeStats />
           <TierDisplay />
           <GamingLibrary />
         </main>
        <Footer />
        <BackToTop />
        <SidebarNavigation />
      </div>
    </QueryClientProvider>
  );
}

export default App;