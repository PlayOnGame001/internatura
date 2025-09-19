import { lazy, Suspense } from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";

const PageNews = lazy(() => import("./pages/PageNews"));

export default function App() {
	return (
		<Router>
			<Suspense fallback={<div className="text-center mt-10">Загрузка...</div>}>
				<Routes>
					<Route path="/" element={<Navigate to="/news" />} />
					<Route path="/news" element={<PageNews />} />
				</Routes>
			</Suspense>
		</Router>
	);
}
