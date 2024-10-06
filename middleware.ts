import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware()

authMiddleware({ debug: true })

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};