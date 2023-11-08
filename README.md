# hyperimport_registry

The public registry for [hyperimport](https://github.com/tr1ckydev/hyperimport) packages.

This repository aims to provide a curated registry for high quality [bun plugin](https://bun.sh/docs/runtime/plugins) packages to be used through hyperimport.



## How to add your package to the registry ?

1. Fork this repository and then clone it.
2. Run `bun i` to install the dependencies.
3. Now run `bun .` to initialize your package.
4. Enter your package name.
5. Add description for your package or leave it blank to use the default one.
6. Enter your github username as author name.
7. Your package repository is now initialized at `packages/<package-name>`.
8. Open the directory with your favorite editor.
9. You'll find an `index.ts` already having the plugin boilerplate code to start.
10. After writing your plugin, send a pull request.
11. Your package will be reviewed and then merged into the registry, if everything looks right.



## How to use packages from this registry ?

1. You need to have `hyperimport` installed already and preload setup.

2. Add the name of your package your want to use in your project inside bunfig.toml.

   ```toml
   [hyperimport]
   packages = ["yaml"]
   ```

3. Run your script now normally.

Hyperimport will automatically download and install the mentioned packages from this registry, if not already installed and then register them.



## License

This repository is MIT Licensed. See LICENSE for full license text. Individual packages inside `packages` directory have their own license and belong to their respective authors.
