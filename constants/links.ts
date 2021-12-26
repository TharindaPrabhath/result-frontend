// social-media icons
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// constants
import { BRAND } from ".";

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
    to: `${BRAND.web.sasnka}/#/about-us`,
  },
];

export const SOCIAL_MEDIA_LINKS: Link[] = [
  {
    title: "Youtube",
    to: "https://www.youtube.com/channel/UCWxCdX625pl6Z0hoGQMPcmw",
    icon: YouTubeIcon,
  },
  {
    title: "Twitter",
    to: "https://mobile.twitter.com/sasnakasansada",
    icon: TwitterIcon,
  },
  {
    title: "Facebook",
    to: "https://www.facebook.com/sasnaka/",
    icon: FacebookIcon,
  },
  {
    title: "Instagram",
    to: "https://www.instagram.com/sasnakasansada/",
    icon: InstagramIcon,
  },
  {
    title: "LinkedIn",
    to: "https://www.linkedin.com/in/sasnaka-sansada-6050401b1/",
    icon: LinkedInIcon,
  },
];
