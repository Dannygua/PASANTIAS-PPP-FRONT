/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr'
import API from './index'

export const useInternship = (id, options = {}) => {
  const { data, error, mutate } = useSWR(
    `/internships/${id}`,
    API.fetcher,
    options
  )

  return {
    internship: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
