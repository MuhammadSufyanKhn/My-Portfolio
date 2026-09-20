export const PAGE_TITLES: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/education": "Education",
  "/experience": "Experience",
  "/projects": "Projects",
  "/dotnet-projects": ".NET Projects",
  "/python-projects": "Python Projects",
  "/semester-projects": "Semester Projects",
  "/others-projects": "Other Projects",
  "/skills": "Skills",
  "/certifications": "Certifications",
  "/internship": "Internship",
  "/contact": "Contact",
};

export function getPageTitle(pathname: string): string {
  // Direct match
  if (PAGE_TITLES[pathname]) {
    return PAGE_TITLES[pathname];
  }

  // Fallback: extract and format from pathname
  const slug = pathname.replace(/^\/+|\/+$/g, "").split("/")[0];
  if (!slug) return "Home";

  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
