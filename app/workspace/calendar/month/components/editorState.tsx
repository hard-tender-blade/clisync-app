import React, { useState } from "react";
import { BlockInterface } from "./editor/context/editorContext";
import Editor from "./editor/editor";
import { useMonthCalendar } from "../context/monthCalendarContext";
import updateSessionById from "@/modules/client/query/sessions/updateSessionById";
import { showAlert } from "@/modules/client/utils/alert/alerts";
import {
  showLoading,
  hideLoading,
} from "@/modules/client/utils/loading/loadingModule";
import { Client, Session } from "@/modules/shared/types/mainTypes";
import session from "@/app/workspace/clients/[id]/components/sessions/session";
import NoSSR from "@/modules/client/utils/noSSR";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";
import deleteSessionById from "@/modules/client/query/sessions/deleteSessionById";

export default function EditorWStateWrapper({
  defSession,
  setClient,
  update,
}: {
  defSession: Session;
  setClient: (client: Client) => void;
  update: boolean;
}) {
  const [selectedSession, setSelectedSession] = useState<Session>(defSession);

  const handleSaveSession = async () => {
    if (!selectedSession) return;

    showLoading();
    try {
      const res = await updateSessionById(selectedSession.id, selectedSession);
      if (res) {
        showAlert("success", "mid", "Session saved successfully");
      } else {
        showAlert("error", "mid", "Failed to save session");
      }
    } catch (error) {
      showAlert("error", "mid", "Failed to save session");
      hideLoading();
    }

    hideLoading();
  };

  const handleSessionDelete = async () => {
    showLoading();
    const updatedClient = await deleteSessionById(selectedSession.id);
    if (!updatedClient) {
      showAlert(
        "error",
        "short",
        "Failed to delete session, contact support please."
      );
      hideLoading();
      return;
    }
    // update client
    setClient(updatedClient);
    hideLoading();
    showAlert("success", "short", "Session deleted successfully");
  };

  if (!selectedSession) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex gap-2">
        <NoSSR>
          <button className="btn btn-sm">
            Session -{" "}
            {moment(selectedSession.start).format("YYYY.MM.DD, HH:mm")} -{" "}
            {moment(selectedSession.end).format("HH:mm")}
          </button>
        </NoSSR>
        <button className="btn btn-sm btn-primary" onClick={handleSaveSession}>
          Save
        </button>

        <button
          className="btn btn-sm btn-error text-white"
          onClick={handleSessionDelete}
        >
          <FaRegTrashAlt />
          Delete
        </button>
      </div>

      <Editor
        blocks={JSON.parse(selectedSession.note)}
        setBlocks={(blocks: BlockInterface[]) => {
          setSelectedSession({
            ...selectedSession!,
            note: JSON.stringify(blocks),
          });
        }}
      />
    </div>
  );
}
