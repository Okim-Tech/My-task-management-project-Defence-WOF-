import { ClipboardList } from "lucide-react";

function AuthLayout({ title, children }) {
  return (
    <div className="auth-container">
      <div className="circle one"></div>
      <div className="circle two"></div>

      <div className="auth-card">
        <div className="logo-box">
          <ClipboardList size={45} />
        </div>

        <h1>{title}</h1>

        <p>
          Organize your academic life, manage your tasks and stay productive.
        </p>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
