import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUp, CircleDot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DemoStage } from '../demo-stage';

const BACKGROUND = 0x0e1017;
const MIN_DISTANCE = 3;
const MAX_DISTANCE = 8;
const ZOOM_STEP = 0.2;
const PARTICLE_COUNT = 2000;
const PARTICLE_RADIUS = 5;

function createStar() {
  const points = 5;
  const shape = new THREE.Shape();
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? 1 : 0.5;
    const angle = (i / (points * 2)) * Math.PI * 2;
    if (i === 0) shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    else shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 3,
  });
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    shininess: 150,
    emissive: 0xffffcc,
    emissiveIntensity: 0.5,
  });
  const star = new THREE.Mesh(geometry, material);
  star.scale.set(0.5, 0.5, 0.5);
  return star;
}

// 반지름 5 구면에 흩뿌린 accent(시안) 계열 파티클.
function createParticles() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < positions.length; i += 3) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    positions[i] = PARTICLE_RADIUS * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = PARTICLE_RADIUS * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = PARTICLE_RADIUS * Math.cos(phi);
    colors[i] = 0.2 + Math.random() * 0.2;
    colors[i + 1] = 0.75 + Math.random() * 0.2;
    colors[i + 2] = 0.85 + Math.random() * 0.15;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geometry, material);
}

/** 컨테이너에 씬을 올리고 정리 함수를 돌려준다. */
function mountScene(container: HTMLDivElement, reduceMotion: boolean) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(BACKGROUND, 1);
  container.appendChild(renderer.domElement);

  const star = createStar();
  const particles = createParticles();
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(star, particles, new THREE.AmbientLight(0xffffff, 0.5), pointLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = MIN_DISTANCE;
  controls.maxDistance = MAX_DISTANCE;

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = container;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(container);

  // 컨테이너에 포커스가 있을 때만 받으므로 페이지 스크롤을 뺏지 않는다.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const z = camera.position.z + (event.key === 'ArrowUp' ? -ZOOM_STEP : ZOOM_STEP);
    camera.position.z = Math.max(MIN_DISTANCE, Math.min(MAX_DISTANCE, z));
  };
  const onMouseMove = (event: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    star.rotation.x = y * 0.5;
    star.rotation.y = x * 0.5;
    particles.rotation.x = y * 0.2;
    particles.rotation.y = x * 0.2;
  };
  container.addEventListener('keydown', onKeyDown);
  container.addEventListener('mousemove', onMouseMove);

  const positionAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
  const positions = positionAttr.array as Float32Array;
  let frameId = 0;
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    if (!reduceMotion) {
      star.rotation.y += 0.005;
      star.rotation.z += 0.002;
      particles.rotation.y += 0.0005;
      const time = Date.now() * 0.001;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
        positions[i] += Math.cos(time + positions[i + 2]) * 0.001;
      }
      positionAttr.needsUpdate = true;
    }
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    cancelAnimationFrame(frameId);
    observer.disconnect();
    container.removeEventListener('keydown', onKeyDown);
    container.removeEventListener('mousemove', onMouseMove);
    controls.dispose();
    star.geometry.dispose();
    star.material.dispose();
    particles.geometry.dispose();
    particles.material.dispose();
    scene.clear();
    renderer.dispose();
    renderer.domElement.remove();
  };
}

export default function ThreeViewerDemo() {
  const { t } = useTranslation('playground');
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return mountScene(container, reduceMotion);
  }, []);

  return (
    <DemoStage className="relative block h-[400px] overflow-hidden p-0">
      <div
        ref={mountRef}
        tabIndex={0}
        role="img"
        aria-label={t('demos.three-viewer.canvasLabel')}
        className="focus-visible:ring-primary size-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-inset"
      />

      <p className="bg-background/50 text-foreground/80 pointer-events-none absolute bottom-[90px] left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-center text-sm whitespace-nowrap backdrop-blur-md">
        {t('demos.three-viewer.hint')}
      </p>

      <div className="border-accent/10 bg-background/70 text-foreground pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-5 rounded-full border px-5 py-3 text-sm shadow-md backdrop-blur-md">
        <span className="flex items-center gap-2">
          <span className="bg-foreground/10 flex flex-col rounded-md p-1" aria-hidden>
            <ArrowUp className="size-3" />
            <ArrowDown className="size-3" />
          </span>
          <span className="text-accent">{t('demos.three-viewer.zoom')}</span>
        </span>
        <span className="bg-foreground/20 h-5 w-px" aria-hidden />
        <span className="flex items-center gap-2">
          <CircleDot className="text-accent size-4" aria-hidden />
          <span className="text-accent">{t('demos.three-viewer.rotate')}</span>
        </span>
      </div>
    </DemoStage>
  );
}
