import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
    console.log("Middleware triggered for:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log("Auth check for:", req.nextUrl.pathname, "Token exists:", !!token);
        return !!token;
      },
    },
    pages: {
      signIn: "/sign-in",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/kanban/:path*", 
    "/table/:path*",
    "/projects/:path*",
    // Also protect the exact routes without trailing paths
    "/dashboard",
    "/kanban",
    "/table", 
    "/projects"
  ],
};