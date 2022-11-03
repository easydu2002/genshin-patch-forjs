import { arrayToBuffer } from "./buffer-util.js"

/**
 * 
 * @param {[]} array
 * @param {String} filename
 */
export const downloadArray = function (array, filename) {

  const arrayBuffer = arrayToBuffer(array)
  const blob = new Blob([arrayBuffer])
  downloadBlob(blob, filename)
}

/**
 * 
 * @param {Blob} blob 
 * @param {String} filename
 */
export const downloadBlob = function (blob, filename) {

  const dataURL = URL.createObjectURL(blob)
  console.log('dataURL', dataURL);
  const link = document.createElement('a')
  link.href = dataURL
  link.download = filename
  link.click()
}