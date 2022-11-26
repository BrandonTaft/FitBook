export function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1 && Math.floor(interval) < 2) {
      return Math.floor(interval) + " year ago";
    } else if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1 && Math.floor(interval) < 2) {
      return Math.floor(interval) + " month ago";
    } else if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1 && Math.floor(interval) < 2) {
      return Math.floor(interval) + " day ago";
    } else if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1 && Math.floor(interval) < 2) {
      return Math.floor(interval) + " hour ago";
    } else
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1 && Math.floor(interval) < 2) {
      return Math.floor(interval) + " minute ago";
    } else if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }