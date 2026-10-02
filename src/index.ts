import { getResolution, gridPathCells, isValidCell, latLngToCell, type H3Index } from "h3-js";

export type Coordinate = readonly [longitude: number, latitude: number];

const MIN_RESOLUTION = 0;
const MAX_RESOLUTION = 15;

function validateResolution(resolution: number): void {
  if (!Number.isInteger(resolution) || resolution < MIN_RESOLUTION || resolution > MAX_RESOLUTION) {
    throw new Error("Resolution should be an integer between 0 and 15");
  }
}

function validateCoordinate(point: Coordinate, name: string): void {
  if (
    !Array.isArray(point) ||
    point.length < 2 ||
    !Number.isFinite(point[0]) ||
    !Number.isFinite(point[1]) ||
    point[0] < -180 ||
    point[0] > 180 ||
    point[1] < -90 ||
    point[1] > 90
  ) {
    throw new Error(`${name} should be a valid [longitude, latitude] coordinate`);
  }
}

function validateCell(cell: H3Index, name: string): void {
  if (!isValidCell(cell)) {
    throw new Error(`${name} should be a valid H3 cell`);
  }
}

/**
 * Finds the H3 cells along the grid path between two coordinates.
 * Coordinates use GeoJSON order: [longitude, latitude].
 */
export function getH3CellsBetweenCoordinates(
  pointA: Coordinate,
  pointB: Coordinate,
  resolution: number,
): H3Index[] {
  validateResolution(resolution);
  validateCoordinate(pointA, "pointA");
  validateCoordinate(pointB, "pointB");

  const start = latLngToCell(pointA[1], pointA[0], resolution);
  const end = latLngToCell(pointB[1], pointB[0], resolution);

  return gridPathCells(start, end);
}

/**
 * Finds the H3 cells along the grid path between two cells.
 * The cells must have the same resolution.
 */
export function getH3CellsBetweenCells(start: H3Index, end: H3Index): H3Index[] {
  validateCell(start, "start");
  validateCell(end, "end");

  if (getResolution(start) !== getResolution(end)) {
    throw new Error("Both H3 cells should have the same resolution");
  }

  return gridPathCells(start, end);
}
