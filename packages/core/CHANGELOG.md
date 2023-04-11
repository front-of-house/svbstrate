# @svbstrate/core

## 0.0.8

### Patch Changes

- [`8f46050`](https://github.com/front-of-house/svbstrate/commit/8f46050343db771eb73fd05efea3785c1c3fc757) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Fix bug in `pick` where `customProperties` weren't included, plus widen `customProperties` value to `SvbstrateValue`

## 0.0.7

### Patch Changes

- [#10](https://github.com/front-of-house/svbstrate/pull/10) [`a38dcbe`](https://github.com/front-of-house/svbstrate/commit/a38dcbe5bff89e8b4c6d0ba0a366ee4bdd754ddd) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Refactor `unit` to `toValue` on the `properties` prop of `theme`

- [#10](https://github.com/front-of-house/svbstrate/pull/10) [`dc49db5`](https://github.com/front-of-house/svbstrate/commit/dc49db59f00544aed427fc1a319a0a33e85715bc) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Add `customProperty` support to theme. `customProperty` allows you to define an arbitrary property name and a function to process it and return a style object.

## 0.0.6

### Patch Changes

- [`c7de5e7`](https://github.com/front-of-house/svbstrate/commit/c7de5e79887d91295d21ac0109cfbd19eedfd3c1) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Fix issue where merging presets would fool the checker into thinking all theme values were defined

## 0.0.5

### Patch Changes

- [`4e834f8`](https://github.com/front-of-house/svbstrate/commit/4e834f8a635c9ad7033b349102d946efbc6239cb) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Fix exports, export `presets` directly from `react-native` package

## 0.0.4

### Patch Changes

- [#6](https://github.com/front-of-house/svbstrate/pull/6) [`2af9786`](https://github.com/front-of-house/svbstrate/commit/2af97866560b8729021ad29c226591e028c99f8d) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Update `package.json`s to use `exports` field

## 0.0.3

### Patch Changes

- [#4](https://github.com/front-of-house/svbstrate/pull/4) [`69f7a5a`](https://github.com/front-of-house/svbstrate/commit/69f7a5addc6febb158d17f159fec0e1c1efaf981) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Further improve type safety in both `core` and `react-native`

## 0.0.2

### Patch Changes

- [`b9657be`](https://github.com/front-of-house/svbstrate/commit/b9657be1b8780dd92ac56fc7eb6038190daae338) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Improve types, ensure that configuring a theme requires user-specified tokens

## 0.0.1

### Patch Changes

- [`81ebbde`](https://github.com/front-of-house/svbstrate/commit/81ebbde57b7d7959576d9de64ab5d43965f72d40) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Rewrite types, small breaking changes to ThemeConfig
