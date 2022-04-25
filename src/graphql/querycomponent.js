import { gql } from "@apollo/client";

//Load Department
export const LOAD_PROJECT = gql`
  query ($projectId: ID!) {
    getProject(projectId: $projectId) {
      id
      createdAt
      username
      projectno
      projectname
      projectdescription
      department {
        departmentname
      }
    }
  }
`;

//Load Department
export const LOAD_DEPARTMENT = gql`
  query ($departmentId: ID!) {
    getDepartment(departmentId: $departmentId) {
      id
      createdAt
      username
      departmentno
      departmentname
      departmentdescription
    }
  }
`;
