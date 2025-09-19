import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input } from "../UI"; 

const schema = z.object({
  username: z
    .string()
    .min(1, "Имя пользователя обязательно для заполнения")
    .min(3, "Имя пользователя должно содержать минимум 3 символа"),
  password: z
    .string()
    .min(1, "Пароль обязателен для заполнения")
    .min(3, "Пароль должен содержать минимум 3 символа"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = ({username, password}: FormData) => {
    if (
      (username === "admin" && password === "admin") ||
      (username === "test" && password === "test")
    ) {
      return navigate("/news");
    } 
    return alert("Incorrect data");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600 mt-2">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("username")} label="Name" placeholder="Enter your name" error={errors.username?.message}/>
          <Input {...register("password")} type="password" label="Password" placeholder="Enter password" error={errors.password?.message}/>
          <Button type="submit" variant="primary" size="md" fullWidth className="mt-6">Login</Button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/reg" className="text-blue-600 hover:text-blue-700 font-medium">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}