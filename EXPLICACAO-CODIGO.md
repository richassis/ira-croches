# 📚 EXPLICAÇÃO DETALHADA DO CÓDIGO - Ira Crochês

Este documento explica como cada parte do site funciona no código, mostrando onde está implementado para facilitar o entendimento e manutenção.

---

## 📋 Índice

1. [Estrutura Geral do Projeto](#1-estrutura-geral-do-projeto)
2. [Configurações Base](#2-configurações-base)
3. [Dados e Lógica de Negócio](#3-dados-e-lógica-de-negócio)
4. [Gerenciamento de Estado (Carrinho)](#4-gerenciamento-de-estado-carrinho)
5. [Componentes da Interface](#5-componentes-da-interface)
6. [Integração WhatsApp](#6-integração-whatsapp)
7. [Fluxo Completo da Aplicação](#7-fluxo-completo-da-aplicação)

---

## 1. Estrutura Geral do Projeto

### Entry Point - `src/main.jsx`

**Localização**: `src/main.jsx`

**O que faz**: Ponto de entrada da aplicação React. É o primeiro arquivo executado.

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // Importa Tailwind CSS

// Renderiza o componente App dentro do elemento #root do HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Como funciona**:
1. Encontra o elemento `<div id="root">` no `index.html`
2. Renderiza o componente `App` dentro dele
3. `StrictMode` ativa verificações extras em desenvolvimento

---

### Componente Principal - `src/App.jsx`

**Localização**: `src/App.jsx`

**O que faz**: Estrutura principal que organiza toda a aplicação.

```javascript
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

function App() {
  return (
    <Router>                      {/* 1. Habilita navegação */}
      <CartProvider>              {/* 2. Fornece carrinho global */}
        <Layout>                  {/* 3. Header + Footer */}
          <Home />                {/* 4. Página principal */}
        </Layout>
        <Toaster />               {/* 5. Notificações toast */}
      </CartProvider>
    </Router>
  );
}
```

**Hierarquia de componentes**:
```
<Router>
  └── <CartProvider>
      ├── <Layout>
      │   ├── <Header />
      │   ├── <Home />         (conteúdo principal)
      │   └── <Footer />
      ├── <CartDrawer />       (drawer do carrinho)
      └── <Toaster />          (notificações)
```

---

## 2. Configurações Base

### Configuração do Tailwind - `tailwind.config.js`

**Localização**: `tailwind.config.js`

**O que faz**: Define as cores e estilos customizados do site.

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",  // Procura classes Tailwind em todos os arquivos
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37',       // Dourado - usado em botões, títulos
        secondary: '#000000',     // Preto - fundo, textos principais
        accent: '#8B4513',        // Marrom terroso - detalhes
      },
    },
  },
}
```

**Onde as cores são usadas**:
- `primary` (dourado): Botões, preços, destaques
- `secondary` (preto): Header, footer, textos
- `accent` (marrom): Gradientes, seções especiais

---

### Estilos Globais - `src/index.css`

**Localização**: `src/index.css`

**O que faz**: Importa Tailwind e define estilos globais.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter...');

@tailwind base;       /* Reset CSS + base styles */
@tailwind components; /* Classes de componentes */
@tailwind utilities;  /* Classes utilitárias */

@layer base {
  body {
    @apply bg-white text-gray-900 font-sans antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary hover:bg-primary-dark text-white ...;
  }
}
```

**Camadas explicadas**:
- `@layer base`: Estilos que afetam elementos HTML padrão
- `@layer components`: Classes reutilizáveis customizadas
- `@layer utilities`: Classes auxiliares

---

## 3. Dados e Lógica de Negócio

### Dados dos Produtos - `src/data/products.js`

**Localização**: `src/data/products.js`

**⭐ ARQUIVO MAIS IMPORTANTE PARA EDITAR**

**O que faz**: Armazena todos os produtos e configurações da loja.

```javascript
export const products = [
  {
    id: 1,                    // Identificador único
    name: "Bolsa Classic",    // Nome exibido
    description: "...",       // Descrição do produto
    price: 150.00,           // Preço em número
    image: "/bolsa1.jpg",    // Caminho da imagem em public/
    category: "classic",      // Categoria
    colors: ["Preto"],       // Array de cores
    inStock: true,           // true = disponível, false = esgotado
    featured: true,          // true = aparece na home
  },
  // ... mais produtos
];

export const storeConfig = {
  name: "Ira Crochês",
  phone: "53984520981",       // ⭐ WhatsApp (DDD + número)
  instagram: "@silveirairacina",
  instagramUrl: "https://instagram.com/silveirairacina",
  location: "Rio Grande - RS",
  tagline: "Bolsas artesanais feitas à mão",
  description: "...",
};
```

**Como é usado**:
- `ProductGrid` pega o array `products` e exibe os cards
- `ProductCard` recebe 1 produto e mostra os detalhes
- `Header`, `Footer` usam `storeConfig` para exibir informações
- `whatsapp.js` usa `storeConfig.phone` para gerar links

---

### Utilitários de Formatação - `src/utils/formatters.js`

**Localização**: `src/utils/formatters.js`

**O que faz**: Funções auxiliares para formatar valores.

```javascript
// Formata número para moeda brasileira
export const formatPrice = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
// Exemplo: formatPrice(150) → "R$ 150,00"

// Formata array de cores em string
export const formatColors = (colors) => {
  return colors.join(', ');
};
// Exemplo: ["Preto", "Marrom"] → "Preto, Marrom"
```

**Onde é usado**:
- `ProductCard.jsx`: formata preço dos produtos
- `CartItem.jsx`: formata subtotais
- `CartSummary.jsx`: formata total do carrinho

---

## 4. Gerenciamento de Estado (Carrinho)

### Context do Carrinho - `src/context/CartContext.jsx`

**Localização**: `src/context/CartContext.jsx`

**O que faz**: Gerencia o estado global do carrinho de compras.

#### Estrutura do Carrinho

```javascript
const [cartItems, setCartItems] = useState([
  {
    id: 1,
    name: "Bolsa Classic",
    price: 150.00,
    image: "/bolsa1.jpg",
    quantity: 2,  // ⭐ Quantidade adicionada
  },
  // ... mais itens
]);
```

#### Principais Funções

**1. `addToCart(product)`** - Adiciona produto ao carrinho

**Localização**: `src/context/CartContext.jsx` (linha ~35)

```javascript
const addToCart = (product) => {
  setCartItems((prevItems) => {
    // Verifica se produto já existe no carrinho
    const existingItem = prevItems.find(item => item.id === product.id);

    if (existingItem) {
      // Se existe, aumenta quantidade
      return prevItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Se não existe, adiciona novo com quantity: 1
      return [...prevItems, { ...product, quantity: 1 }];
    }
  });
};
```

**Como funciona**:
1. Busca se o produto já está no carrinho
2. Se SIM: aumenta a quantidade em +1
3. Se NÃO: adiciona com `quantity: 1`
4. Mostra notificação de sucesso

**2. `removeFromCart(productId)`** - Remove produto

**Localização**: `src/context/CartContext.jsx` (linha ~55)

```javascript
const removeFromCart = (productId) => {
  setCartItems((prevItems) => {
    return prevItems.filter(item => item.id !== productId);
  });
};
```

**3. `updateQuantity(productId, quantity)`** - Atualiza quantidade

**Localização**: `src/context/CartContext.jsx` (linha ~65)

```javascript
const updateQuantity = (productId, quantity) => {
  if (quantity < 1) {
    removeFromCart(productId);  // Se quantidade = 0, remove
    return;
  }

  setCartItems((prevItems) =>
    prevItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
  );
};
```

**4. `getCartTotal()`** - Calcula total do carrinho

**Localização**: `src/context/CartContext.jsx` (linha ~85)

```javascript
const getCartTotal = () => {
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};
```

**Exemplo**:
```javascript
// Carrinho:
[
  { price: 150, quantity: 2 },  // 300
  { price: 180, quantity: 1 },  // 180
]
// Total: 480
```

#### localStorage - Persistência

**Localização**: `src/context/CartContext.jsx` (linhas ~20-30)

```javascript
// Carrega carrinho ao iniciar
useEffect(() => {
  const savedCart = localStorage.getItem('ira-croches-cart');
  if (savedCart) {
    setCartItems(JSON.parse(savedCart));
  }
}, []);

// Salva carrinho sempre que mudar
useEffect(() => {
  localStorage.setItem('ira-croches-cart', JSON.stringify(cartItems));
}, [cartItems]);
```

**Como funciona**:
1. Ao abrir o site: lê `localStorage` e restaura carrinho
2. Ao modificar carrinho: salva automaticamente no `localStorage`
3. Ao fechar/atualizar página: carrinho permanece

---

## 5. Componentes da Interface

### 5.1 Componentes de Layout

#### Header - `src/components/layout/Header.jsx`

**Localização**: `src/components/layout/Header.jsx`

**O que faz**: Barra superior com logo e carrinho.

```javascript
const Header = () => {
  const { toggleCart } = useCart();  // Função para abrir/fechar carrinho

  return (
    <header className="sticky top-0 ...">  {/* Fica fixo no topo */}
      <div className="container-custom">
        {/* Logo e nome */}
        <div>
          <ShoppingBag className="w-8 h-8 text-primary" />
          <h1>{storeConfig.name}</h1>
        </div>

        {/* Navegação */}
        <nav>
          <a href="#produtos">Produtos</a>
          <a href="#sobre">Sobre</a>
          <a href={storeConfig.instagramUrl}>Instagram</a>
        </nav>

        {/* Ícone do carrinho */}
        <CartIcon onClick={toggleCart} />
      </div>
    </header>
  );
};
```

**Características**:
- `sticky top-0`: Header fica fixo ao rolar a página
- Navegação com links âncora (`#produtos`, `#sobre`)
- CartIcon mostra badge com quantidade de itens

---

#### Footer - `src/components/layout/Footer.jsx`

**Localização**: `src/components/layout/Footer.jsx`

**O que faz**: Rodapé com informações de contato.

```javascript
const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna 1: Sobre */}
        <div>
          <h3>{storeConfig.name}</h3>
          <p>{storeConfig.description}</p>
        </div>

        {/* Coluna 2: Contato */}
        <div>
          <MapPin /> {storeConfig.location}
          <Instagram /> {storeConfig.instagram}
        </div>

        {/* Coluna 3: Informações */}
        <div>
          <ul>
            <li>Produtos artesanais</li>
            <li>Feitos à mão</li>
            ...
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p>© {new Date().getFullYear()} {storeConfig.name}</p>
    </footer>
  );
};
```

---

#### Layout - `src/components/layout/Layout.jsx`

**Localização**: `src/components/layout/Layout.jsx`

**O que faz**: Wrapper que organiza Header + Conteúdo + Footer.

```javascript
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}  {/* Aqui vai a página Home */}
      </main>
      <Footer />
      <CartDrawer />  {/* Drawer do carrinho */}
    </div>
  );
};
```

**Estrutura visual**:
```
┌─────────────────┐
│     Header      │ ← Fixo no topo
├─────────────────┤
│                 │
│    children     │ ← Conteúdo dinâmico (Home)
│   (flex-grow)   │ ← Cresce para preencher espaço
│                 │
├─────────────────┤
│     Footer      │ ← Sempre no final
└─────────────────┘
```

---

### 5.2 Componentes de Produto

#### ProductCard - `src/components/product/ProductCard.jsx`

**Localização**: `src/components/product/ProductCard.jsx`

**O que faz**: Card individual de produto com imagem, info e botões.

```javascript
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Botão "Comprar Agora" - abre WhatsApp direto
  const handleBuyNow = () => {
    const whatsappUrl = generateProductWhatsAppURL(product, storeConfig.phone);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group bg-white rounded-xl shadow-md ...">
      {/* Imagem */}
      <div className="aspect-square">
        <img src={product.image} alt={product.name} />
        {!product.inStock && <div>Esgotado</div>}
      </div>

      {/* Informações */}
      <div className="p-5">
        <h3>{product.name}</h3>
        <p className="text-primary">{formatPrice(product.price)}</p>
        <p>{product.description}</p>
        <p>Cores: {formatColors(product.colors)}</p>

        {/* Botões */}
        <Button onClick={() => addToCart(product)}>
          <ShoppingCart /> Adicionar ao Carrinho
        </Button>

        <Button onClick={handleBuyNow} variant="outline">
          <MessageCircle /> Comprar Agora
        </Button>
      </div>
    </div>
  );
};
```

**Funcionalidades**:
1. **Imagem**: Mostra foto do produto
2. **Esgotado**: Se `inStock: false`, mostra overlay "Esgotado"
3. **Adicionar ao Carrinho**: Chama `addToCart(product)`
4. **Comprar Agora**: Abre WhatsApp com mensagem pré-formatada
5. **Hover**: Efeito de zoom na imagem (`group-hover:scale-105`)

---

#### ProductGrid - `src/components/product/ProductGrid.jsx`

**Localização**: `src/components/product/ProductGrid.jsx`

**O que faz**: Grid responsivo de produtos.

```javascript
const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

**Responsividade**:
- Mobile (`< 640px`): 1 coluna
- Tablet (`≥ 640px`): 2 colunas
- Desktop (`≥ 1024px`): 3 colunas
- Grande (`≥ 1280px`): 4 colunas

---

### 5.3 Componentes do Carrinho

#### CartIcon - `src/components/cart/CartIcon.jsx`

**Localização**: `src/components/cart/CartIcon.jsx`

**O que faz**: Ícone do carrinho com badge de contador.

```javascript
const CartIcon = ({ onClick }) => {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();  // Total de itens

  return (
    <button onClick={onClick}>
      <ShoppingBag className="w-6 h-6" />
      {itemCount > 0 && (
        <Badge variant="primary">{itemCount}</Badge>
      )}
    </button>
  );
};
```

**Como funciona**:
- `getCartCount()`: Soma `quantity` de todos os itens
- Badge só aparece se `itemCount > 0`
- Ao clicar: chama `onClick` (que abre o CartDrawer)

---

#### CartDrawer - `src/components/cart/CartDrawer.jsx`

**Localização**: `src/components/cart/CartDrawer.jsx`

**O que faz**: Sidebar lateral que mostra o carrinho.

```javascript
const CartDrawer = () => {
  const { isCartOpen, closeCart, cartItems } = useCart();

  if (!isCartOpen) return null;  // Não renderiza se fechado

  return (
    <>
      {/* Overlay escuro */}
      <div className="fixed inset-0 bg-black/50" onClick={closeCart} />

      {/* Drawer lateral */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white">
        {/* Header */}
        <div>
          <h2>Carrinho</h2>
          <button onClick={closeCart}><X /></button>
        </div>

        {/* Conteúdo */}
        {cartItems.length === 0 ? (
          <div>Carrinho vazio</div>
        ) : (
          <>
            {/* Lista de itens */}
            <div>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Resumo */}
            <CartSummary />
          </>
        )}
      </div>
    </>
  );
};
```

**Estrutura visual**:
```
┌─────────────────────────────┐
│ [X]  Carrinho               │ ← Header
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │ CartItem 1          │    │ ← Lista de itens
│  │ CartItem 2          │    │   (scroll se muitos)
│  └─────────────────────┘    │
├─────────────────────────────┤
│  Total: R$ 300,00           │ ← CartSummary
│  [Finalizar no WhatsApp]    │
└─────────────────────────────┘
```

---

#### CartItem - `src/components/cart/CartItem.jsx`

**Localização**: `src/components/cart/CartItem.jsx`

**O que faz**: Item individual dentro do carrinho.

```javascript
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Imagem miniatura */}
      <img src={item.image} className="w-20 h-20" />

      {/* Informações */}
      <div>
        <h4>{item.name}</h4>
        <p>{formatPrice(item.price)}</p>

        {/* Controles de quantidade */}
        <div className="flex items-center">
          <button onClick={handleDecrease}><Minus /></button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrease}><Plus /></button>

          <button onClick={() => removeFromCart(item.id)}>
            <Trash2 />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div>
        <p>Subtotal</p>
        <p>{formatPrice(item.price * item.quantity)}</p>
      </div>
    </div>
  );
};
```

**Interações**:
- Botão `-`: Diminui quantidade (mínimo 1)
- Botão `+`: Aumenta quantidade
- Botão lixeira: Remove item completamente
- Subtotal atualiza automaticamente

---

#### CartSummary - `src/components/cart/CartSummary.jsx`

**Localização**: `src/components/cart/CartSummary.jsx`

**O que faz**: Mostra total e botão de finalizar.

```javascript
const CartSummary = () => {
  const { cartItems, getCartTotal, closeCart } = useCart();

  // Ao finalizar: abre WhatsApp com lista completa
  const handleCheckout = () => {
    const whatsappUrl = generateCartWhatsAppURL(cartItems, storeConfig.phone);
    window.open(whatsappUrl, '_blank');
    closeCart();  // Fecha o drawer
  };

  const total = getCartTotal();

  return (
    <div className="border-t pt-4">
      {/* Total */}
      <div className="flex justify-between">
        <span>Total</span>
        <span className="text-primary">{formatPrice(total)}</span>
      </div>

      {/* Botão */}
      <Button onClick={handleCheckout} variant="primary">
        <MessageCircle /> Finalizar no WhatsApp
      </Button>

      <p className="text-xs">
        Você será redirecionado para o WhatsApp
      </p>
    </div>
  );
};
```

---

### 5.4 Componentes UI Base

#### Button - `src/components/ui/Button.jsx`

**Localização**: `src/components/ui/Button.jsx`

**O que faz**: Botão reutilizável com variantes.

```javascript
const Button = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-secondary hover:bg-secondary-light text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary',
    ghost: 'text-primary hover:bg-primary/10',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`... ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

**Uso**:
```javascript
<Button variant="primary" onClick={...}>
  Clique Aqui
