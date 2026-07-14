import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({ type = "text", placeholder, value, onChange, icon, name }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="input-group">
      {icon && <span className="input-icon">{icon}</span>}

      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />

      {isPassword && (
        <span
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      )}
    </div>
  );
}

export default Input;
