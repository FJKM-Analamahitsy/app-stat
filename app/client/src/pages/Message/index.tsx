import SelectMultiple from "@components/SelectMultiple";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api, { getData } from "@utils/api";
import { SAMPANA } from "@utils/constant";
import { FC, useEffect, useState } from "react";
import useSWR from "swr/immutable";

const Message: FC = () => {
  const [filter, setFilter] = useState("");
  const { data = [] } = useSWR(`member/phone?filter=${filter}`, getData);
  const { data: token } = useSWR(`sms/token`, getData);
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
      <div className="grow flex justify-center items-center">
        <div>
          <p className="text-5xl">{data.length}</p>
          <p className="font-medium text-center">contacts</p>
        </div>
      </div>

      <div className="p-4 bg-white flex flex-col gap-6">
        <SelectMultiple
          options={SAMPANA}
          onChange={(v) => {
            setFilter(v);
          }}
        />
        <div>
          <p className="text-slate-500 text-end mb-1">{message.length}/320</p>
          <textarea
            className="border p-2 w-full"
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
              <button
                className="bg-slate-200 p-2 px-3 text-slate-600 rounded flex items-center gap-3"
                onClick={() => {
                  if (sending) {
                    setSending(false);
                  } else {
                    setProgress(0);
                    localStorage.removeItem("progress");
                  }
                }}
              >
                <FontAwesomeIcon icon={solid("stop")} />
              </button>
              <div className="relative border grow rounded">
                <div
                  className="absolute h-full bg-primary flex items-center animate-pulse px-2 text-white"
                  style={{
                    width: `${Math.floor((progress / data.length) * 100)}%`,
                  }}
                >
                  {progress}
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
