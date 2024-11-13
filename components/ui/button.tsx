import { cn } from '@/lib/utils'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
    'items-center justify-center rounded-md disabled:bg-muted',
    {
        variants: {
            variant: {
                default: 'bg-primary-foreground',
                secondary: 'bg-secondary-foreground',
                outline: 'border border-border bg-transparent',
                destructive: 'bg-destructive',
            },
            size: {
                default: 'h-10 px-5 py-2',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

const buttonTextVariants = cva('font-medium', {
    variants: {
        variant: {
            default: 'text-primary',
            secondary: 'text-secondary',
            outline: 'text-primary-foreground',
            destructive: 'text-destructive-foreground',
        },
        size: {
            default: 'text-base',
            sm: 'text-sm',
            lg: 'text-lg',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

interface ButtonProps
    extends TouchableOpacityProps,
        VariantProps<typeof buttonVariants> {
    children: React.ReactNode
    textClassName?: string
}

const Button = React.forwardRef<
    React.ElementRef<typeof TouchableOpacity>,
    ButtonProps
>(
    (
        {
            children,
            variant = 'default',
            size = 'default',
            textClassName,
            className,
            ...props
        },
        ref,
    ) => {
        return (
            <TouchableOpacity
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
                {...props}
            >
                {typeof children === 'string' ? (
                    <Text
                        className={cn(
                            buttonTextVariants({ variant, size }),
                            textClassName,
                        )}
                    >
                        {children}
                    </Text>
                ) : (
                    children
                )}
            </TouchableOpacity>
        )
    },
)

Button.displayName = 'Button'

export { Button }
