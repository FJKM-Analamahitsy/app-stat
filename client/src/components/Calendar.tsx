import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";

const Calendar: FC = () => {
  const [m, setM] = useState<number>(new Date().getMonth());
  const [now, setNow] = useState(new Date());
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const changeHandler = (n: number) => {
    const newDate = new Date(now);
    newDate.setDate(now.getDate() + n);
    setNow(newDate);
    setM(newDate.getMonth());
  };
  const isToday = (d: Date) => {
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };
  return (
    <div className="bg-white rounded-t-sm p-4 text-gray-600">
      <div className="flex items-center justify-between">
        <FontAwesomeIcon
          icon={solid("chevron-left")}
          className="cursor-pointer"
          onClick={() => changeHandler(-7)}
        />
        <span className="cursor-pointer">
          <FontAwesomeIcon icon={regular("calendar")} size="sm" />
          <span className="font-semibold ml-2">
            {months[m]} {now.getFullYear()}
          </span>
        </span>
        <FontAwesomeIcon
          icon={solid("chevron-right")}
          className="cursor-pointer"
          onClick={() => changeHandler(7)}
        />
      </div>
      <div className="flex justify-between mt-4">
        {days.map((d, i) => {
          const start = new Date(now);
          start.setDate(now.getDate() - now.getDay() + i + 1);
          return (
            <div key={i} className="flex flex-col items-center cursor-pointer">
              <p
                className={`uppercase text-sm ${
                  isToday(start) && "text-primary"
                }`}
              >
                {d}
              </p>
              <p
                className={`uppercase text-sm w-[30px] h-[30px] flex items-center justify-center rounded-full font-medium mt-2 ${
                  isToday(start) && "bg-primary text-white"
                }`}
              >
                {start.getDate()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
