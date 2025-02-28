export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    //paths to protect aka paths of routes you can't see without being logged on
  ],
};
