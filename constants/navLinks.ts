interface NavLink {
  title: string;
  to: string;
}

const NAV_LINKS: NavLink[] = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Leaderboard",
    to: "/leaderboard",
  },
  {
    title: "About",
    to: "/about",
  },
];

export default NAV_LINKS;
