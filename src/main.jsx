import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.replace("/recipes")}>
			<Provider store={store}>
				<App />
			</Provider>
		</ErrorBoundary>
	</React.StrictMode>
);
