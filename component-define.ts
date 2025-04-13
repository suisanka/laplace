import type { Type } from 'arktype'

export interface ComponentInstance<TProps extends Record<string, unknown>, TExpose extends Record<string, unknown>, TEmits extends string[], TSlots extends string[]> {
  props: TProps
  expose: TExpose
  emits: TEmits
  slots: TSlots
}

export type SlotFn = () => Node & {
  __v_instance: ComponentInstance<any, any, any, any>
}

export type ComponentSetupSlots<T extends string[]> = {
  default?: SlotFn
} & {
  [K in T[number]]: SlotFn
}

export type ComponentSetupEmitter<T extends string[]> =
  | ((event: T[number], ...args: any[]) => void)

export interface ComponentSetupContext<TProps extends Record<string, unknown>, TExpose extends Record<string, unknown>, TSlots extends string[], TEmits extends string[]> {
  readonly props: Readonly<TProps>
  readonly slots: Readonly<ComponentSetupSlots<TSlots>>
  readonly emits: ComponentSetupEmitter<TEmits>
  readonly instance?: ComponentInstance<TProps, TExpose, TEmits, TSlots>
  readonly expose?: TExpose

}

export type RenderFn = () => Node

export interface DefineComponent<
  TProps extends Record<string, unknown>,
  TExpose extends Record<string, unknown>,
  TEmits extends string[] = [],
  TSlots extends string[] = [],
> {
  props: Type<TProps>
  expose: Type<TExpose>
  emits?: TEmits
  slots?: TSlots
  setup: (context: ComponentSetupContext<TProps, TExpose, TSlots, TEmits>) => RenderFn
}

export function $<
  TPropsType extends Type<any>,
  TExposeType extends Type<any>,
  const TEmits extends string[] = [],
  const TSlots extends string[] = [],
>(component: {
  props: TPropsType
  expose?: TExposeType
  emits?: TEmits
  slots?: TSlots
  setup: (context: ComponentSetupContext<TPropsType['infer'], TExposeType['infer'], TSlots, TEmits>) => RenderFn
}): DefineComponent<
    TPropsType['infer'],
    TExposeType['infer'],
    TEmits,
    TSlots
  > {
  return component as any
}

export type AnyDefineComponent = DefineComponent<any, any, any, any>
