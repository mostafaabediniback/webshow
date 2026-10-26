"use client";
export default function SafeImage({
  src,
  alt,
  fallback = "/fallback-thumbnail.jpg",
  ...props
}) {
  return (
    <img
      src={src || fallback}
      alt={alt || ""}
      {...props}
      onError={(event) => {
        if (!event.currentTarget.src.endsWith(fallback))
          event.currentTarget.src = fallback;
      }}
    />
  );
}
