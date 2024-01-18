import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "layout";
import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import avatar from "@assets/img/avatar.svg";
import MemberDetails from "@containers/MemberDetails";
import MemberInfoTab from "@containers/MemberInfoTab";
import api from "@utils/api";

const Page: FC = () => {
  const [data, setData] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get("/member/" + id).then((res) => setData(res.data));
    } else {
      setData({});
    }
  }, [id]);
  return (
    <Layout>
      <div className="relative">
        <div className="w-full p-2 text-primary absolute top-0 left-0">
          <div className="cursor-pointer">
            <Link to="/list">
              <FontAwesomeIcon icon={solid("arrow-left-long")} />
              <span className="ml-2">Back to list</span>
            </Link>
          </div>
        </div>
        <div className="w-full h-[25vh] bg-gray-300"></div>
        <div className="w-full flex flex-col md:flex-row  items-center md:items-end -translate-y-14 px-[2rem]">
          <Avatar img={avatar} size={200} />
          <div className="flex justify-between px-[2rem] grow ">
            <div className="text-center">
              <Link
                to={`/edit/${id}`}
                className="text-primary cursor-pointer text-center md:text-left"
              >
                <FontAwesomeIcon icon={solid("user-pen")} />
              </Link>
              <p className="font-semibold text-lg text-center md:text-left">
                <span>{data.name}</span>
                <br />
                <span>{data.forname}</span>
              </p>
              <p className="text-center md:text-left">#{data.mpandrayN}</p>
            </div>
            <div className="text-right text-primary hidden md:block">
              {data.mail && (
                <p className="flex items-center cursor-pointer">
                  <p className="max-w-[200px] text-ellipsis overflow-hidden">
                    {data.mail}
                  </p>
                  <FontAwesomeIcon
                    icon={solid("envelope")}
                    size="sm"
                    className="ml-1"
                  />
                </p>
              )}

              {data.phone && (
                <p className="mt-1 cursor-pointer">
                  {data.phone}{" "}
                  <FontAwesomeIcon
                    icon={solid("phone")}
                    size="sm"
                    className="ml-1"
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row p-4 gap-4">
        <div>
          <MemberDetails data={data} />
        </div>
        <div className="grow p-2">
          <MemberInfoTab />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
