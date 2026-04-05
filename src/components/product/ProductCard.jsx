import { ShoppingCart, MessageCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice, formatColors } from '../../utils/formatters';
import { generateProductWhatsAppURL } from '../../utils/whatsapp';
import { storeConfig } from '../../data/products';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    const whatsappUrl = generateProductWhatsAppURL(product, storeConfig.phone);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
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
      <div className="p-5">
        {/* Nome e Preço */}
        <div className="mb-3">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Cores */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500">
              Cores: <span className="text-gray-700 font-medium">{formatColors(product.colors)}</span>
            </p>
          </div>
        )}

        {/* Botões */}
        <div className="space-y-2">
          <Link to={`/bolsa/${product.slug}`}>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Detalhes</span>
            </Button>
          </Link>

          <Button
            variant="primary"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="w-full flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Adicionar ao Carrinho</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="w-full flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Comprar Agora</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
