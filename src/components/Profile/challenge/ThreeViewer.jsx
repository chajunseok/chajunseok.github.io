import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as PS from '../styles/PlaygroundStyles';

const ThreeViewer = () => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, Renderer 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x0a192f, 1);
    mountRef.current.appendChild(renderer.domElement);

    // 별 모양 생성
    const starShape = new THREE.Shape();
    const points = 5;  // 별의 꼭지점 수
    const outerRadius = 1;
    const innerRadius = 0.5;

    for(let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if(i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starGeometry = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3
    });

    const starMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      shininess: 150,
      emissive: 0xffffcc,
      emissiveIntensity: 0.5
    });

    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.scale.set(0.5, 0.5, 0.5);
    scene.add(star);

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 파티클 시스템 수정 - 더 넓은 범위
    const particlesCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i += 3) {
      // 구형으로 파티클 배치 - 더 큰 반경
      const radius = 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      // 파티클 색상 - 더 은은한 청록색 계열
      colors[i] = 0.3 + Math.random() * 0.2;     // R
      colors[i + 1] = 0.8 + Math.random() * 0.2; // G
      colors[i + 2] = 0.7 + Math.random() * 0.2; // B
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 카메라 위치 설정
    camera.position.z = 5;

    // OrbitControls 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 8;
    controlsRef.current = controls;

    // 키보드 컨트롤 설정
    const handleKeyDown = (event) => {
      // 방향키 스크롤 방지
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
      }
      
      switch(event.key) {
        case 'ArrowUp':
          camera.position.z -= 0.2;
          break;
        case 'ArrowDown':
          camera.position.z += 0.2;
          break;
        default:
          break;
      }
      camera.position.z = Math.max(3, Math.min(8, camera.position.z));
    };

    window.addEventListener('keydown', handleKeyDown);

    // 애니메이션 루프 수정
    const animate = () => {
      requestAnimationFrame(animate);

      // 별 회전
      star.rotation.y += 0.005;
      star.rotation.z += 0.002;

      // 파티클 움직임
      particles.rotation.y += 0.0005;
      const positions = particlesGeometry.attributes.position.array;
      const time = Date.now() * 0.001;

      for(let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
        positions[i] += Math.cos(time + positions[i + 2]) * 0.001;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 마우스 이벤트 수정
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // 별과 파티클이 마우스 움직임에 따라 부드럽게 회전
      star.rotation.x = y * 0.5;
      star.rotation.y = x * 0.5;
      particles.rotation.x = y * 0.2;
      particles.rotation.y = x * 0.2;
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // 반응형 처리
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 클린업 수정
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      
      // mountRef가 존재할 때만 cleanup 실행
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Three.js 리소스 정리
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.clear();
    };
  }, []);

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        borderRadius: '15px',
        overflow: 'hidden'
      }}>
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
        
        {/* 설명 텍스트 추가 */}
        <div style={{
          position: 'absolute',
          bottom: '90px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.9rem',
          textAlign: 'center',
          background: 'rgba(10, 25, 47, 0.5)',
          padding: '8px 16px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
        }}>
          마우스와 방향키로 자유롭게 조작해보세요
        </div>

        {/* 기존 컨트롤 안내 UI */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '20px',
          background: 'rgba(10, 25, 47, 0.7)',
          padding: '12px 20px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(100, 255, 218, 0.1)',
          color: '#fff',
          fontSize: '0.9rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              padding: '4px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '6px'
            }}>
              <span style={{ fontSize: '0.7rem' }}>↑</span>
              <span style={{ fontSize: '0.7rem' }}>↓</span>
            </div>
            <span style={{ color: '#64ffda' }}>Zoom</span>
          </div>

          <div style={{
            width: '1px',
            background: 'rgba(255, 255, 255, 0.2)',
            margin: '0 5px'
          }} />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(100, 255, 218, 0.5)',
              borderRadius: '50%',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '6px',
                height: '6px',
                background: '#64ffda',
                borderRadius: '50%'
              }} />
            </div>
            <span style={{ color: '#64ffda' }}>Rotate</span>
          </div>
        </div>
      </div>
    </PS.MotionContainer>
  );
};

export default ThreeViewer; 