import "@shared/reset.css";
import "@shared/variables.css";
import "./app.css";
import { mount } from "svelte";
import App from "./App.svelte";

// vite feat that only import in dev mode
if (import.meta.env.MODE === "development") {
	try {
		const modules = import.meta.glob("@ext/dev.js", { eager: true });
		const browser = modules["/src/ext/shared/dev.js"]["browser"];
		console.debug("DEV-ENV", import.meta.env, modules, browser);
		if (!window?.browser?.extension && browser) {
			// assign to window simulation WebExtension APIs
			window.browser = browser;
			// macos popup simulation
			const style = document.createElement("style");
			style.textContent = `
body {
	top: 20px;
	left: 20px;
	box-sizing: content-box;
	border: 1px solid light-dark(#bebebe, #585c5f);
	border-radius: 10px;
	box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
	overflow: hidden;
}
`;
			browser.platform === "macos" && document.head.append(style);
		}
	} catch (error) {
		console.error(error);
	}
}

const app = mount(App, { target: document.getElementById("app") });

export default app;
