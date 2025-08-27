import { useContext } from "react";

import { MAIN_COLOR } from "~/lib/constants";

import { ModalContext } from "~/components/modals/Modal";
import { Modal } from "~/components/modals/Modal";
import MenuButton from "~/components/MenuButton";

type Props = {
  buttonText?: string;
  children: React.ReactNode;
  [key: string]: any;
};

export default function ConfirmModal({
  buttonText,
  children,
  ...props
}: Props) {
  const { setOpen } = useContext(ModalContext);
  return (
    <Modal {...props}>
      <div>{children}</div>
      <MenuButton
        style={{
          color: "white",
          background: MAIN_COLOR,
          marginTop: "1.5em",
          textShadow: "1px 1px 1px black",
        }}
        onClick={() => setOpen(false)}
      >
        {buttonText || "Continue"}
      </MenuButton>
    </Modal>
  );
}
