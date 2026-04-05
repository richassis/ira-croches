// Funcoes para gerar URLs do WhatsApp com mensagens formatadas

/**
 * Gera URL do WhatsApp para compra de um produto individual
 * @param {Object} product - Objeto do produto
 * @param {string} phone - Numero do WhatsApp (com DDD)
 * @param {string} selectedColor - Cor selecionada (opcional)
 * @param {Object} paymentMethod - Metodo de pagamento selecionado (opcional)
 * @returns {string} URL formatada do WhatsApp
 */
export const generateProductWhatsAppURL = (product, phone, selectedColor = null, paymentMethod = null) => {
  let message = `Ola! Tenho interesse na *${product.name}* (R$ ${product.price.toFixed(2).replace('.', ',')})`;

  if (selectedColor) {
    message += `\nCor escolhida: ${selectedColor}`;
  }

  if (paymentMethod) {
    message += `\nForma de pagamento: ${paymentMethod.name}`;
    if (paymentMethod.id === 'pix') {
      const pixPrice = product.price * 0.9;
      message += `\nValor com desconto PIX: R$ ${pixPrice.toFixed(2).replace('.', ',')}`;
    }
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/**
 * Gera URL do WhatsApp para carrinho com multiplos produtos
 * @param {Array} cartItems - Array de itens do carrinho
 * @param {string} phone - Numero do WhatsApp (com DDD)
 * @param {Object} paymentMethod - Metodo de pagamento selecionado (opcional)
 * @returns {string} URL formatada do WhatsApp
 */
export const generateCartWhatsAppURL = (cartItems, phone, paymentMethod = null) => {
  let message = "Ola! Tenho interesse nos seguintes produtos:\n\n";

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Quantidade: ${item.quantity}x\n`;
    if (item.selectedColor) {
      message += `   Cor: ${item.selectedColor}\n`;
    }
    message += `   Preco unitario: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
    message += `   Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n\n`;
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

  if (paymentMethod) {
    message += `\n\nForma de pagamento: ${paymentMethod.name}`;
    if (paymentMethod.id === 'pix') {
      const pixTotal = total * 0.9;
      message += `\n*Valor com 10% OFF no PIX: R$ ${pixTotal.toFixed(2).replace('.', ',')}*`;
    }
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
