// social-media icons
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

interface Link {
  title: string;
  to: string;
  icon?: any;
}

export const NAV_LINKS: Link[] = [
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

export const SOCIAL_MEDIA_LINKS: Link[] = [
  {
    title: "Youtube",
    to: "https://www.youtube.com",
    icon: YouTubeIcon,
  },
  {
    title: "Twitter",
    to: "",
    icon: TwitterIcon,
  },
  {
    title: "Facebook",
    to: "",
    icon: FacebookIcon,
  },
  {
    title: "Instagram",
    to: "",
    icon: InstagramIcon,
  },
  {
    title: "LinkedIn",
    to: "",
    icon: LinkedInIcon,
  },
];
