import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PageNews from "./pages/PageNews";

const rootElement = document.getElementById("root") as HTMLElement;
createRoot(rootElement).render(
	<StrictMode>
		<PageNews/>
	</StrictMode>,
);
