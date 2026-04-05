# Ira Crochê - E-commerce de Bolsas Artesanais

Site de vendas para **Ira Crochê**, loja de bolsas de crochê artesanais localizada em Rio Grande - RS.

## 🎨 Sobre o Projeto

Este é um site moderno e responsivo desenvolvido em React para vendas de bolsas artesanais de crochê. Os pedidos são feitos diretamente pelo WhatsApp, proporcionando um atendimento personalizado.

### Características
- ✨ Design moderno e responsivo (mobile, tablet e desktop)
- 🛒 Carrinho de compras com localStorage (persiste entre sessões)
- 📱 Integração com WhatsApp para finalizar pedidos
- 🎨 Tema customizado (preto, dourado e tons terrosos)
- ⚡ Performance otimizada com Vite
- 📦 Fácil de adicionar novos produtos
- 🔍 Páginas individuais para cada produto com detalhes completos

## 🚀 Tecnologias Utilizadas

- **React** 18.3.1 - Biblioteca JavaScript para interfaces
- **Vite** 5.3.3 - Build tool moderno e rápido
- **Tailwind CSS** 3.4.4 - Framework CSS utilitário
- **React Router DOM** 6.26.0 - Navegação
- **Lucide React** - Ícones modernos
- **React Hot Toast** - Notificações

## 📁 Estrutura do Projeto

```
ira-croche/
├── public/              # Arquivos estáticos
│   ├── bolsa1.jpg       # Imagens dos produtos
│   ├── bolsa2.jpg
│   ├── bolsa3.jpg
│   └── bolsa4.jpg
├── src/
│   ├── components/      # Componentes React
│   │   ├── layout/      # Header, Footer, Layout
│   │   ├── product/     # ProductCard, ProductGrid
│   │   ├── cart/        # CartIcon, CartDrawer, CartItem, CartSummary
│   │   └── ui/          # Button, Badge (componentes reutilizáveis)
│   ├── context/         # CartContext (gerenciamento de estado)
│   ├── data/            # products.js (dados dos produtos) ⭐
│   ├── pages/           # Home.jsx, ProductDetail.jsx
│   ├── utils/           # whatsapp.js, formatters.js
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais + Tailwind
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── netlify.toml         # Configuração Netlify
└── README.md
```

## 🔧 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18 ou superior
- npm ou yarn

### Instalação

1. Clone o repositório (ou baixe o código)
```bash
git clone <url-do-repositorio>
cd ira-croche
```

2. Instale as dependências
```bash
npm install
```

3. Rode o servidor de desenvolvimento
```bash
npm run dev
```

4. Abra no navegador
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
```

O site será gerado na pasta `dist/`.

Para testar a build localmente:
```bash
npm run preview
```

## 📦 Como Adicionar Novos Produtos

**Veja o arquivo [COMO-ADICIONAR-PRODUTOS.md](./COMO-ADICIONAR-PRODUTOS.md) para um guia passo a passo.**

Resumo rápido:
1. Adicione a imagem na pasta `public/`
2. Edite o arquivo `src/data/products.js`
3. Copie um produto existente e edite os campos

## 🎨 Customização

### Cores do Tema
Edite o arquivo `tailwind.config.js`:
- `primary`: Dourado (#D4AF37)
- `secondary`: Preto (#000000)
- `accent`: Marrom terroso (#8B4513)

### Informações da Loja
Edite o arquivo `src/data/products.js`:
- Nome da loja
- Número do WhatsApp
- Instagram
- Localização

## 🌐 Deploy no Netlify

### Opção 1: Deploy Automático via GitHub

1. Suba o código para um repositório GitHub
2. Acesse [netlify.com](https://www.netlify.com/)
3. Clique em "Add new site" > "Import an existing project"
4. Conecte seu repositório GitHub
5. Netlify detecta automaticamente as configurações (graças ao `netlify.toml`)
6. Clique em "Deploy"

### Opção 2: Deploy Manual

1. Build o projeto localmente:
```bash
npm run build
```

2. Arraste a pasta `dist/` para o Netlify

### Configurações do Deploy

O arquivo `netlify.toml` já está configurado com:
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects para SPA funcionarem corretamente

## 📱 Integração WhatsApp

### Como Funciona

**Compra Individual (Botão "Comprar Agora")**:
- Abre WhatsApp com mensagem pré-formatada
- Mensagem: "Olá! Tenho interesse na [Nome da Bolsa] (R$ [preço])"

**Carrinho Múltiplo (Botão "Finalizar no WhatsApp")**:
- Lista todos os produtos do carrinho
- Mostra quantidade e subtotal de cada item
- Mostra total geral
- Exemplo:
  ```
  Olá! Tenho interesse nos seguintes produtos:

  1. Bolsa Classic
     Quantidade: 2x
     Preço unitário: R$ 150,00
     Subtotal: R$ 300,00

  Total: R$ 300,00
  ```

### Atualizar Número do WhatsApp

Edite `src/data/products.js`:
```javascript
export const storeConfig = {
  phone: "53984520981", // Altere aqui (com DDD)
  // ...
};
```

## 🛒 Funcionalidades do Carrinho

- **Adicionar produtos**: Clique em "Adicionar ao Carrinho"
- **Persistência**: Carrinho salvo no localStorage (não perde ao fechar)
- **Atualizar quantidade**: Botões + e - no carrinho
- **Remover item**: Botão de lixeira
- **Finalizar**: Redireciona para WhatsApp com lista completa

## 📸 Como o Site Funciona

### Página Inicial
1. **Hero Section**: Logo, tagline e CTA principal
2. **Grid de Produtos**: 4 bolsas em destaque
3. **Seção Sobre**: Informações sobre o trabalho artesanal
4. **Call to Action**: Link direto para WhatsApp

### Header
- Logo "Ira Crochê"
- Links de navegação
- Ícone do carrinho com contador de itens

### Footer
- Informações de contato
- Link do Instagram
- Localização

## 🔍 Arquivos Importantes para Editar

| Arquivo | O que faz |
|---------|-----------|
| `src/data/products.js` | **Lista de bolsas** - ÚNICO arquivo para adicionar produtos |
| `tailwind.config.js` | Cores do tema (preto, dourado, terroso) |
| `src/pages/Home.jsx` | Textos e seções da página inicial |
| `public/` | Imagens das bolsas |

## 🐛 Solução de Problemas

### Imagens não aparecem
- Verifique se as imagens estão em `public/`
- Certifique-se de que o caminho em `products.js` está correto (ex: `/bolsa1.jpg`)

### Carrinho não persiste
- Verifique se o localStorage está habilitado no navegador
- Abra o Console (F12) e procure por erros

### Build falha
- Delete `node_modules` e rode `npm install` novamente
- Verifique se não há erros de sintaxe nos arquivos `.jsx`

## 📄 Licença

Projeto criado para **Ira Crochê** - Rio Grande, RS.

## 👤 Contato

- Instagram: [@silveirairacina](https://instagram.com/silveirairacina)
- WhatsApp: (53) 98452-0981
- Localização: Rio Grande - RS

---

Feito com ❤️ para Ira Crochê
