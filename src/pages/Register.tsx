import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { register as registerUser, isAuthenticated } from "@/lib/auth";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name is too long"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username is too long").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address").max(255, "Email is too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const username = watch("username");

  const onSubmit = (data: RegisterForm) => {
    const result = registerUser(data.email, data.password, data.username, data.fullName);
    
    if (result.success) {
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } else {
      toast.error(result.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Logo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 rounded-full bg-card/50 border border-border">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="35" r="15" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                <path d="M25 75 C25 60, 35 55, 50 55 C65 55, 75 60, 75 75" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
                <path d="M60 40 L70 30 M70 40 L60 30" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold border border-primary/30 inline-block px-8 py-2 rounded">
              Register
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground/90">
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Sally Nurasyl"
                className="bg-input border-border/50 text-foreground"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground/90">
                User Name
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  placeholder="Admin"
                  className="bg-input border-border/50 text-foreground pr-10"
                  {...register("username")}
                  onFocus={() => setShowValidation(true)}
                />
                {showValidation && username && !errors.username && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/90">
                Account
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="SallyNurassyl@Gmail.Com"
                className="bg-input border-border/50 text-foreground"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/90">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                className="bg-input border-border/50 text-foreground"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground/90">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••••••"
                className="bg-input border-border/50 text-foreground"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full glow-primary">
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
