import { Field } from './types';


type Grow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends ((...a: infer X) => void) ? X : never;
type GrowToSize<T, A extends Array<T>, N extends number> = { 0: A, 1: GrowToSize<T, Grow<T, A>, N> }[A['length'] extends N ? 0 : 1];

export type FixedArray<T, N extends number> = GrowToSize<T, [], N>;

const getZoneByCoords = (x: number, y: number): { x: number, y: number } => {
	if (x < 0 || y < 0 || x > 8 || y > 8) {
		throw new Error(`wrong coordinates x = ${x} and y = ${y}`);
	}

	return {
		x: x < 3 ? 1 : x < 6 ? 2 : 3,
		y: y < 3 ? 1 : y < 6 ? 2 : 3,
	};
};
export const isValueInZoneByCoords = (x: number, y: number, value: number, field: Field) => {
	const zone = getZoneByCoords(x, y);
	const zoneX = zone.x * 3 - 3;
	const zoneY = zone.y * 3 - 3;
	const zoneValues: number[] = field.slice(zoneY, zoneY + 3)
		.reduce((accum, row) => [...accum, ...row.slice(zoneX, zoneX + 3)], []);

	return zoneValues.includes(value);
};

export const randomCellValue = () => Math.floor((Math.random() * 9));
export const generateUntilFits = async (validator: (value: number) => boolean, index = 0): Promise<number> => {
	if (index > 40) throw new Error();
	const rand = randomCellValue();
	if (!validator(rand)) {
		return await generateUntilFits(validator, index + 1);
	}
	return rand;
};