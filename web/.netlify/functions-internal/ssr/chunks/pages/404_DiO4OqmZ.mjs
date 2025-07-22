import '@astrojs/internal-helpers/path';
import { createClient } from '@sanity/client';
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, F as FailedToFetchRemoteImageDimensions, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, j as Fragment, k as renderSlot, l as renderHead } from '../astro_RgHMKGuC.mjs';
import 'kleur/colors';
import 'html-escaper';
import { r as resolveSrc, i as isRemoteImage, a as isESMImportedImage, b as isLocalService, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_DV4VMMJN.mjs';
import 'clsx';
/* empty css                          */
/* empty css                          */
/* empty css                        */

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4) return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize) return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1) return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_DV4VMMJN.mjs'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$4 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro/components/Image.astro", void 0);

const $$Astro$3 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":["cdn.sanity.io","astro.build"],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const sanityClient = createClient(
            {"apiVersion":"v2023-08-24","projectId":"n8fc5ydg","dataset":"production","useCDN":true}
          );

globalThis.sanityClient = sanityClient;

const clover = new Proxy({"src":"/_astro/woe-clover.DcQGIf5k.png","width":40,"height":41,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/anj/Coding/woestudio/web/src/assets/woe-clover.png";
							}
							
							return target[name];
						}
					});

