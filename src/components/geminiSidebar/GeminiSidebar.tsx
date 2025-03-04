import { assets } from "@/assets/icons/assets";
import "./GeminiSidebar.css";
import { useContext } from "react";
import { Context } from "@/context/context";

const GeminiSidebar = () => {
  const { onSent, prevPrompts, setRecentPrompt, newChat }: any =
    useContext(Context);

  const loadPrompt = async (prompt: string) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        {/* New Chat Button */}
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus" />
          <p>New Chat</p>
        </div>

        <div className="recent">
          <p className="recent-title">Recent</p>
          {prevPrompts?.map((prompt: string, index: number) => (
            <div
              onClick={() => loadPrompt(prompt)}
              key={index}
              className="recent-entry"
            >
              <img src={assets.message_icon} alt="message" />
              <p>{prompt.slice(0, 18)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeminiSidebar;
