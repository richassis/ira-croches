import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { storeConfig } from '../../data/products';
import CartIcon from '../cart/CartIcon';

const Header = () => {
  const { toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <ShoppingBag className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-brand text-secondary">
                {storeConfig.name}
              </h1>
              <p className="text-xs text-gray-600">{storeConfig.tagline}</p>
            </div>
          </Link>

          {/* Navegacao */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/produtos" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Produtos
            </Link>
            <a href="/#sobre" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Sobre
            </a>
            <a href="/#encomendas" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Encomendas
            </a>
            <a
              href={storeConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Instagram
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Botao do menu no mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Icone do carrinho */}
            <CartIcon onClick={toggleCart} />
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav id="mobile-nav" className="md:hidden pb-4 border-t border-gray-100">
            <div className="pt-3 flex flex-col gap-1">
              <Link
                to="/produtos"
                onClick={closeMobileMenu}
                className="px-2 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Produtos
              </Link>
              <a
                href="/#sobre"
                onClick={closeMobileMenu}
                className="px-2 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Sobre
              </a>
              <a
                href="/#encomendas"
                onClick={closeMobileMenu}
                className="px-2 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Encomendas
              </a>
              <a
                href={storeConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="px-2 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Instagram
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
