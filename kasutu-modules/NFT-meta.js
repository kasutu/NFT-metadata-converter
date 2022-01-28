#!/usr/bin/env node

export function addProperty(layerType, layerName) {
	let data = {
		type: layerType,
		name: layerName,
	};
	return data;
}

export function kurtAtWork(
	filePath,
	nftName,
	externalLink,
	description,
	collectionName
) {
	let data = {
		nft: [
			{
				file_path: filePath,
				nft_name: nftName,
				external_link: externalLink,
				description: description,
				collection: collectionName,
				properties: [],
				unlockable_content: false,
				explicit_and_sensitive_content: false,
				supply: 1,
				blockchain: 'Polygon',
				sale_type: 'Fixed Price',
				price: 0.033,
				duration: '6 months',
				specific_buyer: false,
				quantity: 1,
			},
		],
	};
	return data;
}
