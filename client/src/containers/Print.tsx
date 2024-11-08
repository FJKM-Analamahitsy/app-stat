import { MONTHS } from "@utils/constant";
import dayjs from "dayjs";
import { FC, ReactNode, useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface Props {
  children: ReactNode;
  data: any;
  onsuccess?: () => void;
}

const Print: FC<Props> = ({ children, data, onsuccess }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({
    contentRef,
    onAfterPrint() {
      onsuccess && onsuccess();
    },
  });
  return (
    <div>
      <div onClick={() => print()}>{children}</div>
      <div className="hidden">
        <div ref={contentRef} className="p-4">
          <div className="  text-center py-4">
            <p className="uppercase font-medium">
              Fiagonan'i Jesoa Kristy eto Madagasikara
            </p>
            <p className="uppercase font-medium">ANALAMAHITSY SPIA19</p>
            <p className="italic">
              Aoka ny olona rehetra samy hanao araka izay inian'ny fony avy...
            </p>
            <p>Oha. 22. 8</p>
          </div>
          <div className="flex flex-col gap-5 p-4">
            <div className="flex justify-between items-center gap-4">
              <p>Nom: </p>
              <div className="border-b border-dashed grow"></div>
              <p>
                <span className="uppercase">{data.mpandray.name}</span>{" "}
                <span className="capitalize">{data.mpandray.forname}</span>
              </p>
            </div>
            <div className="flex justify-between items-center gap-4">
              <p>Date: </p>
              <div className="border-b border-dashed grow"></div>
              <p>{dayjs(data.date).format("DD MMM YYYY")}</p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <p>Libellé: </p>
              <div className="border-b border-dashed grow"></div>
              <p>{`${data.type.name} ${
                data.month.length > 1
                  ? MONTHS[data.month[0]] +
                    " - " +
                    MONTHS[data.month[data.month.length - 1]]
                  : MONTHS[data.month[0]]
              }`}</p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <p>Montant: </p>
              <div className="border-b border-dashed grow"></div>
              <p>{Intl.NumberFormat("de-FR").format(data.mtt)} MGA</p>
            </div>
            <div className="grid grid-cols-2 mt-4 border-t border-dashed pt-4">
              <p className="">Signature</p>
              <p className="text-end">Signature</p>
              <p className="mt-20">{data.createBy}</p>
              <p className="text-end mt-20">{data.mpandray.forname}</p>
            </div>
          </div>
          <p className="text-center">Misaotra tompoko!</p>
          <div className="w-full border-b-2 border-dashed mt-8" />
        </div>
      </div>
    </div>
  );
};

export default Print;
