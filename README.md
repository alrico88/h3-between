# h3-between

Find the H3 cells along the grid path between two coordinates or two H3
cells.

## Installation

```bash
pnpm add h3-between
```

## Usage

Coordinates use GeoJSON order: `[longitude, latitude]`.

```ts
import { getH3CellsBetweenCoordinates } from "h3-between";

const cells = getH3CellsBetweenCoordinates([-3.7038, 40.4168], [-4.0273, 39.8628], 8);
```

To start with existing H3 cells:

```ts
import { getH3CellsBetweenCells } from "h3-between";

const cells = getH3CellsBetweenCells(startCell, endCell);
```

The result includes both endpoint cells. H3 resolutions from `0` to `15` are
supported. The path follows H3 grid space and can throw for paths that H3
cannot resolve, such as some paths across pentagons.

## Development

```bash
pnpm install
pnpm test
pnpm run check
pnpm run build
```
