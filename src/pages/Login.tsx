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
import { loginUser } from "@/lib/supabase-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [showValidation, setShowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/", { replace: true });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN') {
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const email = watch("email");

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const result = await loginUser(data.email, data.password);
      
      if (result.success) {
        toast.success("Welcome back!");
        navigate("/");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Logo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 rounded-full bg-card/50 border border-border">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke="hsl(var(--primary))" strokeWidth="2" />
                <path d="M35 45 L45 55 L65 35" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold border border-primary/30 inline-block px-8 py-2 rounded">
              Sign In
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/90">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-input border-border/50 text-foreground pr-10"
                  {...register("email")}
                  onFocus={() => setShowValidation(true)}
                  disabled={isLoading}
                />
                {showValidation && email && !errors.email && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
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
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
              <div className="text-right">
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                asChild
              >
                <Link to="/register">Don't Have An Account? Register</Link>
              </Button>
              <Button type="submit" className="flex-1 glow-primary" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
