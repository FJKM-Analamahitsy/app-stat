"use client";
import {
  Children,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
interface Props {
  children: ReactNode;
  className?: string;
}
const Popup = ({ children, className }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const child: any = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return child;
    }
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      setOpen(container.current?.contains(e.target) ?? false);
    });
  }, []);
  return (
    <div ref={container} className="relative">
      <div>{child[0]}</div>
      {open && (
        <div className={`absolute top-full right-0 pt-2 z-50 ${className}`}>
          {child[1]}
        </div>
      )}
    </div>
  );
};

export default Popup;
