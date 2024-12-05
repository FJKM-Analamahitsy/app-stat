import { MONTHS } from "@utils/constant";
import dayjs from "dayjs";
import { FC } from "react";

interface Props {
  data: any;
}

const Receipt: FC<Props> = ({ data }) => {
  return (
    <div className="p-1 [&>*]:text-[8px]">
      <div className="text-center py-2">
        <p className="uppercase font-medium">
          Fiangonan'i Jesoa Kristy eto Madagasikara
        </p>
        <p className="uppercase font-medium">ANALAMAHITSY SPIA19</p>
        <p className="italic">
          "Aoka ny olona rehetra samy hanao araka izay inian'ny fony avy..."
          Oha. 22. 8
        </p>
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex justify-between items-center gap-2">
          <p>Nom: </p>
          <div className="grow border-b-[1px] border-b-black border-dashed h-2" />
          <p className="text-end">
            <span className="uppercase">{data.mpandray.name}</span>{" "}
            <span className="capitalize">{data.mpandray.forname}</span>
          </p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p>Karatra lah. </p>
          <div className="grow border-b-[1px] border-b-black border-dashed h-2" />
          <p>{data.mpandray.mpandrayN}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p>Date: </p>
          <div className="grow border-b-[1px] border-b-black border-dashed h-2" />
          <p>{dayjs(data.date).format("DD/MM/YY HH:MM")}</p>
        </div>

        <div className="flex justify-between items-start gap-2">
          <p>Libellé: </p>
          <div className="grow border-b-[1px] border-b-black border-dashed h-2" />
          <p className="text-end">{`${data.type.name} ${
            data.month.length > 1
              ? MONTHS[data.month[0]] +
                " - " +
                MONTHS[data.month[data.month.length - 1]]
              : MONTHS[data.month[0]]
          } ${data.year}`}</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <p>Montant: </p>
          <div className="grow border-b-[1px] border-b-black border-dashed h-2" />
          <p>{Intl.NumberFormat("de-FR").format(data.mtt)} MGA</p>
        </div>
      </div>
      <p className="text-center mt-4">Misaotra tompoko!</p>
      <p className="text-center">{data.createBy}</p>
    </div>
  );
};

export default Receipt;
