import { ArrowDown2 } from "iconsax-react";
import CoverPicker from "../../../components/Upload/CoverPicker";
import MultiSelect from "../../../components/Upload/MultiSelect";
import { UPLOAD_TEXT } from "../constants/uploadText";
import cover from "../../../assets/img/cover.jpg";

function PublicSwitch({ value, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">
          {UPLOAD_TEXT.publicShow}
        </span>
        <span className="text-xs text-gray-500">
          {UPLOAD_TEXT.publicDescription}
        </span>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={value === 1}
          onChange={(event) => onChange(event.target.checked ? 1 : 0)}
          className="sr-only peer"
        />

        <div className="h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-blue-600 transition-colors duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:duration-300 peer-checked:after:translate-x-5" />
      </label>
    </div>
  );
}

export function BasicMetadataFields({ draft, channelSelector = null }) {
  return (
    <div className=" w-full flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {UPLOAD_TEXT.title} <span className="text-red-500">*</span>
        </label>
        <input
          value={draft.title}
          onChange={(event) => draft.setTitle(event.target.value)}
          placeholder={UPLOAD_TEXT.titlePlaceholder}
          className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {UPLOAD_TEXT.description}
        </label>
        <textarea
          value={draft.description}
          onChange={(event) => draft.setDescription(event.target.value)}
          placeholder={UPLOAD_TEXT.descriptionPlaceholder}
          className="h-24 px-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {channelSelector}

      <PublicSwitch value={draft.publicShow} onChange={draft.setPublicShow} />
    </div>
  );
}

export function CategoryMultiSelect({
  categories,
  isLoading,
  isError,
  selectedCategories,
  onChange,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-semibold text-gray-900">
          {UPLOAD_TEXT.categories}
        </label>
      </div>
      {isLoading ? (
        <p className="text-sm text-gray-500">{UPLOAD_TEXT.categoryLoading}</p>
      ) : isError ? (
        <p className="text-sm text-red-600">{UPLOAD_TEXT.categoryError}</p>
      ) : (
        <MultiSelect
          options={categories}
          value={selectedCategories}
          onChange={onChange}
          placeholder={UPLOAD_TEXT.categories}
          getOptionLabel={(item) =>
            item?.title || item?.name || `دسته ${item?.id}`
          }
        />
      )}
    </div>
  );
}

export function CategorySingleSelect({
  categories,
  isLoading,
  isError,
  selectedCategory,
  onChange,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-gray-900">
          {UPLOAD_TEXT.categories}
        </label>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">{UPLOAD_TEXT.categoryLoading}</p>
      ) : isError ? (
        <p className="text-sm text-red-600">{UPLOAD_TEXT.categoryError}</p>
      ) : (
        <div className="relative">
          <select
            value={selectedCategory || ""}
            onChange={(event) => onChange(event.target.value)}
            className="w-full h-11 appearance-none bg-transparent px-4 pr-10 text-sm text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{UPLOAD_TEXT.chooseCategory}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title || category.name}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <ArrowDown2 size={14} color="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
}

export function PlaylistMultiSelect({
  playlists,
  isLoading,
  isError,
  selectedPlaylistIds,
  onChange,
  onCreate,
}) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-gray-900">
          {UPLOAD_TEXT.playlist}
        </label>

        <button
          type="button"
          onClick={onCreate}
          className="text-xs font-medium text-blue-600 hover:text-blue-700 transition"
        >
          {UPLOAD_TEXT.playlistCreate}
        </button>
      </div>

      {isLoading ? (
        <div className="p-3 text-sm text-gray-500">
          {UPLOAD_TEXT.playlistLoading}
        </div>
      ) : isError ? (
        <div className="p-3 text-sm text-red-600">
          {UPLOAD_TEXT.playlistError}
        </div>
      ) : playlists.length === 0 ? (
        <div className="p-3 text-sm text-gray-500">
          {UPLOAD_TEXT.playlistEmpty}
        </div>
      ) : (
        <MultiSelect
          options={playlists}
          value={selectedPlaylistIds}
          onChange={onChange}
          placeholder={UPLOAD_TEXT.playlistSearch}
          emptyMessage={UPLOAD_TEXT.playlistEmpty}
          getOptionLabel={(item) =>
            item?.name || `${UPLOAD_TEXT.playlistTitle} ${item?.id}`
          }
        />
      )}
    </div>
  );
}

export function CoverField({ draft }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm w-full">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {UPLOAD_TEXT.coverRequired}
          </label>
          <CoverPicker
            value={draft.coverFile}
            onChange={draft.setCoverFile}
            onConfirm={draft.setCoverFile}
            defaultCovers={[cover, "/covers/default2.jpg", "/covers/default3.jpg"]}
            videoFile={draft.videoFile}
            videoUrl={draft.tempPath}
            videoThumbnails={draft.thumbnails}
          />
        </div>
      </div>
    </div>
  );
}
