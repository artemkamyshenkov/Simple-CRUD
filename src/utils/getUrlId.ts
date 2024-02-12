export const getUrlId = (url: string) => {
  const match = url.match(
    /^\/api\/users\/([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})$/,
  );
  const id = match?.[1];

  return id;
};
