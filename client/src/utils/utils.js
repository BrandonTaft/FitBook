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

export function toggleBody(event) {
  document.getElementById('overlay').classList.toggle('hide-overlay')
  event.currentTarget.parentElement.classList.toggle('show')
};

export function addPostPopup() {
  document.getElementById('add-post').classList.toggle('add-post-popup')
}

export function sendMailPopup() {
  clearBoxes()
  document.getElementById('mail-form').classList.toggle('show-mail-form')
}

export function addImagePopup() {
  document.getElementById('upload-image-popup').classList.toggle('show-upload-image-popup')
}

export function clearBoxes() {
  const nameInput = document.getElementById("sendTo");
  const messageInput = document.getElementById("message-input");
  nameInput.value = ""
  messageInput.value = ""
}
