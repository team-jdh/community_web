export const redirectTo = (path: string) => {
  return {
    redirect: {
      destination: path,
      permanent: false,
    },
  };
};
