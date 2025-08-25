function Button({ children, color, fontColor }) {
  console.log("color", color);
  return (
    <button style={{ backgroundColor: color, color: fontColor }}>
      {children}
    </button>
  );
}

export default Button;
