"use client";

import { useEffect, useState } from "react";
import { BootSequence } from "./BootSequence";

const SESSION_KEY = "jvc_boot_done";

export function BootSequenceGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const done = sessionStorage.getItem(SESSION_KEY);
    if (!done) {
      setShow(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, []);

  if (!show) return null;
  return <BootSequence onComplete={() => setShow(false)} />;
}
