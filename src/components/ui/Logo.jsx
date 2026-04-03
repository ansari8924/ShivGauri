import { Link } from 'react-router-dom';

export default function Logo({ className = '', variant = 'dark', onClick }) {
  const isLight = variant === 'light';
  
  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`} onClick={onClick}>
      {/* Circle Icon */}
      <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm ${
        isLight ? 'bg-white' : 'bg-[#7A1315]' 
      }`}>
        <span className={`font-serif text-[18px] font-bold ${
          isLight ? 'text-[#7A1315]' : 'text-[#CE9F51]'
        }`}>
          SG
        </span>
      </div>
      
      {/* Text Area */}
      <div className="flex flex-col justify-center">
        <span className={`font-serif text-[22px] font-bold leading-[1.1] ${
          isLight ? 'text-white' : 'text-[#7A1315]'
        }`}>
          Shiv Gauri
        </span>
        <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${
          isLight ? 'text-white/80' : 'text-[#CE9F51]'
        }`}>
          SAREE
        </span>
      </div>
    </Link>
  );
}
