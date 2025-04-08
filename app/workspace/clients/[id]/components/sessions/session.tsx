import {
  Client,
  Session as SessionType,
} from "@/modules/shared/types/mainTypes";
import React, { useState } from "react";
import updateSessionById from "@/modules/client/query/sessions/updateSessionById";
import { showAlert } from "@/modules/client/utils/alert/alerts";
import "./default.css";
import deleteSessionById from "@/modules/client/query/sessions/deleteSessionById";
import NoSSR from "@/modules/client/utils/noSSR";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";
import createSessionsAttachments from "@/modules/client/query/sessions/createSessionAttachment";
import {
  hideLoading,
  showLoading,
} from "@/modules/client/utils/loading/loadingModule";
import TiptapEditor from "../editorTiptap/editorTipTap";
import SessionAttachments from "./components/sessionAttachments";
import EditorWStateWrapper from "@/app/workspace/calendar/month/components/editorState";

export default function Session({
  session: s,
  setClient,
  client,
}: {
  session: SessionType;
  client: Client;
  setClient: (client: Client) => void;
}) {
  const [update, setUpdate] = useState(false);
  const [session, setSession] = useState(s);

  const handleSessionNoteUpdate = (value: string) => {
    setSession({ ...session, note: value });
    setUpdate(true);
  };
  const handleSessionSave = async () => {
    showLoading();
    const updatedClient = await updateSessionById(session.id, session);
    if (!updatedClient) {
      showAlert(
        "error",
        "short",
        "Failed to update session, contact support please."
      );
      hideLoading();
      return;
    }

    setClient(updatedClient);
    setUpdate(false);
    hideLoading();
    showAlert("success", "short", "Client updated successfully");
  };

  const handleAddAttachmentBtnClick = () => {
    //create input and click it
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    //@ts-ignore
    input.onchange = handleFilesChange;
    input.click();
    //remove input
    input.remove();
  };
  const handleFilesChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const selectedFiles = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    showLoading();
    const updatedSession = await createSessionsAttachments(s.id, formData);
    if (!updatedSession) {
      showAlert(
        "error",
        "short",
        "Failed to save attachments, contact support please."
      );
      hideLoading();
      return;
    }
    setSession(updatedSession);
    hideLoading();
    showAlert("success", "short", "Attachments saved successfully.");
  };

  return (
    <div className=" rounded-lg">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 ">
          {/* <TiptapEditor data={session.note} setData={handleSessionNoteUpdate} /> */}
          <EditorWStateWrapper
            defSession={session}
            setClient={setClient}
            update={update}
          />
          {session.sessionsAttachments.length > 0 && (
            <SessionAttachments session={session} setSession={setSession} />
          )}
        </div>
      </div>
    </div>
  );
}
