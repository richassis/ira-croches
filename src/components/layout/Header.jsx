import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { storeConfig } from '../../data/products';
import CartIcon from '../cart/CartIcon';

const Header = () => {
  const { toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <ShoppingBag className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-display font-bold text-secondary">
                {storeConfig.name}
              </h1>
              <p className="text-xs text-gray-600">{storeConfig.tagline}</p>
            </div>
          </Link>

          {/* Navegação */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#produtos" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Produtos
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Sobre
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

          {/* Ícone do Carrinho */}
          <CartIcon onClick={toggleCart} />
        </div>
      </div>
    </header>
  );
};

export default Header;
