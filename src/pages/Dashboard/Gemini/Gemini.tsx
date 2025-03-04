
import GeminiSidebar from "@/components/geminiSidebar/GeminiSidebar";
import Content from "./Content/Content";

const Gemini = () => {
  return (
    <div className="flex gap-12">
      <GeminiSidebar />
      <Content />
    </div>
  );
};

export default Gemini;
