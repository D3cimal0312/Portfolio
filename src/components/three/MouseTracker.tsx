import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function useMouseTracker() {
  const mouse = useRef(new THREE.Vector2(0, 0))
  const smoothMouse = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    // smooth lerp — feels natural, not snappy
    smoothMouse.current.lerp(mouse.current, 0.04)
  })

  return smoothMouse
}