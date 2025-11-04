'use client'

import { useState, useCallback } from 'react'
import PosterPreview from './components/poster-preview'
import ControlPanel from './components/control-panel'
import { PosterConfig, PosterElement, TextElement, ImageElement } from './types'

const defaultPosterConfig: PosterConfig = {
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  elements: [
    {
      id: 'title-1',
      type: 'text',
      content: '欢迎使用海报生成器',
      fontSize: 36,
      color: '#333333',
      x: 100,
      y: 100,
      fontFamily: 'system-ui',
      fontWeight: 'bold',
    } as TextElement,
  ],
}

export default function PosterGeneratorPage() {
  const [posterConfig, setPosterConfig] = useState<PosterConfig>(defaultPosterConfig)
  const [selectedElement, setSelectedElement] = useState<PosterElement | null>(null)

  // 更新元素属性
  const onUpdateElement = useCallback((elementId: string, updates: Partial<PosterElement>) => {
    setPosterConfig((prevConfig) => ({
      ...prevConfig,
      elements: prevConfig.elements.map(element => 
        element.id === elementId 
        ? { ...element, ...updates } as PosterElement 
        : element
      )
    }))

    if (selectedElement?.id === elementId) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } as PosterElement : null)
    }
  }, [selectedElement])

  // 添加文本元素
  const addTextElement = useCallback(() => {
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: '新建文本',
      fontSize: 24,
      color: '#333333',
      x: 100,
      y: 100,
      fontFamily: 'system-ui',
      fontWeight: 'normal',
    }
    
    setPosterConfig(prev => ({
      ...prev,
      elements: [...prev.elements, newText],
    }))
    setSelectedElement(newText)
  }, [])

  // 添加图片元素
  const addImageElement = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newImage: ImageElement = {
        id: `image-${Date.now()}`,
        type: 'image',
        src: e.target?.result as string,
        x: 100,
        y: 200,
        width: 200,
        height: 200,
      }
      
      setPosterConfig(prev => ({
        ...prev,
        elements: [...prev.elements, newImage],
      }))
      setSelectedElement(newImage)
    }
    reader.readAsDataURL(file)
  }, [])

  // 删除选中元素
  const deleteSelectedElement = useCallback(() => {
    if (!selectedElement) return
    
    setPosterConfig(prev => ({
      ...prev,
      elements: prev.elements.filter(element => element.id !== selectedElement.id),
    }))
    setSelectedElement(null)
  }, [selectedElement])

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-start">海报生成器 🦭</h1>
          <p className="text-base-content/70 flex items-start">
            自定义简易海报
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧预览区 */}
          <div className="lg:col-span-2">
            <PosterPreview
              posterConfig={posterConfig}
              selectedElement={selectedElement}
            />
          </div>
          
          {/* 右侧控制面板 */}
          <div className="lg:col-span-1">
            <ControlPanel
              posterConfig={posterConfig}
              selectedElement={selectedElement}
              onConfigUpdate={setPosterConfig}
              onUpdateElement={onUpdateElement}
              onAddText={addTextElement}
              onAddImage={addImageElement}
              onDeleteElement={deleteSelectedElement}
            />
          </div>
        </div>
      </div>
    </div>
  )
}