const $$Logotype = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 1606 73" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_2341_50)"> <path d="M222.166 3.88977L91.9999 72.8706C91.327 73.1906 90.558 72.7626 90.558 71.9025V25.5925L1.34574 72.8706C0.768996 73.1906 0 72.7626 0 71.9025V3.88977H62.2931C64.4078 3.88977 66.138 5.82195 66.138 8.18627V27.4956C66.138 30.612 69.0218 32.6522 71.6171 31.3641L90.5537 21.4331V4.96597C90.5537 4.42995 91.0343 3.88977 91.5149 3.88977H152.847C154.961 3.88977 156.692 5.82195 156.692 8.18627V27.587C156.692 30.7034 159.672 32.7436 162.171 31.4555L214.419 3.88977H222.166Z" fill="#EFEDED"></path> <path d="M439.765 12.1005L439.804 38.4363H556.888V42.0846H439.804L439.844 66.3054C439.844 67.4855 438.568 69.3096 438.568 69.3096H556.893V72.9787H391.213C391.174 72.9787 391.1 72.9413 391.065 72.9413C390.951 72.9039 390.877 72.8707 390.803 72.8C390.689 72.8 390.615 72.7294 390.575 72.6588C390.501 72.5881 390.462 72.5175 390.427 72.4094C390.313 72.2682 390.278 72.1227 390.278 71.944V37.4183C390.278 34.5595 391.593 31.842 393.887 30.022C395.543 28.7006 439.551 5.43135 440.075 5.14464C441.618 4.32191 443.343 3.89392 445.113 3.89392H556.897V7.56299H446.24C442.518 7.56299 439.774 8.95499 439.774 12.1005H439.765Z" fill="#EFEDED"></path> <path d="M373.098 4.46319C373.059 4.35515 373.024 4.28451 372.95 4.21387C372.911 4.14323 372.836 4.0726 372.723 4.0726C372.648 4.00196 372.574 3.96456 372.461 3.93132C372.421 3.93132 372.347 3.89392 372.312 3.89392H259.112C257.347 3.89392 255.617 4.32191 254.079 5.14464C253.55 5.43135 209.508 28.6965 207.852 30.022C205.558 31.8461 204.243 34.5595 204.243 37.4183V71.944C204.243 72.1227 204.282 72.264 204.391 72.4094C204.431 72.5175 204.466 72.5881 204.54 72.6588C204.579 72.7294 204.653 72.8 204.767 72.8C204.841 72.8707 204.916 72.9081 205.029 72.9413C205.068 72.9413 205.143 72.9787 205.178 72.9787H318.377C320.143 72.9787 321.873 72.5507 323.415 71.728C323.94 71.4413 367.986 48.1762 369.642 46.8506C371.936 45.0265 373.251 42.3131 373.251 39.4502V4.92857C373.251 4.7499 373.208 4.60862 373.098 4.46319ZM324.918 7.59623C324.167 8.34832 323.677 9.38297 323.677 10.5631L323.752 64.768C323.752 67.9135 321.008 69.3055 317.285 69.3055H252.567L252.606 69.2681C253.358 68.516 253.847 67.4813 253.847 66.3012L253.773 12.0963C253.773 8.95083 256.517 7.55883 260.235 7.55883H324.953L324.918 7.59623Z" fill="#EFEDED"></path> <path d="M1605.85 4.51275C1605.81 4.40471 1605.77 4.33407 1605.7 4.26343C1605.66 4.19279 1605.58 4.12216 1605.47 4.12216C1605.4 4.05152 1605.32 4.01412 1605.21 3.98088C1605.17 3.98088 1605.1 3.94348 1605.06 3.94348H1491.86C1490.1 3.94348 1488.37 4.37147 1486.83 5.1942C1486.3 5.48091 1442.26 28.746 1440.6 30.0715C1438.31 31.8957 1436.99 34.609 1436.99 37.4678V71.9936C1436.99 72.1723 1437.03 72.3136 1437.14 72.459C1437.18 72.567 1437.21 72.6377 1437.29 72.7083C1437.33 72.7789 1437.4 72.8496 1437.52 72.8496C1437.59 72.9202 1437.66 72.9576 1437.78 72.9909C1437.82 72.9909 1437.89 73.0283 1437.93 73.0283H1551.13C1552.89 73.0283 1554.62 72.6003 1556.16 71.7775C1556.69 71.4908 1600.73 48.2257 1602.39 46.9002C1604.68 45.0761 1606 42.3627 1606 39.4997V4.97398C1606 4.7953 1605.96 4.65402 1605.85 4.50859L1605.85 4.51275ZM1557.67 7.64579C1556.92 8.39788 1556.43 9.43253 1556.43 10.6126L1556.5 64.8175C1556.5 67.963 1553.76 69.355 1550.03 69.355H1485.32L1485.35 69.3176C1486.11 68.5655 1486.6 67.5309 1486.6 66.3508L1486.52 12.1459C1486.52 9.00039 1489.27 7.60839 1492.98 7.60839H1557.7L1557.67 7.64579Z" fill="#EFEDED"></path> <path d="M1163.85 5.17356V72.1475C1163.85 72.7417 1164.36 73.2278 1164.99 73.2278H1331.92C1331.96 73.2278 1332.04 73.1905 1332.07 73.1905C1332.19 73.1531 1332.26 73.1198 1332.33 73.0492C1332.45 73.0492 1332.52 72.9785 1332.56 72.9079C1332.64 72.8373 1332.67 72.7666 1332.71 72.6586C1332.82 72.5173 1332.86 72.3719 1332.86 72.1932V37.6674C1332.86 34.8086 1331.54 32.0911 1329.25 30.2711C1327.6 28.9498 1283.55 5.6805 1283.02 5.39379C1281.48 4.57105 1279.75 4.14307 1277.99 4.14307H1164.98C1164.93 4.14307 1164.86 4.14307 1164.79 4.14307C1164.75 4.14307 1164.68 4.18046 1164.64 4.18046C1164.53 4.21786 1164.45 4.2511 1164.38 4.32174C1164.26 4.32174 1164.19 4.39238 1164.15 4.46302C1164.08 4.53366 1164.04 4.6043 1164 4.71233C1163.89 4.85361 1163.85 4.99904 1163.85 5.17772V5.17356ZM1212.15 7.80798H1276.87C1280.59 7.80798 1283.33 9.19998 1283.33 12.3455L1283.25 66.5504C1283.25 67.7305 1283.74 68.7651 1284.49 69.5172L1284.53 69.5546H1219.82C1216.09 69.5546 1213.35 68.1626 1213.35 65.0171L1213.42 10.8122C1213.42 9.63212 1212.93 8.59747 1212.18 7.84537L1212.14 7.80798H1212.15Z" fill="#EFEDED"></path> <path d="M1146.84 5.03648V39.5539C1146.84 42.421 1145.52 45.1386 1143.23 46.9544C1141.57 48.2758 1097.52 71.5409 1097 71.8317C1095.45 72.6545 1093.72 73.0741 1091.96 73.0741H1030.96C1029.81 72.8913 1028.69 72.5215 1027.66 71.9689C1027.13 71.678 983.092 48.4129 981.427 47.0915C979.142 45.2715 977.818 42.5582 977.818 39.6911V5.17776C977.818 4.99493 977.862 4.85365 977.975 4.71237C978.01 4.60434 978.045 4.52954 978.124 4.45475C978.159 4.38827 978.237 4.31347 978.351 4.31347C978.421 4.24699 978.5 4.20544 978.613 4.1722C978.648 4.1722 978.727 4.13895 978.762 4.13895H1017.28C1018.07 4.13895 1018.87 4.32178 1019.59 4.67082L1026.16 7.84126C1026.82 8.50194 1027.27 9.37869 1027.37 10.3718L1027.43 66.4133C1027.43 67.5934 1026.94 68.6322 1026.19 69.3801L1026.16 69.4134L1098.5 69.5547L1098.46 69.5214C1097.71 68.7735 1097.22 67.7347 1097.22 66.5546L1097.28 10.2347C1097.38 9.23741 1097.84 8.36066 1098.5 7.70414L1105.06 4.5337C1105.78 4.18882 1106.58 4.00183 1107.38 4.00183H1145.89C1145.93 4.00183 1146.01 4.03507 1146.04 4.03507C1146.15 4.06831 1146.23 4.10987 1146.3 4.17635C1146.42 4.17635 1146.49 4.25114 1146.53 4.31763C1146.61 4.39242 1146.64 4.46722 1146.68 4.57525C1146.79 4.71653 1146.84 4.85365 1146.84 5.03648Z" fill="#EFEDED"></path> <path d="M728.279 64.7679L728.244 38.432V38.3032L660.122 38.2908H611.151C611.151 35.4361 611.151 32.1992 614.201 30.1216C615.953 28.9207 659.86 5.53511 660.384 5.24424C661.931 4.42151 663.661 4.00183 665.426 4.00183H777.219V7.6709H666.554C662.831 7.6709 660.091 9.06705 660.091 12.2042L660.126 34.7671H777.778V39.4542C777.778 42.3089 776.459 45.0264 774.169 46.8547C772.518 48.176 728.51 71.4411 727.986 71.732C726.439 72.5548 724.709 72.9744 722.944 72.9744H611.151V69.3054H721.816C725.539 69.3054 728.279 67.9092 728.279 64.772V64.7679Z" fill="#EFEDED"></path> <path d="M899.59 12.3455L899.734 73.1738L851.222 73.2195H851.038C850.995 73.2195 850.925 73.1863 850.881 73.1863C850.781 73.1531 850.698 73.1115 850.619 73.045C850.505 73.045 850.435 72.9702 850.405 72.9037C850.326 72.8289 850.291 72.7541 850.247 72.6544C850.134 72.5048 850.099 72.3636 850.099 72.189V37.6591C850.099 34.8045 851.418 32.087 853.708 30.2587C855.041 29.1991 883.769 13.9411 895.238 7.85784H794.185V4.14307H960.808V7.81213C960.808 7.81213 905.261 7.83291 904.886 7.86615C901.766 8.13624 899.59 9.55317 899.59 12.3455Z" fill="#EFEDED"></path> <path d="M1409.64 12.1502L1409.78 69.3053H1419.97V73.0284H1349.92V69.3053H1360.14V37.4721C1360.14 34.6175 1361.46 31.9 1363.75 30.0717C1365.09 29.0121 1393.81 13.7541 1405.28 7.67084H1349.89V3.94775H1419.97V7.61682C1419.97 7.61682 1415.31 7.63759 1414.93 7.67084C1411.81 7.94093 1409.64 9.35786 1409.64 12.1502Z" fill="#EFEDED"></path> </g> <defs> <clipPath id="clip0_2341_50"> <rect width="1606" height="73" fill="white"></rect> </clipPath> </defs> </svg>`;
}, "/Users/anj/Coding/woestudio/web/src/components/logotype.astro", void 0);

const $$Astro$2 = createAstro();
const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Nav;
  const { data } = Astro2.props;
  const isHome = Astro2.url.pathname == "/";
  const pages = [
    {
      title: "Home",
      route: "/"
    },
    {
      title: "Stills",
      route: "/stills"
    },
    {
      title: "Motion",
      route: "/motion"
    },
    {
      title: "About",
      route: "/about"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="nav" id="navWrapper"> <a href="/" class="logo__wrapper"> ${renderComponent($$result, "Image", $$Image, { "src": clover, "alt": "Clover logo", "width": "40", "height": "40", "loading": "eager", "class": "clover" })} ${!isHome && renderTemplate`<div class="logotype"> ${renderComponent($$result, "Logotype", $$Logotype, {})} </div>`} </a> <span class="page-link__wrapper"> ${pages.slice(1).reverse().map((page) => renderTemplate`<a${addAttribute(`${page.route}`, "href")} class="page-link link"${addAttribute(page.title, "data-content")}> <p>${page.title}</p> </a>`)} </span> <div class="menu-button" id="menu-button" aria-label="Menu open button">
Menu
</div> </nav> <div id="mobileNav"> <div class="mobile-nav-video"> <video autoplay muted loop playsinline> <source preload="metadata" type="video/mp4" src="https://woe-branding-assets.s3.us-east-2.amazonaws.com/mobile-menu/Mobile+-+Drop+Menu+%5BSolid%5D.mp4">
Your browser does not support the video tag.
</video> </div> <div class="mobile-nav-content"> <span></span> <ul class="page-link__wrapper-mobile"> ${pages.map((page) => renderTemplate`<li class="page-link-parent"> <a${addAttribute(`${page.route}`, "href")}${addAttribute(`page-link link ${Astro2.url.pathname == page.route && "page-active"}`, "class")}> ${page.title} </a> <br> <br> </li>`)} </ul> <div class="mobile-nav-contact"> <div class="mobile-contact"> <div class="mobile-contact-email"> ${data.email ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <h4>Work with WOE</h4> <a${addAttribute(`mailto:${data.email}`, "href")}> <h4>${data.email}</h4> </a> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <h4>Work with WOE</h4> <a href="mailto:info@woestudio.co"> <h4>info@woestudio.co</h4>${" "} </a> ` })}`} </div> ${data.instagram && renderTemplate`<div class="mobile-contact-item"> <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 0V13.2191H18" stroke="#EFEDED"></path> <path d="M14.9082 9.44238L17.9991 13.2212L14.9082 17.0001" stroke="#EFEDED"></path> </svg> <a${addAttribute(data.instagram, "href")} rel="noreferrer" target="_blank"> <h4>Instagram</h4> </a> </div>`} ${data.tiktok && renderTemplate`<div class="mobile-contact-item"> <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 0V13.2191H18" stroke="#EFEDED"></path> <path d="M14.9082 9.44238L17.9991 13.2212L14.9082 17.0001" stroke="#EFEDED"></path> </svg> <a${addAttribute(data.tiktok, "href")} rel="noreferrer" target="_blank"> <h4>Tik Tok</h4> </a> </div>`} </div> </div> </div> </div>  `;
}, "/Users/anj/Coding/woestudio/web/src/components/nav.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description } = Astro2.props;
  const SEOdescription = description ? description : "Innovative Creative Studio Specializing in Video Production. We push the boundaries of conventional taste to deliver powerful, impactful visuals.";
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width"><meta name="generator"', '><meta property="og:image" content="https://i.imgur.com/Ym1QvNA.png"><title>', '</title><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="manifest" href="/site.webmanifest"><link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#ffc40d"><link rel="icon" type="image/svg+xml" href="/woe-favicon.svg"><meta name="theme-color" content="#000000">', "</head> <body> <main> ", " ", ' <div class="cursor-follower" id="cursor-follower"> <div class="cursor-inner"> <p id="cursor-text">View Project</p> </div> </div> </main>  <!-- <script src="../components/utils/cursor.js"><\/script> --> </body></html>'])), addAttribute(SEOdescription, "content"), addAttribute(Astro2.generator, "content"), title, renderHead(), renderSlot($$result, $$slots["nav"]), renderSlot($$result, $$slots["default"]));
}, "/Users/anj/Coding/woestudio/web/src/layouts/BaseLayout.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, data, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "data": data, "title": title, "description": description }, { "default": ($$result2) => renderTemplate`  ${renderSlot($$result2, $$slots["default"])} `, "nav": ($$result2) => renderTemplate`${renderComponent($$result2, "Nav", $$Nav, { "data": data, "slot": "nav" })}` })}`;
}, "/Users/anj/Coding/woestudio/web/src/layouts/Layout.astro", void 0);

