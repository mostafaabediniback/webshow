import Dropzone from "dropzone"
import { CloseCircle, DocumentUpload, Send, TickCircle } from "iconsax-react"
import { useEffect, useRef, useState } from "react"
import axiosInstanceNew from "../utils/axiosConfigNew"

Dropzone.autoDiscover = false

function VideoDropzone({ onUploaded, onProgress }) {
  const dropzoneRef = useRef(null)
  const dzRef = useRef(null)
  const fileInputRef = useRef(null)

  const onUploadedRef = useRef(onUploaded)
  const onProgressRef = useRef(onProgress)

  const currentFileRef = useRef(null)

  const [progress, setProgress] = useState(0)
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")
  const previewRef = useRef(null)
  const isUploading = progress > 0 && !isConfirmed

  useEffect(() => { onUploadedRef.current = onUploaded }, [onUploaded])
  useEffect(() => { onProgressRef.current = onProgress }, [onProgress])

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
      autoProcessQueue: false,
      clickable: false, // ما خودمان input را اداره می‌کنیم
      init: function () {
        dzRef.current = this

        this.on("addedfile", (file) => {
          currentFileRef.current = file

          if (previewRef.current) {
            try { URL.revokeObjectURL(previewRef.current) } catch (e) {}
            previewRef.current = null
          }

          const url = URL.createObjectURL(file)
          previewRef.current = url
          setPreviewUrl(url)

          setUploadedFileName(file.name)
          setErrorMessage("")
          setProgress(0)
          setIsConfirmed(false)
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
          if (onProgressRef.current) onProgressRef.current(percent)
        })

        this.on("success", (_, response) => {
          setProgress(100)
          setIsConfirmed(true)
          const tempPath = response?.temp_path ?? response?.data?.temp_path ?? response
          if (onUploadedRef.current) {
            try {
              onUploadedRef.current({ temp_path: tempPath, file: currentFileRef.current })
            } catch (e) {
              onUploadedRef.current(tempPath)
            }
          }
        })

        this.on("maxfilesexceeded", (file) => {
          this.removeAllFiles()
          this.addFile(file)
        })

        this.on("error", (_, err) => {
          setProgress(0)
          setUploadedFileName("")
          setErrorMessage(typeof err === "string" ? err : "آپلود فایل با خطا مواجه شد. لطفاً دوباره تلاش کنید.")
          setIsConfirmed(false)
          currentFileRef.current = null

          if (previewRef.current) {
            try { URL.revokeObjectURL(previewRef.current) } catch (e) {}
            previewRef.current = null
            setPreviewUrl("")
          }
        })
      }
    })

    return () => {
      try { dz.destroy() } catch (e) {}
      dzRef.current = null
      currentFileRef.current = null
      if (previewRef.current) {
        try { URL.revokeObjectURL(previewRef.current) } catch (e) {}
        previewRef.current = null
      }
    }
  }, [])

  // وقتی کاربر از طریق input فایل انتخاب کرد
  const handleFileSelected = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return

    // اضافه کردن فایل به Dropzone
    if (dzRef.current) {
      // اگر قبلاً فایلی بود حذف می‌کنیم (تا maxFiles=1 رعایت شود)
      dzRef.current.removeAllFiles()
      dzRef.current.addFile(file)
    } else {
      // اگر Dropzone هنوز آماده نیست، fallback دستی: فقط preview و state را ست کن
      currentFileRef.current = file
      if (previewRef.current) {
        try { URL.revokeObjectURL(previewRef.current) } catch (e) {}
        previewRef.current = null
      }
      const url = URL.createObjectURL(file)
      previewRef.current = url
      setPreviewUrl(url)
      setUploadedFileName(file.name)
      setErrorMessage("")
      setProgress(0)
      setIsConfirmed(false)
    }

    // پاک کردن مقدار input تا انتخابِ همان فایل مجدداً ممکن باشد
    e.target.value = ""
  }

  const handleConfirmUpload = () => {
    if (dzRef.current && dzRef.current.getActiveFiles().length > 0) {
      dzRef.current.processQueue()
    }
  }

  const handleCancelUpload = () => {
    if (dzRef.current) {
      dzRef.current.removeAllFiles()
      setUploadedFileName("")
      setProgress(0)
      setIsConfirmed(false)
    }
    currentFileRef.current = null
    if (previewRef.current) {
      try { URL.revokeObjectURL(previewRef.current) } catch (e) {}
      previewRef.current = null
      setPreviewUrl("")
    }
  }

  const hasFile = !!uploadedFileName && !isConfirmed

  return (
    <div className="space-y-3">
      {isUploading ? (
        <div className="rounded-xl border-2 p-6 sm:p-8 text-center min-h-[180px] flex items-center justify-center transition-all border-dashed border-gray-300 bg-gray-50/40">
          <div className="w-full max-w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">پیشرفت آپلود :</span>
              <span className="text-sm font-semibold text-orange-600">{Math.round(progress)}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-500">لطفاً تا اتمام آپلود صبر کنید</p>
          </div>
        </div>
      ) : (
        <>
          {!(Math.round(progress) === 100) && (
            <div
              ref={dropzoneRef}
              className={`rounded-xl border-2 p-6 sm:p-8 text-center min-h-[180px] flex items-center justify-center transition-all ${isDragActive
                ? "border-orange-500 bg-orange-50"
                : "border-dashed border-gray-300 hover:border-orange-400 bg-gray-50/40"
                } ${hasFile ? "p-4" : ""}`}
            >
              <div className="space-y-3 w-full">
                {!hasFile ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                      <DocumentUpload size={32} className="text-orange-600" color="#F97316" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-gray-900 mb-2">بارگذاری ویدیو</p>
                      <p className="text-sm font-semibold text-gray-900 mb-2">برای انتخاب فایل ویدیو از دکمه پایین استفاده کنید</p>
                      <p className="text-xs text-gray-500 mt-1">یا فایل را اینجا بکشید و رها کنید</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center w-full">
                    {previewUrl ? (
                      <div className="mx-auto max-w-full">
                        <video
                          src={previewUrl}
                          controls
                          className="mx-auto rounded-lg bg-black max-h-[420px] w-full object-contain"
                        />
                        <p className="text-xs text-gray-700 mt-2 bg-white border border-gray-200 rounded-full px-3 py-1 inline-flex items-center gap-1 mx-auto max-w-[220px]">
                          <TickCircle size={14} className="text-amber-600" color="#D97706" />
                          <span className="truncate">{uploadedFileName}</span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1 inline-flex items-center gap-1 mx-auto max-w-[220px]">
                        <TickCircle size={14} className="text-amber-600" color="#D97706" />
                        <span className="truncate">{uploadedFileName}</span>
                      </p>
                    )}
                  </div>
                )}

                <div className="flex justify-center">
                  {!hasFile && (
                    // این div relative باعث می‌شود input شفاف روی دکمه قرار بگیرد و لمس کاربر مستقیماً input را فعال کند (پایدار روی موبایل)
                    <div className="relative">
                      <button
                        type="button"
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 relative z-0"
                      >
                        انتخاب فایل ویدیو
                      </button>

                      {/* input واقعی که روی دکمه قرار می‌گیرد */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        // اگر می‌خواهید هم امکان ضبط دوربین باشد، از capture استفاده کنید، اما اغلب کاربر فقط گالری می‌خواهد:
                        // capture // (اختیاری)
                        onChange={handleFileSelected}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {hasFile && !isConfirmed && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleConfirmUpload}
                className="flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
              >
                <Send size={18} />
                تأیید و آپلود
              </button>
              <button
                onClick={handleCancelUpload}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm flex items-center gap-1 hover:border-orange-300 hover:text-orange-700"
              >
                <CloseCircle size={16} color="#fb2c36" />
                انصراف
              </button>
            </div>
          )}

          {progress > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">پیشرفت آپلود</span>
                <span className="text-xs font-semibold text-orange-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {!!errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-xs flex items-center gap-2">
              <CloseCircle size={14} color="#fb2c36" />
              <span>{errorMessage}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default VideoDropzone