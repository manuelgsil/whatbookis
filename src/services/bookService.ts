export const fetchFirstParagraphFromApi = async (bookUrl: string): Promise<string> => {
    try {
        const response = await fetch(`/api/book/first-paragraph?bookUrl=${encodeURIComponent(bookUrl)}`);

        if (!response.ok) {
            throw new Error('Failed to fetch the first paragraph');
        }

        const data = await response.json();
        return data.firstParagraph || 'No paragraph found';
    } catch (error) {
        console.error('Error fetching the first paragraph:', error);
        return 'Error fetching the first paragraph';
    }
};
