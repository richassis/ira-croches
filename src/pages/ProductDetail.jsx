import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, MessageCircle, Check, Truck, Package } from 'lucide-react';
import { products, storeConfig } from '../data/products';
import { formatPrice, formatColors } from '../utils/formatters';
import { generateProductWhatsAppURL } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Encontrar o produto pelo slug
  const product = products.find(p => p.slug === slug);

  // Se produto não existir, mostrar mensagem
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h2>
        <Link to="/">
          <Button variant="primary">Voltar para Home</Button>
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    const whatsappUrl = generateProductWhatsAppURL(product, storeConfig.phone);
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="container-custom">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Imagem do Produto */}
            <div className="relative aspect-square md:aspect-auto">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-white px-6 py-3 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">Esgotado</p>
                  </div>
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="p-8 md:p-12 flex flex-col">
              {/* Nome e Categoria */}
              <div className="mb-6">
                <div className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
                  {product.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <div className="text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Descrição */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Cores Disponíveis */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cores Disponíveis</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tamanho */}
              {product.size && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tamanho</h3>
                  <div className="inline-flex items-center space-x-2 px-5 py-3 bg-primary/10 text-primary rounded-lg font-semibold">
                    <Package className="w-5 h-5" />
                    <span>{product.size}</span>
                  </div>
                </div>
              )}

              {/* Características */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Feita à mão com técnicas tradicionais de crochê</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Linha de alta qualidade e durabilidade</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Peça única e exclusiva</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Produzida em {storeConfig.location}</span>
                  </li>
                </ul>
              </div>

              {/* Informações de Entrega */}
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{storeConfig.delivery.title}</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {storeConfig.delivery.options.map((option, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-blue-700 mt-2 italic">{storeConfig.delivery.note}</p>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-4 mt-auto">
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Comprar pelo WhatsApp</span>
                </Button>

                <p className="text-xs text-gray-500 text-center pt-2">
                  Atendimento personalizado via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Relacionados (Opcional) */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8 text-center">
            Outros Produtos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(p => p.id !== product.id && p.featured)
              .slice(0, 3)
              .map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/bolsa/${relatedProduct.slug}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <p className="text-primary font-bold">{formatPrice(relatedProduct.price)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
