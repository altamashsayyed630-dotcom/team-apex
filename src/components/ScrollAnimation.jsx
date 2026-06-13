import { useEffect, useRef, useState } from 'react'
import '../styles/ScrollAnimation.css'

const totalFrames = 217
const frameFolder = '/ezgif-321b1f2a6f750250-jpg'

function getFramePath(index) {
  const padded = String(index).padStart(3, '0')
  return `${frameFolder}/ezgif-frame-${padded}.jpg`
}

export default function ScrollAnimation() {
  const canvasRef = useRef(null)
  const loaderBarRef = useRef(null)
  const loaderTextRef = useRef(null)
  const centerLogoRef = useRef(null)
  const centerFinalRef = useRef(null)
  const rafRef = useRef(null)
  const stateRef = useRef({
    images: [],
    loadedCount: 0,
    targetFrame: 1,
    currentFrame: 1,
    scrollTimeout: null
  })
  const [loadedPercent, setLoadedPercent] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      renderCanvasFrame(Math.round(stateRef.current.currentFrame))
    }

    const drawImageProp = (img) => {
      const { width: w, height: h } = canvas
      let iw = img.width
      let ih = img.height
      let r = Math.min(w / iw, h / ih)
      let nw = iw * r
      let nh = ih * r
      let cx = 0
      let cy = 0
      let cw = iw
      let ch = ih

      if (nw < w) r = w / iw
      if (nh < h) r = h / ih

      nw = iw * r
      nh = ih * r
      cw = iw / (nw / w)
      ch = ih / (nh / h)
      cx = (iw - cw) * 0.5
      cy = (ih - ch) * 0.5

      if (cx < 0) cx = 0
      if (cy < 0) cy = 0
      if (cw > iw) cw = iw
      if (ch > ih) ch = ih

      ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h)
    }

    const renderCanvasFrame = (frameIndex) => {
      const imgIndex = Math.min(Math.max(1, frameIndex), totalFrames)
      const img = stateRef.current.images[imgIndex - 1]
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#090909'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      if (img && img.complete) {
        drawImageProp(img)
      }
    }

    const calculateScrollFrame = () => {
      const activeScrollRange = window.innerHeight * 1.2
      let progress = window.scrollY / activeScrollRange
      progress = Math.min(Math.max(0, progress), 1)
      stateRef.current.targetFrame = Math.round(progress * (totalFrames - 1)) + 1
    }

    const updateOverlayStates = (frame) => {
      if (!centerLogoRef.current || !centerFinalRef.current) return

      if (frame >= 125 && frame <= 175) {
        centerLogoRef.current.classList.add('active')
      } else {
        centerLogoRef.current.classList.remove('active')
      }

      if (frame >= 185 && frame <= 217) {
        centerFinalRef.current.classList.add('active')
      } else {
        centerFinalRef.current.classList.remove('active')
      }
    }

    const renderLoop = () => {
      const diff = stateRef.current.targetFrame - stateRef.current.currentFrame
      if (Math.abs(diff) > 0.01) {
        stateRef.current.currentFrame += diff * 0.25
        const frame = Math.round(stateRef.current.currentFrame)
        renderCanvasFrame(frame)
        updateOverlayStates(frame)
      } else if (stateRef.current.currentFrame !== stateRef.current.targetFrame) {
        stateRef.current.currentFrame = stateRef.current.targetFrame
        renderCanvasFrame(stateRef.current.targetFrame)
        updateOverlayStates(stateRef.current.targetFrame)
      }
      rafRef.current = window.requestAnimationFrame(renderLoop)
    }

    const handleScroll = () => {
      clearTimeout(stateRef.current.scrollTimeout)
      stateRef.current.scrollTimeout = window.setTimeout(() => {
        calculateScrollFrame()
      }, 16)
    }

    const preloadImages = () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image()
        img.src = getFramePath(i)
        img.onload = () => {
          stateRef.current.loadedCount += 1
          const percent = Math.floor((stateRef.current.loadedCount / totalFrames) * 100)
          setLoadedPercent(percent)
          if (loaderBarRef.current) {
            loaderBarRef.current.style.width = `${percent}%`
          }
          if (loaderTextRef.current) {
            loaderTextRef.current.textContent = `LOADING ${String(percent).padStart(2, '0')}%`
          }
          if (stateRef.current.loadedCount === totalFrames) {
            setTimeout(() => {
              setIsLoaded(true)
              renderCanvasFrame(1)
              rafRef.current = window.requestAnimationFrame(renderLoop)
            }, 300)
          }
        }
        img.onerror = () => {
          stateRef.current.loadedCount += 1
          const percent = Math.floor((stateRef.current.loadedCount / totalFrames) * 100)
          setLoadedPercent(percent)
          if (loaderBarRef.current) {
            loaderBarRef.current.style.width = `${percent}%`
          }
          if (stateRef.current.loadedCount === totalFrames) {
            setTimeout(() => {
              setIsLoaded(true)
              renderCanvasFrame(1)
              rafRef.current = window.requestAnimationFrame(renderLoop)
            }, 300)
          }
        }
        stateRef.current.images.push(img)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('scroll', handleScroll, { passive: true })
    preloadImages()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div className="scroll-animation-background">
      <div className={`preloader-overlay ${isLoaded ? 'loaded' : ''}`}>
        <div className="loader-logo">TEAM <span>APEX</span></div>
        <div className="loader-bar-container">
          <div className="loader-bar" ref={loaderBarRef} style={{ width: `${loadedPercent}%` }} />
        </div>
        <div className="loader-percentage" ref={loaderTextRef}>
          LOADING {String(loadedPercent).padStart(2, '0')}%
        </div>
      </div>

      <canvas ref={canvasRef} className="animation-canvas" />
      <div className="overlay-content">
        <div className="center-overlay" ref={centerLogoRef}>
          <h2>THE <span>APEX</span> ERA</h2>
          <p>Where precision gaming meets unrivaled passion. Team Apex Gaming is built for victory.</p>
        </div>

        <div className="center-overlay dark" ref={centerFinalRef}>
          <h2>TEAM <span>APEX</span> GAMING</h2>
          <p>The ultimate gaming collective. Built from friendship, forged in fire, scaling new heights.</p>
        </div>
      </div>
    </div>
  )
}
