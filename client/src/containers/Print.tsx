import { FC, ReactNode, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "./Receipt";

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
        <div ref={contentRef}>
          <Receipt data={data} />
        </div>
      </div>
    </div>
  );
};

export default Print;
