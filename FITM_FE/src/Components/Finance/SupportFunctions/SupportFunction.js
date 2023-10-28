// statusUtils.js
export default function getStatusLabel(status) {
    if (status === 0) {
      return "Ready";
    } else if (status === 1) {
      return "Pending";
    } else if (status === 2) {
      return "Accepted";
    } else if (status === 3) {
      return "Denied";
    }
    return "";
  }
 export  function getStatusStyle (status) {
    if (status === 0) {
    return {
        color: "gray",
        fontWeight: "bold",
      };
    } else if (status === 1) {
      return {
        color: "orange",
        fontWeight: "bold",
      };
    } else if (status === 2) {
      return {
        color: "green",
        fontWeight: "bold",
      };
    } else if (status === 3) {
      return {
        color: "red",
        fontWeight: "bold",
      };
    }
    return {};
  };