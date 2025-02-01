import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatPoneNumber } from "@utils/helper";
import { FC } from "react";

interface MemberDetailsProps {
  data: any;
}

const MemberDetails: FC<MemberDetailsProps> = ({ data }) => {
  const shema: any = {
    familyId: {
      label: "Ankohonana Lah.",
      icon: <FontAwesomeIcon icon={solid("home-alt")} size="sm" />,
    },
    zone: {
      label: "Zone",
      icon: <FontAwesomeIcon icon={solid("map-location")} size="sm" />,
    },
    name: {
      label: "Anarana",
      icon: <FontAwesomeIcon icon={solid("user")} size="sm" />,
    },
    forname: {
      label: "Fanampiny",
      icon: <FontAwesomeIcon icon={solid("user")} size="sm" />,
    },
    gender: {
      label: "L/V",
      icon: <FontAwesomeIcon icon={solid("user")} size="sm" />,
    },
    birthday: {
      label: "Teraka",
      icon: <FontAwesomeIcon icon={solid("calendar")} size="sm" />,
    },
    birthplace: {
      label: "Teraka tao",
      icon: <FontAwesomeIcon icon={solid("home-alt")} size="sm" />,
    },
    baptism: {
      label: "Vita batisa",
      icon: <FontAwesomeIcon icon={solid("user")} size="sm" />,
    },
    baptismYear: {
      label: "Taona nanaovana batisa",
      icon: <FontAwesomeIcon icon={solid("calendar-day")} size="sm" />,
    },
    mpandray: {
      label: "Mpandray",
      icon: <FontAwesomeIcon icon={solid("user")} size="sm" />,
    },
    mpandrayAndiany: {
      label: "Katekomena andiany",
      icon: <FontAwesomeIcon icon={solid("user-group")} size="sm" />,
    },
    mpandrayN: {
      label: "Karatra",
      icon: <FontAwesomeIcon icon={solid("id-card")} size="sm" />,
    },
    mail: {
      label: "Email",
      icon: <FontAwesomeIcon icon={solid("envelope")} size="sm" />,
    },
    phone: {
      label: "Telephone",
      icon: <FontAwesomeIcon icon={solid("phone")} size="sm" />,
    },
    fb: {
      label: "fb",
      icon: <FontAwesomeIcon icon={solid("f")} size="sm" />,
    },
    home: {
      label: "Fonenana",
      icon: <FontAwesomeIcon icon={solid("home-alt")} size="sm" />,
    },
    city: {
      label: "Tanana",
      icon: <FontAwesomeIcon icon={solid("home-alt")} size="sm" />,
    },
    place: {
      label: "Faritra",
      icon: <FontAwesomeIcon icon={solid("home-alt")} size="sm" />,
    },
    sampana: {
      label: "Sampana",
      icon: <FontAwesomeIcon icon={solid("users")} size="sm" />,
    },
    antoko: {
      label: "Antoko",
      icon: <FontAwesomeIcon icon={solid("users")} size="sm" />,
    },
    talent: {
      label: "Talenta",
      icon: <FontAwesomeIcon icon={solid("user-tie")} size="sm" />,
    },
    hobby: {
      label: "Fialamboly",
      icon: <FontAwesomeIcon icon={solid("face-smile")} size="sm" />,
    },
    sport: {
      label: "Fanatajahatena",
      icon: <FontAwesomeIcon icon={solid("person-swimming")} size="sm" />,
    },
    other: {
      label: "Fanamarihana",
      icon: <FontAwesomeIcon icon={solid("file-signature")} size="sm" />,
    },
  };
  return (
    <div className="rounded-[5px] py-4 w-full">
      {Object.keys(shema).map((el, i) => {
        if (data[el]) {
          return (
            <div
              key={i}
              className="flex gap-4 hover:bg-slate-50 p-2 rounded-[5px] cursor-pointer"
            >
              <p className="text-gray-700 w-[40px] h-[40px] flex justify-center items-center rounded-full bg-slate-50">
                {shema[el].icon}
              </p>
              <div>
                <p className="text-gray-400 text-sm">{shema[el].label}</p>
                <p
                  className={`font-medium text-gray-800 ${
                    el === "name" ? "uppercase" : ""
                  }`}
                >
                  {el === "phone" ? formatPoneNumber(data[el]) : data[el]}
                </p>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default MemberDetails;
