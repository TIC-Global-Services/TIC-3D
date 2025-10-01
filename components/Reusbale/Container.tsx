import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isFullScreen?: boolean
  isHeroContent?:boolean
  isMobileFullScreen?: boolean
  className?: string
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  isFullScreen = false, 
  isMobileFullScreen=false,
  isHeroContent = true,
  className = '',
  ...props 
}) => {
  const baseClasses =
  isFullScreen && isHeroContent
    ? 'w-full md:px-[63px]'
    : isFullScreen
    ? 'w-full'
    : `xl:px-[35px] lg:px-[25px] md:px-5 mx-auto ${isMobileFullScreen ? 'px-0' : 'px-5'}`;


  const combinedClasses = `${baseClasses} ${className}`.trim()

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  )
}

export default Container