import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { HomePage } from './components/HomePage';
import { OpportunitiesPage } from './components/OpportunitiesPage';
import { CelebrationPage, CelebrationBooking } from './components/CelebrationPage';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
// import { AboutPage } from './components/AboutPage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

type Page = 'home' | 'opportunities' | 'celebration' | 'dashboard' ;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'volunteer' | 'ngo'>('volunteer');
  
  // Mock user data
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@email.com',
    totalHours: 32,
    badge: 'silver' as 'bronze' | 'silver' | 'gold',
    rating: 4.8,
  });

  const handleNavigate = (page: string) => {
    if (page === 'dashboard' && !isLoggedIn) {
      setIsLoginModalOpen(true);
      toast.error('Please login to access the dashboard');
      return;
    }
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (email: string, role: 'volunteer' | 'ngo') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUser({
      ...user,
      email,
    });
    toast.success(`Welcome back, ${role === 'volunteer' ? 'Volunteer' : 'Admin'}!`);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
    toast.success('Logged out successfully');
  };

  const handleBookSlot = (opportunityId: number) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      toast.error('Please login to book a slot');
      return;
    }
    toast.success('Slot booked successfully! NGO will review your request.');
  };

  const handleBookCelebration = (data: CelebrationBooking) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    console.log('Celebration booking:', data);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'opportunities':
        return <OpportunitiesPage onBookSlot={handleBookSlot} />;
      case 'celebration':
        return <CelebrationPage onBookCelebration={handleBookCelebration} />;
      case 'dashboard':
        if (!isLoggedIn) {
          return <HomePage onNavigate={handleNavigate} />;
        }
        return userRole === 'volunteer' ? (
          <VolunteerDashboard user={user} />
        ) : (
          <AdminDashboard />
        );
      // case 'about':
      //   return <AboutPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation
        onLoginClick={() => setIsLoginModalOpen(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <Toaster position="top-right" />
    </div>
  );
}
