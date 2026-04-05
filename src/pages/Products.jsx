import { useState, useMemo } from 'react';
import { Filter, X, MessageCircle } from 'lucide-react';
import { products, storeConfig } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';

const Products = () => {
  // Estados dos filtros
  const [filters, setFilters] = useState({
    size: '',
    category: '',
    color: '',
    priceRange: '',
  });
  const [showFilters, setShowFilters] = useState(true);

  // Extrair opcoes unicas para os filtros
  const filterOptions = useMemo(() => {
    const sizes = [...new Set(products.map(p => p.size).filter(Boolean))];
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const colors = [...new Set(products.flatMap(p => p.colors || []).filter(c => c !== 'Cor Personalizavel'))];
    return { sizes, categories, colors };
  }, []);

  // Faixas de preco
  const priceRanges = [
    { id: '', label: 'Todos os precos' },
    { id: 'under150', label: 'Ate R$ 150' },
    { id: '150to200', label: 'R$ 150 - R$ 200' },
    { id: 'over200', label: 'Acima de R$ 200' },
  ];

  // Aplicar filtros
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.size && product.size !== filters.size) return false;
      if (filters.category && product.category !== filters.category) return false;
      if (filters.color && !product.colors?.includes(filters.color)) return false;
      if (filters.priceRange) {
        if (filters.priceRange === 'under150' && product.price >= 150) return false;
        if (filters.priceRange === '150to200' && (product.price < 150 || product.price > 200)) return false;
        if (filters.priceRange === 'over200' && product.price <= 200) return false;
      }
      return true;
    });
  }, [filters]);

  const clearFilters = () => {
    setFilters({ size: '', category: '', color: '', priceRange: '' });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Cabecalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-brand text-secondary mb-4">
            Nossos Produtos
          </h1>
          <p className="text-gray-600">
            Explore nossa colecao completa de bolsas artesanais
          </p>
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filtros</span>
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Limpar filtros</span>
              </button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              {/* Filtro Tamanho */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tamanho
                </label>
                <select
                  value={filters.size}
                  onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                  <option value="">Todos</option>
                  {filterOptions.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                  <option value="">Todas</option>
                  {filterOptions.categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Cor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cor
                </label>
                <select
                  value={filters.color}
                  onChange={(e) => setFilters({ ...filters, color: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                  <option value="">Todas</option>
                  {filterOptions.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Preco */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Faixa de Preco
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>{range.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Contagem de resultados */}
        <p className="text-sm text-gray-500 mb-4">
          {filteredProducts.length} produto(s) encontrado(s)
        </p>

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg mb-4">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Card Especial - Bolsa por Encomenda */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-8 border-2 border-dashed border-primary/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-display font-bold text-secondary mb-2">
                Bolsa por Encomenda
              </h3>
              <p className="text-gray-600">
                Nao encontrou o que procura? Criamos uma bolsa personalizada para voce!
              </p>
            </div>
            <a
              href={`https://wa.me/${storeConfig.phone}?text=${encodeURIComponent('Ola! Gostaria de solicitar um orcamento para uma bolsa personalizada.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" className="flex items-center space-x-2 whitespace-nowrap">
                <MessageCircle className="w-5 h-5" />
                <span>Solicitar Orcamento</span>
              </Button>
            </a>
          </div>
        </div>
          
      </div>
    </div>
  );
};

export default Products;
