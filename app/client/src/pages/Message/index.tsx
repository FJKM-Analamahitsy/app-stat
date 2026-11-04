import SelectMultiple from "@components/SelectMultiple";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api, { getData } from "@utils/api";
import { SAMPANA } from "@utils/constant";
import { FC, useEffect, useState } from "react";
import useSWR from "swr/immutable";
import Lottie from "lottie-react";
import anim from "@assets/animation/sms.json";
import dayjs from "dayjs";
const Message: FC = () => {
  const [filter, setFilter] = useState("");
  const { data = [] } = useSWR(`member/phone?filter=${filter}`, getData);
  const { data: token } = useSWR(`sms/token`, getData);
  const { data: balance = [] } = useSWR(
    token && token.access_token
      ? `sms/balance?token=${token.access_token}`
      : null,
    getData
  );
  const [progress, setProgress] = useState(
    parseInt(localStorage.getItem("progress") ?? "0")
  );
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!sending) return;
    if (progress > data.length) {
      setSending(false);
      return;
    }

    const send = async () => {
      let number: string = data[progress] ?? "";

      if (number.startsWith("0")) {
        number = number.slice(1);
      }

      if (number.length === 9) {
        const payload = {
          token: token.access_token,
          message,
          number,
        };

        const result = await api.post("sms", payload);
        if (result.status !== 201) {
          setSending(false);
          console.log(result);
        }
      }

      setProgress((p) => p + 1);
      localStorage.setItem("progress", progress.toString());
    };

    send();
  }, [progress, sending]);

  return (
    <div className="border border-white flex flex-col h-full">
      <div className="grow grid grid-cols-1 md:grid-cols-3 p-2">
        <div className="bg-white p-2">
          {balance.length > 0 && (
            <div>
              <p className="text-slate-800">
                <FontAwesomeIcon icon={solid("comment-sms")} />{" "}
                {balance[0].availableUnits} consommable jusqu'au{" "}
                {dayjs(balance[0].expirationDate).format("DD MMM,YYYY à HH:mm")}
              </p>
            </div>
          )}
          <div className="mt-3 flex flex-col gap-4">
            <div>
              <p className="font-medium text-sm text-slate-500">
                <FontAwesomeIcon icon={solid("contact-book")} size="sm" />{" "}
                Contacts
              </p>
              <p className="text-2xl">{data.length}</p>
            </div>

            <div>
              <p className="font-medium text-sm text-slate-500">
                <FontAwesomeIcon icon={solid("message")} size="sm" /> Message
                envoyé
              </p>
              <p className="text-2xl">{progress}</p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                className="w-fit border p-2 px-4 rounded border-green-600 text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setSending(false)}
                disabled={!sending}
              >
                <FontAwesomeIcon icon={solid("pause-circle")} /> Arrêter
                l'operation encours
              </button>
              <button
                className="w-fit border p-2 px-4 rounded border-red-600 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  setProgress(0);
                  localStorage.removeItem("progress");
                }}
                disabled={progress === 0}
              >
                <FontAwesomeIcon icon={solid("stop-circle")} /> Terminer
                l'operation encours
              </button>
              <button className="w-fit border p-2 px-4 rounded border-primary text-primary">
                <FontAwesomeIcon icon={solid("history")} /> voir log
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <Lottie
            animationData={anim}
            autoPlay
            loop
            className="max-w-[370px]"
          />
        </div>
      </div>

      <div className="p-4 bg-white flex flex-col gap-6">
        <SelectMultiple
          options={SAMPANA}
          onChange={(v) => {
            setFilter(v);
          }}
          placeholder="Tous"
        />
        <div>
          <p className="text-slate-500 text-end mb-1">{message.length}/320</p>
          <textarea
            className="border p-2 w-full min-h-40 rounded"
            placeholder="message"
            maxLength={320}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            className="bg-primary p-2 px-8 text-white rounded flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setSending(true)}
            disabled={message === ""}
          >
            <FontAwesomeIcon icon={solid("paper-plane")} size="sm" />
            {sending ? "En cours..." : "Envoyer"}
          </button>
          {progress > 0 && (
            <>
              <div className="relative border grow rounded">
                <div
                  className="absolute h-full bg-primary flex items-center animate-pulse px-2 text-white"
                  style={{
                    width: `${Math.floor((progress / data.length) * 100)}%`,
                  }}
                >
                  {Math.floor((progress / data.length) * 100)}%
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
