import { useCallback, useState } from "react";
import getCroppedImg from "./cropImage";
import Cropper from "react-easy-crop";
import Modal from "../../ui/Modal";

function ImageCropModal({
  isOpen,
  image,
  aspect,
  title,
  onClose,
  onSave,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleSave = async () => {
    if (!image || !croppedAreaPixels) return;

    const croppedFile = await getCroppedImg(
      image,
      croppedAreaPixels
    );

    onSave(croppedFile);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 h-10 rounded-lg border"
          >
            انصراف
          </button>

          <button
            onClick={handleSave}
            className="px-4 h-10 rounded-lg bg-orange-500 text-white"
          >
            تایید
          </button>
        </div>
      }
    >
      <div className="relative w-full h-[60vh] bg-black rounded-lg overflow-hidden">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="mt-4">
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </Modal>
  );
}

export default ImageCropModal;