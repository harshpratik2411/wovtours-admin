class FilterOptions {
  static nameAsc = "Name A-Z";
  static nameDesc = "Name Z-A";
  static dateAsc = "Date ASC";
  static dateDesc = "Date DESC";
  static statusActive = "Active";
  static statusInactive = "Inactive";

  static nameAscVal = "title";
  static nameDescVal = "-title";
  static dateAscVal = "created_at";
  static dateDescVal = "-created_at";
  static statusActiveVal = "-status"; // assuming active = 1, inactive = 0
  static statusInactiveVal = "status";

  static filterMap = {
    [FilterOptions.nameAsc]: FilterOptions.nameAscVal,
    [FilterOptions.nameDesc]: FilterOptions.nameDescVal,
    [FilterOptions.dateAsc]: FilterOptions.dateAscVal,
    [FilterOptions.dateDesc]: FilterOptions.dateDescVal,
    [FilterOptions.statusActive]: FilterOptions.statusActiveVal,
    [FilterOptions.statusInactive]: FilterOptions.statusInactiveVal,
  };
}

export default FilterOptions;
