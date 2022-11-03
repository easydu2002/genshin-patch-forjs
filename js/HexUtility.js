
import { Buffer } from "./buffer-util.js";

/**
 * @link https://github.com/YuFanXing/UA-patch/blob/master/UA-patch/HexUtility.cs
 * @link https://github.com/gc-toolkit/GenshinLauncher/blob/master/PU_Test/Common/Patch/UA_Util.cs
 * 
 */


export function HexReplaceEntity() {

  /**
   * @type {Uint8Array}
   */
  this.oldValue

  /**
   * @type {Uint8Array}
   */
  this.newValue
}

/**
 * 
 * @param {Uint8Array} b1 
 * @param {Uint8Array} b2 
 * @returns 
 */
export function EqualsBytes(b1, b2) {
  if (b1.length != b2.length)
    return false;
  for (let i = 0; i < b1.length; i++) {
    if (b1.at(i) != b2.at(i))
      return false;
  }
  return true;
}

/**
 * 
 * @param {Uint8Array} sourceByteArray 
 * @param {HexReplaceEntity[]} replaces 
 * @returns 
 */
export function Replace(sourceByteArray, replaces) {
  const newByteArray = new Int8Array(sourceByteArray.length);
  Buffer.BlockCopy(sourceByteArray, 0, newByteArray, 0, sourceByteArray.length);
  let offset = 0;
  replaces.forEach(rep => {
    if (EqualsBytes(rep.oldValue, rep.newValue)) {
      return
    }

    for (; offset < sourceByteArray.length; offset++) {
      if (sourceByteArray[offset] == rep.oldValue[0]) {
        if (sourceByteArray.length - offset < rep.oldValue.length)
          break;

        let find = true;
        for (let i = 1; i < rep.oldValue.length - 1; i++) {
          if (sourceByteArray[offset + i] != rep.oldValue[i]) {
            find = false;
            break;
          }
        }
        if (find) {
          Buffer.BlockCopy(rep.newValue, 0, newByteArray, offset, rep.newValue.length);
          offset += (rep.newValue.length - 1);
          break;
        }
      }
    }
  })
  return newByteArray;
}
