import { useCallback, useEffect, useState } from "react";

const PREFERENCE_KEY = "arbaeentv:pwa-install-preference";
const REMIND_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
const PROMPT_DELAY_MS = 3000;

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.matchMedia("(display-mode: window-controls-overlay)").matches ||
  window.navigator.standalone === true;

const isIosDevice = () =>
  /iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
  (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);

const readPreference = () => {
  try {
    return JSON.parse(window.localStorage.getItem(PREFERENCE_KEY));
  } catch {
    return null;
  }
};

const isSuppressedByPreference = () => {
  const preference = readPreference();
  return preference?.never === true || Number(preference?.remindAfter) > Date.now();
};

const savePreference = (preference) => {
  // A pending native prompt must not undo a permanent dismissal in another tab.
  if (preference.never !== true && readPreference()?.never === true) return;

  try {
    window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(preference));
  } catch {
    // The in-memory dismissal still applies when browser storage is unavailable.
  }
};

export default function usePwaInstall() {
  const [isIos] = useState(isIosDevice);
  const [isInstalled, setIsInstalled] = useState(isStandalone);
  const [isSuppressed, setIsSuppressed] = useState(isSuppressedByPreference);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installError, setInstallError] = useState(false);

  const postpone = useCallback(() => {
    savePreference({ remindAfter: Date.now() + REMIND_AFTER_MS });
    setIsSuppressed(true);
    setIsOpen(false);
  }, []);

  const dismissForever = useCallback(() => {
    savePreference({ never: true });
    setIsSuppressed(true);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleInstallPrompt = (event) => {
      event.preventDefault();
      setInstallError(false);
      setInstallPrompt(event);
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setIsOpen(false);
    };
    const handleDisplayChange = () => {
      if (isStandalone()) handleInstalled();
    };
    const handlePreferenceChange = (event) => {
      if (event.key === PREFERENCE_KEY && isSuppressedByPreference()) {
        setIsSuppressed(true);
        setIsOpen(false);
      }
    };
    const standaloneMedia = window.matchMedia("(display-mode: standalone)");
    const overlayMedia = window.matchMedia("(display-mode: window-controls-overlay)");

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);
    window.addEventListener("storage", handlePreferenceChange);
    standaloneMedia.addEventListener("change", handleDisplayChange);
    overlayMedia.addEventListener("change", handleDisplayChange);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
      window.removeEventListener("storage", handlePreferenceChange);
      standaloneMedia.removeEventListener("change", handleDisplayChange);
      overlayMedia.removeEventListener("change", handleDisplayChange);
    };
  }, []);

  useEffect(() => {
    if (isInstalled || isSuppressed || (!installPrompt && !isIos)) return;

    const timeout = window.setTimeout(() => setIsOpen(true), PROMPT_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [installPrompt, isInstalled, isIos, isSuppressed]);

  const install = async () => {
    if (!installPrompt || isInstalling) return;

    const event = installPrompt;
    setInstallPrompt(null);
    setIsInstalling(true);
    setIsOpen(false);

    try {
      // Keep prompt() in the click handler's activation; each event is single-use.
      await event.prompt();
      await event.userChoice;
      postpone();
    } catch {
      setInstallError(true);
      setIsOpen(true);
    } finally {
      setIsInstalling(false);
    }
  };

  return {
    isOpen: isOpen && !isInstalled && !isSuppressed,
    isIos,
    isInstalling,
    installError,
    install,
    postpone,
    dismissForever,
  };
}
