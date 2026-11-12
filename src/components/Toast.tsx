import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type ToastProps = {
  message: string | null;
  onClose: () => void;
};

const TOAST_DURATION_MS = 4000;

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <Snackbar
      open={message !== null}
      autoHideDuration={TOAST_DURATION_MS}
      onClose={(_event, reason) => {
        if (reason !== "clickaway") {
          onClose();
        }
      }}
    >
      <Alert severity="success" variant="filled" role="status" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
