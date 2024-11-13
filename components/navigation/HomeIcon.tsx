import { FC } from 'react'
import { Path } from 'react-native-svg'
import { IconProps, TabSvgIcon } from './TabSVGIcon'

export const HomeIcon: FC<IconProps> = props => (
    <TabSvgIcon {...props}>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.152 2.752a1.2 1.2 0 0 1 1.696 0l8.4 8.4A1.2 1.2 0 0 1 20.4 13.2h-1.2v7.2a1.2 1.2 0 0 1-1.2 1.2h-2.4a1.2 1.2 0 0 1-1.2-1.2v-3.6a1.2 1.2 0 0 0-1.2-1.2h-2.4a1.2 1.2 0 0 0-1.2 1.2v3.6a1.2 1.2 0 0 1-1.2 1.2H6a1.2 1.2 0 0 1-1.2-1.2v-7.2H3.6a1.2 1.2 0 0 1-.848-2.048l8.4-8.4Z"
        />
    </TabSvgIcon>
)
