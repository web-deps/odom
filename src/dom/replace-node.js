import { observeMutations } from "./observe-mutations.js";


const replace = (target, node) => target.replaceWith(node);

export const replaceNode = (target, node, replacer = replace) => {
	if (target.parentNode) return replacer(target, node);
	
	const observer = observeMutations(
		document.body,
		mutations => {
			if (target.parentNode) {
				replacer(target, node);
				observer.disconnect();
			};
		},
		{ childList: true, subtree: true }
	);
};