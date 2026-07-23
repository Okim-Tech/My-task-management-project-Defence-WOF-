import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.success("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration Successful!");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <AuthLayout title="Student Task Management" subtitle="Create your account">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          icon={<User size={18} />}
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          icon={<Mail size={18} />}
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          icon={<Lock size={18} />}
          value={formData.password}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          icon={<Lock size={18} />}
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <Button text="Create Account" type="submit" />

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;
