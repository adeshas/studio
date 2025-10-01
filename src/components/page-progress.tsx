'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

function PageProgressContent() {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: Event) => { // Changed: Event instead of MouseEvent
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation = (mutations: MutationRecord[], observer: MutationObserver) => { // Fixed: added observer parameter
      const anchorElements = document.querySelectorAll('a[href]');
      anchorElements.forEach(anchor => {
        const hasClickListener = (anchor as any).hasClickListener;
        if (!hasClickListener) {
          anchor.addEventListener('click', handleAnchorClick as EventListener); // Added type assertion
          (anchor as any).hasClickListener = true;
        }
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Initial run - create a mock observer for the call
    const mockObserver = mutationObserver;
    handleMutation([], mockObserver);

    return () => {
      mutationObserver.disconnect();
      document.querySelectorAll('a[href]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener); // Added type assertion
        delete (anchor as any).hasClickListener;
      });
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}

export default function PageProgress() {
  return (
    <Suspense fallback={null}>
      <PageProgressContent />
    </Suspense>
  );
}