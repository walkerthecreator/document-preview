import { default as React } from 'react';
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
export declare const DocumentPreview: React.FC<IDocumentPreview>;
export {};
