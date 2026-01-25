"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function AnimatedSphere(props: any) {
    const mesh = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.2;
            mesh.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere args={[1.5, 64, 64]} {...props} ref={mesh} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
                <MeshDistortMaterial
                    color={hovered ? "#ff5c8d" : "#FD105E"}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

function Satellite(props: any) {
    const mesh = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        if (mesh.current) {
            const t = state.clock.getElapsedTime() * props.speed + props.offset;
            mesh.current.position.x = Math.sin(t) * props.radius;
            mesh.current.position.z = Math.cos(t) * props.radius;
            mesh.current.position.y = Math.sin(t * 0.5) * 1;
        }
    })

    return (
        <Sphere ref={mesh} args={[0.2, 32, 32]} position={[props.radius, 0, 0]}>
            <meshStandardMaterial color={props.color} emissive={props.color} emissiveIntensity={0.5} />
        </Sphere>
    )
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
            <pointLight position={[-5, -5, -5]} intensity={1} color="#FD105E" />

            <AnimatedSphere position={[0, 0, 0]} />

            <Satellite radius={2.5} speed={0.8} offset={0} color="#0ea5e9" />
            <Satellite radius={3} speed={0.6} offset={2} color="#10b981" />
            <Satellite radius={3.5} speed={0.5} offset={4} color="#f59e0b" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </>
    )
}

export function Hero3D() {
    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Scene />
            </Canvas>
        </div>
    );
}
