export const usePagination = (pageBefore: number) => {
  const page = pageBefore + 1;
  const limit = 5;
  const offset = limit * pageBefore;

  return { page, limit, offset };
};
