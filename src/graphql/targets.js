import { gql } from "@apollo/client";

export const LOAD_TARGETS = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      targets {
        id
        targetname
        targetno
        startdate
        enddate
        agreedPerformance
        performanceIndicator
        task {
          taskname
        }
        selfScore
        supervisorScore
        jointScore
      }
    }
  }
`;

export const LOAD_TARGET = gql`
  query ($targetId: ID!) {
    getTarget(targetId: $targetId) {
      id
      username
      createdAt
      targetno
      targetname
      agreedPerformance
      performanceIndicator
      startdate
      enddate
      task {
        taskname
      }
      selfScore
      supervisorScore
      jointScore
    }
  }
`;

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
