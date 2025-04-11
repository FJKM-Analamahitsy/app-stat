import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactElement[];
  onClose?: () => void;
  className?: string;
}

interface ContentProps {
  children: ReactNode;
}

const ModalContent: FC<ContentProps> = ({ children }) => {
  return createPortal(<>{children}</>, document.body);
};

const Modal = forwardRef<any, ModalProps>(
  ({ children, onClose, className }, ref) => {
    const [show, setShow] = useState(false);
    const child = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return child;
      }
    });

    const close = () => {
      setShow(false);
      onClose && onClose();
    };
    useImperativeHandle(ref, () => {
      return {
        show() {
          setShow(true);
        },
        close() {
          close();
        },
      };
    });

    useEffect(() => {
      const onKeyPress = (e: any) => {
        if (e.key === "Escape") {
          setShow(false);
        }
      };
      window.addEventListener("keydown", onKeyPress);
      return () => window.removeEventListener("keydown", onKeyPress);
    }, []);

    return (
      <>
        <div onClick={() => setShow(true)} className={className}>
          {child[0]}
        </div>
        {show && (
          <ModalContent>
            <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 cursor-auto">
              <div className="animate-drop m-6">{child[1]}</div>
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10"></div>
            </div>
          </ModalContent>
        )}
      </>
    );
  }
);

export default Modal;
