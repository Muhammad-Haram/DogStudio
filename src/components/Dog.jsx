import * as THREE from "three"
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"


const Dog = () => {


    gsap.registerPlugin(useGSAP())
    gsap.registerPlugin(ScrollTrigger)


    useThree(({ camera, scene, gl }) => {
        camera.position.z = 0.55
        gl.toneMapping = THREE.ReinhardToneMapping,
            gl.outputColorSpace = THREE.SRGBColorSpace
    })

    const model = useGLTF("/models/dog.drc.glb")

    const { actions } = useAnimations(model.animations, model.scene)

    useEffect(() => {
        actions["Take 001"].play()
    }, [actions])


    // const textures = useTexture({
    //     normalMap: "/dog_normals.jpg",
    //     SampleMatCap: "/matcap/mat-2.png"
    // })

    const [normalMap, SampleMatCap] = (useTexture(['/dog_normals.jpg', '/matcap/mat-2.png'])).map((texture) => {
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    const [branchMap, branchNormalMap] = (useTexture(['/branches_diffuse.jpeg', '/branches_normals.jpeg'])).map((texture) => {
        texture.flipY = true
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    const dogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: SampleMatCap
    })

    const branchMaterial = new THREE.MeshMatcapMaterial({
        normalMap: branchNormalMap,
        map: branchMap
    })

    model.scene.traverse((el) => {
        if (el.name.includes("DOG")) {
            el.material = dogMaterial
        } else {
            el.material = branchMaterial
        }
    })


    const dogModel = useRef(model)


    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-1",
                endTrigger: "#section-3",
                start: "top top",
                end: "bottom bottom",
                markers: true,
                scrub: true
            }
        })

        tl
            .to(dogModel.current.scene.position, {
                z: "-=0.5",
                y: "+=0.1"
            })
            .to(dogModel.current.scene.rotation, {
                x: `+=${Math.PI / 15}`
            })
            .to(dogModel.current.scene.rotation, {
                y: `-=${Math.PI}`,
            }, "third")
            .to(dogModel.current.scene.position, {
                x: "-=0.6",
                z: "+=0.35",
                y: "-=0.05"
            }, "third")
    })

    return (
        <>

            <primitive object={model.scene} position={[0.25, -0.55, 0]}
                rotation={[0, Math.PI / 5, 0]} />
            <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
        </>
    )
}

export default Dog