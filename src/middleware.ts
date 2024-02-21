import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/entrar', '/api/clerk/webhook'],
  ignoredRoutes: ['/api(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/trpc(.*)'],
};
