/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr'
import API from './index'

export const useInternshipsList = (pageIndex) => {
  const { data, error, mutate } = useSWR(
    `/internships?page=${pageIndex}`,
    API.fetcher
  )

  console.log('data', data)
  return {
    internships: data && data.data,
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
