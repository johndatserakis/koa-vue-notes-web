export const sleep = async (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));
