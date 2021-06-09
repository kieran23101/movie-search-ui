import { NotificationManager } from "react-notifications";
export default {
  info: function(message, title) {
    NotificationManager.info(message, title);
  },
  success: function(message, title) {
    NotificationManager.success(message, title);
  },
  warning: function(message, title) {
    NotificationManager.warning(message, title);
  },
  error: function(message, title) {
    NotificationManager.error(message, title);
  }
};