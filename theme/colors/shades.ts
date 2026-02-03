
export const primary100 = 'hsl(270, 100%, 90%)';
export const primary200 = 'hsl(260, 100%, 80%)';
export const primary300 = 'hsl(260, 100%, 70%)';
export const primary400 = 'hsl(260, 100%, 60%)';
export const primary500 = 'hsl(260, 100%, 50%)';
export const primary600 = 'hsl(260, 100%, 40%)';
export const primary700 = 'hsl(260, 100%, 30%)';
export const primary800 = 'hsl(260, 100%, 20%)';
export const primary900 = 'hsl(260, 100%, 10%)';

export const secondary100 = 'hsl(225, 100%, 90%)';
export const secondary200 = 'hsl(225, 100%, 80%)';
export const secondary300 = 'hsl(225, 100%, 70%)';
export const secondary400 = 'hsl(225, 100%, 60%)';
export const secondary500 = 'hsl(225, 100%, 50%)';
export const secondary600 = 'hsl(225, 100%, 40%)';
export const secondary700 = 'hsl(225, 100%, 30%)';
export const secondary800 = 'hsl(225, 100%, 20%)';
export const secondary900 = 'hsl(225, 100%, 10%)';

export const accent100 = 'hsl(90, 100%, 90%)';
export const accent200 = 'hsl(90, 100%, 80%)';
export const accent300 = 'hsl(90, 100%, 70%)';
export const accent400 = 'hsl(90, 100%, 60%)';
export const accent500 = 'hsl(90, 100%, 50%)';
export const accent600 = 'hsl(90, 100%, 40%)';
export const accent700 = 'hsl(90, 100%, 30%)';
export const accent800 = 'hsl(90, 100%, 20%)';
export const accent900 = 'hsl(90, 100%, 10%)';

export const neutral100 = 'hsl(30, 20%, 90%)';
export const neutral200 = 'hsl(30, 20%, 80%)';
export const neutral300 = 'hsl(30, 20%, 70%)';
export const neutral400 = 'hsl(30, 20%, 60%)';
export const neutral500 = 'hsl(30, 20%, 50%)';
export const neutral600 = 'hsl(30, 20%, 40%)';
export const neutral700 = 'hsl(30, 20%, 30%)';
export const neutral800 = 'hsl(30, 20%, 20%)';
export const neutral900 = 'hsl(30, 20%, 10%)';

// Hook to use the shades
import { useMemo } from 'react';

export type ShadeScale = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type Shades = {
  primary: ShadeScale;
  secondary: ShadeScale;
  accent: ShadeScale;
  neutral: ShadeScale;
};

export function useShades(): Shades {
  return useMemo(() => ({
    primary: {
      100: primary100,
      200: primary200,
      300: primary300,
      400: primary400,
      500: primary500,
      600: primary600,
      700: primary700,
      800: primary800,
      900: primary900,
    },
    secondary: {
      100: secondary100,
      200: secondary200,
      300: secondary300,
      400: secondary400,
      500: secondary500,
      600: secondary600,
      700: secondary700,
      800: secondary800,
      900: secondary900,
    },
    accent: {
      100: accent100,
      200: accent200,
      300: accent300,
      400: accent400,
      500: accent500,
      600: accent600,
      700: accent700,
      800: accent800,
      900: accent900,
    },
    neutral: {
      100: neutral100,
      200: neutral200,
      300: neutral300,
      400: neutral400,
      500: neutral500,
      600: neutral600,
      700: neutral700,
      800: neutral800,
      900: neutral900,
    },
  }), []);
}
