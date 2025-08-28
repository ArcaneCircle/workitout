import { useState, useCallback, useContext } from "react";

import { importBackup, exportBackup } from "~/lib/game";

import { ModalContext } from "~/components/modals/Modal";
import ConfirmModal from "~/components/modals/ConfirmModal";
import MenuPreference from "~/components/MenuPreference";

type Props = {
  [key: string]: any;
};

type ModalType = "default" | "credits" | "import-error";

export default function SettingsModal(props: Props) {
  const [modal, setModal] = useState<ModalType>("default");
  //props["buttonText"] = "Cancel";
  return (
    <ConfirmModal {...props}>
      {modal === "credits" ? (
        <CreditsModal />
      ) : modal === "import-error" ? (
        <div style={{ textAlign: "center" }}>
          Failed to import backup. It is not compatible with your version of the
          game
        </div>
      ) : (
        <MenuModal setModal={setModal} />
      )}
    </ConfirmModal>
  );
}

function MenuModal({ setModal }: { setModal: (modal: ModalType) => void }) {
  const { setOpen } = useContext(ModalContext);
  const onCredits = useCallback(() => setModal("credits"), [setModal]);
  const ext = ".bak";
  const onImport = useCallback(async () => {
    const [file] = await window.webxdc.importFiles({ extensions: [ext] });
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        if (importBackup(JSON.parse(e.target.result as string))) {
          setOpen(false);
        } else {
          setModal("import-error");
        }
      }
    };
    reader.readAsText(file, "UTF-8");
  }, [setModal]);
  const onExport = useCallback(() => {
    const backup = exportBackup();
    window.webxdc.sendToChat({
      file: {
        name: `WorkItOut${ext}`,
        plainText: JSON.stringify(backup),
      },
    });
  }, [setModal]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1em" }}>
        SETTINGS
        <hr />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
        <MenuPreference name={"Import"} state="" onClick={onImport} />
        <MenuPreference name={"Export"} state="" onClick={onExport} />
        <MenuPreference name={"Credits"} state="" onClick={onCredits} />
      </div>
    </div>
  );
}

function CreditsModal() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1em" }}>
        <img
          src="./logo.png"
          style={{ height: "2.5em", width: "auto", verticalAlign: "middle" }}
        />
        <div style={{ fontSize: "1.5em" }}>WorkItOut</div>
        <hr />
      </div>
      <div>
        <p>
          Developer:
          <br />
          Asiel Diaz Benitez
        </p>
        <p>
          UI Icons:
          <br />
          HackerNoon
        </p>
        <p>
          Sounds:
          <br />
          Fupi and Dizzy Crow
        </p>
        <p>
          More details at:
          <br />
          github.com/ArcaneCircle/workitout
        </p>
      </div>
    </div>
  );
}
