import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

const AnimatedBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = CLOUDS({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      skyColor: 0xfdf6e3, // 크림색 하늘
      cloudColor: 0xd9e7d3, // 연한 민트 구름
      speed: 0.6,
    });
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        zIndex: -1,
      }}
    />
  );
};

export default AnimatedBackground;
