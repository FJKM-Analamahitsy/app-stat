import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Children,
  ReactElement,
  forwardRef,
  isValidElement,
  useImperativeHandle,
  useState,
} from "react";

interface ModalProps {
  children: ReactElement[];
  autoShow?: boolean;
}

const Modal = forwardRef<any, ModalProps>(
  ({ children, autoShow = false }, ref) => {
    const [show, setShow] = useState<boolean>(autoShow);
    const child = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return child;
      }
    });
    useImperativeHandle(ref, () => ({
      close() {
        setShow(false);
      },
      open() {
        setShow(true);
      },
    }));

    return (
      <>
        <div onClick={() => setShow(true)}>{child[0]}</div>
        {show && (
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
            <div className="bg-white min-w-[30vw] p-4 py-5 animate-scale rounded-sm">
              {child[1]}
            </div>
            <div
              className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 -z-10"
              onClick={() => setShow(false)}
            />
            <div
              className="absolute top-5 right-5 rounded-full bg-gray-400 w-[2rem] h-[2rem] flex justify-center items-center cursor-pointer"
              onClick={() => setShow(false)}
            >
              <FontAwesomeIcon icon={solid("close")} color="#fff" />
            </div>
          </div>
        )}
      </>
    );
  }
);

export default Modal;
