import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/constants';
import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/Home';
import CurriculumPage from '@/pages/Curriculum';
import FacultyPage from '@/pages/Faculty';
import ResearchPage from '@/pages/Research';
import NotFoundPage from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.CURRICULUM, element: <CurriculumPage /> },
      { path: ROUTES.FACULTY, element: <FacultyPage /> },
      { path: ROUTES.RESEARCH, element: <ResearchPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
