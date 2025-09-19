// ui/Button.tsx
import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "success" | "danger";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	size = "md",
	fullWidth = false,
	className = "",
	...props
}) => {
	const baseClasses =
		"font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

	const variantClasses = {
		primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
		secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
		success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
		danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
	};

	const sizeClasses = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const widthClass = fullWidth ? "w-full" : "";

	const classes =
		`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();

	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
};
