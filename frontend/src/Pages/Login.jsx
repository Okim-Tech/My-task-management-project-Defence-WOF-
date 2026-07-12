import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
  return (
    <AuthLayout title="Student Task Management">
      <form>
        <Input type="email" placeholder="Enter your email" name="email" />

        <Input
          type="password"
          placeholder="Enter your password"
          name="password"
        />

        <Button text="Login" type="submit" />

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
