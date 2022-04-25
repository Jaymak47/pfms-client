import { gql } from "@apollo/client";

export const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: ID!) {
    deleteProject(projectId: $projectId)
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation deleteDepartment($departmentId: ID!) {
    deleteDepartment(departmentId: $departmentId)
  }
`;
