import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteVideo from "../../../hooks/video/useDeleteVideo";

export function useVideoManagementActions() {
  const navigate = useNavigate();
  const { deleteVideoAsync, isDeleting } = useDeleteVideo();
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;

    await deleteVideoAsync(deleteConfirmId);
    setDeleteConfirmId(null);
  };

  return {
    deleteConfirmId,
    editingVideo,
    isDeleting,
    closeDeleteConfirm: () => setDeleteConfirmId(null),
    closeEditor: () => setEditingVideo(null),
    handleConfirmDelete,
    handleDelete: setDeleteConfirmId,
    handleEdit: setEditingVideo,
    handleShow: (id) => navigate(`/v/${id}`),
  };
}

export default useVideoManagementActions;
