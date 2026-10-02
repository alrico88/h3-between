import { describe, expect, test } from "vite-plus/test";
import { getH3CellsBetweenCells, getH3CellsBetweenCoordinates } from "../src/index.ts";

const madrid = [-3.7038, 40.4168] as const;
const toledo = [-4.0273, 39.8628] as const;

describe("getH3CellsBetweenCoordinates", () => {
  test("returns the starting cell for identical coordinates", () => {
    expect(getH3CellsBetweenCoordinates(madrid, madrid, 8)).toHaveLength(1);
  });

  test("includes both endpoint cells", () => {
    const cells = getH3CellsBetweenCoordinates(madrid, toledo, 8);
    expect(cells[0]).toBe(getH3CellsBetweenCoordinates(madrid, madrid, 8)[0]);
    expect(cells.at(-1)).toBe(getH3CellsBetweenCoordinates(toledo, toledo, 8)[0]);
  });

  test("rejects resolutions outside the H3 range", () => {
    expect(() => getH3CellsBetweenCoordinates(madrid, toledo, -1)).toThrow();
    expect(() => getH3CellsBetweenCoordinates(madrid, toledo, 16)).toThrow();
  });

  test("rejects invalid coordinates", () => {
    expect(() => getH3CellsBetweenCoordinates([181, 0], toledo, 8)).toThrow();
  });
});

describe("getH3CellsBetweenCells", () => {
  test("returns the same cell when start and end are equal", () => {
    const cell = getH3CellsBetweenCoordinates(madrid, madrid, 8)[0];
    expect(getH3CellsBetweenCells(cell, cell)).toStrictEqual([cell]);
  });

  test("rejects cells at different resolutions", () => {
    const cell = getH3CellsBetweenCoordinates(madrid, madrid, 8)[0];
    const otherCell = getH3CellsBetweenCoordinates(toledo, toledo, 9)[0];
    expect(() => getH3CellsBetweenCells(cell, otherCell)).toThrow();
  });
});
