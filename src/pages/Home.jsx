import { ArrowDown, Heart, Instagram, MessageCircle, Truck, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCarousel from '../components/product/ProductCarousel';
import { products, storeConfig } from '../data/products';
import Button from '../components/ui/Button';

const Home = () => {
  const navigate = useNavigate();

  // Filtrar produtos por tamanho
  const smallProducts = products.filter(p => p.size === 'Pequena');
  const mediumProducts = products.filter(p => p.size === 'Média');
  const largeProducts = products.filter(p => p.size === 'Grande');

  const scrollToProducts = () => {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-secondary/80 via-secondary-light/80 to-accent/80 py-20 md:py-32 flex items-center">
        {/* Banner Background */}
        <div className="absolute inset-0">
          <img
            src="/banner.png"
            alt="Banner Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay com blur */}
          <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-brand text-primary mb-6 drop-shadow-lg">
              {storeConfig.name}
            </h1>
            <p className="text-xl md:text-2xl text-primary-light font-semibold mb-4 drop-shadow">
              {storeConfig.tagline}
            </p>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
              {storeConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                onClick={scrollToProducts}
                className="text-lg px-8 py-4 shadow-xl"
              >
                Ver Coleção
              </Button>
              <a
                href={storeConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="text-lg px-8 py-4 bg-white/20 backdrop-blur border-white text-white hover:bg-white hover:text-secondary shadow-xl">
                  <Instagram className="w-5 h-5 mr-2" />
                  Seguir no Instagram
                </Button>
              </a>
            </div>
            <div className="mt-12 animate-bounce">
              <ArrowDown className="w-8 h-8 text-primary mx-auto drop-shadow" />
            </div>
          </div>
        </div>
      </section>

       {/* Seção Sobre - Expandida */}
      <section id="sobre" className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-brand text-secondary mb-4">
              Conheça a Artesã
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A história por trás de cada bolsa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Foto da Artesã */}
            <div className="order-2 md:order-1">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-gray-200 flex items-center justify-center">
                {storeConfig.artisan.photo ? (
                  <img
                    src={storeConfig.artisan.photo}
                    alt={storeConfig.artisan.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <Users className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-semibold">{storeConfig.artisan.name}</p>
                    <p className="text-gray-400 text-sm mt-2">Foto em breve</p>
                  </div>
                )}
              </div>
            </div>

            {/* Informações da Artesã */}
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-display font-bold text-primary mb-4">
                {storeConfig.artisan.name}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {storeConfig.artisan.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Award className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Experiência</p>
                    <p className="text-gray-600">{storeConfig.artisan.experience}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Especialidade</p>
                    <p className="text-gray-600">{storeConfig.artisan.specialty}</p>
                  </div>
                </div>
              </div>

              <a
                href={storeConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="flex items-center space-x-2">
                  <Instagram className="w-5 h-5" />
                  <span>Seguir {storeConfig.instagram}</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Cards de Destaque */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Feito à Mão</h3>
              <p className="text-sm text-gray-600">
                Cada peça é única e artesanal
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-xl text-center">
              <MessageCircle className="w-12 h-12 text-accent mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Atendimento</h3>
              <p className="text-sm text-gray-600">
                Direto pelo WhatsApp
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold text-gray-900 mb-2">Qualidade</h3>
              <p className="text-sm text-gray-600">
                Materiais selecionados
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-bold text-gray-900 mb-2">Design</h3>
              <p className="text-sm text-gray-600">
                Modelos exclusivos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos - Carrossel Principal */}
      <section id="produtos" className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
              Nossa Coleção Completa
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore todas as nossas bolsas artesanais
            </p>
          </div>

          <ProductCarousel products={products} />
        </div>
      </section>

      {/* Produtos por Tamanho - Pequenas */}
      {smallProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <ProductCarousel products={smallProducts} title="Bolsas Pequenas" />
            <p className="text-sm text-gray-600 mt-4">Perfeitas para o dia a dia e ocasiões casuais</p>
          </div>
        </section>
      )}

      {/* Produtos por Tamanho - Médias */}
      {mediumProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <ProductCarousel products={mediumProducts} title="Bolsas Médias" />
            <p className="text-sm text-gray-600 mt-4">Equilíbrio perfeito entre praticidade e estilo</p>
          </div>
        </section>
      )}

      {/* Produtos por Tamanho - Grandes */}
      {largeProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <ProductCarousel products={largeProducts} title="Bolsas Grandes" />
            <p className="text-sm text-gray-600 mt-4">Espaço e elegância para suas necessidades</p>
          </div>
        </section>
      )}

      {/* Informações de Entrega */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Truck className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
              {storeConfig.delivery.title}
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <ul className="space-y-4 text-left">
                {storeConfig.delivery.options.map((option, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-lg">{option}</span>
                  </li>
                ))}
              </ul>
              <p className="text-primary font-semibold mt-6 text-lg">{storeConfig.delivery.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formas de Pagamento */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Formas de Pagamento
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Escolha a forma que melhor se adequa ao seu perfil
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {storeConfig.payment.methods.map((method, index) => (
              <div key={method.id} className="text-center p-6 bg-gray-50 rounded-xl border-2 border-gray-100 hover:border-primary/30 transition-colors">
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.name}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                {method.id === 'pix' && (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold">
                    {storeConfig.payment.pixDiscount}% de desconto!
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              💬 Todas as negociações são feitas via WhatsApp para melhor atendimento personalizado
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Encomendas */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
              Bolsas por Encomenda
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Não encontrou exatamente o que procurava? Criamos uma bolsa exclusiva para você!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Descrição do Processo */}
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Como Funciona
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Descreva sua Bolsa</h4>
                      <p className="text-gray-600">Conte-nos como imagina sua bolsa ideal: estilo, funcionalidade e detalhes especiais.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Escolha Tamanho e Cor</h4>
                      <p className="text-gray-600">Defina o tamanho ideal (Pequena, Média ou Grande) e suas cores preferidas.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Receba o Orçamento</h4>
                      <p className="text-gray-600">Enviaremos um orçamento personalizado e o prazo de confecção via WhatsApp.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário de Encomenda */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-6 text-center">
                  Solicite seu Orçamento
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descrição da Bolsa *
                    </label>
                    <textarea
                      id="description"
                      placeholder="Ex: Gostaria de uma bolsa modelo tiracolo, com alça longa, compartimento interno com zíper..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows="4"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tamanho Desejado *
                    </label>
                    <select id="size" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">Selecione o tamanho</option>
                      <option value="Pequena">Pequena</option>
                      <option value="Média">Média</option>
                      <option value="Grande">Grande</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cores Preferidas
                    </label>
                    <input
                      type="text"
                      id="colors"
                      placeholder="Ex: Marrom e bege, ou cores neutras"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={() => {
                      const description = document.getElementById('description').value;
                      const size = document.getElementById('size').value;
                      const colors = document.getElementById('colors').value;

                      if (!description.trim() || !size) {
                        alert('Por favor, preencha a descrição e o tamanho da bolsa.');
                        return;
                      }

                      let message = `*ENCOMENDA PERSONALIZADA*\n\n`;
                      message += `Descrição: ${description}\n`;
                      message += `Tamanho: ${size}\n`;
                      if (colors.trim()) {
                        message += `Cores: ${colors}\n`;
                      }
                      message += `\nGostaria de receber um orçamento para esta bolsa personalizada!`;

                      const whatsappUrl = `https://wa.me/${storeConfig.phone}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Solicitar Orçamento</span>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    * Campos obrigatórios. Você será redirecionado para o WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-brand text-white mb-4">
            Pronta para sua bolsa exclusiva?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato via WhatsApp e escolha sua próxima bolsa favorita
          </p>
          <a
            href={`https://wa.me/${storeConfig.phone}?text=${encodeURIComponent('Olá! Gostaria de conhecer mais sobre as bolsas artesanais.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="inline-flex items-center justify-center font-semibold text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
