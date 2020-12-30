import lzstring from "lz-string";

const HASH_PREFIX = "#code/";

export function getCodeFromHash(hash: string) {
	if (hash.startsWith(HASH_PREFIX)) {
		const decompressed = lzstring.decompressFromEncodedURIComponent(hash.substr(HASH_PREFIX.length));
		if (decompressed !== null) {
			return decompressed;
		}
	}
}

export function getHashFromCode(code: string) {
	return HASH_PREFIX + lzstring.compressToEncodedURIComponent(code);
}
