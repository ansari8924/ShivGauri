export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full border-4 border-accent/20`} />
        <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-primary animate-spin absolute inset-0`} />
      </div>
      {text && <p className="text-sm text-gray-500 font-medium animate-pulse">{text}</p>}
    </div>
  );
}
