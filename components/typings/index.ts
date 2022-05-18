import { ReactNode, RefObject } from "react";

export type ButtonProps = {
  children: ReactNode
  buttonStyle?: string
  action?: (e?:any) => void
  isDisabled?: boolean
  borders?: boolean
  activityIndicator?: boolean
}


export type CalendarProps = {

}

export interface ContainerProps {
  padding?: string
  maxWidth?: string
  minWidth?: string
  flex?: string
  direction?: string
  gap?: string
  height?: string
  align?: string
  justify?: string
  wrap?: string
  background?: string
  children?: ReactNode
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLElement> ) => void
  type?: string,
  REF?: RefObject<HTMLInputElement>
}

export type PageProps = {
  children?: ReactNode
  header?: ReactNode
}

export type TextProps = {
  children: ReactNode
  textType: string
}

export type TitleBarProps = {
  title?: string
  menuComponent?: ReactNode
  direction?: string
}

export type BookingsProps = {
  onGoBack?: () => {}
}



export interface TextInputProps {
  placeholder?: string,
  fallbackOnEmpty?:string | number,
  value?: string,
  label?: string,
  onChange?: (param: {value:string, isValid:boolean}) => void,
  bordered?: boolean,
  isDisabled?: boolean,
  multiline?: string,
  password?: boolean,
  isRequired?: boolean,
  messageOverride?: {
    text: string,
    type: string,
  }
  message?: {
    text?: string,
    type?: string
  },
  validation?: 'isEmail' 
    | ((value?:string) => {
        isValid: boolean, text: string, type:string
      })
}
export interface StyledProps extends ContainerProps {
  messageHeight?: string
}


export interface SelectProps {
  placeholder?: string,
  value?: string | number,
  onChange?: (x:string) => void,
  range?: number[],
  months?: boolean,
  disabled?: boolean,
  options?: {
    name:string,
    value:string
  }[] | string[],
}

export interface TooltipProps {
  text?:string
}

export interface NumberInputProps {
  placeholder?: string,
  value?: string,
  onChange?: (param: {value:string, isValid:boolean}) => void,
  bordered?: boolean,
  multiline?: string,
  password?: boolean,
  isRequired?: boolean,
  messageOverride?: {
    text: string,
    type: string,
  }
  message?: {
    text?: string,
    type?: string
  },
  validation?: 'isEmail' 
    | ((value?:string) => {
        isValid: boolean, text: string, type:string
      })
}

export interface StyledProps extends ContainerProps {
  messageHeight?: string
}


export type CheckBoxProps = {
  children: string | ReactNode
  style?: 'switch'
  onChange?: (value:boolean) => void
  value?: boolean
}


export type ImageType = {
  alt: string,
  asset?: ImageProps,
  onClick?: () => void
}

export type SrcType = {
  src:string
}

export interface ImageProps {
  width?: string,
  round?: boolean,
  src?: SrcType | string,
  alt: string,
  sanitySrc?: ImageProps,
  url?: string,
  onClick?: () => void
}

export interface IconButtonProps {
  height?: string,
  width?: string,
  tooltip?:string
  alt?: string,
  src?: { src: string } | string,
  background?: string,
  roundBorder?: boolean,
  children?: ReactNode,
  onClick?: () => void
}

export type CollaboratorsType = {
  active: boolean
  apple_id?: string
  reservations: ReservationType[]
  email: string
  facebook_id?: string
  google_id?: string
  id: number
  last_name?: string
  name: string
  role: string
}

export type ScheduleType = {
  day: string,
  id: string,
  start_time: string,
  end_time: string
}
export type ServiceType = {
  name: string
}
export type ReservationType = {
  collaborator_id?: number
  collaborator?: CollaboratorsType
  customer?: CollaboratorsType
  service?: ServiceType
  starts_at: string
  ends_at: string
  id: number
}

export type BranchOfficeType = {
  name: string,
  id: number,
  schedules?: ScheduleType[]
  collaborators?: CollaboratorsType[]
  reserves?: ReservationType[]
}

export type BookingsModuleProps = {
  data: BranchOfficeType,
  onChangeDay: (date:Date) => void
  filteredCollaborators?: CollaboratorsType[]
}

export interface SharedModalProps {
  isVisible: boolean,
  content: ReactNode,
  dismiss: () => void
}

export type StyledModalContainerType = {
  isVisible?: boolean,
  children: ReactNode,
}

export interface FormProps {
  data: CommonProps[]
  onChange: (params: { hasErrors: boolean; values: OnChangeType }) => void
}

export type OnChangeType = {
  [key: string]: string
}

export interface FormStateProps {
  [key: string]: {
    value?: string | undefined
    isValid?: boolean
  }
}

export type ErrorsType = {
  [key: string]: boolean
}


export type FormElementType =
  | 'inputGroup'
  | 'textInput'
  | 'select'
  | 'checkBox'
  | 'switch'
  | 'title'

export type CommonProps = {
  name?: string
  type?: FormElementType
  value?: string | number
  multiline?: string
  direction?: string
  fallbackOnEmpty?: string | number
  wrap?: boolean
  children?: ReactNode
  isHidden?: boolean
  array?: CommonProps[]
  options?: string[] | { name: string, value: string }[]
  range?: number[]
  minWidth?: string
  title?: string
  isRequired?: boolean
  isPassword?: boolean
  isDisabled?: boolean
  placeholder?: string
  validation?:
    | 'isEmail'
    | ((value?: string | undefined) => {
        isValid: boolean
        text: string
        type: string
      })
  months?: boolean
  flex?: string
  label?: string
  tooltip?: string
}
export type ActivityIndicatorProps = {
  color?: string
}
