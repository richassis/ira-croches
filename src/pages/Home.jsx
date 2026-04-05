import { ArrowDown, Heart, Instagram, MessageCircle } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { products, storeConfig } from '../data/products';
import Button from '../components/ui/Button';

const Home = () => {
  // Filtrar apenas produtos em destaque
  const featuredProducts = products.filter(p => p.featured);

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

      {/* Produtos em Destaque */}
      <section id="produtos" className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
              Nossa Coleção
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Peças únicas e exclusivas, feitas à mão com dedicação e carinho
            </p>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">
                Artesanato com Amor
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  Cada bolsa é uma obra de arte única, criada com técnicas tradicionais de crochê
                  e muita dedicação. Trabalhamos com linhas de alta qualidade para garantir
                  durabilidade e beleza em cada peça.
                </p>
                <p>
                  Localizados em <span className="font-semibold text-primary">{storeConfig.location}</span>,
                  criamos bolsas que combinam estilo, funcionalidade e o calor do trabalho artesanal.
                </p>
                <p>
                  Atendimento personalizado via WhatsApp para tirar suas dúvidas e
                  ajudar você a escolher a bolsa perfeita.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={storeConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" className="flex items-center space-x-2">
                    <Instagram className="w-5 h-5" />
                    <span>{storeConfig.instagram}</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Destaques */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Feito à Mão</h3>
                <p className="text-sm text-gray-600">
                  Cada peça é única e artesanal
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Atendimento</h3>
                <p className="text-sm text-gray-600">
                  Direto pelo WhatsApp
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="font-bold text-gray-900 mb-2">Qualidade</h3>
                <p className="text-sm text-gray-600">
                  Materiais selecionados
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="font-bold text-gray-900 mb-2">Design</h3>
                <p className="text-sm text-gray-600">
                  Modelos exclusivos
                </p>
              </div>
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
            <Button variant="secondary" className="text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100">
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
