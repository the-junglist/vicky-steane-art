import { ref } from 'vue'

export function useLoading(initialState = true) {
  const isLoading = ref(initialState)
  const error = ref<Error | null>(null)

  const withLoading = async <T>(loadingFn: () => Promise<T>): Promise<T | undefined> => {
    isLoading.value = true
    error.value = null
    
    try {
      const result = await loadingFn()
      return result
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('An error occurred')
      console.error('Loading error:', error.value)
      return undefined
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    withLoading
  }
}
