import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

export const LOAD_TASKS = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      tasks {
        id
        taskno
        taskname
        startdate
        enddate
        activity {
          activityname
          project {
            projectname
          }
        }
      }
    }
  }
`;
export const LOAD_DEPARTMENTALTASKS = gql`
  query getTasks($departmentId: ID) {
    getTasks(departmentId: $departmentId) {
      id
      taskno
      taskname
      startdate
      enddate
      activity {
        activityname
        project {
          projectname
        }
      }
    }
  }
`;

export const useTasks = (departmentId) => {
  const { data, error, loading } = useQuery(LOAD_DEPARTMENTALTASKS, {
    variables: {
      departmentId,
    },
  });
  return {
    data,
    error,
    loading,
  };
};
//Add Component Project
export const ADD_TARGET = gql`
  mutation createProject(
    $targetno: String!
    $targetname: String!
    $task: String!
    $startdate: String!
    $enddate: String!
    $agreedPerformance: String!
    $performanceIndicator: String!
  ) {
    createTarget(
      createTargetInput: {
        targetno: $targetno
        targetname: $targetname
        task: $task
        startdate: $startdate
        enddate: $enddate
        agreedPerformance: $agreedPerformance
        performanceIndicator: $performanceIndicator
      }
    ) {
      id
      targetno
      targetname
      startdate
      enddate
      agreedPerformance
      performanceIndicator
    }
  }
`;