const $$PageTransition = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="pageLoadAnimation"></div>  `;
}, "/Users/anj/Coding/woestudio/web/src/components/pageTransition.astro", void 0);

async function getAboutData() {
  const data = await sanityClient.fetch(
    `*[_type == "about"][0]{
        description,
        clientLogoImageArray[]{
          'imageSrc': asset->url,
          alt
        },
        heroImageArray[]{
          'imageSrc': asset->url,
          alt
        },
        teamArray[]{
          name, 
          title, 
          "portrait": portrait.asset->url,
        },  
        expertiseArray[]
      }  
    `
  );
  return data;
}

async function getPreviewClips() {
  const data = await sanityClient.fetch(`
    *[_type == 'homepageInOrder'][0] {
      "projects": projects[]-> { 
        title, 
        previewUrl,
        clientArray[0],
        "slug": slug.current
      }
    }
  `);
  return data;
}

async function getMotionProjectsInOrder() {
  const data = await sanityClient.fetch(
    `*[_type == 'projectsInOrder'][0] {
      "projects": projects[]->{
        title,
        video,
        "thumbnail": thumbnail.asset->url,
        "slug": slug.current,
        clientArray[],        
        awardArray[],
        awardImageArray[]{
          'imageSrc': asset->url,
        },
        servicesArray[],
        creditsArray[],
        previewUrl,
        previewUrlMobile
      }
    }
    `
  );
  return data;
}

async function getStillsProjectsInOrder() {
  const data = await sanityClient.fetch(
    `*[_type == 'stillsInOrder'][0] {
      "stills": stills[]->{
        title,
        video,
        "thumbnail": thumbnail.asset->url,
        "slug": slug.current,
        clientArray[],        
        awardArray[],
        awardImageArray[]{
          'imageSrc': asset->url,
        },
        servicesArray[],
        creditsArray[],
        previewUrl,
        previewUrlMobile
      }
    }
    `
  );
  return data;
}

async function getProjectPageData() {
  const data = await sanityClient.fetch(
    `*[_type == "projects"][]{
        title,
        "slug": slug.current,
        description,
        secondaryDescription,
        clientArray[],        
        awardArray[],
        awardImageArray[]{
          'imageSrc': asset->url,
        },  
        servicesArray[],
        creditsArray[],
        previewUrl,
        previewUrlMobile,
        "thumbnail": thumbnail.asset->url,
        video,
        episodeArray[]{
          episodeTitle,
          episodeSubtitle,
          'thumbnail': episodeThumbnail.asset->url,
          episodeVideo, 
        },  
        mediaArray[]{
          nestedMediaArray[]{
            "imageSrc": nestedImage.asset->url,
            nestedVideo
          },  
        }  
      }  
    `
  );
  return data;
}

async function getStillsPageData() {
  const data = await sanityClient.fetch(
    `*[_type == "stills"][]{
        title,
        "slug": slug.current,
        description,
        secondaryDescription,
        clientArray[],        
        awardArray[],
        awardImageArray[]{
          'imageSrc': asset->url,
        },  
        servicesArray[],
        creditsArray[],
        previewUrl,
        previewUrlMobile,
        "thumbnail": thumbnail.asset->url,
        video,
        episodeArray[]{
          episodeTitle,
          episodeSubtitle,
          'thumbnail': episodeThumbnail.asset->url,
          episodeVideo, 
        },  
        mediaArray[]{
          nestedMediaArray[]{
            "imageSrc": nestedImage.asset->url,
            nestedVideo
          },  
        }  
      }  
    `
  );
  return data;
}

async function getNextProject(currentProjectTitle) {
  try {
    // Step 1: Retrieve the Current Project's Position
    const currentPositionQuery = `
      *[_type == 'projectsInOrder'][0] {
        "projects":projects[]->{
          _id,
          _key,
          title
        }
      }
    `;
    const orderData = await sanityClient.fetch(currentPositionQuery);
    const projects = orderData.projects;
    const currentIndex = orderData.projects.findIndex(
      (project) => project.title === currentProjectTitle
    );

    if (currentIndex === -1) {
      console.error(
        `Project with title "${currentProjectTitle}" not found in projectsInOrder.`
      );
      return null;
    }

    const nextIndex = (currentIndex + 1) % projects.length;

    // Step 2: Retrieve the Next Project Based on Position
    const nextProjectQuery = `
     *[_type == 'projectsInOrder'][0] {
      projects[${nextIndex}]->{
        title,
        previewUrl,
        "slug": slug.current,
      }
    }
    `;
    const nextProjectData = await sanityClient.fetch(nextProjectQuery);

    return nextProjectData;
  } catch (error) {
    console.error("Error fetching next project:", error);
    return null;
  }
}

async function getNextStills(currentStillsTitle) {
  try {
    // Step 1: Retrieve the Current Stills Position
    const currentPositionQuery = `
      *[_type == 'stillsInOrder'][0] {
        "stills":stills[]->{
          _id,
          _key,
          title
        }
      }
    `;
    const orderData = await sanityClient.fetch(currentPositionQuery);
    const stills = orderData.stills;
    const currentIndex = orderData.stills.findIndex(
      (stills) => stills.title === currentStillsTitle
    );

    if (currentIndex === -1) {
      console.error(
        `Stills with title "${currentStillsTitle}" not found in stillsInOrder.`
      );
      return null;
    }

    const nextIndex = (currentIndex + 1) % stills.length;

    // Step 2: Retrieve the Next Stills Based on Position
    const nextStillsQuery = `
     *[_type == 'stillsInOrder'][0] {
      stills[${nextIndex}]->{
        title,
        previewUrl,
        "slug": slug.current,
      }
    }
    `;
    const nextStillsData = await sanityClient.fetch(nextStillsQuery);

    return nextStillsData;
  } catch (error) {
    console.error("Error fetching next stills:", error);
    return null;
  }
}

async function getSiteSettings() {
  const data = await sanityClient.fetch(
    `*[_type == "generalSettings"][0]{
        logoVideo,
        address,
        instagram,
        tiktok,
        email,
      }  
    `
  );
  return data;
}

const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const settingsData = await getSiteSettings();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 | WOE Studio", "data": settingsData, "description": "What on earth? Page not found", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTransition", $$PageTransition, { "data-astro-cid-zetdm5md": true })} ${maybeRenderHead()}<div class="wrapper" data-astro-cid-zetdm5md> <div class="gradient__wrapper" data-astro-cid-zetdm5md> <h1 class="title" data-astro-cid-zetdm5md>4O4</h1> </div> <div class="text-container" data-astro-cid-zetdm5md> <div class="text-column" data-astro-cid-zetdm5md> <h2 data-astro-cid-zetdm5md>
The Page you are looking for doesn't exist or an other error occurred
</h2> <h3 data-astro-cid-zetdm5md>What on earth? Page not found</h3> </div> <h3 class="text-link" data-pseudo data-astro-cid-zetdm5md>
Go back to <a href="/" data-astro-cid-zetdm5md>Home</a>, and please try again another time
</h3> </div> </div> <div class="cursor-mask" data-astro-cid-zetdm5md></div> ` })}  `;
}, "/Users/anj/Coding/woestudio/web/src/pages/404.astro", void 0);

const $$file = "/Users/anj/Coding/woestudio/web/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Logotype as $, _404 as _, $$Image as a, getSiteSettings as b, getNextProject as c, $$PageTransition as d, $$Layout as e, getStillsPageData as f, getProjectPageData as g, getNextStills as h, getPreviewClips as i, getAboutData as j, getConfiguredImageService as k, imageConfig as l, getMotionProjectsInOrder as m, getStillsProjectsInOrder as n, $$Nav as o, $$BaseLayout as p };
