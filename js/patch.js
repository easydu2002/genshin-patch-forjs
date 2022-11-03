import { keys } from "../keys.js";
import { Buffer } from "./buffer-util.js";
import { downloadBlob } from "./file-util.js";
import { EqualsBytes, HexReplaceEntity, Replace } from "./HexUtility.js";

let UA_key = new Int8Array(await (new Blob([keys.key])).arrayBuffer())
let UA_CN = new Int8Array(await (new Blob([keys.CN])).arrayBuffer())
let UA_OS = new Int8Array(await (new Blob([keys.OS])).arrayBuffer())

export const PatchType = {
  OS: 'os',
  CN: 'cn'
}

/**
 * 
 * @param {File} file 
 * @param {PatchType} type 
 */
export const patch = async function (file, type) {

  // const uaArray = bufferToArray(await file.arrayBuffer())
  const uaArray = new Int8Array(await file.arrayBuffer())
  console.debug('type', type);
  switch (type) {
    case PatchType.CN:
      executePatch(uaArray, UA_CN);
      break;
    case PatchType.OS:
      executePatch(uaArray, UA_OS);
      break;
    default:
      throw new Error("未知版本的客户端！");
  }
}


/**
 * 
 * @param {Int8Array} uaArray 
 * @param {Int8Array} UA 
 * @returns 
 */
function executePatch(uaArray, UA) {

  if (UA.byteLength != UA_key.byteLength) {
    throw new Error("key length doesn't match.");
    //return;
  }

  let Offset = 0;
  let DataLength;

  /**
   * @type {HexReplaceEntity[]}
   */
  let UA_list = []

  while ((DataLength = UA_CN.byteLength - Offset) > 0) {
    if (DataLength > 8)
      DataLength = 8;
    let hexReplaceEntity = new HexReplaceEntity();
    hexReplaceEntity.oldValue = new Int8Array(8);
    Buffer.BlockCopy(UA_CN, Offset, hexReplaceEntity.oldValue, 0, DataLength);
    hexReplaceEntity.newValue = new Int8Array(8);
    Buffer.BlockCopy(UA_key, Offset, hexReplaceEntity.newValue, 0, DataLength);
    UA_list.push(hexReplaceEntity);
    Offset += DataLength;
  }

  let UA_CN_patched = Replace(uaArray, UA_list);
  if (!EqualsBytes(uaArray, UA_CN_patched)) {

    try {
      downloadBlob(new Blob(UA_CN_patched))
    } catch (e) {
      throw e;
    }
    return;
  }
}
