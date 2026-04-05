// Dados dos produtos - FÁCIL DE EDITAR!
// Para adicionar uma nova bolsa, copie um objeto abaixo e edite os campos

// Função auxiliar para gerar slug (URL amigável)
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-')     // Substitui caracteres especiais por -
    .replace(/^-+|-+$/g, '');        // Remove - do início e fim
};

export const products = [
  {
    id: 1,
    name: "Bruna",
    slug: "bruna",
    description: "Sofisticada em marrom terroso com textura popcorn única. Texturas laterais elegantes e plaqueta dourada Ira Crochê para um toque especial.",
    price: 145.00,
    image: "/bolsabruna.jpg",
    category: "premium",
    size: "Pequena", // Pequena, Média ou Grande
    colors: ["Marrom", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Lívia",
    slug: "livia",
    description: "Design circular único em tom areia neutro. Alça de couro premium e fecho com presilha marrom, combinando crochê artesanal com detalhes refinados.",
    price: 210.00,
    image: "/bolsalivia.jpg",
    category: "premium",
    size: "Média",
    colors: ["Areia", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Nane",
    slug: "fabiane",
    description: "Imponente em vinho profundo com textura popcorn luxuosa. Texturas abundantes e detalhes em pérolas de madeira natural. Nossa bolsa mais espaçosa e sofisticada.",
    price: 255.00,
    image: "/bolsafabiane.jpg",
    category: "premium",
    size: "Grande",
    colors: ["Vinho", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Alicia",
    slug: "alicia",
    description: "Vibrante em mostarda dourado com trama texturizada charmosa. Franjas laterais delicadas e plaqueta Ira Crochê. Pequena, mas cheia de personalidade.",
    price: 145.00,
    image: "/bolsaalicia.jpg",
    category: "premium",
    size: "Pequena",
    colors: ["Mostarda", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    name: "Cris",
    slug: "cristiane",
    description: "Clássica e versátil em marrom terroso com textura popcorn tradicional. Detalhes em franjas e plaqueta dourada. O equilíbrio perfeito entre elegância e praticidade.",
    price: 210.00,
    image: "/bolsacristiane.jpg",
    category: "premium",
    size: "Média",
    colors: ["Marrom", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 6,
    name: "Gisele",
    slug: "gisele",
    description: "Marcante em azul royal intenso com trama texturizada única. Grande capacidade com alças longas e tassel elegante. Perfeita para quem não tem medo de brilhar.",
    price: 255.00,
    image: "/bolsagisele.jpg",
    category: "premium",
    size: "Grande",
    colors: ["Azul Royal", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 7,
    name: "Juliana",
    slug: "juliana",
    description: "Design circular moderno em branco puro com corrente prateada sofisticada. Tassel branco delicado adiciona movimento e elegância. Pequena e impactante.",
    price: 145.00,
    image: "/bolsajuliana.jpg",
    category: "premium",
    size: "Pequena",
    colors: ["Branca", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 8,
    name: "Kerolay",
    slug: "kerolay",
    description: "Estilo saquinho descontraído em laranja vibrante energizante. Trama texturizada única e alças longas para uso transversal ou no ombro. Pura personalidade jovem.",
    price: 210.00,
    image: "/bolsakerolay.jpg",
    category: "premium",
    size: "Média",
    colors: ["Laranja", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 9,
    name: "Paula",
    slug: "paula",
    description: "Formato retangular elegante em vermelho paixão intenso. Textura popcorn sofisticada com corrente prateada e plaqueta Ira Crochê. Pequena, mas marcante.",
    price: 145.00,
    image: "/bolsapaula.jpg",
    category: "premium",
    size: "Pequena",
    colors: ["Vermelha", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 10,
    name: "Raquel",
    slug: "raquel",
    description: "Estilo saquinho jovem em tom dourado suave e delicado. Design com textura e corrente dourada. Romântica e feminina, perfeita para looks delicados.",
    price: 145.00,
    image: "/bolsaraquel.jpg",
    category: "premium",
    size: "Pequena",
    colors: ["Dourada", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },

];

// Configuração da loja
export const storeConfig = {
  name: "Ira Crochê",
  phone: "53984520891", // WhatsApp com DDD (53 = Rio Grande - RS)
  instagram: "@silveirairacina",
  instagramUrl: "https://instagram.com/silveirairacina",
  location: "Rio Grande - RS",
  tagline: "Bolsas de crochê feitas à mão",
  description: "Cada peça é única, feita com amor e dedicação. Trabalho artesanal de qualidade em crochê.",

  // Informações sobre entrega
  delivery: {
    title: "Entrega e Retirada",
    options: [
      "Retirada em mãos em Rio Grande - RS",
      "Entrega local pode ser acordada via WhatsApp",
      "Envio para outras cidades mediante combinação"
    ],
    note: "Entre em contato para combinarmos a melhor forma de entrega!"
  },

  // Informações sobre a artesã
  artisan: {
    name: "Ira",
    photo: "/iracina.jpg", // Adicionar foto depois
    description: "Apaixonada por artesanato, Ira transformou sua paixão pelo crochê em uma forma de criar peças únicas e especiais. Cada bolsa é feita com dedicação, carinho e atenção aos detalhes, garantindo qualidade e exclusividade. Com anos de experiência em técnicas de crochê, desenvolve modelos que combinam tradição e modernidade.",
    experience: "Mais de 10 anos trabalhando com crochê artesanal",
    specialty: "Bolsas personalizadas em diversas cores e tamanhos"
  },

  // Formas de pagamento
  payment: {
    pixDiscount: 5, // Desconto de 5% no PIX
    methods: [
      {
        id: "pix",
        name: "PIX",
        description: "Pagamento à vista com desconto",
        icon: "PIX"
      },
      {
        id: "credit_cash",
        name: "Cartão de Crédito à Vista",
        description: "Pagamento em uma única parcela",
        icon: "CARTÃO"
      },
      {
        id: "credit_installment",
        name: "Cartão de Crédito Parcelado",
        description: "Parcelamento disponível",
        icon: "PARCELAS"
      }
    ]
  }
};
