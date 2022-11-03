
/**
 * @link https://learn.microsoft.com/zh-cn/dotnet/api/system.buffer.blockcopy?view=net-6.0
 */
export const Buffer = {
  /**
   * 
   * @param {Uint8Array} src 
   * @param {Number} srcOffset 
   * @param {Uint8Array} dst 
   * @param {Number} dstOffset 
   * @param {Number} count 
   */
  BlockCopy(src, srcOffset, dst, dstOffset, count) {
    const copy = src.slice(srcOffset, srcOffset + count)
    dst.set(copy, dstOffset)
  }
}


/**
 * 大文件要崩，不用这个
 * @param {ArrayBuffer} arrayBuffer 
 */
export const bufferToArray = function (arrayBuffer) {

  return Array.prototype.slice.call(new Uint8Array(arrayBuffer))
}

/**
 * array
 * @param {[]} array 
 */
export const arrayToBuffer = function (array) {

  return new Uint8Array(array).buffer;
}