import { BunPlugin } from "bun";
import { load } from "js-yaml";

export default class {
    toPlugin(): BunPlugin {
        return {
            name: "yaml",
            setup(build) {
                build.onLoad({ filter: /.(yaml|yml)$/ }, async args => {
                    const text = await Bun.file(args.path).text();
                    const exports = load(text) as Record<string, any>;
                    return {
                        exports: { default: exports, ...exports },
                        loader: "object",
                    };
                });
            }
        };
    }
}