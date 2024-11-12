import { PNG } from "pngjs";

/**
 * Converts 16-bit pixel data to a base64-encoded PNG.
 *
 * @param data - A Uint8Array containing 16-bit pixel data.
 * @param width - The width of the image.
 * @param height - The height of the image.
 * @returns A promise that resolves to the base64-encoded string of the PNG.
 */
function convertTo16BitPngBase64(
  data16: Uint16Array,
  width: number,
  height: number,
): Promise<string> {
  const data = new Uint8Array(data16.buffer);
  return new Promise((resolve, reject) => {
    const png = new PNG({ width, height, bitDepth: 16, colorType: 0 }); // colorType 0 for grayscale

    // Load the 16-bit pixel data into the PNG data buffer
    for (let i = 0; i < width * height; i++) {
      const index = i * 2;
      const highByte = data[index];
      const lowByte = data[index + 1];

      // Assign 16-bit pixel value to the PNG buffer
      png.data[index] = highByte;
      png.data[index + 1] = lowByte;
    }

    // Collect chunks and encode the PNG as base64
    const chunks: Buffer[] = [];
    png
      .pack()
      .on("data", (chunk: any) => chunks.push(chunk))
      .on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.toString("base64"));
      })
      .on("error", (err: any) => reject(err));
  });
}

const testBuffer = new Uint16Array(3);
testBuffer[0] = 0;
testBuffer[1] = 1;
testBuffer[2] = 2;

const width = 1;
const height = 1;

convertTo16BitPngBase64(testBuffer, width, height).then(console.log);

const getBase64 = convertTo16BitPngBase64;
(window as any).getBase64 = getBase64;
export { getBase64 };
