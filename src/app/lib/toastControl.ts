import { toast } from "react-toastify";

 export function ErrorNotice(message: string | null) {
    toast.error(message);
  }

  export function SuccessNotice(message: string | null) {
    toast.success(message);
  }
