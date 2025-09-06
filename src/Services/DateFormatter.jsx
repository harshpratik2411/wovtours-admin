import { format } from "date-fns";
class DateFormatter {
  static dateFormat = "dd MMM, yyyy hh:mm a";
  static formatCurrency(amount) {
    if (amount === null || amount === undefined) return "₹0";
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  }
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
