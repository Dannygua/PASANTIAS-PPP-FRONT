import useSWR from 'swr'
import API from './index'

export const useDataList = (url) => {
  const { data, error, mutate } = useSWR(`/${url}`, API.fetcher)

  return {
    dataSearch: (data && data.data) || [],
    dataSearch2: (data && data.data) || [],
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isLoading2: !error && !data,
    isError: error,
    mutate,
  }
}
