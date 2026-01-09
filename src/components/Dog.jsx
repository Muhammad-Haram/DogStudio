import * as THREE from "three"
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useEffect } from "react"


const Dog = () => {


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

    const [normalMap, SampleMatCap] = (useTexture(['/dog_normals.jpg', '/matcap/mat-2.png', 'branches_diffuse.jpeg', 'branches_normals.jpeg'])).map((texture) => {

        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    const dogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: SampleMatCap
    })


    model.scene.traverse((el) => {
        if (el.name.includes("DOG")) {
            el.material = dogMaterial
        }
    })

    return (
        <>

            <primitive object={model.scene} position={[0.25, -0.55, 0]}
                rotation={[0, Math.PI / 5, 0]} />
            <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
            <OrbitControls />

        </>
    )
}

export default Dog