// Funções para gerar URLs do WhatsApp com mensagens formatadas

/**
 * Gera URL do WhatsApp para compra de um produto individual
 * @param {Object} product - Objeto do produto
 * @param {string} phone - Número do WhatsApp (com DDD)
 * @returns {string} URL formatada do WhatsApp
 */
export const generateProductWhatsAppURL = (product, phone) => {
  const message = `Olá! Tenho interesse na *${product.name}* (R$ ${product.price.toFixed(2).replace('.', ',')})`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/**
 * Gera URL do WhatsApp para carrinho com múltiplos produtos
 * @param {Array} cartItems - Array de itens do carrinho
 * @param {string} phone - Número do WhatsApp (com DDD)
 * @returns {string} URL formatada do WhatsApp
 */
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
