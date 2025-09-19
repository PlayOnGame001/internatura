import { lazy, Suspense } from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));


export default function App() {
	return (
		<Router>
			<Suspense
				fallback={<div className="text-center mt-20 text-lg">Загрузка...</div>}>
				<Routes>
					<Route path="/" element={<Navigate to="/log" />} />
					<Route path="/log" element={<LoginPage />} />
					<Route path="/reg" element={<RegisterPage />} />
				</Routes>
			</Suspense>
		</Router>
	);
}
