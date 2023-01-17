import { Scroll, ScrollControls } from "@react-three/drei"
import { useState } from "react";
import { Html, Text } from "@react-three/drei"
import Scene from "./Scene";
import HTML from "./HTML";

import { ControlledInput } from "./ControlledInput";


// function Input(props) {
//     const [text, set] = useState('hello world ...')
//     return (
//         <group {...props}>
//             <Text position={[-1.2, 0.022, 0]} anchorX="0px" fontSize={0.335} letterSpacing={-0.0}>
//                 {text}
//                 <meshStandardMaterial color="black" />
//             </Text>
//             <mesh position={[0, -0.022, 0]} scale={[2.5, 0.48, 1]}>
//                 <planeGeometry />
//                 <meshBasicMaterial transparent opacity={0.3} depthWrite={false} />
//             </mesh>
//             <Html transform>
//                 <ControlledInput type={text} onChange={(e) => set(e.target.value)} value={text} />
//             </Html>
//         </group>
//     )
// }

export default function Three() {


    return (
        <>
            <ScrollControls pages={5}>
                <Scene />
                <Scroll html style={{ width: "100%" }}>
                    <HTML></HTML>
                    {/* DOM contents in here will scroll along */}
                </Scroll>
            </ScrollControls >

        </>


    )
}
