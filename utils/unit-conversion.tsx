/* src/utils/unit.tsx */

/**
 * Unit Conversion Utility
 * @type WeightUnit
 * @type VolumeUnit
 * @type Unit
 * @function convertToBase
 * @function convertFromBase
 * @function isWeight
 * @function isVolume
 * @returns conversion functions
 */

/* ------------------------------------------------------------------ */
/**
 * @type WeightUnit - supported weight units
 */
export type WeightUnit =
	| 'gram'
	| 'kilogram'
	| 'pound'
	| 'ounce';

/**
 * @type VolumeUnit - supported volume units
 */
export type VolumeUnit =
	| 'liter'
	| 'milliliter'
	| 'cup'
	| 'teaspoon'   // teaspoon
	| 'tablespoon'; // tablespoon

/**
 * @type Unit - A union that covers every supported unit – handy for the generic API.
 */
export type Unit = WeightUnit | VolumeUnit;

/* ------------------------------------------------------------------ */
/**
 * @constant Weight in Base Units - conversion factors for weights into grams
 */
const weightToBase: Record<WeightUnit, number> = {
	gram:   1,
	kilogram:  1000,
	pound:  453.59237,
	ounce:  28.3495231,
};

/**
 * @constant Volume in Base Units - conversion factors for volumes into liters
 */
const volumeToBase: Record<VolumeUnit, number> = {
	liter:    1,
	milliliter:   0.001,
	cup:  0.24,          // US cup
	teaspoon:  0.00492892,    // US teaspoon
	tablespoon: 0.0147868,     // US tablespoon
};

/**
 * @constant Weight Units - list of supported weight units
 */
export const weightUnits = Object.keys(weightToBase) as WeightUnit[];

/**
 * @constant Volume Units - list of supported volume units
 */
export const volumeUnits = Object.keys(volumeToBase) as VolumeUnit[];
/* ------------------------------------------------------------------ */
/**
 * Check for Weight Unit - Returns true if `unit` is a weight unit.
 * @param unit - unit to check
 */
export function isWeight(unit: string): unit is WeightUnit {
	return weightUnits.includes(unit as WeightUnit);
}

/**
 * Check for Volume Unit - Returns true if `unit` is a volume unit.
 * @param unit - unit to check
 */
export function isVolume(unit: string): unit is VolumeUnit {
	return volumeUnits.includes(unit as VolumeUnit);
}

/* ------------------------------------------------------------------ */
/* Helper functions                                                   */
/* ------------------------------------------------------------------ */

/**
 * @constant Return Weight Value in Base Units - Convert a weight value to the base unit (grams).
 * @param value - numeric value to convert
 * @param from  - unit of the input value
 */
const toBaseWeight = (value: number, from: WeightUnit): number =>
	value * weightToBase[from];

/**
 * @constant Return Volume Value in Base Units - Convert a volume value to the base unit (liters).
 * @param value - numeric value to convert
 * @param from  - unit of the input value
 */
const toBaseVolume = (value: number, from: VolumeUnit): number =>
	value * volumeToBase[from];

/**
 * @constant Converts a value in grams to any supported weight unit.
 * @param valueInGrams - numeric value in grams to convert
 * @param to  - target unit
 * @returns      Converted weight amount in target unit
 */
const fromBaseWeight = (valueInGrams: number, to: WeightUnit): number =>
	valueInGrams / weightToBase[to];

/**
 * @constant Converts a value in liters to any supported volume unit.
 * @param valueInLiters - numeric value in liters to convert
 * @param to     target unit
 * @returns			 Converted volume amount in target unit
 */
const fromBaseVolume = (valueInLiters: number, to: VolumeUnit): number =>
	valueInLiters / volumeToBase[to];

/**
 * Generic conversion – figures out whether the units are weight or
 * volume and delegates to the appropriate helper.
 *
 * @param value   The numeric amount you want to convert.
 * @param to      Target unit
 * @returns       Converted number rounded to 6 decimal places.
 */
export function convertFromBase({
	value,
	to
}: {
	value: number,
	to: string
}): number {
	// Quick sanity check – units must belong to the same family.
	const isWeightUnit =
		(Object.keys(weightToBase) as WeightUnit[]).includes(to as WeightUnit);
	const isVolumeUnit =
		(Object.keys(volumeToBase) as VolumeUnit[]).includes(to as VolumeUnit);

	if (!isWeightUnit && !isVolumeUnit) {
		throw new Error(`Unsupported result unit: ${to}`);
	}

	// Perform the conversion.
	let result: number;
	if (isWeightUnit) {
		result = fromBaseWeight(value, to as WeightUnit);
	} else {
		result = fromBaseVolume(value, to as VolumeUnit);
	}

	// Round to avoid floating‑point noise.
	return Number(result.toFixed(6));
}

/**
 * Generic conversion – figures out whether the units are weight or
 * volume and delegates to the appropriate helper.
 *
 * @param value   The numeric amount you want to convert.
 * @param from    Source unit
 * @returns       Converted number rounded to 6 decimal places.
 */
export function convertToBase({
	value,
	from,
}: {
	value: number,
	from: string,
}): number {
	const isWeightUnit =
		(Object.keys(weightToBase) as WeightUnit[]).includes(from as WeightUnit);
	const isVolumeUnit =
		(Object.keys(volumeToBase) as VolumeUnit[]).includes(from as VolumeUnit);

	if (!isWeightUnit && !isVolumeUnit) {
		throw new Error(`Unsupported source unit: ${from}`);
	}

	let result: number;
	if (isWeightUnit) {
		result = toBaseWeight(value, from as WeightUnit);
	} else {
		result = toBaseVolume(value, from as VolumeUnit);
	}

	// Round to avoid floating‑point noise.
	return Number(result.toFixed(6));
}


export const UnitConversion = {
	convertToBase(value: number, from: string) {return convertToBase({ value, from })},
	convertFromBase(value: number, to: string) {return convertFromBase({ value, to })},
	isWeight(unit: string) {return isWeight(unit)},
	isVolume(unit: string) {return isVolume(unit)},
	weightUnits,
	volumeUnits,
}