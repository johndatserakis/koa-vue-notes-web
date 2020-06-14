export const logger = (
  message: string,
  type?: "log" | "warn" | "error" | "info",
) => {
  type = type || "log";

  // eslint-disable-next-line no-console
  console[type](message);
};
