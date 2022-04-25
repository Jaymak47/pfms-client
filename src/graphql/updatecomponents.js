import { gql } from "@apollo/client";

//Update Component Department
export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $projectId: ID!
    $projectno: String
    $projectname: String
    $projectdescription: String
    $department: String
  ) {
    updateProject(
      projectId: $projectId
      project: {
        projectno: $projectno
        projectname: $projectname
        projectdescription: $projectdescription
        project: $department
      }
    ) {
      id
      projectno
      projectname
      projectdescription
      username
      department
    }
  }
`;

//Update Component Department
export const UPDATE_DEPARTMENT = gql`
  mutation updateProject(
    $departmentId: ID!
    $departmentno: String
    $departmentname: String
    $departmentdescription: String
  ) {
    updateDepartment(
      departmentId: $departmentId
      department: {
        departmentno: $departmentno
        departmentname: $departmentname
        departmentdescription: $departmentdescription
      }
    ) {
      id
      departmentno
      departmentname
      departmentdescription
      username
    }
  }
`;

//Update Component Target
export const UPDATE_TARGET = gql`
  mutation updateTarget(
    $targetId: ID!
    $selfScore: String!
    $achievedResult: String!
  ) {
    updateTarget(
      targetId: $targetId
      target: { selfScore: $selfScore, achievedResult: $achievedResult }
    ) {
      id
      targetno
      targetname
      agreedPerformance
      performanceIndicator
      startdate
      enddate
      selfScore
      supervisorScore
      jointScore
      username
    }
  }
`;
