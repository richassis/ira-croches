import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Criar o Context
const CartContext = createContext();

// Hook customizado para usar o carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

// Provider do carrinho
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('ira-croches-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('ira-croches-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Adicionar produto ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Se já existe, aumenta quantidade
        toast.success(`Quantidade atualizada!`);
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona novo
        toast.success(`${product.name} adicionada ao carrinho!`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remover produto do carrinho
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find(item => item.id === productId);
      if (removedItem) {
        toast.success(`${removedItem.name} removida do carrinho`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // Atualizar quantidade de um produto
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setCartItems([]);
    toast.success('Carrinho limpo!');
  };

  // Calcular total do carrinho
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calcular quantidade total de itens
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Abrir/fechar carrinho
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    toggleCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
