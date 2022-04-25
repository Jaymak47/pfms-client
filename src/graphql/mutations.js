import { gql } from "@apollo/client";
//login
export const STAFF_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      payrollno
      surname
      firstname
      designation
      createdAt
      token
    }
  }
`;

//Add Component User
export const ADD_STAFF = gql`
  mutation register(
    $username: String!
    $firstname: String!
    $surname: String!
    $othernames: String!
    $email: String!
    $mobileno: String!
    $password: String!
    $confirmPassword: String!
    $payrollno: String!
    $jobgroup: String!
    $department: String!
    $designation: String!
    $role: String!
  ) {
    register(
      registerInput: {
        username: $username
        firstname: $firstname
        surname: $surname
        othernames: $othernames
        email: $email
        mobileno: $mobileno
        password: $password
        confirmPassword: $confirmPassword
        payrollno: $payrollno
        jobgroup: $jobgroup
        department: $department
        designation: $designation
        role: $role
      }
    ) {
      id
      email
      username
      designation
      createdAt
      token
    }
  }
`;
//Add Component Project
export const ADD_PROJECT = gql`
  mutation createProject(
    $projectno: String!
    $projectname: String!
    $projectdescription: String!
    $department: String!
  ) {
    createProject(
      createProjectInput: {
        projectno: $projectno
        projectname: $projectname
        projectdescription: $projectdescription
        department: $department
      }
    ) {
      id
      projectno
      projectname
      projectdescription
      createdAt
    }
  }
`;
//Add Component Department
export const ADD_DEPARTMENT = gql`
  mutation createDepartment(
    $departmentno: String!
    $departmentname: String!
    $departmentdescription: String!
  ) {
    createDepartment(
      departmentInput: {
        departmentno: $departmentno
        departmentname: $departmentname
        departmentdescription: $departmentdescription
      }
    ) {
      id
      departmentno
      departmentname
      departmentdescription
      createdAt
    }
  }
`;
//Add Component Designation
export const ADD_DESIGNATION = gql`
  mutation createDesignation(
    $designationno: String!
    $designationname: String!
    $designationdescription: String!
  ) {
    createDesignation(
      designationInput: {
        designationno: $designationno
        designationname: $designationname
        designationdescription: $designationdescription
      }
    ) {
      id
      designationno
      designationname
      designationdescription
      createdAt
    }
  }
`;
//Update Component Department
export const UPDATE_DEPARTMENT = gql`
  mutation updateDepartment(
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
export const ADD_ACTIVITY = gql`
  mutation createActivity(
    $activityno: String!
    $activityname: String!
    $activitydescription: String!
    $project: String!
  ) {
    createActivity(
      createActivityInput: {
        activityno: $activityno
        activityname: $activityname
        activitydescription: $activitydescription
        project: $project
      }
    ) {
      id
      activityno
      activityname
      activitydescription
      project {
        projectname
      }
      createdAt
    }
  }
`;

export const ADD_TASK = gql`
  mutation createTask(
    $taskno: String!
    $taskname: String!
    $activity: String!
    $startdate: DateTime!
    $enddate: DateTime!
  ) {
    createTask(
      createTaskInput: {
        taskno: $taskno
        taskname: $taskname
        activity: $activity
        startdate: $startdate
        enddate: $enddate
      }
    ) {
      id
      taskno
      taskname
      activity {
        activityname
      }
      startdate
      enddate
      createdAt
    }
  }
`;
