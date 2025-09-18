"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let controls: OrbitControls;
    let water: Water;
    let mesh: THREE.Object3D;
    let frameId: number;
    let renderTarget: THREE.WebGLRenderTarget | undefined;

    // 🔑 Animation mixer for GLB
    let mixer: THREE.AnimationMixer | null = null;

    const clock = new THREE.Clock(); // Required for animation mixer

    const init = () => {
      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.5;
      containerRef.current!.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        1,
        20000
      );
      camera.position.set(0, 30, 100);

      // Water
      const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
      water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load(
          "/water.jpg",
          (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          }
        ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined,
      });
      water.rotation.x = -Math.PI / 2;
      scene.add(water);

      // Sky
      const sky = new Sky();
      sky.scale.setScalar(10000);
      scene.add(sky);

      // Adjust sky parameters for nighttime/moonlit atmosphere
      const skyUniforms = sky.material.uniforms;
      skyUniforms["turbidity"].value = 10;        // Lower turbidity for clearer night sky
      skyUniforms["rayleigh"].value = 0.5;       // Reduced scattering for darker sky
      skyUniforms["mieCoefficient"].value = 0.002; // Less atmospheric particles
      skyUniforms["mieDirectionalG"].value = 10.7;

      const parameters = {
        elevation: 30,    // Moon elevation angle
        azimuth: 180,     // Moon azimuth angle
      };

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const sceneEnv = new THREE.Scene();
      const moon = new THREE.Vector3();

      // Create a visible moon object
      const moonGeometry = new THREE.SphereGeometry(50, 32, 32);
      const moonMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
      scene.add(moonMesh);

      function updateMoon() {
        const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
        const theta = THREE.MathUtils.degToRad(parameters.azimuth);
        
        moon.setFromSphericalCoords(1, phi, theta);
        
        // Position the visible moon in the sky
        const moonDistance = 10000; // Distance from camera
        moonMesh.position.copy(moon).multiplyScalar(moonDistance);
        
        // Update sky shader with moon position (using sunPosition uniform)
        sky.material.uniforms["sunPosition"].value.copy(moon);
        
        // If you have water, update it too with moon direction
        if (typeof water !== 'undefined') {
          water.material.uniforms["sunDirection"].value.copy(moon).normalize();
        }
        
        if (renderTarget) renderTarget.dispose();
        
        sceneEnv.add(sky);
        renderTarget = pmremGenerator.fromScene(sceneEnv);
        scene.add(sky);
        scene.environment = renderTarget.texture;
      }

      updateMoon();

      // 🚀 Setup Draco Loader for compressed models
      const dracoLoader = new DRACOLoader();
      // Set the path to the Draco decoder files
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      dracoLoader.setDecoderConfig({ type: 'js' });
      
      // Load GLB model + animation with Draco support
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      
      loader.load(
        "/castle2.glb", // Make sure your GLB file is compressed with Draco
        (gltf) => {
          mesh = gltf.scene;
          mesh.scale.set(0.5, 0.5, 0.5);

          mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.envMapIntensity = 1.0;
            }
          });

          scene.add(mesh);

          // ✅ Setup animation mixer if GLB has animations
          if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(mesh);
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
          }

          console.log('Draco-compressed castle loaded successfully!');
        },
        (progress) => {
          console.log(
            "Loading progress:",
            (progress.loaded / progress.total) * 100 + "%"
          );
        },
        (error) => {
          console.error("Error loading Draco GLB:", error);
        }
      );

      // GSAP
      let currentHeight = -25;
      let targetHeight = -25;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600vh",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.33) {
              targetHeight = gsap.utils.mapRange(0, 0.33, -25, 0, progress);
            } else if (progress < 0.66) {
              targetHeight = gsap.utils.mapRange(0.33, 0.66, 0, 15, progress);
            } else {
              targetHeight = 15;
            }
          },
        },
      });

      // Resize
      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", onWindowResize);

      // Animation
      const animate = () => {
        frameId = requestAnimationFrame(animate);

        const time = performance.now() * 0.001;

        currentHeight += (targetHeight - currentHeight) * 0.05;

        if (mesh) {
          mesh.position.set(0, currentHeight, 0);
          if (currentHeight > 0) mesh.rotation.y = time * 0;
        }

        // ✅ Update animation mixer
        if (mixer) {
          const delta = clock.getDelta();
          mixer.update(delta);
        }

        water.material.uniforms["time"].value += 1.0 / 60.0;
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener("resize", onWindowResize);
        cancelAnimationFrame(frameId);
        ScrollTrigger.killAll();
        
        // 🧹 Cleanup Draco loader
        dracoLoader.dispose();
        
        renderer.dispose();
      };
    };

    const cleanup = init();
    return cleanup;
  }, []);

  return (
    <div className="relative">
      <div ref={containerRef} className="w-full h-screen" />
    </div>
  );
}