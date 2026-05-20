import { useState } from "react";
import { Modal, Button } from "../../ui";

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
        <Button 
          onClick={handleSubmit} 
          disabled={!name.trim()} 
          isLoading={isPending}
          className="w-full"
        >
          ایجاد پلی‌لیست
        </Button>
      </div>
    </Modal>
  );
}

export default PlaylistModal;
