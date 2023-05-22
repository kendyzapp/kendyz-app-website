import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/prestations",
    "/prestations/:prestationId",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/api/auth/[...clerk]",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
