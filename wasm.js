import { compress, decompress, init } from '@bokuweb/zstd-wasm';
import { CompressionStream, DecompressionStream } from '@ungap/compression-stream';
import brotli from 'https://cdn.jsdelivr.net/npm/brotli-js@1.0.2/+esm';

import byteSize from 'byte-size';
import LZString from 'lz-string';

const sampleArr = Array.from("hi".repeat(9999)).toString();
const data = new Uint8Array(Array.from("hi".repeat(9999)));


const fileSizeReadable = (fileSizeInBytes) => {
    const fileSize = byteSize(fileSizeInBytes);
    return `File size: ${fileSize.value}${fileSize.unit}`
}


(async () => {
  await init();
  const Buffered = Buffer.from(sampleArr)
  const compressed = compress(Buffered, 10);
  const res = decompress(compressed);
  const response = Buffer.from(res).toString();
  var compressedLZ = LZString.compress(sampleArr);

  console.table({
    "uncompressed": fileSizeReadable(Buffered.byteLength), "compressed": fileSizeReadable(compressed.byteLength),
    "LZ compressed": fileSizeReadable(compressedLZ.length),
    "are they equal?": sampleArr === response});
})();

import { ZstdInit } from '@oneidentity/zstd-js';

ZstdInit().then(({ZstdSimple, ZstdStream}) => {
  // Create some sample data to compress
  // const data  = new Uint8Array(Array.from("hi".repeat(9999)).toString());

  

  const compressionLevel = 20;
  const doCheckSum = true;
  /*
   * The required parameter is the data
   * It must be a Uint8Array
   * */

  const compressedStreamData = ZstdStream.compress(data, compressionLevel);
  const decompressedStreamData = ZstdStream.decompress(compressedStreamData);

  console.table({"zstd-js uncompressed": fileSizeReadable(decompressedStreamData.byteLength), "compressed": fileSizeReadable(compressedStreamData.byteLength)});
});

/**
 * Convert a string to its UTF-8 bytes and compress it.
 *
 * @param {string} str
 * @returns {Promise<Uint8Array>}
 */
async function compressAPI(str) {
    // Convert the string to a byte stream.
    const stream = new Blob([str]).stream();

    // Create a compressed stream.
    const compressedStream = stream.pipeThrough(
      new CompressionStream("gzip")
    );

    // Read all the bytes from this stream.
    const chunks = [];
    for await (const chunk of compressedStream) {
      chunks.push(chunk);
    }
    return await concatUint8Arrays(chunks);
  }


  async function concatUint8Arrays(uint8arrays) {
    const blob = new Blob(uint8arrays);
    const buffer = await blob.arrayBuffer();
    return new Uint8Array(buffer);
  }


 async function decompressGzip(compressedBytes) {
   // Convert the bytes to a stream.
   const stream = new Blob([compressedBytes]).stream();

   // Create a decompressed stream.
   const decompressedStream = stream.pipeThrough(
     new DecompressionStream("gzip")
   );

   // Read all the bytes from this stream.
   const chunks = [];
   for await (const chunk of decompressedStream) {
     chunks.push(chunk);
   }
   const stringBytes = await concatUint8Arrays(chunks);

   // Convert the bytes to a string.
   return new TextDecoder().decode(stringBytes);
 }

const compressedBytes = await compressAPI(sampleArr);
const decompressedBytes = await decompressGzip(compressedBytes);
console.table(
    {"gzip compressed": fileSizeReadable(compressedBytes.length), "decompressed": fileSizeReadable(decompressedBytes.length)});


    const compressedBrotli = brotli.compressArray(data, 6)

    console.table({"brotli compressed": fileSizeReadable(compressedBrotli.length)});