import { Environment, Html, PerspectiveCamera, useScroll, Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { BackSide } from "three";
import { angleToRadians } from "../../utils/angle"
import gsap from "gsap";
import Statue from "./Statue";

export default function Three() {
    const pointLightRef = useRef(null);
    const ballRef = useRef(null);
    const PerspectiveCameraRef = useRef(null)
    const [zoomIn, setZoomIn] = useState(false);
    const [dropBall, setDropBall] = useState(false);
    const [randomStars, setRandomStars] = useState(false); ([]);
    const cursosRef = useRef(null);

    const scroll = useScroll();



    useFrame((state) => {
        // console.log(scroll.range(0, 1 / 5), scroll.range(1 / 5, 1 / 5), scroll.range(3 / 5, 1 / 5), scroll.range(4 / 5, 1 / 5))
        if (!PerspectiveCameraRef.current) return;

        if (scroll.visible(0, 1 / 5)) {
            setZoomIn(false);
            PerspectiveCameraRef.current.position.y = 8 - 4 * scroll.range(0, 1 / 5);
            PerspectiveCameraRef.current.rotation.x = angleToRadians(-27) + angleToRadians(15) * scroll.range(0, 1 / 5);
        }
        else if (scroll.visible(1 / 5, 1 / 5)) {
            setZoomIn(false)
            setDropBall(true)
        }
        else if (scroll.visible(2 / 5, 1 / 5)) {
            setZoomIn(true)
        }
        cursosRef.current.rotation.y += 0.01;
        cursosRef.current.rotation.x += 0.005;

        if (!!cursosRef.current) {
            const { x, y } = state.mouse;
            cursosRef.current.position.x = x
            cursosRef.current.position.y = y + 3
        }


        if (!!pointLightRef.current) {
            const { x, y } = state.mouse;
            pointLightRef.current.position.x = x * 5 + 0
            pointLightRef.current.position.y = y * 3 + 5
        }

    })

    useEffect(() => {
        if (zoomIn) {
            gsap.timeline();
            gsap.to(PerspectiveCameraRef.current.position, { z: -250, duration: 1, ease: "power4.in" });
            gsap.to(cursosRef.current, { visible: true });
        }
        else {
            gsap.to(cursosRef.current, { visible: false });
            gsap.to(PerspectiveCameraRef.current.position, { z: 8, duration: 0.4 });
        }
    }, [zoomIn])

    useEffect(() => {
        if (dropBall) {
            gsap.timeline();
            gsap.to(ballRef.current.position, { y: 0.5, duration: 3, ease: "bounce.out" });
            gsap.to(ballRef.current.position, { x: 1, duration: 5, ease: "power3.out" }, "<");
        }
    }, [dropBall])

    useEffect(() => {
        const tmp = []
        for (var i = 0; i < 500; i++) {
            tmp.push(<mesh position={[-250 + 500 * Math.random(), 5 + 70 * Math.random(), -150 + 100 * Math.random()]}  >
                <sphereGeometry args={[0.1 + 0.4 * Math.random(), 16, 16]} />
                <meshStandardMaterial color="#ffffff" metalness={10} />
            </mesh>)
        }
        setRandomStars(tmp)
    }, [])


    return (
        <>
            <Environment background>
                <mesh scale={100}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshBasicMaterial side={BackSide} color="#0b132b" />
                </mesh>
            </Environment>

            <PerspectiveCamera
                ref={PerspectiveCameraRef}
                makeDefault
                position={[0, 7, 8]}
                rotation={[angleToRadians(-27), angleToRadians(0), angleToRadians(0)]}
            />
            {/* Ball */}
            <mesh position={[-3.4, 5, 0]} castShadow ref={ballRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={1} />
            </mesh>
            <mesh position={[-3.4, 5, -255]} ref={cursosRef}>
                <torusGeometry args={[0.5, 0.1]} />
                <meshStandardMaterial color="#661F66" metalness={10} />
                <Text position={[-0.3, -0.022, 0]} anchorX="0px" fontSize={0.335} letterSpacing={-0.0}>
                    ddd
                    <meshStandardMaterial color="#661F66" metalness={10} />
                </Text>
            </mesh>

            {/* Floor */}
            <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color="#448383" />
            </mesh>
            <Statue position={[-3, 0, 0]} scale={0.009} />

            <ambientLight args={["#ffffff", 0]} />
            {randomStars}

            {/* Directional Light */}
            <pointLight ref={pointLightRef} args={["#661F66", 2]} position={[2, 5, 3]} castShadow />
        </>
    )
}