"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/animation";

const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

// Codrops-style two-texture distortion: a grayscale displacement map offsets
// the UVs around the cursor and drives the crossfade between both images.
const FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uDisp;
uniform vec2 uMouse;
uniform float uVel;
uniform float uTime;
uniform float uIntensity;
uniform float uMix;
uniform vec2 uPlaneRes;
uniform vec2 uImgRes1;
uniform vec2 uImgRes2;

vec2 coverUv(vec2 uv, vec2 plane, vec2 img) {
  vec2 ratio = vec2(
    min((plane.x / plane.y) / (img.x / img.y), 1.0),
    min((plane.y / plane.x) / (img.y / img.x), 1.0)
  );
  return vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
}

void main() {
  float t = uTime * 0.05;
  float d1 = texture2D(uDisp, vUv * 1.4 + vec2(t, -t * 0.6)).r;
  float d2 = texture2D(uDisp, vUv * 1.9 - vec2(t * 0.7, t)).r;
  float disp = (d1 + d2) * 0.5;

  vec2 toMouse = vUv - uMouse;
  float dist = length(toMouse);
  float influence = smoothstep(0.55, 0.0, dist);
  float strength = uIntensity * (0.035 + influence * (0.07 + uVel * 0.35));

  vec2 dir = toMouse / max(dist, 0.001);
  vec2 off = (dir * (disp - 0.5) + vec2(disp - 0.5)) * strength;

  float m = smoothstep(0.2, 0.8, uMix + (disp - 0.5) * 0.35);

  vec2 uv1 = coverUv(vUv + off * (1.0 - m), uPlaneRes, uImgRes1);
  vec2 uv2 = coverUv(vUv - off * m, uPlaneRes, uImgRes2);
  vec4 c1 = texture2D(uTex1, uv1);
  vec4 c2 = texture2D(uTex2, uv2);
  vec4 color = mix(c1, c2, m);

  float vig = smoothstep(1.2, 0.35, distance(vUv, vec2(0.5)));
  color.rgb *= mix(0.9, 1.0, vig);
  gl_FragColor = color;
}
`;

// Tileable fractal blob noise, drawn to a canvas. Blobs near an edge are
// re-drawn wrapped so the texture repeats without seams.
function makeDisplacementTexture(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  for (let octave = 0; octave < 2; octave++) {
    const count = 14 * (octave + 1);
    for (let i = 0; i < count; i++) {
      const g = Math.floor(Math.random() * 256);
      const radius = (size / (3 + octave * 2.5)) * (0.4 + Math.random());
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.globalAlpha = 0.45 / (octave + 1);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const cx = x + dx * size;
          const cy = y + dy * size;
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          grad.addColorStop(0, `rgba(${g},${g},${g},1)`);
          grad.addColorStop(1, `rgba(${g},${g},${g},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // Final blur pass so the displacement reads as liquid, not grain.
  ctx.globalAlpha = 1;
  ctx.filter = "blur(7px)";
  ctx.drawImage(canvas, 0, 0);
  ctx.filter = "none";

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

type HeroCanvasProps = {
  imageA: string;
  imageB: string;
  className?: string;
};

export default function HeroCanvas({ imageA, imageB, className }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fallback cases: small screens, touch-only devices, reduced motion, no WebGL.
    const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reduced) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const dispTex = makeDisplacementTexture();
    const uniforms = {
      uTex1: { value: null as THREE.Texture | null },
      uTex2: { value: null as THREE.Texture | null },
      uDisp: { value: dispTex },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uVel: { value: 0 },
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uMix: { value: 0 },
      uPlaneRes: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uImgRes1: { value: new THREE.Vector2(1, 1) },
      uImgRes2: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let disposed = false;
    const loader = new THREE.TextureLoader();
    const loadTex = (url: string) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        loader.load(
          url,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearFilter;
            resolve(tex);
          },
          undefined,
          reject
        );
      });

    const mouseTarget = new THREE.Vector2(0.5, 0.5);
    let mixTarget = 0;
    let velTarget = 0;
    let lastX = 0.5;
    let lastY = 0.5;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      velTarget = Math.min(1, velTarget + Math.hypot(x - lastX, y - lastY) * 6);
      lastX = x;
      lastY = y;
      mouseTarget.set(x, y);
      mixTarget = THREE.MathUtils.clamp(x, 0, 1);
    };
    window.addEventListener("pointermove", onPointerMove);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(container);

    const tick = (_time: number, deltaMS: number) => {
      if (!visible) return;
      const dt = Math.min(deltaMS, 50) / 1000;
      uniforms.uTime.value += dt;
      uniforms.uMouse.value.lerp(mouseTarget, 0.06);
      uniforms.uMix.value += (mixTarget - uniforms.uMix.value) * 0.035;
      velTarget *= 0.94;
      uniforms.uVel.value += (velTarget - uniforms.uVel.value) * 0.08;
      renderer.render(scene, camera);
    };

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uPlaneRes.value.set(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    Promise.all([loadTex(imageA), loadTex(imageB)])
      .then(([t1, t2]) => {
        if (disposed) {
          t1.dispose();
          t2.dispose();
          return;
        }
        const img1 = t1.image as HTMLImageElement;
        const img2 = t2.image as HTMLImageElement;
        uniforms.uTex1.value = t1;
        uniforms.uImgRes1.value.set(img1.width, img1.height);
        uniforms.uTex2.value = t2;
        uniforms.uImgRes2.value.set(img2.width, img2.height);
        setReady(true);
        gsap.ticker.add(tick);
        // The image "settles" like water while the headline reveals.
        gsap.fromTo(uniforms.uIntensity, { value: 3.4 }, { value: 1, duration: 2.6, ease: "power3.out", delay: 0.15 });
      })
      .catch(() => {
        // Textures failed — the static fallback underneath stays visible.
      });

    return () => {
      disposed = true;
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      dispTex.dispose();
      uniforms.uTex1.value?.dispose();
      uniforms.uTex2.value?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [imageA, imageB]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`${className ?? ""} transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
