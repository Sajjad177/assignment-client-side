import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, Send, X } from "lucide-react";
import { useSendMessageMutation } from "@/redux/features/chat/chatManagement";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hook";
import { chatSelectedUser } from "@/redux/features/auth/authSlice";

interface MessageForm {
  text: string;
  image?: File | null;
}

const MessageInput = () => {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<MessageForm>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedFile = watch("image");
  const selectedUser = useAppSelector(chatSelectedUser);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImagePreview(null);
    setValue("image", null);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<MessageForm> = async (data) => {
    try {
      const formData = new FormData();

      // append data and image
      formData.append(
        "data",
        JSON.stringify({
          text: data.text,
          recieverId: selectedUser?._id,
        })
      );
      formData.append("image", data.image || "");

      await sendMessage(formData).unwrap();
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 w-full border-t bg-white dark:bg-gray-900">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            className="w-full rounded-lg border px-4 py-2"
            placeholder="Type a message..."
            {...register("text", { required: true })}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Image Upload Button */}
          <Button
            type="button"
            variant="ghost"
            className="hidden sm:flex p-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              size={22}
              className={`${
                selectedFile ? "text-emerald-500" : "text-gray-400"
              }`}
            />
          </Button>
        </div>

        {/* Send Message Button */}
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          disabled={(!watch("text")?.trim() && !selectedFile) || isLoading}
        >
          <Send size={22} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
