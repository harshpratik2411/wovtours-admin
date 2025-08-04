class StatusClassMap {
  static active = "Active";
  static inactive = "Inactive";

  static activeClass = "bg-blue-100 text-blue-600";
  static inactiveClass = "bg-yellow-100 text-yellow-600";

  static classMap = {
    [StatusClassMap.active]: StatusClassMap.activeClass,
    [StatusClassMap.inactive]: StatusClassMap.inactiveClass,
  };

  static getClass(status) {
    return StatusClassMap.classMap[status] || "";
  }
}

export default StatusClassMap;
