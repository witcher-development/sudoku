import { findDOMNode } from 'react-dom';

import { Row, Field } from './types';
import { isValueInZoneByCoords, generateUntilFits } from './helpers';


const validateCellValue = (x: number, y: number, value: number, field: Field) => {
	console.log(x, y, value);
	console.log(field);
	if (field[y].includes(value)) return false;
	if (field.some((row) => row[x] === value)) return false;
	if (isValueInZoneByCoords(x, y, value, field)) return false;
	console.log("fits");
	return true;
};

const generateRow = async (y: number, field: Field): Promise<Row> => {
	if (y < 0 || y > 8) {
		throw new Error(`wrong index passed generating row. index = ${y}`);
	}

	const row = field[y];
	for await (const [x] of row.entries()) {
		row[x] = await generateUntilFits((value) => validateCellValue(x, y, value, field));
	}
	return row;
};

export const generateField = async (): Promise<Field> => {
	const field: Field = new Array(6).fill(null).map(() => new Array(6).fill(-1));
	for await (const [y] of field.entries()) {
		field[y] = await generateRow(y, field);
	}
	return field;
};