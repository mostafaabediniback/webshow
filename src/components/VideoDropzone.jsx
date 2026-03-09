import { useEffect, useRef, useState } from "react"
import Dropzone from "dropzone"
import { DocumentUpload, TickCircle, CloseCircle } from "iconsax-react"
import axiosInstanceNew from "../utils/axiosConfigNew"

Dropzone.autoDiscover = false

function VideoDropzone({ onUploaded, onProgress }) {
    const dropzoneRef = useRef(null)
    const [progress, setProgress] = useState(0)
    const [isDragActive, setIsDragActive] = useState(false)
    const [uploadedFileName, setUploadedFileName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const dz = new Dropzone(dropzoneRef.current, {
            url: axiosInstanceNew.defaults.baseURL + "video/upload",
            method: "post",
            chunking: true,
            forceChunking: true,
            chunkSize: 5 * 1024 * 1024,
            retryChunks: true,
            retryChunksLimit: 3,
            maxFiles: 1,
            acceptedFiles: "video/*",
            previewTemplate: '<div style="display:none"></div>',
            headers: {
                Authorization: axiosInstanceNew.defaults.headers.common.Authorization
            },
            init: function () {
                this.on("addedfile", (file) => {
                    setUploadedFileName(file.name)
                    setErrorMessage("")
                    setProgress(0)
                })

                this.on("dragenter", () => setIsDragActive(true))
                this.on("dragleave", () => setIsDragActive(false))
                this.on("drop", () => setIsDragActive(false))

                this.on("sending", (file, xhr, formData) => {
                    const extension = file.name.split(".").pop()
                    formData.append("fileName", file.name)
                    formData.append("extension", extension)
                    formData.append("mimeType", file.type)

                    const token = sessionStorage.getItem("token")
                    if (token) {
                        xhr.setRequestHeader("Authorization", `Bearer ${token}`)
                    }
                })

                this.on("uploadprogress", (_, percent) => {
                    setProgress(percent)
                    if (onProgress) onProgress(percent)
                })

                this.on("success", (_, response) => {
                    setProgress(100)
                    if (response?.temp_path) onUploaded(response.temp_path)
                })

                this.on("maxfilesexceeded", (file) => {
                    this.removeAllFiles()
                    this.addFile(file)
                })

                this.on("error", (_, err) => {
                    setProgress(0)
                    setUploadedFileName("")
                    setErrorMessage(typeof err === "string" ? err : "آپلود فایل با خطا مواجه شد. لطفاً دوباره تلاش کنید.")
                })
            }
        })

        return () => dz.destroy()
    }, [onProgress, onUploaded])

    return (
        <div className="space-y-3">
            <div
                ref={dropzoneRef}
                className={`dropzone rounded-xl border-2 p-6 sm:p-8 text-center cursor-pointer min-h-[180px] flex items-center justify-center transition-all ${
                    isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-dashed border-gray-300 hover:border-gray-400 bg-gray-50/40"
                }`}
            >
                <div className="space-y-3 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                        <DocumentUpload size={32} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">برای انتخاب فایل ویدیو کلیک کنید</p>
                        <p className="text-xs text-gray-500 mt-1">یا فایل را اینجا بکشید و رها کنید</p>
                    </div>
                    {!!uploadedFileName && (
                        <p className="text-xs text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1 inline-flex items-center gap-1">
                            <TickCircle size={14} className="text-green-600" />
                            <span className="truncate max-w-[220px]">{uploadedFileName}</span>
                        </p>
                    )}
                </div>
            </div>

            {progress > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">پیشرفت آپلود</span>
                        <span className="text-xs font-semibold text-blue-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {!!errorMessage && (
                <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-xs flex items-center gap-2">
                    <CloseCircle size={14} />
                    <span>{errorMessage}</span>
                </div>
            )}
        </div>
    )
}

export default VideoDropzone
