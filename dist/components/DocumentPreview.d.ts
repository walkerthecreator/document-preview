import { JSX } from 'react';
type DocumentType = "pdf" | "image" | "word";
export interface IDocumentPreview {
    file?: File | null;
    url?: string;
    width?: number;
    height?: number;
    documentType: DocumentType;
}
export declare const styles: {
    container: (width: number, height: number) => {
        width: number;
        height: number;
        borderRadius: number;
        outline: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        marginBlock: number;
        position: "relative";
    };
};
export declare const DocumentPreview: ({ url, file, width, height, documentType, }: IDocumentPreview) => JSX.Element | null;
export {};
