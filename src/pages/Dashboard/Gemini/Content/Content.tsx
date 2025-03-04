import { useContext } from "react";
import "./Content.css";
import { Context } from "@/context/context";
import { assets } from "@/assets/icons/assets";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/user/userManagement";

const Content = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  }: any = useContext(Context);

  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetSingleUserQuery(user?.userId);
  const userData = data?.data;

  return (
    <div className="main">
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {userData?.name}</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            {/* ------- cards ------- */}
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful place to visit</p>
                <img src={assets.compass_icon} alt="compass" />
              </div>
              <div className="card">
                <p>Briefly summarize this article</p>
                <img src={assets.bulb_icon} alt="bulb" />
              </div>
              <div className="card">
                <p>Brainstorm ideas for a new product</p>
                <img src={assets.message_icon} alt="message" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  className="font-normal"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}

        {/* ------- Main bottom ------- */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a promt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="send" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
