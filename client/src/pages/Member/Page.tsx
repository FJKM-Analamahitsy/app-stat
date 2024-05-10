import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "layout";
import { FC, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import avatar from "@assets/img/avatar.svg";
import MemberDetails from "@containers/MemberDetails";
import MemberInfoTab from "@containers/MemberInfoTab";
import api from "@utils/api";
import { formatPoneNumber } from "@utils/helper";
import toast from "react-hot-toast";

const Page: FC = () => {
  const [data, setData] = useState<any>({});
  const { id } = useParams();
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    const conf = window.confirm("Are you sure to proceed to this action?");
    if (conf) {
      api
        .delete("/member/", { data: { id } })
        .then((res) => {
          navigate("/list");
        })
        .catch(function (err) {
          toast.error(err.message);
        });
    }
  };

  useEffect(() => {
    if (id) {
      api.get("/member/get/" + id).then((res) => setData(res.data));
    } else {
      setData({});
    }
  }, [id]);
  return (
    <Layout>
      <div className="relative h-[65vh] md:h-[45vh]">
        <div className="w-full p-2 text-primary absolute top-0 left-0">
          <div className="cursor-pointer">
            <Link to="/list">
              <FontAwesomeIcon icon={solid("arrow-left-long")} />
              <span className="ml-2">Back to list</span>
            </Link>
          </div>
        </div>
        <div className="w-full h-[30vh]  bg-no-repeat bg-cover overflow-hidden bg-line-pattern"></div>
        <div className="w-full flex flex-col md:flex-row  items-center md:items-end -translate-y-[6rem] px-[2rem]">
          <Avatar img={avatar} size={200} />
          <div className="flex justify-between px-[2rem] grow translate-y-2">
            <div className="text-center sm:text-left">
              <div className="flex gap-4 items-center">
                <Link
                  to={`/edit/${id}`}
                  className="text-primary cursor-pointer text-center md:text-left"
                >
                  <FontAwesomeIcon icon={solid("user-pen")} />
                </Link>

                <FontAwesomeIcon
                  icon={solid("trash")}
                  className="text-orange-400 cursor-pointer"
                  onClick={onDeleteHandler}
                  size="sm"
                />
              </div>

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
                  {formatPoneNumber(data.phone)}{" "}
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
      <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-y-6 md:gap-6">
        <div className="w-full">
          <MemberDetails data={data} />
        </div>
        <div className="col-span-2 p-2">
          <MemberInfoTab />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
