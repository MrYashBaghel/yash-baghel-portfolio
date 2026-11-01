import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

interface Props {
  theme?: 'dark' | 'light'
}

// ── Exact 5 Camera Rail Waypoints from Divyansh's Portfolio ───────────────
// [camX, camY, camZ, lookAtX, lookAtY, lookAtZ]
const WAYPOINTS: [number, number, number, number, number, number][] = [
  [0, 1.4, 5.4, 0, 1.0, 0],         // 0.00: Hero (Framed gracefully on the right)
  [2.2, 1.7, 4.0, 0.1, 1.35, 0],     // 0.25: Medium close-up angled right (Pillars)
  [-2.6, 2.5, 5.0, -0.1, 1.1, 0],    // 0.50: Elevated left perspective (Experience)
  [0.2, 0.8, 3.7, 0, 1.42, 0],       // 0.75: Low-angle dramatic upward view (Architecture)
  [3.2, 2.1, 6.0, 0, 1.0, 0],        // 1.00: Wide panoramic vista (Contact)
]

export default function ThreeHeroCanvas({ theme = 'dark' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const triggerFlipRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── 1. Scene & Camera ────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // Palette
    const isDark = theme === 'dark'
    const colorPrimary = new THREE.Color(isDark ? '#4a93f0' : '#1560bd')
    const colorTeal    = new THREE.Color(isDark ? '#14d6c4' : '#0bb6a4')
    const colorViolet  = new THREE.Color(isDark ? '#7c5cff' : '#6a47ff')

    // ── 2. Studio Lighting Rig ───────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(isDark ? 0x223355 : 0xaaccff, 1.6)
    scene.add(ambientLight)

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.4 : 3.0)
    keyLight.position.set(5, 8, 6)
    scene.add(keyLight)

    // Neon Teal Rim light
    const tealRim = new THREE.PointLight(colorTeal, isDark ? 16 : 8, 22)
    tealRim.position.set(-4, 3, -3)
    scene.add(tealRim)

    // Neon Violet Rim light
    const violetRim = new THREE.PointLight(colorViolet, isDark ? 18 : 10, 22)
    violetRim.position.set(4, 2, -3)
    scene.add(violetRim)

    // Ground fill
    const groundFill = new THREE.PointLight(colorPrimary, isDark ? 10 : 5, 14)
    groundFill.position.set(0, -1, 2)
    scene.add(groundFill)

    // ── 3. Ground Plane & Infinite Perspective Grid at Y = 0 ────────────
    const gridHelper = new THREE.GridHelper(60, 60, colorTeal, isDark ? 0x153055 : 0xccddee)
    gridHelper.position.set(0, 0, 0)
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.transparent = true
      gridHelper.material.opacity = isDark ? 0.3 : 0.18
    }
    scene.add(gridHelper)

    // Ground reflective disc at Y = 0.005
    const discGeo = new THREE.CircleGeometry(2.6, 64)
    const discMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0e1424 : 0xe2eaf5,
      transparent: true,
      opacity: 0.45,
    })
    const groundDisc = new THREE.Mesh(discGeo, discMat)
    groundDisc.rotation.x = -Math.PI / 2
    groundDisc.position.set(0, 0.005, 0)
    scene.add(groundDisc)

    // ── 4. Floating Holographic Tech Cards ──────────────────────────────
    const createFloatingCard = (x: number, y: number, z: number, ry: number, color: THREE.Color) => {
      const cardGroup = new THREE.Group()
      cardGroup.position.set(x, y, z)
      cardGroup.rotation.set(0, ry, 0.05)

      const planeGeo = new THREE.PlaneGeometry(1.4, 0.9)
      const planeMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: isDark ? 0.08 : 0.04,
        side: THREE.DoubleSide,
      })
      const plane = new THREE.Mesh(planeGeo, planeMat)

      const edgeGeo = new THREE.EdgesGeometry(planeGeo)
      const edgeMat = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: isDark ? 0.45 : 0.25,
      })
      const edges = new THREE.LineSegments(edgeGeo, edgeMat)

      cardGroup.add(plane)
      cardGroup.add(edges)
      return cardGroup
    }

    const cardLeft = createFloatingCard(-3.4, 2.2, -3, 0.55, colorTeal)
    const cardRight = createFloatingCard(3.4, 1.8, -3.5, -0.6, colorPrimary)
    scene.add(cardLeft)
    scene.add(cardRight)

    // ── 5. Concentric Gyroscopic Rings at Torso Height (Y = 0.55) ───────
    const isMobile = window.innerWidth / Math.max(1, window.innerHeight) < 1.1
    const ringY = isMobile ? 0.3 : 0.55
    const ringScale = isMobile ? 0.66 : 1.0

    const ringsGroup = new THREE.Group()
    ringsGroup.position.set(0, ringY, 0)
    ringsGroup.scale.set(ringScale, ringScale, ringScale)
    scene.add(ringsGroup)

    const ringMat1 = new THREE.MeshStandardMaterial({
      color: colorPrimary,
      emissive: colorPrimary,
      emissiveIntensity: 1.15,
      roughness: 0.3,
      metalness: 0.4,
      transparent: true,
      opacity: isDark ? 0.7 : 0.45,
    })
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: colorTeal,
      emissive: colorTeal,
      emissiveIntensity: 1.35,
      roughness: 0.3,
      metalness: 0.4,
      transparent: true,
      opacity: isDark ? 0.7 : 0.45,
    })
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: colorViolet,
      emissive: colorViolet,
      emissiveIntensity: 1.1,
      roughness: 0.3,
      metalness: 0.4,
      transparent: true,
      opacity: isDark ? 0.65 : 0.4,
    })

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.016, 14, 96), ringMat1)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.02, 0.012, 14, 96), ringMat2)
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.72, 0.010, 14, 96), ringMat3)

    ring1.rotation.set(1.18, 0, 0)
    ring2.rotation.set(0.98, 0, 0)
    ring2.scale.set(1.16, 1.16, 1.16)
    ring3.rotation.set(1.32, 0.4, 0)
    ring3.scale.set(0.82, 0.82, 0.82)

    ringsGroup.add(ring1)
    ringsGroup.add(ring2)
    ringsGroup.add(ring3)

    // Deep background wireframe icosahedron
    const outerIcoGeo = new THREE.IcosahedronGeometry(6.4, 1)
    const outerIcoMat = new THREE.MeshBasicMaterial({
      color: colorPrimary,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.08 : 0.04,
      depthWrite: false,
    })
    const outerIco = new THREE.Mesh(outerIcoGeo, outerIcoMat)
    outerIco.position.set(0, 1.0, -4.5)
    scene.add(outerIco)

    // ── 6. Ascending Telemetry Particles ────────────────────────────────
    const particleCount = 1200
    const particleGeo = new THREE.BufferGeometry()
    const pPositions = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)
    const pSpeeds = new Float32Array(particleCount)
    const palette = [colorPrimary, colorTeal, colorViolet]

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 16
      pPositions[i * 3 + 1] = Math.random() * 8 - 1
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 12

      const col = palette[Math.floor(Math.random() * palette.length)]
      pColors[i * 3]     = col.r
      pColors[i * 3 + 1] = col.g
      pColors[i * 3 + 2] = col.b

      pSpeeds[i] = 0.2 + Math.random() * 0.5
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.7 : 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── 7. Custom 3D Character Model (Yash Baghel) ──────────────────────
    const charGroup = new THREE.Group()
    charGroup.position.set(0, 0, 0)
    scene.add(charGroup)

    let mixer: THREE.AnimationMixer | null = null
    let idleAction: THREE.AnimationAction | null = null
    let flipAction: THREE.AnimationAction | null = null
    let characterModel: THREE.Group | null = null

    const trackedBones: {
      head?: THREE.Bone
      neck?: THREE.Bone
      spine2?: THREE.Bone
    } = {}

    let targetYaw = 0
    let targetPitch = 0
    let currentYaw = 0
    let currentPitch = 0

    const gltfLoader = new GLTFLoader()
    const fbxLoader = new FBXLoader()

    gltfLoader.load('/model.glb', (gltf) => {
      characterModel = gltf.scene

      // Exact Divyansh scale normalization: 1.8 meters total height
      const bbox = new THREE.Box3().setFromObject(characterModel)
      const size = bbox.getSize(new THREE.Vector3())
      const normScale = size.y > 0 ? 1.8 / size.y : 1
      const normY = -bbox.min.y * normScale

      characterModel.scale.set(normScale, normScale, normScale)
      characterModel.position.set(0, normY, 0)

      characterModel.traverse((child) => {
        const name = child.name.toLowerCase()

        if (name.includes('glasses')) {
          child.visible = false
          return
        }

        if ((child as THREE.Mesh).isMesh || (child as THREE.SkinnedMesh).isSkinnedMesh) {
          const mesh = child as THREE.SkinnedMesh
          mesh.castShadow = true
          mesh.receiveShadow = true

          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial
            mat.roughness = 0.6
            mat.metalness = 0.1
            mat.needsUpdate = true
          }
        }

        if ((child as THREE.Bone).isBone) {
          const bone = child as THREE.Bone
          if (name.includes('head') && !name.includes('end')) trackedBones.head = bone
          if (name.includes('neck')) trackedBones.neck = bone
          if (name.includes('spine2') || name.includes('spine1')) trackedBones.spine2 = bone
        }
      })

      charGroup.add(characterModel)
      mixer = new THREE.AnimationMixer(characterModel)

      // Load Warrior-Idle FBX Animation
      fbxLoader.load('/warrior-idle.fbx', (idleFbx) => {
        if (idleFbx.animations && idleFbx.animations.length > 0 && mixer) {
          const clip = idleFbx.animations[0]
          idleAction = mixer.clipAction(clip)
          idleAction.setEffectiveWeight(1)
          idleAction.play()
        }
      })

      // Load Backflip FBX Animation
      fbxLoader.load('/Backflip.fbx', (flipFbx) => {
        if (flipFbx.animations && flipFbx.animations.length > 0 && mixer) {
          const clip = flipFbx.animations[0]
          flipAction = mixer.clipAction(clip)
          flipAction.setLoop(THREE.LoopOnce, 1)
          flipAction.clampWhenFinished = true
        }
      })
    })

    const triggerFlip = () => {
      if (!flipAction || !idleAction || !mixer) return
      setIsFlipping(true)

      idleAction.fadeOut(0.2)
      flipAction.reset()
      flipAction.fadeIn(0.2)
      flipAction.play()

      const onFinished = () => {
        if (!flipAction || !idleAction) return
        flipAction.fadeOut(0.3)
        idleAction.reset()
        idleAction.fadeIn(0.3)
        idleAction.play()
        setIsFlipping(false)
        mixer?.removeEventListener('finished', onFinished)
      }

      mixer.addEventListener('finished', onFinished)
    }
    triggerFlipRef.current = triggerFlip

    // ── 8. Pointer Movement & Gaze Tracking ─────────────────────────────
    let mouseNormX = 0
    let mouseNormY = 0

    const onPointerMove = (e: PointerEvent) => {
      mouseNormX = (e.clientX / window.innerWidth) * 2 - 1
      mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1

      targetYaw = mouseNormX * 0.65
      targetPitch = mouseNormY * 0.45
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // Raycast click detection on the character
    const raycaster = new THREE.Raycaster()
    const mouseCoord = new THREE.Vector2()

    const onPointerDown = (e: MouseEvent) => {
      if (!characterModel) return
      mouseCoord.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseCoord.y = -(e.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouseCoord, camera)
      const intersects = raycaster.intersectObjects(charGroup.children, true)
      if (intersects.length > 0) {
        triggerFlip()
      }
    }
    window.addEventListener('click', onPointerDown)

    // ── 9. Continuous Scroll Progress Tracking ──────────────────────────
    let rawScrollProgress = 0
    let smoothScrollProgress = 0

    const onScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      rawScrollProgress = totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll)) : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // ── 10. Hermite Spline Camera Function Matching Divyansh ────────────
    const targetCamPos = new THREE.Vector3()
    const targetLookAt = new THREE.Vector3()
    const currentCamPos = new THREE.Vector3(0, 1.4, 5.4)
    const currentLookAt = new THREE.Vector3(0, 1.0, 0)

    const calcCameraRail = (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress))
      const count = WAYPOINTS.length - 1
      const stageFloat = clamped * count
      const stageIdx = Math.floor(stageFloat)
      const t = stageFloat - stageIdx

      const p0 = WAYPOINTS[Math.min(stageIdx, count)]
      const p1 = WAYPOINTS[Math.min(stageIdx + 1, count)]

      // Smoothstep interpolation curve (c = t * t * (3 - 2 * t))
      const smoothT = t * t * (3 - 2 * t)

      const camX = THREE.MathUtils.lerp(p0[0], p1[0], smoothT)
      const camY = THREE.MathUtils.lerp(p0[1], p1[1], smoothT)
      const camZ = THREE.MathUtils.lerp(p0[2], p1[2], smoothT)

      const lookX = THREE.MathUtils.lerp(p0[3], p1[3], smoothT)
      const lookY = THREE.MathUtils.lerp(p0[4], p1[4], smoothT)
      const lookZ = THREE.MathUtils.lerp(p0[5], p1[5], smoothT)

      targetCamPos.set(camX, camY, camZ)
      targetLookAt.set(lookX, lookY, lookZ)

      // Desktop offset in Stage 0: shifts camera left so character appears on the right
      const aspect = window.innerWidth / Math.max(1, window.innerHeight)
      if (aspect >= 1.1) {
        const heroOffset = -1.35 * Math.max(0, Math.min(1, 1 - clamped * 3))
        targetCamPos.x += heroOffset
        targetLookAt.x += heroOffset
      } else {
        // Mobile framing: pull camera back slightly and lift lookAt
        const mobileFactor = THREE.MathUtils.clamp(0.62 + 0.38 * ((aspect - 0.45) / 0.65), 0.62, 1)
        targetCamPos.lerpVectors(targetLookAt, targetCamPos, mobileFactor)
        targetCamPos.y += (1 - mobileFactor) * 0.35
        targetLookAt.y += (1 - mobileFactor) * 0.45
      }

      // Parallax mouse tilt
      targetCamPos.x += mouseNormX * 0.35
      targetCamPos.y += mouseNormY * 0.2
      targetLookAt.x += mouseNormX * 0.18
      targetLookAt.y += mouseNormY * 0.1
    }

    // ── 11. Window Resize Handler ───────────────────────────────────────
    const onResize = () => {
      if (!container) return
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)

      const mob = w / Math.max(1, h) < 1.1
      ringsGroup.position.set(0, mob ? 0.3 : 0.55, 0)
      ringsGroup.scale.set(mob ? 0.66 : 1.0, mob ? 0.66 : 1.0, mob ? 0.66 : 1.0)
    }
    window.addEventListener('resize', onResize)

    // ── 12. Render & Physics Loop ───────────────────────────────────────
    let clock = new THREE.Clock()
    let frameId = 0
    const euler = new THREE.Euler()
    const quat = new THREE.Quaternion()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      // Mixer update
      if (mixer) {
        mixer.update(delta)
      }

      // Smooth scroll lerp
      smoothScrollProgress += (rawScrollProgress - smoothScrollProgress) * 0.08
      calcCameraRail(smoothScrollProgress)

      // Camera lerp
      currentCamPos.lerp(targetCamPos, 0.065)
      currentLookAt.lerp(targetLookAt, 0.065)
      camera.position.copy(currentCamPos)
      camera.lookAt(currentLookAt)

      // Gaze & head tracking lerp
      currentYaw += (targetYaw - currentYaw) * 0.08
      currentPitch += (targetPitch - currentPitch) * 0.08

      if (characterModel) {
        const bones = [
          { bone: trackedBones.spine2, weight: 0.1 },
          { bone: trackedBones.neck, weight: 0.35 },
          { bone: trackedBones.head, weight: 0.55 },
        ]

        for (const { bone, weight } of bones) {
          if (bone) {
            euler.set(currentPitch * weight, currentYaw * weight, 0, 'XYZ')
            quat.setFromEuler(euler)
            bone.quaternion.multiply(quat)
          }
        }
      }

      // Gyroscopic rings rotation matching Divyansh:
      ring1.rotation.z = elapsed * 0.16
      ring2.rotation.z = -elapsed * 0.11
      ring2.rotation.x = 0.98 + Math.sin(elapsed * 0.3) * 0.05
      ring3.rotation.z = elapsed * 0.07
      ring3.rotation.y = 0.4 + Math.sin(elapsed * 0.22) * 0.08

      // Floating tech card subtle sway
      cardLeft.position.y = 2.2 + Math.sin(elapsed * 0.9) * 0.1
      cardRight.position.y = 1.8 + Math.cos(elapsed * 0.8) * 0.1

      // Ascending particle field update
      const positions = particles.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const yIndex = i * 3 + 1
        positions[yIndex] += pSpeeds[i] * delta * 0.65
        if (positions[yIndex] > 8) {
          positions[yIndex] = 0
        }
      }
      particles.geometry.attributes.position.needsUpdate = true
      particles.rotation.y = elapsed * 0.015

      // Deep icosahedron rotation
      outerIco.rotation.y = elapsed * 0.02

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('click', onPointerDown)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      discGeo.dispose()
      discMat.dispose()
      ringMat1.dispose()
      ringMat2.dispose()
      ringMat3.dispose()
      outerIcoGeo.dispose()
      outerIcoMat.dispose()
    }
  }, [theme])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          cursor: 'grab',
        }}
      />

      {/* Backflip interaction: click the 3D character directly */}
    </div>
  )
}
