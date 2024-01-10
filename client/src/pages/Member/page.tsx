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
        <div className="w-full flex justify-between p-2 text-primary absolute top-0 left-0">
          <div className="cursor-pointer">
            <FontAwesomeIcon icon={solid("arrow-left-long")} />
            <span className="ml-2">Back to list</span>
          </div>
          <div className="cursor-pointer">
            <FontAwesomeIcon icon={solid("user-pen")} />
          </div>
        </div>
        <div className="w-full h-[25vh] bg-gray-300"></div>
        <div className="flex w-full items-end -translate-y-14 px-[2rem]">
          <Avatar img={avatar} size={200} />
          <div className="flex justify-between p-[2rem] grow mb-[1rem]">
            <div>
              <p className="font-semibold text-lg">
                <span>ANDRIANARIJAONA</span>
                <br />
                <span>Tojonirina</span>
              </p>
              <p>#6245</p>
            </div>
            <div className="text-right text-primary">
              <p>
                tojonirinandrianarijaona@gmail.com{" "}
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
      <div className="flex p-4 gap-4">
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
