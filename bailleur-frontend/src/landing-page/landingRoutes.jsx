import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';

const landingRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/onboarding', element: <OnboardingPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/test', element: <TestPage /> },
];

export default landingRoutes;