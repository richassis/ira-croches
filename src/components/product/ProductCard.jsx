import { ShoppingCart, MessageCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice, calculatePixPrice, formatColors } from '../../utils/formatters';
import { generateProductWhatsAppURL } from '../../utils/whatsapp';
import { storeConfig } from '../../data/products';
import Button from '../ui/Button';

const ProductCard = ({ product, compact = false, mobileShortLabels = false }) => {
  const { addToCart } = useCart();

  const handleBuyNow = (e) => {
    e.preventDefault(); // Prevenir navegação do Link
    const whatsappUrl = generateProductWhatsAppURL(product, storeConfig.phone);
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevenir navegação do Link
    addToCart(product);
  };

  const pixPrice = calculatePixPrice(product.price, storeConfig.payment.pixDiscount);

  return (
    <Link
      to={`/bolsa/${product.slug}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 block"
    >
      {/* Imagem */}
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
              Esgotado
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className={compact ? 'p-3.5' : 'p-5'}>
        {/* Nome e Preço */}
        <div className={compact ? 'mb-2' : 'mb-3'}>
          <h3 className={compact ? 'text-base font-display font-semibold text-gray-900 mb-1 line-clamp-1' : 'text-lg font-display font-semibold text-gray-900 mb-1'}>
            {product.name}
          </h3>
          <div className="space-y-1">
            <p className={compact ? 'text-lg font-bold text-primary' : 'text-2xl font-bold text-primary'}>
              {formatPrice(product.price)}
            </p>
            <p className={compact ? 'text-xs text-green-600 font-semibold' : 'text-sm text-green-600 font-semibold'}>
              {formatPrice(pixPrice)} no PIX ({storeConfig.payment.pixDiscount}% OFF)
            </p>
          </div>
        </div>

        {/* Descrição */}
        {compact ? (
          <p className="hidden sm:block text-xs text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
        ) : (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Cores */}
        {product.colors && product.colors.length > 0 && (
          <div className={compact ? 'mb-3' : 'mb-4'}>
            <p className="text-xs text-gray-500">
              Cores: <span className="text-gray-700 font-medium">{formatColors(product.colors)}</span>
            </p>
          </div>
        )}

        {/* Botões */}
        <div className={compact ? 'space-y-1.5' : 'space-y-2'}>
          <Button
            variant="outline"
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className={compact ? 'w-full flex items-center justify-center space-x-1 text-xs py-2 px-2 whitespace-nowrap' : 'w-full flex items-center justify-center space-x-2'}
          >
            <MessageCircle className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            {(compact || mobileShortLabels) ? (
              <>
                <span className="sm:hidden">Comprar</span>
                <span className="hidden sm:inline">Comprar Agora</span>
              </>
            ) : (
              <span>Comprar Agora</span>
            )}
          </Button>

          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={compact ? 'w-full flex items-center justify-center space-x-1 text-xs py-2 px-2 whitespace-nowrap' : 'w-full flex items-center justify-center space-x-2'}
          >
            <ShoppingCart className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            {(compact || mobileShortLabels) ? (
              <>
                <span className="sm:hidden">Carrinho</span>
                <span className="hidden sm:inline">Adicionar ao Carrinho</span>
              </>
            ) : (
              <span>Adicionar ao Carrinho</span>
            )}
          </Button>

          {!compact && (
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Detalhes</span>
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
