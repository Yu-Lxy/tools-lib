'use client'

import { useState } from 'react'
import Image from 'next/image'
import Icons from '@/app/components/icons'
import { PosterConfig, PosterElement, TextElement, ImageElement } from '../types'

interface ControlPanelProps {
  posterConfig: PosterConfig;
  selectedElement: PosterElement | null;
  onUpdateElement: (elementId: string, updates: Partial<PosterElement>) => void;
  onConfigUpdate: (config: PosterConfig) => void;
  onElementSelect: (element: PosterElement | null) => void;
  onAddText: () => void;
  onAddImage: (file: File) => void;
  onDeleteElement: (id: string) => void;
}

export default function ControlPanel({
  posterConfig,
  selectedElement,
  onUpdateElement,
  onConfigUpdate,
  onElementSelect,
  onAddText,
  onAddImage,
  onDeleteElement,
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<'elements' | 'background' | 'text' | 'image'>('elements')
  const [fontFamily, setFontFamily] = useState('system-ui')

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onAddImage(file)
    }
  }

  // 处理字体上传
  const onUploadFont = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fontName = file.name.split('.')[0]
      const fontUrl = URL.createObjectURL(file)
      const fontFace = new FontFace(fontName, `url(${fontUrl})`)
      fontFace.load().then(() => {
        document.fonts.add(fontFace)
        setFontFamily(fontName)
      })
    }
  }

  // 渲染元素列表
  const renderElementsTab = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          className="btn btn-soft btn-accent btn-sm flex-1" 
          onClick={onAddText}
        >
          添加文本
        </button>
        <label className="btn btn-soft btn-info btn-sm flex-1 cursor-pointer">
          添加图片
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">元素列表</h4>
        {posterConfig.elements.map(element => (
          <div
            key={element.id}
            className={`p-2 border rounded cursor-pointer ${
              selectedElement?.id === element.id
                ? 'border-primary bg-primary/10'
                : 'border-base-300'
            }`}
            onClick={() => {
              onElementSelect(element)
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm">
                {element.type === 'text' ? '📝 ' : '🖼️ '}
                {element.type === 'text' 
                  ? (element as TextElement).content 
                  : '图片'
                }
              </span>
              {selectedElement?.id === element.id && (
                <button
                  className="btn btn-soft btn-error btn-xs"
                  onClick={() => onDeleteElement(element.id)}
                >
                  <Icons icon="delete" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // 渲染背景设置
  const renderBackgroundTab = () => (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label mb-2">
          <span className="label-text">背景颜色</span>
        </label>
        <input
          type="color"
          value={posterConfig.backgroundColor}
          onChange={(e) => onConfigUpdate({
            ...posterConfig,
            backgroundColor: e.target.value
          })}
          className="input input-bordered w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text">宽度</span>
          </label>
          <input
            type="number"
            value={posterConfig.width}
            onChange={(e) => onConfigUpdate({
              ...posterConfig,
              width: parseInt(e.target.value)
            })}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text">高度</span>
          </label>
          <input
            type="number"
            value={posterConfig.height}
            onChange={(e) => onConfigUpdate({
              ...posterConfig,
              height: parseInt(e.target.value)
            })}
            className="input input-bordered"
          />
        </div>
      </div>
    </div>
  )

  // 渲染文本设置
  const renderTextTab = () => {
    if (!selectedElement || selectedElement.type !== 'text') {
      return (
        <div className="alert alert-soft alert-warning">
          请先选择一个文本元素
        </div>
      )
    }

    const textElement = selectedElement as TextElement

    return (
      <div className="space-y-4">
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text">文本内容</span>
          </label>
          <textarea
            value={textElement.content}
            onChange={(e) => onUpdateElement(textElement.id, {
              content: e.target.value
            })}
            className="textarea textarea-bordered"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">字体大小</span>
            </label>
            <input
              type="number"
              value={textElement.fontSize}
              onChange={(e) => onUpdateElement(textElement.id, {
                fontSize: parseInt(e.target.value)
              })}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">字重</span>
            </label>
            <select
              value={textElement.fontWeight}
              onChange={(e) => onUpdateElement(textElement.id, {
                fontWeight: e.target.value
              })}
              className="select select-bordered"
            >
              <option value="normal">正常</option>
              <option value="bold">粗体</option>
              <option value="lighter">细体</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">层级</span>
            </label>
            <input
              type="number"
              value={textElement.zIndex}
              onChange={(e) => onUpdateElement(textElement.id, {
                zIndex: parseInt(e.target.value)
              })}
              className="input input-bordered"
            />
          </div>
          
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">X 坐标</span>
            </label>
            <input
              type="number"
              value={textElement.x}
              onChange={(e) => onUpdateElement(textElement.id, {
                x: parseInt(e.target.value)
              })}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">Y 坐标</span>
            </label>
            <input
              type="number"
              value={textElement.y}
              onChange={(e) => onUpdateElement(textElement.id, {
                y: parseInt(e.target.value)
              })}
              className="input input-bordered"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">字体</span>
            </label>
            <select
              value={textElement.fontFamily}
              onChange={(e) => onUpdateElement(textElement.id, {
                fontFamily: e.target.value
              })}
              className="select select-bordered"
            >
              <option value="system-ui">系统默认</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Microsoft YaHei">微软雅黑</option>
              <option value="SimHei">黑体</option>
              <option value={fontFamily}>{fontFamily}</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">文字颜色</span>
            </label>
            <input
              type="color"
              value={textElement.color}
              onChange={(e) => onUpdateElement(textElement.id, {
                color: e.target.value
              })}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">上传字体包</span>
            </label>
            <input
              type="file"
              className="file-input file-input-neutral"
              accept=".ttf,.otf,.woff,.woff2,.xft,.fon,.ttc,.ffil,eot"
              onChange={onUploadFont}
            />
          </div>
      </div>
    )
  }

  // 渲染图片设置
  const renderImageTab = () => {
    if (!selectedElement || selectedElement.type !== 'image') {
      return (
        <div className="alert alert-soft alert-info">
          请先选择一个图片元素
        </div>
      )
    }

    const imageElement = selectedElement as ImageElement

    return (
      <div className="space-y-4">
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text">图片预览</span>
          </label>
          <div className="relative w-full aspect-square border rounded overflow-hidden bg-base-200">
            <Image
              src={imageElement.src}
              alt="预览"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">X 坐标</span>
            </label>
            <input
              type="number"
              value={imageElement.x}
              onChange={(e) => onUpdateElement(imageElement.id, {
                x: parseInt(e.target.value)
              })}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">Y 坐标</span>
            </label>
            <input
              type="number"
              value={imageElement.y}
              onChange={(e) => onUpdateElement(imageElement.id, {
                y: parseInt(e.target.value)
              })}
              className="input input-bordered"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">宽度</span>
            </label>
            <input
              type="number"
              value={imageElement.width}
              onChange={(e) => onUpdateElement(imageElement.id, {
                width: parseInt(e.target.value)
              })}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">高度</span>
            </label>
            <input
              type="number"
              value={imageElement.height}
              onChange={(e) => onUpdateElement(imageElement.id, {
                height: parseInt(e.target.value)
              })}
              className="input input-bordered"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text">层级</span>
          </label>
          <input
            min={0}
            type="number"
            value={imageElement.zIndex}
            onChange={(e) => onUpdateElement(imageElement.id, {
              zIndex: parseInt(e.target.value)
            })}
            className="input input-bordered"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">控制面板</h2>
        
        {/* 标签页导航 */}
        <div className="tabs tabs-boxed">
          <button
            className={`tab flex-1 ${activeTab === 'elements' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('elements')}
          >
            元素
          </button>
          <button
            className={`tab flex-1 ${activeTab === 'background' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('background')}
          >
            背景
          </button>
          <button
            className={`tab flex-1 ${activeTab === 'text' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            文本
          </button>
          <button
            className={`tab flex-1 ${activeTab === 'image' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('image')}
          >
            图片
          </button>
        </div>

        {/* 标签页内容 */}
        <div>
          {activeTab === 'elements' && renderElementsTab()}
          {activeTab === 'background' && renderBackgroundTab()}
          {activeTab === 'text' && renderTextTab()}
          {activeTab === 'image' && renderImageTab()}
        </div>
      </div>
    </div>
  )
}