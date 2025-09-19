import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, Input } from "../UI";

const schema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters long.")
		.max(10, "Username must not exceed 10 characters")
		.regex(
			/^[a-zA-Z0-9_]+$/,
			"The username can only contain letters, numbers and underscores.",
		),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address")
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Invalid email address format",
		),
	password: z
		.string()
		.min(4, "The password must contain at least 4 characters.")
		.max(10, "The password must not exceed 10 characters.")
		.regex(/\d/, "The password must contain at least one number."),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormData) => {
		console.log("Register:", data);
		alert("Register good (mockap)");
		navigate("/news");
	};

	return (
		<div className="min-h-screen flex items-center justify-center ">
			<div className="w-[800px] max-w-md h-[600px] bg-white p-8 rounded-lg shadow-lg space-y-6 flex flex-col">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900">Registration</h1>
					<p className="text-gray-600 mt-2">Create new account</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
					<Input
						{...register("username")}
						label="User name"
						placeholder="Enter your name"
						error={errors.username?.message}
					/>
					<Input
						{...register("email")}
						type="email"
						label="Email"
						placeholder="Enter your email"
						error={errors.email?.message}
					/>
					<Input
						{...register("password")}
						type="password"
						label="Password"
						placeholder="Enter password"
						error={errors.password?.message}
					/>
					<Button
						type="submit"
						variant="success"
						size="md"
						fullWidth
						className="mt-6"
					>
						Register
					</Button>
				</form>

				<div className="text-center">
					<p className="text-gray-600">
						Already have an account?{" "}
						<Link
							to="/log"
							className="text-blue-600 hover:text-blue-700 font-medium"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
