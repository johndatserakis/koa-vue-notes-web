export const isDev = () => {
  const env = process.env.NODE_ENV || "development";

  if (env === "development") {
    return true;
  }

  return false;
};

export const isProd = () => {
  const env = process.env.NODE_ENV || "development";

  if (env === "production") {
    return true;
  }

  return false;
};

export const isTesting = () => {
  const env = process.env.NODE_ENV || "development";

  if (env === "test") {
    return true;
  }

  return false;
};
