function Button({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#2563eb",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}

export default Button;
