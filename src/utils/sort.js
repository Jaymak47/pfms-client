export function sort() {
  const allProjects = projects;
  let filtered = allProjects;
  setsortColumn(sortColumn);
  if (sortColumn.title === "title" || sortColumn.order === "asc") {
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    setsortedProjects(sorted);
    const pageSize = 4;
    const currentPage = 1;
    setpageSize(pageSize);
    setcurrentPage(currentPage);
    const paginatedprojects = paginate(sorted, currentPage, pageSize);
    setpaginatedProjects(paginatedprojects);
  } else {
    setsortedProjects(projects);
    const pageSize = 4;
    const currentPage = 1;
    setpageSize(pageSize);
    setcurrentPage(currentPage);
    const paginatedprojects = paginate(projects, currentPage, pageSize);
    setpaginatedProjects(paginatedprojects);
    return { sorted, paginatedprojects };
  }
}
