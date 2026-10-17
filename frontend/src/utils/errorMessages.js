import {
  BACKEND_MESSAGE_MAP,
  STATUS_FALLBACKS,
  GENERIC_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
} from "../constants/errors";

export function getUserFriendlyMessage(error) {
  const status = error?.response?.status;
  const data = error?.response?.data;
  const rawMessage = data?.message || data?.error || error?.message || "";

  if (BACKEND_MESSAGE_MAP[rawMessage]) {
    return BACKEND_MESSAGE_MAP[rawMessage];
  }

  if (rawMessage && rawMessage !== "An error occurred") {
    const looksFriendly =
      !rawMessage.startsWith("Request failed") &&
      !rawMessage.startsWith("Network") &&
      rawMessage.length < 120;
    if (looksFriendly) {
      return rawMessage;
    }
  }

  if (status && STATUS_FALLBACKS[status]) {
    return STATUS_FALLBACKS[status];
  }

  if (!error?.response) {
    return NETWORK_ERROR_MESSAGE;
  }

  return GENERIC_ERROR_MESSAGE;
}
