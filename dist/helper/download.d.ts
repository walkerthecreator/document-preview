export interface IDownload {
    s3Url: string;
    fileName: string;
    type: "word" | "pdf" | "image";
}
export declare const downloadFileFromS3: ({ s3Url, fileName, type }: IDownload) => Promise<void>;
export declare const createAndTriggerDownload: (blob: Blob, downloadFileName: string) => void;
export declare const getFileExtension: (blob: Blob) => string;
