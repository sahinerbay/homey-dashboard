import { gql, useQuery as useUrqlQuery } from 'urql';
import { Stop } from '../../types';

const SCHEDULE_QUERY = gql`
  query GetSchedule(
    $id: String!
    $startTime: Long!
    $numberOfDepartures: Int!
  ) {
    stop(id: $id) {
      name
      code
      desc
      stoptimesWithoutPatterns(
        startTime: $startTime
        numberOfDepartures: $numberOfDepartures
      ) {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        trip {
          route {
            shortName
            longName
          }
        }
      }
    }
  }
`;

export interface QueryData {
  stop: Stop;
}

interface QueryVariables {
  id: string;
  startTime: number;
  numberOfDepartures: number;
}

export function useTimetable(
  id: string,
  startTime: number,
  numberOfDepartures: number
) {
  const variables: QueryVariables = {
    id,
    startTime,
    numberOfDepartures,
  };

  const [result] = useUrqlQuery<QueryData, QueryVariables>({
    query: SCHEDULE_QUERY,
    variables,
  });

  return result;
}
