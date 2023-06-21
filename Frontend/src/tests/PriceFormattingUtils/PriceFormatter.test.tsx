import PriceFormatter from '../../PriceFormattingUtils/PriceFormatter';

describe('PriceFormatter', () => {
    it('should return formatted price with "zł" suffix', () => {
        const price = 1234.56;
        const expectedFormattedPrice = '1234,56 zł';

        const formattedPrice = PriceFormatter.getFormattedPrice(price);

        expect(formattedPrice).toEqual(expectedFormattedPrice);
    });
});
