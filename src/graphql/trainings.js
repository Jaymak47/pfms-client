import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

export const LOAD_TRAININGS = gql`
  query getTrainings($departmentId: ID) {
    getTrainings(departmentId: $departmentId) {
      id
      trainingno
      trainingname
      trainingdescription
      venue
      resources
      startdate
      enddate
      comments
      task {
        taskname
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

export const useTrainings = (departmentId) => {
  const { data, error, loading } = useQuery(LOAD_TRAININGS, {
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

export const ADD_TRAININGS = gql`
  mutation createTraining(
    $trainingno: String!
    $trainingname: String!
    $trainingdescription: String!
    $task: String!
    $venue: String!
    $resources: String!
    $startdate: String!
    $enddate: String!
    $comments: String!
  ) {
    createTraining(
      trainingInput: {
        trainingno: $trainingno
        trainingname: $trainingname
        trainingdescription: $trainingdescription
        task: $task
        venue: $venue
        resources: $resources
        startdate: $startdate
        enddate: $enddate
        comments: $comments
      }
    ) {
      id
      trainingno
      trainingname
      trainingdescription
      task {
        taskname
      }
      startdate
      enddate
      venue
      resources
      comments
      username
      createdAt
    }
  }
`;
