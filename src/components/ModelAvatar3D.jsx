import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default function ModelAvatar3D() {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const triggerFlipRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 440;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.25, 3.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 2.2);
    frontLight.position.set(0, 3, 5);
    scene.add(frontLight);

    const cyanRimLight = new THREE.PointLight(0x14d6c4, 5, 20);
    cyanRimLight.position.set(-3, 2, 2);
    scene.add(cyanRimLight);

    const violetRimLight = new THREE.PointLight(0x7c5cff, 5, 20);
    violetRimLight.position.set(3, -1, 2);
    scene.add(violetRimLight);

    // 3. Cybernetic Backdrop Halo Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ring1Geo = new THREE.TorusGeometry(1.5, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x14d6c4, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.8, 0.01, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x7c5cff, transparent: true, opacity: 0.45 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    // 4. State & Bone References
    let mouseX = 0;
    let mouseY = 0;
    let headBone = null;
    let neckBone = null;
    let spineBone = null;
    let avatarModel = null;
    let mixer = null;
    let idleAction = null;
    let flipAction = null;

    // 5. Load GLTF Character Model (/model.glb)
    const gltfLoader = new GLTFLoader();
    const fbxLoader = new FBXLoader();

    gltfLoader.load(
      '/model.glb',
      (gltf) => {
        avatarModel = gltf.scene;

        avatarModel.traverse((child) => {
          const name = child.name.toLowerCase();
          if (name.includes('glasses')) {
            child.visible = false;
            return;
          }
          if (child.isMesh) {
            child.frustumCulled = false;
            if (child.material) {
              child.material.roughness = 0.6;
              child.material.metalness = 0.1;
              child.material.needsUpdate = true;
            }
          }
          if (child.isBone) {
            if (name.includes('head') && !name.includes('end')) headBone = child;
            if (name.includes('neck')) neckBone = child;
            if (name.includes('spine2') || name.includes('spine1')) spineBone = child;
          }
        });

        // Exact height normalization: 2.2 units
        const box = new THREE.Box3().setFromObject(avatarModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const targetHeight = 2.2;
        const scale = size.y > 0 ? targetHeight / size.y : 1;
        avatarModel.scale.setScalar(scale);
        avatarModel.position.set(-center.x * scale, -center.y * scale - 0.1, -center.z * scale);

        scene.add(avatarModel);
        mixer = new THREE.AnimationMixer(avatarModel);

        // Load Mixamo Idle
        fbxLoader.load('/warrior-idle.fbx', (idleFbx) => {
          if (idleFbx.animations && idleFbx.animations.length > 0 && mixer) {
            const clip = idleFbx.animations[0];
            idleAction = mixer.clipAction(clip);
            idleAction.setEffectiveWeight(1);
            idleAction.play();
          }
        });

        // Load Mixamo Backflip
        fbxLoader.load('/Backflip.fbx', (flipFbx) => {
          if (flipFbx.animations && flipFbx.animations.length > 0 && mixer) {
            const clip = flipFbx.animations[0];
            flipAction = mixer.clipAction(clip);
            flipAction.setLoop(THREE.LoopOnce, 1);
            flipAction.clampWhenFinished = true;
          }
        });

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading /model.glb:', err);
        setLoading(false);
      }
    );

    const triggerFlip = () => {
      if (!flipAction || !idleAction || !mixer) return;
      setIsFlipping(true);

      flipAction.reset();
      flipAction.setEffectiveWeight(1);
      flipAction.play();
      idleAction.crossFadeTo(flipAction, 0.25, true);

      const onFinished = (e) => {
        if (e.action === flipAction) {
          mixer.removeEventListener('finished', onFinished);
          idleAction.reset();
          idleAction.setEffectiveWeight(1);
          idleAction.play();
          flipAction.crossFadeTo(idleAction, 0.4, true);
          setIsFlipping(false);
        }
      };

      mixer.addEventListener('finished', onFinished);
    };

    triggerFlipRef.current = triggerFlip;

    // 6. Mouse Move Event Handler
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseX = (x / width) * 2;
      mouseY = (y / height) * 2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Render Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (mixer) mixer.update(delta);

      // Rotate background halo rings
      ringGroup.rotation.y = elapsedTime * 0.15;
      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.2;

      // Head & Eyes Cursor Look-At Tracking (only when not flipping)
      if (!isFlipping) {
        if (headBone) {
          headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, mouseX * 0.45, 0.1);
          headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, mouseY * 0.3, 0.1);
        }
        if (neckBone) {
          neckBone.rotation.y = THREE.MathUtils.lerp(neckBone.rotation.y, mouseX * 0.2, 0.1);
        }
        if (spineBone) {
          spineBone.rotation.y = THREE.MathUtils.lerp(spineBone.rotation.y, mouseX * 0.1, 0.1);
        }
      }

      // Subtle float motion
      if (avatarModel && !isFlipping) {
        avatarModel.position.y += Math.sin(elapsedTime * 1.5) * 0.0006;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isFlipping]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '460px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Loading Indicator */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            color: 'var(--accent)',
            background: 'rgba(13, 19, 34, 0.85)',
            padding: '8px 16px',
            borderRadius: '999px',
            border: '1px solid var(--border)'
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--accent)',
              animation: 'pulse 1.5s infinite'
            }}
          />
          <span>LOADING 3D AVATAR...</span>
        </div>
      )}

      {/* WebGL Canvas Mount Container (Clickable for Flip) */}
      <div
        ref={mountRef}
        onClick={() => triggerFlipRef.current && triggerFlipRef.current()}
        title="Click Avatar to trigger backflip!"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          cursor: isFlipping ? 'wait' : 'pointer'
        }}
      />

      {/* Cyber Telemetry Overlay Badges */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '16px'
        }}
      >
        {/* Top Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(13, 19, 34, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)'
              }}
            />
            <span>3D_AVATAR // LIVE</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerFlipRef.current && triggerFlipRef.current();
            }}
            disabled={isFlipping}
            style={{
              pointerEvents: 'auto',
              padding: '6px 14px',
              borderRadius: '999px',
              background: isFlipping ? 'var(--primary)' : 'rgba(13, 19, 34, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: isFlipping ? '#06101f' : 'var(--primary-2)',
              cursor: isFlipping ? 'wait' : 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
          >
            {isFlipping ? '🤸 FLIPPING...' : '⚡ PERFORM FLIP'}
          </button>
        </div>

        {/* Bottom Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              background: 'rgba(13, 19, 34, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              fontSize: '0.78rem',
              color: 'var(--text-2)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            AWS / EKS / Terraform
          </div>

          <div
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              background: 'rgba(13, 19, 34, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              fontSize: '0.78rem',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            Interactive Gaze & Physics
          </div>
        </div>
      </div>
    </div>
  );
}
