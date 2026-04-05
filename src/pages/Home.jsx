import { ArrowDown, Heart, Instagram, MessageCircle, Truck, Award, Users } from 'lucide-react';
import ProductCarousel from '../components/product/ProductCarousel';
import { products, storeConfig } from '../data/products';
import Button from '../components/ui/Button';

const Home = () => {
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
      <section className="relative bg-gradient-to-br from-secondary via-secondary-light to-accent py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAwYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
              {storeConfig.name}
            </h1>
            <p className="text-xl md:text-2xl text-primary-light font-semibold mb-4">
              {storeConfig.tagline}
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {storeConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                onClick={scrollToProducts}
                className="text-lg px-8 py-4"
              >
                Ver Coleção
              </Button>
              <a
                href={storeConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="text-lg px-8 py-4 bg-white/10 backdrop-blur border-white text-white hover:bg-white hover:text-secondary">
                  <Instagram className="w-5 h-5 mr-2" />
                  Seguir no Instagram
                </Button>
              </a>
            </div>
            <div className="mt-12 animate-bounce">
              <ArrowDown className="w-8 h-8 text-primary mx-auto" />
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

      {/* Seção Sobre - Expandida */}
      <section id="sobre" className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
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

      {/* Call to Action Final */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
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
