const badgeVariants = {
  new: 'bg-emerald-500 text-white',
  sale: 'bg-red-500 text-white',
  bestseller: 'bg-amber-500 text-white',
  'out-of-stock': 'bg-gray-400 text-white',
  'low-stock': 'bg-orange-500 text-white',
  category: 'bg-primary/10 text-primary',
  default: 'bg-gray-100 text-gray-700',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center font-semibold uppercase tracking-wider rounded-full
        ${badgeVariants[variant]}
        ${badgeSizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
