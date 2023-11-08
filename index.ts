import { existsSync, mkdirSync } from "fs";

function err(message: string) {
    throw message;
}
console.log("Initialize new package in the registry.");
const fields = {
    name: prompt("package name:") ?? err("package name cannot be empty"),
    description: prompt("description: (default)") ?? "This is a package for hyperimport.",
    author: prompt("author:") ?? err("please enter your github username"),
};
if (!/^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/.test(fields.name!)) {
    err("invalid package name");
}
const PACKAGE_DIR = `./packages/${fields.name}`;
if (existsSync(PACKAGE_DIR)) err("package already exists");
mkdirSync(PACKAGE_DIR);
Bun.write(`${PACKAGE_DIR}/package.json`, `{\n  "name": "${fields.name}",\n  "description": "${fields.description}",\n  "author": "${fields.author}",\n  "devDependencies": {\n    "bun-types": "latest",\n    "hyperimport": "latest"\n  }\n}`)
    .then(() => Bun.spawn(["bun", "i"], { cwd: PACKAGE_DIR, stderr: "ignore" }));
Bun.write(`${PACKAGE_DIR}/index.ts`, `import { BunPlugin } from \"bun\";\nimport { debugLog } from \"hyperimport\";\n\nexport default class {\n    debug: boolean;\n    cwd: string;\n    constructor(debug: boolean, cwd: string) {\n        this.debug = debug;\n        this.cwd = cwd;\n    }\n    debugLog(mode: 1 | 2 | 3, ...args: string[]) {\n        debugLog(this.debug, mode, \"[PACKAGE] [${fields.name}]\", ...args);\n    }\n    toPlugin(): BunPlugin {\n        return {\n            name: \"${fields.name}\",\n            setup(build) {\n\n            }\n        };\n    }\n}`);
Bun.write(`${PACKAGE_DIR}/README.md`, `# ${fields.name}\n\n${fields.description}`);
Bun.write(`${PACKAGE_DIR}/tsconfig.json`, `{\n  "compilerOptions": {\n    "lib": ["ESNext"],\n    "module": "esnext",\n    "target": "esnext",\n    "moduleResolution": "bundler",\n    "moduleDetection": "force",\n    "allowImportingTsExtensions": true,\n    "noEmit": true,\n    "composite": true,\n    "strict": true,\n    "downlevelIteration": true,\n    "skipLibCheck": true,\n    "jsx": "react-jsx",\n    "allowSyntheticDefaultImports": true,\n    "forceConsistentCasingInFileNames": true,\n    "allowJs": true,\n    "types": [\n      "bun-types" // add Bun global\n    ]\n  }\n}`);

console.log(`\nInitialized at packages/${fields.name} !\n+ index.ts\n+ package.json\n+ tsconfig.json\n+ README.md`);