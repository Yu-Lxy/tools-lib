import React from 'react'

interface IconsProps {
  icon: string
  color?: string
  size?: string | number
  className?: string
}

type IconComponent = React.FC<{ color?: string; size?: string | number; className?: string }>

const iconMap: Record<string, IconComponent> = {
  heart: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  star: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  ),
  delete: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
    </svg>
  ),
  download: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  upload: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  ),
  close: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),
  settings: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.297 1.13c.112.097.224.19.332.283.24.24.4.537.4.9v1.618c0 .363-.16.66-.4.9a8.987 8.987 0 0 1-.332.283l-1.297 1.13a1.125 1.125 0 0 1-1.37.49l-1.217-.456c-.354-.133-.75-.072-1.075.124a6.59 6.59 0 0 1-.22.128c-.331.183-.581.495-.645.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-1.13a8.989 8.989 0 0 1-.332-.283c-.24-.24-.4-.537-.4-.9V9.09c0-.363.16-.66.4-.9a8.987 8.987 0 0 1 .332-.283l1.297-1.13a1.125 1.125 0 0 1 1.37-.49l1.217.456c.354.133.75.072 1.075-.124.072-.044.146-.087.22-.128.332-.183.582-.495.645-.87l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  edit: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  ),
  save: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>
  ),
  trash: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  ),
  plus: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  minus: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  ),
  check: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  arrowLeft: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  ),
  arrowRight: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  ),
  image: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  ),
  copy: ({ color, size, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2.5" 
      stroke={color || "currentColor"}
      width={size || "1.2em"}
      height={size || "1.2em"}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.6A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.6m5.332 0H21a2.25 2.25 0 0 1 2.25 2.25v6.75a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 5.25 3h4.332m0 0a.75.75 0 0 1 .75.75v.75m0 0h-3m3 0h3m-3 0V9.75" />
    </svg>
  ),
}

export default function Icons({ icon, color, size, className }: IconsProps) {
  const IconComponent = iconMap[icon]
  
  if (!IconComponent) {
    console.warn(`没有${icon}图标，可用图标: ${Object.keys(iconMap).join(', ')}`)
    return null
  }
  
  return <IconComponent color={color} size={size} className={className} />
}

export const availableIcons = Object.keys(iconMap)
