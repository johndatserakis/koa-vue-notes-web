export const truncate = (input: string, length: number) =>
  input.length > length ? `${input.substring(0, length)}...` : input;
