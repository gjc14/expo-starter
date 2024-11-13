/** @type {import('tailwindcss').Config} */

import { colors } from './constants/theme'

module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            borderRadius: {
                DEFAULT: colors.radius,
                lg: `calc(${colors.radius} + 0.25rem)`,
                md: `calc(${colors.radius} - 0.25rem)`,
                sm: `calc(${colors.radius} - 0.5rem)`,
            },
            colors: {
                primary: {
                    DEFAULT: colors.primary,
                    foreground: colors.primaryForeground,
                },
                secondary: {
                    DEFAULT: colors.secondary,
                    foreground: colors.secondaryForeground,
                },
                muted: {
                    DEFAULT: colors.muted,
                    foreground: colors.mutedForeground,
                },
                accent: {
                    DEFAULT: colors.accent,
                    foreground: colors.accentForeground,
                },
                destructive: {
                    DEFAULT: colors.destructive,
                    foreground: colors.destructiveForeground,
                },
                border: {
                    DEFAULT: colors.border,
                },
                input: {
                    DEFAULT: colors.input,
                },
                ring: {
                    DEFAULT: colors.ring,
                },
            },
            fontFamily: {},
        },
    },
    plugins: [],
}
