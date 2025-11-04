'use client'

import { useRef, useEffect, useState } from 'react'
import Icons from '@/app/components/icons'
import { PosterConfig, PosterElement } from '../types'

interface PosterPreviewProps {
  posterConfig: PosterConfig;
  selectedElement: PosterElement | null;
  // onElementSelect: (element: PosterElement) => void;
  // onElementUpdate: (elementId: string, updates: Partial<PosterElement>) => void;
}

export default function PosterPreview({
  posterConfig,
  selectedElement,
}: PosterPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">海报预览</h2>
          <button className="btn btn-square btn-disabled">
            <Icons icon="download" />
          </button>
        </div>
        <div className="border-2 border-dashed border-base-300 rounded-lg bg-base-200">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              width={posterConfig.width}
              height={posterConfig.height}
              className="max-w-full h-auto border border-base-300 cursor-pointer"
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                // backgroundImage: `
                //   linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                //   linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                //   linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                //   linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                // `,
                // backgroundSize: '20px 20px',
                // backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}