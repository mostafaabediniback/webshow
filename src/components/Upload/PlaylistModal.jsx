import { useState } from "react";
import Modal from "../Modal";

function PlaylistModal({ isOpen, onClose, onSubmit, isPending }) {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await onSubmit({ name: name.trim(), is_public: isPublic });
    setName("");
    setIsPublic(true);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ایجاد پلی‌لیست" size="sm">
      <div className="space-y-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="نام پلی‌لیست" className="h-11 px-4 rounded-lg border border-gray-300 w-full"/>
        {/* <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
          عمومی
        </label> */}
        <button onClick={handleSubmit} disabled={!name.trim() || isPending} className="w-full h-10 rounded-lg bg-blue-600 text-white disabled:bg-gray-300">
          {isPending ? "در حال ایجاد..." : "ایجاد پلی‌لیست"}
        </button>
      </div>
    </Modal>
  );
}

export default PlaylistModal;
