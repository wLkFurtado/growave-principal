export default function ShineButton({ children, className = '', ...props }) {
  return (
    <button type="button" {...props} className={`shine-button ${className}`}>
      <span className="shine-button-content">{children}</span>
    </button>
  );
}
