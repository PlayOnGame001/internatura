import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const rootElement = document.getElementById("root") as HTMLElement;
createRoot(rootElement).render(
	<StrictMode>
		<RegisterPage/>
		<LoginPage/>
	</StrictMode>,
);
