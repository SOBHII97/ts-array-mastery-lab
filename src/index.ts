// src/index.ts
import { startCli } from "./cli/menu.js";

startCli().catch((err: unknown) => {
    console.error("Fatal error:", err);
    process.exitCode = 1;
});
