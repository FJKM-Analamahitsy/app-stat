export const formatPoneNumber = (num: string) => {
  var cleaned = ("" + num).replace(/\D/g, "");

  var match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})$/);
  if (match) {
    return match[1] + " " + match[2] + " " + match[3] + " " + match[4];
  }
  return null;
};

export const formatMoney = (val: any) => {
  return new Intl.NumberFormat("de-FR").format(val);
};

export const memberStatus = (date: string, border = false) => {
  const diff = new Date().getTime() - new Date(date).getTime();
  const days = diff / 1000 / 60 / 60 / 24;
  if (days <= 90) {
    return !border ? "bg-primary" : " border-white";
  } else if (days <= 180) {
    return !border ? "bg-orange-400" : "!border-[1px] border-orange-400";
  } else {
    return !border ? "bg-red-400" : "!border-[1px] border-red-400";
  }
};
