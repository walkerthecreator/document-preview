export interface IGenerateThumbnail {
    file?: File;
    url?: string;
    width: number;
}
export declare const generatePdfThumbnail: ({ file, url, width }: IGenerateThumbnail) => Promise<string>;
