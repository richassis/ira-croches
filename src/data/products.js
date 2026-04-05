// Dados dos produtos - FÁCIL DE EDITAR!
// Para adicionar uma nova bolsa, copie um objeto abaixo e edite os campos

export const products = [
  {
    id: 1,
    name: "Bolsa Artesanal Classic",
    description: "Bolsa de crochê feita à mão com linha de alta qualidade. Perfeita para o dia a dia, combina estilo e praticidade.",
    price: 150.00,
    image: "/bolsa1.jpg",
    category: "classic",
    colors: ["Preto", "Marrom"],
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Bolsa Artesanal Premium",
    description: "Modelo exclusivo com detalhes sofisticados. Ideal para ocasiões especiais e eventos.",
    price: 180.00,
    image: "/bolsa2.jpg",
    category: "premium",
    colors: ["Dourado", "Terroso"],
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Bolsa Artesanal Elegance",
    description: "Design elegante e atemporal. Feita com dedicação e atenção aos detalhes.",
    price: 165.00,
    image: "/bolsa3.jpg",
    category: "classic",
    colors: ["Marrom", "Preto"],
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Bolsa Artesanal Deluxe",
    description: "Nossa bolsa mais refinada. Acabamento impecável e design único para quem busca exclusividade.",
    price: 200.00,
    image: "/bolsa4.jpg",
    category: "premium",
    colors: ["Dourado", "Preto"],
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
};
