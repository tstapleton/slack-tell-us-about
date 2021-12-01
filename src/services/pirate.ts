import axios from 'axios';

export async function getQuote(): Promise<string> {
	try {
		const response = await axios.get<string>('http://gangstaname.com/quotes/pirate');
		const regex = /<h2[\s\w='"]*>(.*)<\/h2>/;
		const data = regex.exec(response.data);
		// data is null if nothing matched, and data[1] has the first capture group if there is a match
		return data ? data[1] : '';
	} catch (e) {
		// can ignore any errors getting the quote
		return '';
	}
}
