import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate on fine pointer (mouse) devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    document.body.classList.add('has-custom-cursor')

    let ringX = 0, ringY = 0
    let dotX = 0, dotY = 0
    let raf = 0

    const move = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ringX = lerp(ringX, dotX, 0.12)
      ringY = lerp(ringY, dotY, 0.12)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const isClickable = t.closest('a, button, [role="button"], input, textarea, select, label')
      ringRef.current?.classList.toggle('cursor__ring--active', !!isClickable)
    }

    const handleDown = () => ringRef.current?.classList.add('cursor__ring--down')
    const handleUp = () => ringRef.current?.classList.remove('cursor__ring--down')

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', handleOver, { passive: true })
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div className="cursor__dot" ref={dotRef} />
      <div className="cursor__ring" ref={ringRef} />
    </>
  )
}
