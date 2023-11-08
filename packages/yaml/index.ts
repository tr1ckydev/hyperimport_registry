import { BunPlugin } from "bun";
import { mkdirSync } from "fs";
import { debugLog } from "hyperimport";
import { load } from "js-yaml";
export default class {
    debug: boolean;
    cwd: string;
    constructor(debug: boolean, cwd: string) {
        this.debug = debug;
        this.cwd = cwd;
    }
    debugLog(mode: 1 | 2 | 3, ...args: string[]) {
        debugLog(this.debug, mode, "[PACKAGE] [yaml]", ...args);
    }
    async addTypes() {
        if (!await Bun.file(`${this.cwd}/@types/yaml/types.d.ts`).exists()) {
            this.debugLog(3, "adding type support for yaml imports");
            mkdirSync(`${this.cwd}/@types/yaml`, { recursive: true });
            await Bun.write(`${this.cwd}/@types/yaml/types.d.ts`, `declare module "*.yml" { }\ndeclare module "*.yaml" { }`);
        }
    }
    async toPlugin(): Promise<BunPlugin> {
        const parentThis = this;
        return {
            name: "yaml",
            setup(build) {
                build.onLoad({ filter: /.(yaml|yml)$/ }, async args => {
                    const text = await Bun.file(args.path).text();
                    const exports = load(text) as Record<string, any>;
                    parentThis.addTypes();
                    return {
                        exports: { default: exports, ...exports },
                        loader: "object",
                    };
                });
            }
        };
    }
}