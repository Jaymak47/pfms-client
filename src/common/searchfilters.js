export function searchfilters(searchQuery, items) {
  let filtered = items;
  if (searchQuery)
    filtered = items.filter((m) =>
      m.projectname.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  if (searchQuery)
    filtered = items.filter((m) =>
      m.projectmanager.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  if (searchQuery)
    filtered = items.filter((m) =>
      m.status.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  if (searchQuery)
    filtered = items.filter((m) =>
      m.department.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  return filtered;
}
