import { useQuery } from "@apollo/react-hooks";
import { LOAD_PROJECT, LOAD_DEPARTMENT } from "./querycomponent";
import { LOAD_TARGETS, LOAD_TARGET } from "./targets";
import { LOAD_TASKS } from "./tasks";

//Project
export const useProject = (projectId) => {
  const { data, error, loading } = useQuery(LOAD_PROJECT, {
    variables: {
      projectId,
    },
  });
  return {
    data,
    error,
    loading,
  };
};

//Department
export const useDepartment = (departmentId) => {
  const { data, error, loading } = useQuery(LOAD_DEPARTMENT, {
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

//Targets
export const useTargets = (userId) => {
  const { data, error, loading } = useQuery(LOAD_TARGETS, {
    variables: {
      userId,
    },
  });
  return {
    data,
    error,
    loading,
  };
};

//Targets
export const useTarget = (targetId) => {
  const { data, error, loading } = useQuery(LOAD_TARGET, {
    variables: {
      targetId,
    },
  });
  return {
    data,
    error,
    loading,
  };
};

//Tasks
export const useTasks = (userId) => {
  const { data, error, loading } = useQuery(LOAD_TASKS, {
    variables: {
      userId,
    },
  });
  return {
    data,
    error,
    loading,
  };
};
