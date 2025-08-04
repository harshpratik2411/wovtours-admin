class FilterOptions {
  static nameAsc = "Name A-Z";
  static nameDesc = "Name Z-A";
  static dateAsc = "Date ASC";
  static dateDesc = "Date DESC";

  static nameAscVal = "title";
  static nameDescVal = "-title";
  static dateAscVal = "created_at";
  static dateDescVal = "-created_at";

  static filterMap = {
    [FilterOptions.nameAsc]: FilterOptions.nameAscVal,
    [FilterOptions.nameDesc]: FilterOptions.nameDescVal,
    [FilterOptions.dateAsc]: FilterOptions.dateAscVal,
    [FilterOptions.dateDesc]: FilterOptions.dateDescVal,
  };
}

export default FilterOptions;
