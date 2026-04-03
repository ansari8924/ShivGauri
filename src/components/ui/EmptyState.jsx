import { ShoppingBag } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = ShoppingBag,
  title = 'Nothing here yet',
  description = 'This section is currently empty.',
  actionLabel,
  onAction,
  actionLink,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-accent" />
      </div>
      <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mb-6">{description}</p>
      {actionLabel && (
        <Button
          variant="primary"
          onClick={onAction}
          {...(actionLink ? { as: 'a', href: actionLink } : {})}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
