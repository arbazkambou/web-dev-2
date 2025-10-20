import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../features/user/LoginForm";

function LoginPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Login into Wild Oasis</CardTitle>
          <CardDescription>Please enter your details here</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
