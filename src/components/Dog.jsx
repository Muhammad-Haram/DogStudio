import * as THREE from "three"
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'


const Dog = () => {

    const model = useGLTF("/models/dog.drc.glb")

    useThree(({ camera, scene, gl }) => {
        camera.position.z = 0.55
    })

    const textures = useTexture({
        normalMap: "/dog_normals.jpg"
    })


    model.scene.traverse((el) => {
        if (el.name.includes("DOG")) {
            el.material = new THREE.MeshBasicMaterial({
                normalMap: textures.normalMap
            })
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