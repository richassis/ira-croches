// Componente Button reutilizável com variantes

const Button = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg',
    secondary: 'bg-secondary hover:bg-secondary-light text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
