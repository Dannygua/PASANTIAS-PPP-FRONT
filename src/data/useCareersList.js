import useSWR from 'swr'
import API from './index'

export const useCareersList = () => {
  const { data, error, mutate } = useSWR('/careers', API.fetcher)

  return {
    careers: (data && data.data) || [],
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
