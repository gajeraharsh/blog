export const formatISODate = (isoDate) => {
  return isoDate ? isoDate.split("T")[0] : "";
};
