import * as pdfjsLib from "pdfjs-dist";
export interface ILoadPDF {
    file?: File;
    url?: string;
}
export declare const loadPdf: ({ file, url }: ILoadPDF) => Promise<pdfjsLib.PDFDocumentProxy>;
export declare const createThumbnail: (page: pdfjsLib.PDFPageProxy, width: number) => Promise<string>;
