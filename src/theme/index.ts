import {
    extendTheme,
    theme as base,
    withDefaultColorScheme,
    withDefaultVariant,
} from '@chakra-ui/react';

const theme = extendTheme(
    {
        colors: {
            brand: {
                50: 'teal.50',
                100: 'teal.100',
                200: 'teal.200',
                300: 'teal.300',
                400: 'teal.400',
                500: 'teal.500',
                600: 'teal.600',
                700: 'teal.700',
                800: 'teal.800',
                900: 'teal.900',
            },
        },
        fonts: {
            heading: `MontSerrat, ${base.fonts?.heading}`,
            body: `Inter, ${base.fonts?.heading}`,
        },
        components: {
            Button: {
                variants: {
                    primary: {
                        rounded: '5',
                        color: 'white',
                        bgGradient: 'linear(to-br, teal.500, teal.900)',
                        ring: 1,
                        ringColor: 'teal.900',
                        _hover: {
                            bgGradient: 'linear(to-br, teal.600, teal.900)',
                        },
                        _active: {
                            bgGradient: 'linear(to-br, teal.700, teal.900)',
                        },
                        _focus: {
                            ring: 2,
                            ringColor: 'teal.900',
                        },
                    },
                },
            },
            Input: {
                variants: {
                    filled: {
                        field: {
                            _focus: {
                                borderColor: 'brand.50',
                            },
                        },
                    },
                },
                sizes: {
                    md: {
                        field: {
                            borderRadius: 'none',
                        },
                    },
                },
            },
        },
    },
    withDefaultColorScheme({
        colorScheme: 'brand',
        components: ['Heading', 'Button'],
    }),
    withDefaultVariant({
        variant: 'filled',
        components: ['Input'],
    })
);
export default theme;