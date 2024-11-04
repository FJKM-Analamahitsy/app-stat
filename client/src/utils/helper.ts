export const formatPoneNumber = (num: string) => {
  var cleaned = ("" + num).replace(/\D/g, "");

  var match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})$/);
  if (match) {
    return match[1] + " " + match[2] + " " + match[3] + " " + match[4];
  }
  return null;
};

export const memberStatus = (date: string) => {
  const diff = new Date().getTime() - new Date(date).getTime();
  const days = diff / 1000 / 60 / 60 / 24;
  if (days <= 90) {
    return "bg-primary";
  } else if (days <= 180) {
    return "bg-orange-400";
  } else {
    return "bg-red-400";
  }
};
