import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartDrawer = () => {
  const { isCartOpen, closeCart, cartItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-display font-bold">Carrinho</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo */}
        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Carrinho vazio
            </h3>
            <p className="text-gray-500 text-sm">
              Adicione produtos para começar suas compras
            </p>
          </div>
        ) : (
          <>
            {/* Lista de itens */}
            <div className="flex-grow overflow-y-auto p-6">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Resumo */}
            <div className="p-6 bg-gray-50">
              <CartSummary />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
