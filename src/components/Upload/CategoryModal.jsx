import { useState } from "react";
import Modal from "../Modal";

function CategoryModal({ isOpen, onClose, onSubmit, isPending }) {
  const [title, setTitle] = useState("");
  const [canHaveAudio, setCanHaveAudio] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await onSubmit({ title: title.trim(), can_have_audio: canHaveAudio });
    setTitle("");
    setCanHaveAudio(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ایجاد دسته‌بندی" size="sm">
      <div className="space-y-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان دسته‌بندی" className="h-11 px-4 rounded-lg border border-gray-300 w-full"/>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={canHaveAudio} onChange={(e) => setCanHaveAudio(e.target.checked)} />
          امکان داشتن صوت
        </label>
        <button onClick={handleSubmit} disabled={!title.trim() || isPending} className="w-full h-10 rounded-lg bg-blue-600 text-white disabled:bg-gray-300">
          {isPending ? "در حال ایجاد..." : "ایجاد دسته‌بندی"}
        </button>
      </div>
    </Modal>
  );
}

export default CategoryModal;
