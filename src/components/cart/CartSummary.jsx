import { MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { generateCartWhatsAppURL } from '../../utils/whatsapp';
import { storeConfig } from '../../data/products';
import Button from '../ui/Button';

const CartSummary = () => {
  const { cartItems, getCartTotal, closeCart } = useCart();

  const handleCheckout = () => {
    const whatsappUrl = generateCartWhatsAppURL(cartItems, storeConfig.phone);
    window.open(whatsappUrl, '_blank');
    closeCart();
  };

  const total = getCartTotal();

  return (
    <div className="border-t border-gray-200 pt-4">
      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-primary">
          {formatPrice(total)}
        </span>
      </div>

      {/* Botão de Finalizar */}
      <Button
        variant="primary"
        onClick={handleCheckout}
        className="w-full flex items-center justify-center space-x-2"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Finalizar no WhatsApp</span>
      </Button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Você será redirecionado para o WhatsApp para finalizar o pedido
      </p>
    </div>
  );
};

export default CartSummary;