</Button>

<Button variant="outline" disabled>
  Desabilitado
</Button>
```

---

#### Badge - `src/components/ui/Badge.jsx`

**Localização**: `src/components/ui/Badge.jsx`

**O que faz**: Badge circular para contador.

```javascript
const Badge = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
  };

  return (
    <span className={`inline-flex ... rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
};
```

**Usado em**: CartIcon para mostrar quantidade de itens

---

## 6. Integração WhatsApp

### Funções WhatsApp - `src/utils/whatsapp.js`

**Localização**: `src/utils/whatsapp.js`

**O que faz**: Gera URLs do WhatsApp com mensagens formatadas.

#### Função 1: Compra Individual

```javascript
export const generateProductWhatsAppURL = (product, phone) => {
  const message = `Olá! Tenho interesse na *${product.name}* (R$ ${product.price.toFixed(2).replace('.', ',')})`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
```

**Exemplo de uso**:
```javascript
const product = { name: "Bolsa Classic", price: 150 };
const phone = "53984520981";

generateProductWhatsAppURL(product, phone);
// Retorna:
// "https://wa.me/53984520981?text=Ol%C3%A1!%20Tenho%20interesse%20na%20*Bolsa%20Classic*%20(R$%20150,00)"
```

**Resultado no WhatsApp**:
```
Olá! Tenho interesse na *Bolsa Classic* (R$ 150,00)
```

---

#### Função 2: Carrinho Completo

```javascript
export const generateCartWhatsAppURL = (cartItems, phone) => {
  let message = "Olá! Tenho interesse nos seguintes produtos:\n\n";

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Quantidade: ${item.quantity}x\n`;
    message += `   Preço unitário: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
    message += `   Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n\n`;
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
```

**Exemplo de uso**:
```javascript
const cartItems = [
  { name: "Bolsa Classic", price: 150, quantity: 2 },
  { name: "Bolsa Premium", price: 180, quantity: 1 },
];

generateCartWhatsAppURL(cartItems, "53984520981");
```

**Resultado no WhatsApp**:
```
Olá! Tenho interesse nos seguintes produtos:

1. *Bolsa Classic*
   Quantidade: 2x
   Preço unitário: R$ 150,00
   Subtotal: R$ 300,00

2. *Bolsa Premium*
   Quantidade: 1x
   Preço unitário: R$ 180,00
   Subtotal: R$ 180,00

*Total: R$ 480,00*
```

**Formatação**:
- `*texto*`: Negrito no WhatsApp
- `\n`: Quebra de linha
- `encodeURIComponent()`: Codifica caracteres especiais para URL

---

## 7. Fluxo Completo da Aplicação

### 7.1 Fluxo: Adicionar Produto ao Carrinho

```
1. Usuário clica em "Adicionar ao Carrinho"
   ↓
2. ProductCard.jsx chama addToCart(product)
   ↓
3. CartContext.jsx recebe o produto
   ↓
4. Verifica se produto já existe no carrinho
   ├─ SIM: Aumenta quantity em +1
   └─ NÃO: Adiciona com quantity: 1
   ↓
5. Atualiza estado cartItems
   ↓
6. useEffect detecta mudança
   ↓
7. Salva no localStorage
   ↓
8. react-hot-toast mostra notificação
   ↓
9. CartIcon atualiza badge com novo contador
```

**Arquivos envolvidos**:
1. `ProductCard.jsx:56` - Botão onClick
2. `CartContext.jsx:35` - Função addToCart
3. `CartContext.jsx:28` - useEffect localStorage
4. `CartIcon.jsx:8` - Badge atualizado

---

### 7.2 Fluxo: Finalizar Compra no WhatsApp

```
1. Usuário clica em "Finalizar no WhatsApp"
   ↓
2. CartSummary.jsx chama handleCheckout()
   ↓
3. Pega todos os cartItems do contexto
   ↓
4. Chama generateCartWhatsAppURL(cartItems, phone)
   ↓
5. whatsapp.js formata mensagem com lista de produtos
   ↓
6. Retorna URL do WhatsApp
   ↓
7. window.open(url, '_blank') abre nova aba
   ↓
8. Usuário é redirecionado para WhatsApp
   ↓
9. Mensagem já está preenchida e pronta para enviar
```

**Arquivos envolvidos**:
1. `CartSummary.jsx:12` - handleCheckout
2. `whatsapp.js:17` - generateCartWhatsAppURL
3. `data/products.js:44` - storeConfig.phone

---

### 7.3 Fluxo: Compra Direta (Botão "Comprar Agora")

```
1. Usuário clica em "Comprar Agora" no ProductCard
   ↓
2. ProductCard.jsx chama handleBuyNow()
   ↓
3. Chama generateProductWhatsAppURL(product, phone)
   ↓
4. whatsapp.js formata mensagem do produto individual
   ↓
5. Retorna URL do WhatsApp
   ↓
6. window.open(url, '_blank')
   ↓
7. WhatsApp abre com mensagem:
   "Olá! Tenho interesse na Bolsa X (R$ Y)"
```

**Arquivos envolvidos**:
1. `ProductCard.jsx:12` - handleBuyNow
2. `whatsapp.js:9` - generateProductWhatsAppURL
3. `data/products.js:44` - storeConfig.phone

---

### 7.4 Fluxo: Persistência do Carrinho

```
CENÁRIO: Usuário fecha o navegador e reabre

1. Usuário fecha navegador
   ├─ CartContext tinha salvado no localStorage
   └─ Dados permanecem no navegador

2. Usuário abre site novamente
   ↓
3. main.jsx renderiza App
   ↓
4. App renderiza CartProvider
   ↓
5. CartContext.jsx é montado
   ↓
6. useEffect (linha 22) é executado
   ↓
7. Lê localStorage.getItem('ira-croches-cart')
   ↓
8. Faz JSON.parse() dos dados
   ↓
9. Atualiza setCartItems com carrinho salvo
   ↓
10. Carrinho é restaurado! 🎉
```

**Código chave**:
```javascript
// src/context/CartContext.jsx:22-29
useEffect(() => {
  const savedCart = localStorage.getItem('ira-croches-cart');
  if (savedCart) {
    setCartItems(JSON.parse(savedCart));
  }
}, []);  // [] = executa apenas na montagem
```

---

## 8. Responsividade

### Como o site se adapta aos tamanhos de tela

**Breakpoints do Tailwind**:
```
sm:  640px  (tablets pequenos)
md:  768px  (tablets)
lg:  1024px (laptops)
xl:  1280px (desktops)
```

#### Exemplo: ProductGrid

**Código**: `src/components/product/ProductGrid.jsx:6`

```javascript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

**Comportamento**:
- Mobile (<640px): `grid-cols-1` → 1 coluna
- Tablet (≥640px): `sm:grid-cols-2` → 2 colunas
- Desktop (≥1024px): `lg:grid-cols-3` → 3 colunas
- Grande (≥1280px): `xl:grid-cols-4` → 4 colunas

---

## 9. Deploy no Netlify

### Configuração - `netlify.toml`

**Localização**: `netlify.toml`

```toml
[build]
  command = "npm run build"  # Comando para gerar site
  publish = "dist"           # Pasta com arquivos finais

[[redirects]]
  from = "/*"               # Qualquer rota
  to = "/index.html"        # Redireciona para index.html
  status = 200              # SPA routing

[build.environment]
  NODE_VERSION = "18"       # Versão do Node.js
```

**Por que precisa de redirects?**

React é uma SPA (Single Page Application). Todas as rotas são gerenciadas pelo JavaScript.

Sem redirect:
```
usuário acessa: https://site.com/produtos
Netlify procura: dist/produtos.html
Resultado: 404 Not Found ❌
```

Com redirect:
```
usuário acessa: https://site.com/produtos
Netlify redireciona: dist/index.html
React Router: renderiza página correta ✅
```

---

## 10. Perguntas Frequentes

### Como adicionar uma nova seção na Home?

**Arquivo**: `src/pages/Home.jsx`

**Localização**: Entre as `<section>` existentes

```javascript
{/* Nova Seção */}
<section className="py-16 bg-white">
  <div className="container-custom">
    <h2>Título da Nova Seção</h2>
    <p>Conteúdo aqui...</p>
  </div>
</section>
```

---

### Como mudar as cores do tema?

**Arquivo**: `tailwind.config.js`

```javascript
colors: {
  primary: '#D4AF37',    // ⭐ Mude aqui
  secondary: '#000000',  // ⭐ E aqui
  accent: '#8B4513',     // ⭐ E aqui
}
```

**Impacto**: Todas as classes `bg-primary`, `text-primary`, etc. mudam automaticamente.

---

### Como desabilitar o toast de notificação?

**Arquivo**: `src/context/CartContext.jsx`

**Remova ou comente**: `toast.success('...')` nas linhas 45, 50, 60, 74

---

### Como adicionar filtro por categoria?

**Onde modificar**:

1. `src/pages/Home.jsx:13` - Adicionar botões de filtro
```javascript
const [filter, setFilter] = useState('all');

const filteredProducts = filter === 'all'
  ? featuredProducts
  : featuredProducts.filter(p => p.category === filter);
```

2. Renderizar:
```javascript
<ProductGrid products={filteredProducts} />
```

---

## 11. Glossário de Termos

| Termo | Significado |
|-------|-------------|
| **Component** | Pedaço reutilizável de interface (ex: Button, ProductCard) |
| **Props** | Dados passados de pai para filho (ex: `<Button variant="primary">`) |
| **State** | Dados que mudam ao longo do tempo (ex: `cartItems`) |
| **Context** | Estado global acessível por toda a aplicação |
| **Hook** | Função do React que começa com `use` (ex: `useCart`, `useState`) |
| **localStorage** | Armazenamento permanente no navegador |
| **SPA** | Single Page Application - 1 HTML, JS muda conteúdo |
| **Responsivo** | Design que se adapta a diferentes tamanhos de tela |
| **Tailwind** | Framework CSS com classes utilitárias |
| **Vite** | Ferramenta para desenvolvimento e build |

---

## Conclusão

Este documento cobriu todos os aspectos do código do site Ira Crochês. Para dúvidas específicas sobre um arquivo, consulte a seção correspondente e procure a **Localização** indicada.

**Arquivos mais importantes para editar**:
1. `src/data/products.js` - Produtos e configurações
2. `tailwind.config.js` - Cores e tema
3. `src/pages/Home.jsx` - Conteúdo da página
4. `src/context/CartContext.jsx` - Lógica do carrinho

**Arquivos de configuração**:
- `package.json` - Dependências
- `vite.config.js` - Build
- `netlify.toml` - Deploy

---

Made with ❤️ for Ira Crochês
