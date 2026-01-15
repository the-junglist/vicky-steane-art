import { useAttrs as baseUseAttrs } from 'vue'

declare module 'vue' {
  export function useAttrs(): Record<string, unknown>
}