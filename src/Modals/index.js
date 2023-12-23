import { createRoot } from "react-dom/client";
import { ModalsInitialize } from "./ModalsInitialize";

const container = document.getElementById("modals");

const root = createRoot(container);
root.render(<ModalsInitialize />);
