import { PriceFormatOptions } from "./PriceFormatOptions";

export default class PriceFormatter{
    
    static getFormattedPrice(price: number): string {
        return price.toLocaleString('pl', PriceFormatOptions) + " zł";
    }
}

