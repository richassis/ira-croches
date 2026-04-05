// Componente Badge para contador (usado no ícone do carrinho)

const Badge = ({ children, className = '', variant = 'primary' }) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
  };

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
