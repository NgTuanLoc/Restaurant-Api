export const transformQuery = (query) => {
	if (!query) {
		return undefined;
	}
	return query.replace('-', ' ');
};
