export interface IDownload {
    s3Url: string,
    fileName: string,
    type: "word" | "pdf" | "image"
}
export const downloadFileFromS3 = async ({
    s3Url,
    fileName,
    type = 'pdf'
}: IDownload): Promise<void> => {

    try {
        const response = await fetch(s3Url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();

        if (type === 'image') {
            const imageBlob = new Blob([blob], {
                type: blob.type || 'image/jpeg'
            });

            const finalFileName = fileName.includes('.')
                ? fileName
                : `${fileName}.${getFileExtension(blob)}`;

            createAndTriggerDownload(imageBlob, finalFileName);
            return;
        }

        createAndTriggerDownload(blob, fileName);

    } catch (error) {
        console.error('Error downloading file:', error);

        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown error occurred while downloading';

        throw new Error(`Failed to download file: ${errorMessage}`);
    }
};

export const createAndTriggerDownload = (
    blob: Blob,
    downloadFileName: string
): void => {
    const downloadLink = document.createElement('a');
    const objectUrl = window.URL.createObjectURL(blob);

    try {
        downloadLink.href = objectUrl;
        downloadLink.download = downloadFileName;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
    } finally {
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(objectUrl);
    }
};

export const getFileExtension = (blob: Blob): string => {
    const mimeType = blob.type;
    const extension = mimeType.split('/')[1];
    return extension || 'unknown';
};