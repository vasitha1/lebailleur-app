import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';
import PropertyStatsDemo from './pages/PropertyStatsDemo';
import AddPropertyDemo from './pages/AddPropertyDemo';
import FileUploadDemo from './pages/FileUploadDemo';
import RealTimeDemo from './pages/RealTimeDemo';

const landingRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/onboarding', element: <OnboardingPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/test', element: <TestPage /> },
  { path: '/property-stats', element: <PropertyStatsDemo /> },
  { path: '/add-property', element: <AddPropertyDemo /> },
  { path: '/file-upload', element: <FileUploadDemo /> },
  { path: '/real-time', element: <RealTimeDemo /> },
];

export default landingRoutes;