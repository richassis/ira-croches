// Funções utilitárias para formatação

/**
 * Formata número para moeda brasileira (R$)
 * @param {number} value - Valor numérico
 * @returns {string} Valor formatado (ex: "R$ 150,00")
 */
export const formatPrice = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata array de cores em string
 * @param {Array} colors - Array de cores
 * @returns {string} Cores formatadas (ex: "Preto, Marrom")
 */
export const formatColors = (colors) => {
  if (!colors || colors.length === 0) return '';
  return colors.join(', ');
};
