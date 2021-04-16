export const fetchAsset = async (src, responseType = "text") => {
	const response = await fetch(src);
	return response[responseType]();
};