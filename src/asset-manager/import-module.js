export const importModule = async (src, { name, construct, props } = {}) => {
	const module = await import(src);
	const asset = name ? module[name] : Object.values(module)[0];
	return (typeof asset === "function" && construct) ? asset(props) : asset;
};