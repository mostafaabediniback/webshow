import baleIcon from "../assets/socialsIcon/bale.svg";
import eitaIcon from "../assets/socialsIcon/eita.svg";
import emailIcon from "../assets/socialsIcon/email.svg";
import instaIcon from "../assets/socialsIcon/insta.svg";
import telegramIcon from "../assets/socialsIcon/telegram.svg";
import { serverUrl } from "./axiosConfigNew";

const localIcons = {
  bale: baleIcon,
  eita: eitaIcon,
  email: emailIcon,
  insta: instaIcon,
  telegram: telegramIcon,
};

/**
 * Returns the local icon path if available, otherwise returns the original icon URL.
 * @param {string} key - Social media key (e.g., 'telegram', 'insta')
 * @param {string} serverIcon - The icon URL from the server
 * @returns {string} - Local path or server URL
 */
export const getSocialIcon = (key, serverIcon) => {
  if (localIcons[key]) {
    return localIcons[key];
  }

  if (!serverIcon) return null;

  return serverIcon.startsWith("http")
    ? serverIcon
    : `${serverUrl}${serverIcon}`;
};

export default localIcons;
