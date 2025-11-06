'use client'

import { useRef, useEffect } from 'react'
import Icons from '@/app/components/icons'
import { PosterConfig, PosterElement } from '../types'

interface PosterPreviewProps {
  posterConfig: PosterConfig;
  selectedElement: PosterElement | null;
  onElementSelect: (element: PosterElement | null) => void;
}

export default function PosterPreview({
  posterConfig,
  selectedElement,
  onElementSelect,
}: PosterPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    drawPoster()
  }, [posterConfig])

  useEffect(() => {
    // console.log('selectedElement', selectedElement)
    drawPoster()
    drawSelectedBorder()
  }, [selectedElement])

  // 绘制海报
  const drawPoster = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => resolve(img)
        img.onerror = (e) => reject(e)
        img.src = src
      });

    (async () => {
      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制背景
      ctx.fillStyle = posterConfig.backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 排序
      const elementsByZIndexAsc = [...posterConfig.elements].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))

      // 预加载图片
      const imageCache = new Map<string, HTMLImageElement>()
      await Promise.all(
        elementsByZIndexAsc
          .filter(el => el.type === 'image')
          .map(async (el) => {
            const key = `${el.id}|${el.src}`
            try {
              const img = await loadImage(el.src)
              imageCache.set(key, img)
            } catch (err) {
              console.error('Failed to load image:', el.src, err)
            }
          })
      )

      // 按顺序绘制
      elementsByZIndexAsc.forEach(element => {
        if (element.type === 'text') {
          ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`
          ctx.fillStyle = element.color
          ctx.textAlign = 'left'
          ctx.textBaseline = 'top'
          ctx.fillText(element.content, element.x, element.y)
        } else if (element.type === 'image') {
          const key = `${element.id}|${element.src}`
          const img = imageCache.get(key)
          if (img) {
            ctx.drawImage(img, element.x, element.y, element.width, element.height)
          }
        }
      })

    })()
  }

  // 绘制选中框
  const drawSelectedBorder = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 在最上层绘制选中框
    if (selectedElement) {
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      if (selectedElement.type === 'text') {
        ctx.font = `${selectedElement.fontWeight} ${selectedElement.fontSize}px ${selectedElement.fontFamily}`
        const textWidth = ctx.measureText(selectedElement.content).width
        ctx.strokeRect(
          selectedElement.x - 5,
          selectedElement.y - 5,
          textWidth + 10,
          selectedElement.fontSize + 10
        )
      } else if (selectedElement.type === 'image') {
        ctx.strokeRect(
          selectedElement.x - 5,
          selectedElement.y - 5,
          selectedElement.width + 10,
          selectedElement.height + 10
        )
      }
      ctx.setLineDash([])
    }
  }

  const base64ToBlob = (base64: string) => {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n: number = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  // 处理下载
  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const base64 = canvas.toDataURL()
    const blob = base64ToBlob(base64)
    const blobUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = 'poster.png'
    link.click()
  }

  // 处理元素点击
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    // 解决点击不准的问题
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    // 查找点击的元素
    const elementsByZIndexDesc = [...posterConfig.elements].sort((a, b) => (b.zIndex ?? 0) - (a.zIndex ?? 0))
    const clickedElement = elementsByZIndexDesc.find(element => {
      if (element.type === 'text') {
        const ctx = canvas.getContext('2d')
        if (!ctx) return false
        
        ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`
        const textWidth = ctx.measureText(element.content).width
        return (
          x >= element.x &&
          x <= element.x + textWidth &&
          y >= element.y &&
          y <= element.y + element.fontSize
        )
      } else if (element.type === 'image') {
        return (
          x >= element.x &&
          x <= element.x + element.width &&
          y >= element.y &&
          y <= element.y + element.height
        )
      }
      return false
    })

    // 点击到元素则选中；否则清空选中
    onElementSelect(clickedElement ?? null)
  }


  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">海报预览</h2>
          <button className={`btn btn-square ${posterConfig.elements.length === 0 ? 'btn-disabled' : ''}`} onClick={handleDownload}>
            <Icons icon="download" />
          </button>
        </div>
        <div className="border-2 border-dashed border-base-300 rounded-lg bg-base-200 overflow-hidden">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              width={posterConfig.width}
              height={posterConfig.height}
              className="max-w-full h-auto border border-base-300 cursor-pointer"
              style={{ maxWidth: '100%', height: 'auto' }}
              onClick={handleCanvasClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}