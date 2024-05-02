const { Dropbox } = require('dropbox');
require('dotenv').config();

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

async function uploadImageToDropbox(fileBuffer, filename) {
	try {
		const response = await dbx.filesUpload({ path: '/' + filename, contents: fileBuffer });
		const shareResponse = await dbx.sharingCreateSharedLinkWithSettings({ path: response.result.path_lower });
		return shareResponse.result.url.replace('dl=0', 'raw=1');
	} catch (error) {
		console.error('Error uploading to Dropbox:', error);
		if (error.error && error.error.error && error.error.error['.tag'] === 'expired_access_token') {
			throw new Error('Dropbox access token expired. Please update the token.');
		}
		throw new Error('Dropbox upload failed: ' + error.message);
	}
}

module.exports = { uploadImageToDropbox };
