'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    label: '海报生成器',
    href: '/poster-generator',
    icon: '🦭',
  },
  {
    label: '颜色选择与格式转换',
    href: '/color-converter',
    icon: '🎨',
  },
  {
    label: '二维码生成器',
    href: '/qrcode-generator',
    icon: '🔗',
  },
  {
    label: '图片base64转换',
    href: '/image-converter',
    icon: '🖼️',
  },
  {
    label: '时间戳转换',
    href: '/timestamp-converter',
    icon: '⏰',
  }
]

const Sider = () => {
  const pathname = usePathname()

  return (
    <div className='w-64 h-full bg-base-100 flex flex-col p-4 gap-4'>
      <div className="text-base-content text-2xl font-bold text-center">ToolsLib</div>
      <ul className="menu bg-base-100 rounded-box w-56 gap-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <li key={item.label}>
              <Link 
                href={item.href} 
                className={`${isActive ? 'menu-active' : ''} text-base-content h-10 flex items-center`}
              >
                {item.icon} &nbsp; {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sider 