import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Button from '../ui/Button';

const ProductCarousel = ({
  products,
  title,
  showViewAllButton = true,
  viewAllPath = '/produtos',
  mobileItemsPerView = 1,
  productCardMobileShortLabels = false,
}) => {
  const navigate = useNavigate();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    loop: true, // Carrossel infinito
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    // Com loop infinito, botões sempre habilitados
    setPrevBtnEnabled(true);
    setNextBtnEnabled(true);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (products.length === 0) return null;

  return (
    <div className="relative">
      {title && (
        <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">
          {title}
        </h3>
      )}

      <div className="relative">
        {/* Botão Anterior - sempre visível */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors opacity-80 hover:opacity-100"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Carrossel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className={`${
                  mobileItemsPerView === 2 ? 'flex-[0_0_46%]' : 'flex-[0_0_86%]'
                } sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] xl:flex-[0_0_calc(25%-18px)] min-w-0`}
              >
                <ProductCard product={product} mobileShortLabels={productCardMobileShortLabels} />
              </div>
            ))}
          </div>
        </div>

        {/* Botão Próximo - sempre visível */}
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors opacity-80 hover:opacity-100"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {showViewAllButton && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => navigate(viewAllPath)}>
            Ver tudo
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
