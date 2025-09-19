import type React from "react";

interface NewsCardProps {
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	onClick?: () => void;
	className?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
	title,
	icon: Icon,
	onClick,
	className = "",
}) => {
	const baseClasses =
		"bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg cursor-pointer transition transform hover:scale-105 flex flex-col items-center";

	const classes = `${baseClasses} ${className}`.trim();

	return (
		<div className={classes} onClick={onClick}>
			<Icon className="w-32 h-32 mb-2" />
			<h2 className="font-semibold text-lg text-center text-gray-900">
				{title}
			</h2>
		</div>
	);
};