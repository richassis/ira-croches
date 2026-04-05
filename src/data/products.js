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
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
    price: 145.00,
    image: "/bolsabruna.jpg",
    category: "premium",
    size: "Média", // Pequena, Média ou Grande
    colors: ["Marrom", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Lívia",
    slug: "livia",
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
    price: 166.00,
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
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
    price: 168.00,
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
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
    price: 139.00,
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
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
    price: 145.00,
    image: "/bolsacristiane.jpg",
    category: "premium",
    size: "Média",
    colors: ["Marrom", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },
  {
    id: 6,
    name: "Duda",
    slug: "duda",
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
    price: 145.00,
    image: "/bolsaduda.jpg",
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
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
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
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
    price: 145.00,
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
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
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
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
    price: 150.00,
    image: "/bolsaraquel.jpg",
    category: "premium",
    size: "Pequena",
    colors: ["Rosa", "Cor Personalizável"],
    inStock: true,
    featured: true,
  },

];

// Configuração da loja
export const storeConfig = {
  name: "Ira Crochês",
  phone: "53984520981", // WhatsApp com DDD (53 = Rio Grande - RS)
  instagram: "@silveirairacina",
  instagramUrl: "https://instagram.com/silveirairacina",
  location: "Rio Grande - RS",
  tagline: "Bolsas artesanais feitas à mão",
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
    description: "Apaixonada por artesanato desde criança, Ira transformou sua paixão pelo crochê em uma forma de criar peças únicas e especiais. Cada bolsa é feita com dedicação, carinho e atenção aos detalhes, garantindo qualidade e exclusividade. Com anos de experiência em técnicas de crochê, desenvolvo modelos que combinam tradição e modernidade.",
    experience: "Mais de 10 anos trabalhando com crochê artesanal",
    specialty: "Bolsas personalizadas em diversas cores e tamanhos"
  }
};
