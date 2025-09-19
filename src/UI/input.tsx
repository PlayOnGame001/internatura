import type React from "react";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	fullWidth?: boolean;
	variant?: "default" | "error";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			error,
			fullWidth = true,
			variant = "default",
			className = "",
			...props
		},
		ref,
	) => {
		const baseClasses = "border rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 text-gray-900 bg-white placeholder-gray-500";

		const variantClasses = {
			default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
			error: "border-red-500 focus:border-red-500 focus:ring-red-500",
		};

		const widthClass = fullWidth ? "w-full" : "";
		const inputVariant = error ? "error" : variant;

		const classes =
			`${baseClasses} ${variantClasses[inputVariant]} ${widthClass} ${className}`.trim();

		return (
			<div className={fullWidth ? "w-full" : ""}>
				{label && (
					<label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
						{label}
					</label>
				)}
				<input ref={ref} className={classes} {...props} />
				{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
			</div>
		);
	},
);
