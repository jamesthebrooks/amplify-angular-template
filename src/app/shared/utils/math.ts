export function toFraction(value: number, denominator: number): string {
  const wholeNumber = Math.floor(value);
  const fractionNumerator = Math.round((value - wholeNumber) * denominator);
  return fractionNumerator === 0
    ? `${wholeNumber}`
    : wholeNumber > 0
      ? `${wholeNumber} ${fractionNumerator}/${denominator}`
      : `${fractionNumerator}/${denominator}`;
}

export function formatFractionalInch(fraction: string): string {
  const parts = fraction.split(' ');
  if (parts.length === 2) {
    return `${parts[0]} ${parts[1]}`;
  }
  return fraction;
}

export const fractionMap: { [key: number]: { [key: number]: string } } = {
  4: {
    0: '',
    1: '1/4',
    2: '1/2',
    3: '3/4',
  },
  8: {
    0: '',
    1: '1/8',
    2: '1/4',
    3: '3/8',
    4: '1/2',
    5: '5/8',
    6: '3/4',
    7: '7/8',
  },
  16: {
    0: '',
    1: '1/16',
    2: '1/8',
    3: '3/16',
    4: '1/4',
    5: '5/16',
    6: '3/8',
    7: '7/16',
    8: '1/2',
    9: '9/16',
    10: '5/8',
    11: '11/16',
    12: '3/4',
    13: '13/16',
    14: '7/8',
    15: '15/16',
  },
  32: {
    0: '',
    1: '1/32',
    2: '1/16',
    3: '3/32',
    4: '1/8',
    5: '5/32',
    6: '3/16',
    7: '7/32',
    8: '1/4',
    9: '9/32',
    10: '5/16',
    11: '11/32',
    12: '3/8',
    13: '13/32',
    14: '7/16',
    15: '15/32',
    16: '1/2',
    17: '17/32',
    18: '9/16',
    19: '19/32',
    20: '5/8',
    21: '21/32',
    22: '11/16',
    23: '23/32',
    24: '3/4',
    25: '25/32',
    26: '13/16',
    27: '27/32',
    28: '7/8',
    29: '29/32',
    30: '15/16',
    31: '31/32',
  },
  64: {
    0: '',
    1: '1/64',
    2: '1/32',
    3: '3/64',
    4: '1/16',
    5: '5/64',
    6: '3/32',
    7: '7/64',
    8: '1/8',
    9: '9/64',
    10: '5/32',
    11: '11/64',
    12: '3/16',
    13: '13/64',
    14: '7/32',
    15: '15/64',
    16: '1/4',
    17: '17/64',
    18: '9/32',
    19: '19/64',
    20: '5/16',
    21: '21/64',
    22: '11/32',
    23: '23/64',
    24: '3/8',
    25: '25/64',
    26: '13/32',
    27: '27/64',
    28: '7/16',
    29: '29/64',
    30: '15/32',
    31: '31/64',
    32: '1/2',
    33: '33/64',
    34: '17/32',
    35: '35/64',
    36: '9/16',
    37: '37/64',
    38: '19/32',
    39: '39/64',
    40: '5/8',
    41: '41/64',
    42: '21/32',
    43: '43/64',
    44: '11/16',
    45: '45/64',
    46: '23/32',
    47: '47/64',
    48: '3/4',
    49: '49/64',
    50: '25/32',
    51: '51/64',
    52: '13/16',
    53: '53/64',
    54: '27/32',
    55: '55/64',
    56: '7/8',
    57: '57/64',
    58: '29/32',
    59: '59/64',
    60: '15/16',
    61: '61/64',
    62: '31/32',
    63: '63/64',
  },
};

/**
 * Converts a decimal inch value to the nearest fractional inch up to 1/128".
 *
 * @param inchValue - The decimal inch value to convert.
 * @returns A string representing the nearest fractional inch.
 */
export function toFractionalInch(inchValue: number): string {
  const denominator = 128; // Maximum denominator for accuracy
  const numerator = Math.round(inchValue * denominator); // Calculate numerator

  const wholeInches = Math.floor(numerator / denominator); // Extract whole inches
  const fractionalNumerator = numerator % denominator; // Remainder is the fractional part

  if (fractionalNumerator === 0) {
    return `${wholeInches}"`; // No fractional part
  }

  // Simplify the fraction
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(fractionalNumerator, denominator);
  const simplifiedNumerator = fractionalNumerator / divisor;
  const simplifiedDenominator = denominator / divisor;

  if (wholeInches === 0) {
    return `${simplifiedNumerator}/${simplifiedDenominator}"`; // Only fractional part
  }

  return `${wholeInches} ${simplifiedNumerator}/${simplifiedDenominator}"`; // Whole and fractional part
}
