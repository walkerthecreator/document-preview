import { FC } from 'react';
export declare const DownloadButton: FC<{
    s3Url: string;
    fileName: string;
    type: "pdf" | "image" | "word";
}>;
