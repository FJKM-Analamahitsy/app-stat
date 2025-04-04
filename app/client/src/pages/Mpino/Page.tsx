import Avatar from "@components/Avatar";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MemberDetails from "@containers/MemberDetails";
import MemberInfoTab from "@containers/MemberInfoTab";
import api from "@utils/api";
import { memberStatus } from "@utils/helper";
import toast from "react-hot-toast";
import Family from "@containers/Family";
import AdidyDetails from "@containers/AdidyDetails";
import Modal from "@components/Modal";
import Button from "@components/Button";
import Adidy from "./Adidy";
import ChangeStatus from "@containers/ChangeStatus";
import usePermission from "@hooks/usePermission";
import Compta from "@containers/Compta";
import { sumSetAction } from "@redux/actions";
import { useAppDispatch } from "@redux/hooks";

const Page: FC = () => {
  const [data, setData] = useState<any>({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [trace, setTrace] = useState<any>([]);
  const modal = useRef<any>(null);
  const { canUpdate, canDelete } = usePermission("member");
  const { canPost } = usePermission("adidy");
  const dispatch = useAppDispatch();

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

  const getTrace = () => {
    api.get("/adidy/trace/" + id).then((res) => setTrace(res.data));
  };

  useEffect(
    () => {
      if (id) {
        api.get("/member/get/" + id).then((res) => setData(res.data));
        getTrace();
      } else {
        setData({});
      }
    }, // eslint-disable-next-line
    [id]
  );
  return (
    <div className="min-h-full bg-white">
      <div className="relative h-[430px] md:h-[37vh] rounded-t overflow-hidden">
        <div className="w-full h-[20vh]  bg-no-repeat bg-cover overflow-hidden bg-line-pattern"></div>
        <div className="w-full flex flex-col md:flex-row  items-center md:items-end -translate-y-[6rem] px-[2rem]">
          <Avatar label={data.name} hideLabel size={200} textSize={54} />
          <div className={`px-[2rem] grow `}>
            <div className="flex gap-3 justify-center md:justify-start my-4">
              <div
                className={`w-5 aspect-square bg-bg rounded ${memberStatus(
                  data.lastPayDate
                )}`}
              />
              {canUpdate && (
                <ChangeStatus
                  data={data}
                  onsuccess={(dt) => setData({ ...data, ...dt })}
                />
              )}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg text-center md:text-left">
                <span className="uppercase font-semibold ">{data.name}</span>
                <br />
                <span>{data.forname}</span>
              </p>
              <p className="text-center md:text-left">#{data.mpandrayN}</p>
              <p className="text-center md:text-left h-6">{data.statusNote}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 gap-y-6 md:gap-6 rounded-b min-h-[43vh] ">
        <div className="mb-4 flex justify-evenly md:justify-start gap-4">
          {canPost && (
            <Modal ref={modal}>
              <Button className="bg-primary text-white mb-4 ">
                <FontAwesomeIcon
                  icon={solid("money-bill-1-wave")}
                  className="text-white cursor-pointer md:mr-2"
                  size="sm"
                />
                <span className="hidden md:inline-block">Handray adidy</span>
              </Button>
              <Adidy
                mpandray={id || ""}
                success={() => {
                  getTrace();
                  api.get("adidy/summary/me").then((res) => {
                    if (res.data.length > 0) {
                      dispatch(sumSetAction(res.data[0]));
                    }
                  });
                  modal.current.close();
                }}
              />
            </Modal>
          )}
          {canUpdate && (
            <Link to={`/christian/edit/${id}`}>
              <Button className="bg-primary text-white mb-4 max-w-[150px]">
                <FontAwesomeIcon
                  icon={solid("user-edit")}
                  className="text-white cursor-pointer md:mr-2"
                  size="sm"
                />
                <span className="hidden md:inline-block">Modifier</span>
              </Button>
            </Link>
          )}

          {canDelete && (
            <Button
              className="bg-primary text-white mb-4 w-fit"
              onClick={() => onDeleteHandler()}
            >
              <FontAwesomeIcon
                icon={solid("trash")}
                className="text-white cursor-pointer"
                size="sm"
              />
            </Button>
          )}
        </div>

        <div className="col-span-2">
          <MemberInfoTab>
            <MemberDetails data={data} />
            <Family data={data} />
            <AdidyDetails data={trace} />
            <Compta />
          </MemberInfoTab>
        </div>
      </div>
    </div>
  );
};

export default Page;
