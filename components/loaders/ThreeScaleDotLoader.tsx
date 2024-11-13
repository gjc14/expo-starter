import React, { useEffect } from 'react'
import { View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withSequence,
    withTiming,
    withDelay,
    Easing,
    SharedValue,
} from 'react-native-reanimated'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

type ThreeDotLoaderProps = {
    color?: string
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
}

const sizeMap = {
    xs: 12,
    sm: 15,
    base: 18,
    lg: 24,
    xl: 30,
    '2xl': 36,
}

export const ThreeScaleDotLoader: React.FC<ThreeDotLoaderProps> = ({
    color = '#000',
    size = 'base',
}) => {
    const dotSize = sizeMap[size]
    const radius = dotSize / 4 // Radius

    // Shared values for scale animation
    const scale1 = useSharedValue(1)
    const scale2 = useSharedValue(1)
    const scale3 = useSharedValue(1)

    // Scale animation
    const animateDot = (scaleValue: SharedValue<number>, delay: number) => {
        scaleValue.value = withDelay(
            delay,
            withSequence(
                withTiming(1.5, { duration: 300, easing: Easing.ease }),
                withTiming(1, { duration: 300, easing: Easing.ease }),
            ),
        )
    }

    // Style for each dot
    const dotStyle = (scaleValue: SharedValue<number>) =>
        useAnimatedProps(() => ({
            r: radius * scaleValue.value,
        }))

    // Start animation
    useEffect(() => {
        const interval = setInterval(() => {
            animateDot(scale1, 0)
            animateDot(scale2, 150)
            animateDot(scale3, 300)
        }, 900)

        return () => clearInterval(interval)
    }, [])

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Svg height={dotSize} width={dotSize * 3}>
                <AnimatedCircle
                    cx={radius * 2}
                    cy={dotSize / 2}
                    fill={color}
                    animatedProps={dotStyle(scale1)}
                />
                <AnimatedCircle
                    cx={dotSize + radius * 2}
                    cy={dotSize / 2}
                    fill={color}
                    animatedProps={dotStyle(scale2)}
                />
                <AnimatedCircle
                    cx={dotSize * 2 + radius * 2}
                    cy={dotSize / 2}
                    fill={color}
                    animatedProps={dotStyle(scale3)}
                />
            </Svg>
        </View>
    )
}
