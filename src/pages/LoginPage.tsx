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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Enter</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("username")} placeholder="User name" className="w-full border p-2 rounded" />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <input {...register("password")} type="password" placeholder="Password" className="w-full border p-2 rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Enter</button>
        </form>

        <p>
          No account? <Link to="/reg" className="text-blue-500">Registration</Link>
        </p>
      </div>
    </div>
  );
}
