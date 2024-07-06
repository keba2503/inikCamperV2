'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from '../app/(client-components)/(Header)/SiteHeader';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/admin');
  const excludeHeaderRoutes = ['/offer'];

  const shouldShowHeader = !isDashboard && !excludeHeaderRoutes.includes(pathname);

  return (
      <>
        {shouldShowHeader && <SiteHeader />}
        {children}
      </>
  );
};

export default ClientWrapper;
