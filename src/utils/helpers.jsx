export const getUserName = (name) => {
  if (typeof name !== "string" || !name.trim()) {
    return "@local_user"; // fallback
  }
  return "@" + name.toLowerCase().replaceAll(" ", "_");
};
