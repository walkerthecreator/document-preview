import { CloudDownload } from 'lucide-react';
import { FC } from 'react';
import React from 'react';

interface IDownload {
  s3Url: string,
  fileName: string,
  type: "word" | "pdf" | "image"
}

const downloadFileFromS3 = async ({ s3Url, fileName, type }: IDownload): Promise<void> => {
  try {
    const response = await fetch(s3Url);
    const blob = await response.blob();

    if (type === "image") {
      const imageBlob = new Blob([blob], { type: "image" });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(imageBlob);

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      window.URL.revokeObjectURL(downloadLink.href);
    }

    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    window.URL.revokeObjectURL(downloadLink.href);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw new Error(`Failed to download file: ${error.message}`);
  }
};

export const DownloadButton: FC<{ s3Url: string; fileName: string; type: "pdf" | "image" | "word" }> = ({ s3Url, fileName, type }) => {
  const handleDownload = async () => {
    try {
      await downloadFileFromS3({ s3Url, fileName, type });
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <span
      onClick={handleDownload}
      style={{
        background: "#333",
        position: "absolute",
        padding: "4px 6px",
        color: "white",
        display: "flex",
        gap: 3,
        alignItems: "center",
        borderRadius: 6,
        fontSize: 10,
        top: -12,
        right: 0,
        cursor: "pointer"
      }}><CloudDownload style={{ height: 10, width: 10 }} />Download</span>
  );
};
