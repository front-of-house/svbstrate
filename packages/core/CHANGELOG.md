# @svbstrate/core

## 0.0.16

### Patch Changes

- [`c7e79a4`](https://github.com/front-of-house/svbstrate/commit/c7e79a4d930f0ad7ecea614a6760a084941c0a38) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Re-export `presets` and `utils` for external library consumption

## 0.0.15

### Patch Changes

- [#25](https://github.com/front-of-house/svbstrate/pull/25) [`c97a58e`](https://github.com/front-of-house/svbstrate/commit/c97a58e08e29f4c2580f36ed97f9f1e82f71d6de) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Use esbuild to build library, and use Vite for Vitest only

## 0.0.14

### Patch Changes

- [`23bd323`](https://github.com/front-of-house/svbstrate/commit/23bd32323373c13cc004a964959fe3c690b4b50b) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Change "shorthands" to "aliases" everywhere

- [`6af6418`](https://github.com/front-of-house/svbstrate/commit/6af6418426434b24e57672011e8abc56236e46a4) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Export utils for reuse

- [`b468921`](https://github.com/front-of-house/svbstrate/commit/b468921b5c71f13e9398b35865f8210af2ec2333) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Further improve tokens typing

## 0.0.13

### Patch Changes

- [`fc199f7`](https://github.com/front-of-house/svbstrate/commit/fc199f799c2fc56910cc5e67bc7d56de9f261a3e) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Tighten up types, namely space-scale properties. Ensures autocomplete should work in most IDEs.

## 0.0.12

### Patch Changes

- [`d0bca91`](https://github.com/front-of-house/svbstrate/commit/d0bca916ac0b643f2b578c1d552f62579e934cd2) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Fix variant and macro types

## 0.0.11

### Patch Changes

- [`6e0e594`](https://github.com/front-of-house/svbstrate/commit/6e0e59483bec2f887b8ef87972582550c29794af) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Remove `exports` field. Not compatible with React Native atm.

## 0.0.10

### Patch Changes

- [`4407598`](https://github.com/front-of-house/svbstrate/commit/44075984839cb4872821f1493e78b64785462384) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Map `bg` to `backgroundColor` for better cross-platform support

## 0.0.9

### Patch Changes

- [`fcae57c`](https://github.com/front-of-house/svbstrate/commit/fcae57c1113deaf4ddd085b371015225633d6660) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Widen return type for `toValue`

- [`929fea9`](https://github.com/front-of-house/svbstrate/commit/929fea91f349c27d1cf0f4d2030376c149989aee) Thanks [@estrattonbailey](https://github.com/estrattonbailey)! - Allow `toValue` to return numbers

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
