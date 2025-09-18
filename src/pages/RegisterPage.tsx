import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log("Регистрация:", data);
    alert("Регистрация успешна (мокап)");
    navigate("/news");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white !p-8 !rounded-lg !shadow-lg !space-y-4">
        <h1 className="text-2xl font-bold">Регистрация</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[5px]">
          <input {...register("username")} placeholder="Имя пользователя" className="w-full border p-2 rounded"/>
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          
          <input {...register("email")} type="email" placeholder="Email" className="w-full border p-2 rounded"/>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <input {...register("password")} type="password" placeholder="Пароль" className="w-full border p-2 rounded"/>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
            Зарегистрироваться
          </button>
        </form>

        <p>
          Есть аккаунт? <Link to="/log" className="text-blue-500">Войти</Link>
        </p>
      </div>
    </div>
  );
}
