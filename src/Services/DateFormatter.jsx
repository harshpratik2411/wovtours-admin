import { format } from "date-fns";
class DateFormatter {
  static dateFormat = "dd MMM, yyyy hh:mm a";
  static formatDate(date) {
    if (!date) return "";
    try {
      return format(new Date(date), DateFormatter.dateFormat);
    } catch (error) {
      console.error("Invalid date:", error);
      return "";
    }
  }
}
export default DateFormatter;
