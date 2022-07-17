import { HTMLAttributes, InputHTMLAttributes } from "react"

export interface FlexboxProps extends HTMLAttributes<HTMLDivElement> {
   flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
   flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
   justifyContent?:
   | 'flex-start'
   | 'flex-end'
   | 'center'
   | 'space-between'
   | 'space-around'
   | 'space-evenly'
   alignItems?:
   | 'stretch'
   | 'flex-start'
   | 'flex-end'
   | 'center'
   | 'baseline'
   | 'first baseline'
   | 'last baseline'
   | 'start'
   | 'end'
   alignContent?:
   | 'stretch'
   | 'flex-start'
   | 'flex-end'
   | 'center'
   | 'space-between'
   | 'space-around'
   alignSelf?:
   | 'flex-start'
   | 'flex-end'
   | 'center'
   | 'start'
   | 'end'
   | 'self-start'
   | 'self-end'
}

export interface ContainerProps extends FlexboxProps {
   backgroundColor?: string
   position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
   padding?: string
   margin?: string
   borderRadius?: string
   columnGap?: string
   rowGap?: string
}

interface Input {
   errorMessage?: string
   sucessMessage?: string
   alertMessage?: string
   infoMessage?: string
}

export interface InputProps
   extends Input,
   InputHTMLAttributes<HTMLInputElement> {
   id?: string
   label?: string
   startIcon?: React.ReactNode | React.Component
   endIcon?: React.ReactNode | React.Component
}