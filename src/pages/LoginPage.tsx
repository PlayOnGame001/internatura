import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    if (
      (data.username === "admin" && data.password === "admin") ||
      (data.username === "test" && data.password === "test")
    ) {
      navigate("/news");
    } else {
      alert("Неверные данные");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Вход</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("username")} placeholder="Имя пользователя" className="w-full border p-2 rounded" />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <input {...register("password")} type="password" placeholder="Пароль" className="w-full border p-2 rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Войти</button>
        </form>

        <p>
          Нет аккаунта? <Link to="/reg" className="text-blue-500">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}
