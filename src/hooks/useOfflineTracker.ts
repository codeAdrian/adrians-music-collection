import { useState } from "react";

export const useOfflineTracker = () => {
  const { onLine } = navigator;
  const [isOnline, setIsOnline] = useState(onLine);
  const [wasOffline, setWasOffline] = useState(false);

  const handleOffline = () => {
    setIsOnline(false);
    setWasOffline(true);
  };

  const handleOnline = () => {
    setIsOnline(true);
  };

  window.addEventListener("offline", handleOffline);
  window.addEventListener("online", handleOnline);

  return {
    isOnline,
    wasOffline
  };
};
