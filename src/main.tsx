import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { Skeleton } from '@/components/ui/skeleton';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { ExplorePage } from '@/pages/ExplorePage'
import { SpotPage } from '@/pages/SpotPage'
import { AppLayout } from '@/components/layout/AppLayout'

const LazyMapPage = lazy(() => import('@/pages/MapPage').then(module => ({ default: module.MapPage })));
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout container><HomePage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/explore",
    element: <AppLayout container><ExplorePage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/map",
    element: (
      <AppLayout container>
        <Suspense fallback={<div className="flex items-center justify-center h-[70vh]"><Skeleton className="h-[70vh] w-full max-w-4xl rounded-4xl" /></div>}>
          <LazyMapPage />
        </Suspense>
      </AppLayout>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/spot/:id",
    element: <AppLayout container><SpotPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)