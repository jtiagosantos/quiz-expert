import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/quiz(.*)'],
  ignoredRoutes: ['/api(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/trpc(.*)'],
};

//QUERY: quizzes.all().where(.ts >= Time('2024-02-27T02:51:46.910Z') && .ts <= Time('2024-02-29T00:18:19.350Z')).order((desc(.times_played))).take(2)
