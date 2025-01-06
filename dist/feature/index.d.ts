export declare const features: {
    generatePdfThumbnail: ({ file, url, width }: import('./generatePDF').IGenerateThumbnail) => Promise<string>;
    generateWordThumbnail: ({ url, height, width }: {
        url: string;
        width?: number | undefined;
        height?: number | undefined;
    }) => Promise<string>;
};
