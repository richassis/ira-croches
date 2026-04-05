import { useState } from 'react';
import { MessageCircle, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice, calculatePixPrice } from '../../utils/formatters';
import { generateCartWhatsAppURL } from '../../utils/whatsapp';
import { storeConfig } from '../../data/products';
import Button from '../ui/Button';

const CartSummary = () => {
  const { cartItems, getCartTotal, closeCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState(storeConfig.payment.methods[0]);

  const handleCheckout = () => {
    const whatsappUrl = generateCartWhatsAppURL(cartItems, storeConfig.phone, selectedPayment);
    window.open(whatsappUrl, '_blank');
    closeCart();
  };

  const total = getCartTotal();
  const displayTotal = selectedPayment?.id === 'pix'
    ? total * (1 - storeConfig.payment.pixDiscount / 100)
    : total;

  return (
    <div className="border-t border-gray-200 pt-4">
      {/* Seletor de Forma de Pagamento */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Forma de Pagamento</h3>
        <div className="space-y-2">
          {storeConfig.payment.methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedPayment(method)}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all flex items-center justify-between
                ${selectedPayment?.id === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <div className="flex items-center gap-2">
                {method.id === 'pix' ? (
                  <span className="text-lg">💵</span>
                ) : (
                  <CreditCard className="w-4 h-4 text-gray-600" />
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{method.name}</p>
                  <p className="text-xs text-gray-500">{method.description}</p>
                </div>
              </div>
              {method.id === 'pix' && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                  {storeConfig.payment.pixDiscount}% OFF
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(displayTotal)}
            </span>
            {selectedPayment?.id === 'pix' && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(total)}
              </span>
            )}
          </div>
          {selectedPayment?.id === 'pix' && (
            <p className="text-sm text-green-600 font-semibold">
              Economia de {formatPrice(total - displayTotal)} no PIX!
            </p>
          )}
        </div>
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
