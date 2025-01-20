import { default as React, JSX } from 'react';
type DocumentType = "pdf" | "image" | "word";
export interface IDocumentPreview {
    style?: React.CSSProperties;
    file?: File | null;
    url?: string;
    fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    width?: number;
    height?: number;
    documentType: DocumentType;
    className?: string;
}
export declare const styles: {
    container: (width: number, height: number) => {
        width: number;
        height: number;
        borderRadius: number;
        display: string;
        justifyContent: string;
        alignItems: string;
        marginBlock: number;
        position: "relative";
    };
};
export declare const DocumentPreview: ({ url, file, fit, width, height, documentType, style, className }: IDocumentPreview) => JSX.Element | null;
export {};
