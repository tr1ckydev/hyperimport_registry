# yaml

This is a package for hyperimport to load `yaml` and `yml` files.



*data.yml*

```yaml
name: Fast X
releaseYear: 2023
```



Works with default imports.

```ts
import data from "./data.yml";
console.log(data);

// {
//   name: "Fast X",
//   releaseYear: 2023
// }
```

As well as destructed imports.

```ts
import { name } from "./data.yml";
console.log(name);

// Fast X
```

