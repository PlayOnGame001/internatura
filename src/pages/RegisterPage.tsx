import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input } from "../UI"; 

const schema = z.object({
  username: z
    .string()
    .min(3, "Имя пользователя должно содержать минимум 3 символа")
    .max(20, "Имя пользователя не должно превышать 10 символов")
    .regex(/^[a-zA-Z0-9_]+$/, "Имя пользователя может содержать только буквы, цифры и знак подчеркивания"),
  email: z
    .string()
    .min(1, "Email обязателен для заполнения")
    .email("Введите корректный email адрес")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Неверный формат email адреса"
    ),
  password: z
    .string()
    .min(4, "Пароль должен содержать минимум 4 символа")
    .max(10, "Пароль не должен превышать 10 символов")
    .regex(/\d/, "Пароль должен содержать хотя бы одну цифру")
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log("Register:", data);
    alert("Register good (mockap)");
    navigate("/news");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Registration</h1>
          <p className="text-gray-600 mt-2">Create new account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("username")} label="User name" placeholder="Enter your name" error={errors.username?.message}/>
          <Input {...register("email")} type="email" label="Email" placeholder="Enter your email" error={errors.email?.message}/>
          <Input {...register("password")} type="password" label="Password" placeholder="Enter password" error={errors.password?.message}/>
          <Button type="submit" variant="success" size="md" fullWidth className="mt-6">Register</Button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/log" className="text-blue-600 hover:text-blue-700 font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}