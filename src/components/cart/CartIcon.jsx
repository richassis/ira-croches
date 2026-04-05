import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Badge from '../ui/Badge';

const CartIcon = ({ onClick }) => {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-700 hover:text-primary transition-colors"
      aria-label="Abrir carrinho"
    >
      <ShoppingBag className="w-6 h-6" />
      {itemCount > 0 && (
        <div className="absolute -top-1 -right-1">
          <Badge variant="primary">{itemCount}</Badge>
        </div>
      )}
    </button>
  );
};

export default CartIcon;
