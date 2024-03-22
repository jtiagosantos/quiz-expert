import { authMiddleware } from '@/packages/auth';

export default authMiddleware({
  publicRoutes: ['/', '/quiz(.*)'],
  ignoredRoutes: ['/api(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/trpc(.*)'],
};
