import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useState } from "react";
export default function Three() {
    const [opacity, setOpacity] = useState(0)
    const [opacity1, setOpacity1] = useState(0)
    const scroll = useScroll();



    useFrame((state) => {
        // console.log(scroll.range(0, 1 / 5), scroll.range(1 / 5, 1 / 5), scroll.range(3 / 5, 1 / 5), scroll.range(4 / 5, 1 / 5))
        // if (!PerspectiveCameraRef.current) return;
        // if (scroll.visible(1 / 5, 1 / 5)) {
        //     console.log(2)
        //     setOpacity
        // }

        setOpacity(scroll.range(1 / 5, 1 / 5))

        setOpacity1(scroll.range(2 / 5, 1 / 5))
        // else if (scroll.visible(2 / 5, 1 / 5)) {
        //     console.log(3)
        // }
    })

    return (
        <>
            <Page><h1 style={{ paddingTop: "45vh", color: "#661F66", margin: "auto", width: "fit-content" }}>New Experience</h1></Page>
            <Page><h1 style={{ paddingTop: "45vh", textAlign: "right", opacity }}>Second page</h1></Page>
            <Page style={{ opacity: opacity1, position: "absolute", }}><h1 style={{ paddingTop: "45vh" }}>A New World</h1></Page>
        </>

    )
}

function Page({ children, style }) {
    return <div style={{ height: '100vh', margin: "auto", width: "50%", ...style }} > {children} </ div>
}