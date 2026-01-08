import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { color } from 'three/tsl'



const Dog = () => {

    const models = useGLTF("/models/dog.drc.glb")

    useThree(({ camera, scene, gl }) => {
        console.log(camera.position)
        camera.position.z = 0.55
    })

    return (
        <>

            <primitive object={models.scene} position={[0.25, -0.55, 0]}
                rotation={[0, Math.PI / 5, 0]} />
            <directionalLight position={[0, 5, 5]} color={0xfffff} intensity={10} />
            <OrbitControls />

        </>
    )
}

export default Dog