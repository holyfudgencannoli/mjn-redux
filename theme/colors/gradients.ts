import { ColorValue } from "react-native";

export const Gradients = {
    layout: {
        primary_background: [
            "#E6D3A3",
            "#7FA9B8",
            "#4F7D5B",
            "#7B5E44",
        ]
        ,
        secondary_background: ['#00ff88', '#8800ff', '#ff8800'],
    } as const satisfies {
        primary_background: [ColorValue, ColorValue, ColorValue, ColorValue],
        secondary_background: [ColorValue, ColorValue, ColorValue]
    }
} as const;

