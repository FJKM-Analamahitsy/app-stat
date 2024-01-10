import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "layout";
import { FC } from "react";
import { useParams } from "react-router-dom";
import avatar from "@assets/img/avatar.svg";
import MemberDetails from "@containers/MemberDetails";
import MemberInfoTab from "@containers/MemberInfoTab";

const Page: FC = () => {
  const id = useParams();
  console.log(id);
  return (
    <Layout>
      <div className="relative">
        <div className="w-full p-2 text-primary absolute top-0 left-0">
          <div className="cursor-pointer">
            <FontAwesomeIcon icon={solid("arrow-left-long")} />
            <span className="ml-2">Back to list</span>
          </div>
        </div>
        <div className="w-full h-[25vh] bg-gray-300"></div>
        <div className="w-full flex flex-col md:flex-row  items-center md:items-end -translate-y-14 px-[2rem]">
          <Avatar img={avatar} size={200} />
          <div className="flex justify-between px-[2rem] grow ">
            <div>
              <p className="text-primary cursor-pointer text-center md:text-left">
                <FontAwesomeIcon icon={solid("user-pen")} />
              </p>
              <p className="font-semibold text-lg text-center md:text-left">
                <span>ANDRIANARIJAONA</span>
                <br />
                <span>Tojonirina</span>
              </p>
              <p className="text-center md:text-left">#6245</p>
            </div>
            <div className="text-right text-primary hidden md:block">
              <p className="flex items-center">
                <p className="max-w-[200px] text-ellipsis overflow-hidden">
                  tojonirinandrianarijaona@gmail.com
                </p>
                <FontAwesomeIcon
                  icon={solid("envelope")}
                  size="sm"
                  className="ml-1"
                />
              </p>
              <p className="mt-1">
                +261 34 09 112 78{" "}
                <FontAwesomeIcon
                  icon={solid("phone")}
                  size="sm"
                  className="ml-1"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row p-4 gap-4">
        <div>
          <MemberDetails
            data={{ name: "Andrianarijaona", phone: "0340911278" }}
          />
        </div>
        <div className="grow p-2">
          <MemberInfoTab />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
