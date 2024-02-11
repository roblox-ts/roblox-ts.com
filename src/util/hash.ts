import lzstring from "lz-string";

const CODE_PREFIX = "#code/";
const GIST_PREFIX = "#gist/";

export async function getCodeFromHash(
	hash: string,
): Promise<string | undefined> {
	if (hash.startsWith(CODE_PREFIX)) {
		const decompressed = lzstring.decompressFromEncodedURIComponent(
			hash.substr(CODE_PREFIX.length),
		);
		if (decompressed !== null) {
			return decompressed;
		}
	} else if (hash.startsWith(GIST_PREFIX)) {
		const gistId = hash.substr(GIST_PREFIX.length);
		const response = await fetch(`https://api.github.com/gists/${gistId}`);
		if (response.status === 200) {
			const gistData = await response.json();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return (Object.values(gistData.files)[0] as any).content as string;
		}
	}
}

export function getHashFromCode(code: string) {
	return CODE_PREFIX + lzstring.compressToEncodedURIComponent(code);
}
