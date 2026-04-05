import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Imagem */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Informações */}
      <div className="flex-grow">
        <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
        <p className="text-primary font-bold mb-2">{formatPrice(item.price)}</p>

        {/* Controles de quantidade */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={handleDecrease}
              className="p-1.5 hover:bg-gray-100 transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 font-semibold min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="p-1.5 hover:bg-gray-100 transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remover item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="text-sm text-gray-500">Subtotal</p>
        <p className="font-bold text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
