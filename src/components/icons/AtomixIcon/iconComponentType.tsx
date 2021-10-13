export type IconComponent<Props = Record<string, unknown>> = React.VFC<
    & Props
    & Omit<React.ComponentProps<'svg'>, 'children' | 'xmlns' | 'width' | 'height' | 'viewBox'>
>
