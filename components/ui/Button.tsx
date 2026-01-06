import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative font-sans font-semibold tracking-widest uppercase transition-all duration-300 overflow-hidden group border border-transparent";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]",
    secondary: "bg-transparent text-gray-300 border-gray-700 hover:border-white hover:text-white hover:bg-white/5",
    danger: "bg-tech-red/90 text-white hover:bg-tech-red hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-12 py-4 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Subtle shine effect */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-500 ease-in-out"></div>
    </button>
  );
};

export default Button;