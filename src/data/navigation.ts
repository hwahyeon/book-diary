export interface Navigation {
  href: string;
  label: string;
  submenu?: { href: string; label: string }[];
}

export const navigation: Navigation[] = [
  {
    href: "/book",
    label: "Books",
    submenu: [
      { href: "/book/", label: "Calender" },
      { href: "/book/all", label: "View All Books" },
    ],
  },
  // { href: "/paper", label: "Papers" },
  // { href: "/movie", label: "Movies" },
];
