export const formatPoneNumber = (num: string) => {
  var cleaned = ("" + num).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{2})(\d{2})(\d{3})(\d{2})$/);
  if (match) {
    return "0" + match[1] + " " + match[2] + " " + match[3] + " " + match[4];
  }
  return null;
};
