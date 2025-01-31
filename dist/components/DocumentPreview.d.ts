import { default as React, JSX } from 'react';
type DocumentType = "pdf" | "image";
export interface IDocumentPreview {
    style?: React.CSSProperties;
    file?: File | null;
    url?: string;
    fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    width?: number;
    height?: number;
    documentType: DocumentType;
    className?: string;
    imgClassName?: string;
}
export declare const styles: {
    container: (width: string | number, height: string | number) => {
        width: string | number;
        height: string | number;
        borderRadius: number;
        display: string;
        justifyContent: string;
        alignItems: string;
        marginBlock: number;
        position: "relative";
    };
};
export declare const DocumentPreview: ({ url, file, fit, width, height, documentType, style, className, imgClassName }: IDocumentPreview) => JSX.Element | null;
export {};
