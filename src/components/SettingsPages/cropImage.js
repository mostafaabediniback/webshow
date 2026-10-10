export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.src = url;
  });

export default async function getCroppedImg(
  imageSrc,
  cropPixels
) {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = cropPixels.width;
  canvas.height = cropPixels.height;

  ctx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    cropPixels.width,
    cropPixels.height
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const file = new File(
          [blob],
          `cropped-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        resolve(file);
      },
      "image/jpeg",
      0.95
    );
  });
}