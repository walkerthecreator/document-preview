import { FC } from 'react';
export interface IDownload {
    s3Url: string;
    fileName: string;
    type: "word" | "pdf" | "image";
}
export declare const DownloadButton: FC<{
    s3Url: string;
    fileName: string;
    type: "pdf" | "image" | "word";
}>;
