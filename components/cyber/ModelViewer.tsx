"use client";

import { createElement, useEffect, useState } from "react";

/**
 * Thin wrapper around Google's <model-viewer> web component.
 * The library (and three.js under it) is loaded only when a .glb is
 * actually shown, so it never weighs down the default portrait view.
 */
const ModelViewer = ({ src }: { src: string }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="absolute inset-0 flex items-center justify-center hud-label animate-flicker">
        LOADING MESH...
      </div>
    );
  }

  return createElement("model-viewer", {
    src,
    alt: "3D avatar",
    "camera-controls": true,
    "auto-rotate": true,
    "rotation-per-second": "20deg",
    "interaction-prompt": "none",
    "shadow-intensity": "1",
    exposure: "1.1",
    "environment-image": "neutral",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      background: "transparent",
      "--poster-color": "transparent",
    } as React.CSSProperties,
  });
};

export default ModelViewer;
