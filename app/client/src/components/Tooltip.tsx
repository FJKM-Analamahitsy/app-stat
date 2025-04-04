import { FC, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const Tooltip: FC<Props> = ({ children, title }) => {
  const container = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const onMoveHandler = (e: any) => {
    setShow(container.current?.contains(e.target) || false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMoveHandler);
    return () => {
      document.removeEventListener("mousemove", onMoveHandler);
    };
  }, []);
  return (
    <div ref={container} className="relative group">
      <div>{children}</div>

      {show && (
        <span className="absolute bottom-full right-0  bg-slate-300 rounded  p-1 mb-2 z-50 w-max">
          {title}
          <div className="absolute right-1  border-[12px] border-slate-300 border-l-transparent border-r-transparent border-b-transparent" />
        </span>
      )}
    </div>
  );
};

export default Tooltip;
