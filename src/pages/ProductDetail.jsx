import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, MessageCircle, Check, Truck, Package, CreditCard } from 'lucide-react';
import { products, storeConfig } from '../data/products';
import { formatPrice, calculatePixPrice } from '../utils/formatters';
import { generateProductWhatsAppURL } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Encontrar o produto pelo slug
  const product = products.find(p => p.slug === slug);

  // Estados para selecao
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedPayment, setSelectedPayment] = useState(storeConfig.payment.methods[0]);

  // Scroll para o topo quando carregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Se produto nao existir, mostrar mensagem
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Produto nao encontrado</h2>
        <Link to="/">
          <Button variant="primary">Voltar para Home</Button>
        </Link>
      </div>
    );
  }

  // Calcula preco com desconto PIX
  const displayPrice = selectedPayment?.id === 'pix'
    ? calculatePixPrice(product.price, storeConfig.payment.pixDiscount)
    : product.price;

  const handleBuyNow = () => {
    const whatsappUrl = generateProductWhatsAppURL(
      product,
      storeConfig.phone,
      selectedColor,
      selectedPayment
    );
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor });
  };

  // Bandeiras de cartao aceitas
  const cardBrands = ['Mastercard', 'Visa', 'Hiper', 'Banricompras', 'Elo'];

  return (
    <div className="bg-gray-50 py-2 md:py-8">
      <div className="container-custom">
        {/* Botao Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Imagem do Produto */}
            <div className="relative aspect-[4/3] md:aspect-square max-h-[50vh] md:max-h-none">
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

            {/* Informacoes do Produto */}
            <div className="p-4 md:p-8 flex flex-col">
              {/* Nome, Categoria e Preco */}
              <div className="mb-3">
                <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">
                  {product.category}
                </div>
                <h1 className="text-xl md:text-3xl font-display font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>

                {/* Descrição do Produto */}
                <p className="text-sm md:text-base text-gray-600 mb-3 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-4xl font-bold text-primary">
                    {formatPrice(displayPrice)}
                  </span>
                  {selectedPayment?.id === 'pix' && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                {selectedPayment?.id === 'pix' && (
                  <p className="text-sm text-green-600 font-semibold mt-1">
                    Economia de {formatPrice(product.price - displayPrice)} no PIX!
                  </p>
                )}
              </div>

              {/* Informacoes Essenciais */}
              <div className="space-y-3 mb-3 flex-grow">
                {/* Tamanho */}
                {product.size && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Tamanho</h3>
                    <div className="inline-flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-lg font-semibold text-sm">
                      <Package className="w-4 h-4" />
                      <span>{product.size}</span>
                    </div>
                  </div>
                )}

                {/* Seletor de Cor */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Escolha a Cor</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
                            ${selectedColor === color
                              ? 'bg-primary text-white ring-2 ring-primary ring-offset-1'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Seletor de Forma de Pagamento */}
                <div>
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
                            <CreditCard className="w-5 h-5 text-gray-600" />
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

                  {/* Bandeiras aceitas */}
                  {selectedPayment?.id !== 'pix' && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-2">Bandeiras aceitas:</p>
                      <div className="flex flex-wrap gap-2">
                        {cardBrands.map((brand) => (
                          <span key={brand} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Caracteristicas Compactas */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-1">Caracteristicas</h3>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span>Feita a mao</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span>Alta qualidade</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span>Peca unica</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span>{storeConfig.location}</span>
                    </div>
                  </div>
                </div>

                {/* Entrega Compacta */}
                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <p className="text-xs text-gray-700"><span className="font-semibold">{storeConfig.delivery.title}</span> - Retirada local ou entrega via WhatsApp</p>
                  </div>
                </div>
              </div>

              {/* Botoes de Acao */}
              <div className="space-y-2 mt-auto">
                <Button
                  variant="primary"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Comprar pelo WhatsApp</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{product.inStock ? 'Adicionar ao Carrinho' : 'Indisponivel'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Relacionados */}
        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-2xl font-display font-bold text-gray-900 mb-4 text-center">
            Outros Produtos
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
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
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">{relatedProduct.name}</h3>
                    <p className="text-primary font-bold text-sm">{formatPrice(relatedProduct.price)}</p>
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
