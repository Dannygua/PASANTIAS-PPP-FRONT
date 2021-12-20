/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr'
import API from './index'

export const useTopicsBySubject = (careerId) => {
  const { data, error, mutate } = useSWR(
    `/careers/${careerId}/subjects/topics `,
    API.fetcher
  )

  return {
    topicsBySubject: (data && data.data) || [],
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
