import { useEffect, useRef, useState } from "react"
import Dropzone from "dropzone"
import axiosInstanceNew from "../utils/axiosConfigNew"

Dropzone.autoDiscover = false

function VideoDropzone({ onUploaded, onProgress }) {
    const dropzoneRef = useRef(null)
    const [progress, setProgress] = useState(0)

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
            headers: {
                Authorization: axiosInstanceNew.defaults.headers.common.Authorization
            },
            init: function () {
                this.on("sending", (file, xhr, formData) => {
                    const extension = file.name.split(".").pop()
                    formData.append("fileName", file.name)
                    formData.append("extension", extension)
                    formData.append("mimeType", file.type)

                    // ✅ ارسال توکن Authorization روی هر chunk
                    const token = sessionStorage.getItem("token") // مثل axiosConfigNew
                    if (token) {
                        xhr.setRequestHeader("Authorization", `Bearer ${token}`)
                    }
                })

                this.on("uploadprogress", (file, percent) => {
                    setProgress(percent)
                    if (onProgress) onProgress(percent)
                })

                this.on("success", (file, response) => {
                    setProgress(100)
                    if (response?.temp_path) onUploaded(response.temp_path)
                })

                this.on("error", (file, err) => {
                    setProgress(0)
                })
            }
        })

        return () => dz.destroy()
    }, [])

    return (
        <div>
            <div
                ref={dropzoneRef}
                className="dropzone border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer"
            >
                <p className="text-gray-600">ویدیو را بکشید اینجا یا کلیک کنید</p>
            </div>

            {progress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div
                        className="bg-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    )
}

export default VideoDropzone