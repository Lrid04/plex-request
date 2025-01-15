import { SuccessNotice } from "./toastControl";

export function ConfirmRequest(movieId: number) {
  fetch("/api/libraryAdd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieId),
  })
    .then((res) => {
      if (res.ok) {
        SuccessNotice("Request Confirmed");
      }
    })
    .catch((error) => console.error(error));
}

export function DeleteRequest(movieId: number) {
  fetch("/api/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieId),
  })
    .then((res) => {
      if (res.ok) {
        SuccessNotice("Request Deleted");
      }
    })
    .catch((error) => console.error(error));
}
