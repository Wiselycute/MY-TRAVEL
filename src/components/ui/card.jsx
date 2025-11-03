const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export { Card };