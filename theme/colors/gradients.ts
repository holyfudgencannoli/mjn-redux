import { ColorValue } from "react-native";
import { neutral300, neutral400, neutral500, neutral600 } from "./shades";

export const Gradients = {
    layout: {
        primary_background: [
            neutral300,
            neutral400,
            neutral500,
            neutral600,
        ]
        ,
        secondary_background: ['#00ff88', '#8800ff', '#ff8800'],
    } as const satisfies {
        primary_background: [ColorValue, ColorValue, ColorValue, ColorValue],
        secondary_background: [ColorValue, ColorValue, ColorValue]
    }
} as const;


