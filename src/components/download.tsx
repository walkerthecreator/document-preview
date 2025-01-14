// import { CloudDownload } from 'lucide-react';
import { FC } from 'react';
import React from 'react';
import { idText } from 'typescript';

export interface IDownload {
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
    if (error instanceof Error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }
    throw new Error("something went wrong while downloading")
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
    className='fade-up'
      onClick={handleDownload}
      style={{
        cursor: "pointer",
        background: "#333",
        width : "25%" , 
        minWidth : "40px",
        padding: "4px 12px",
        color: "white",
        display: "flex",
        gap: 3,
        justifyContent : "center",
        alignItems: "center",
        borderRadius: 8,
        fontSize: 12,
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-download"><path d="M12 13v8l-4-4" /><path d="m12 21 4-4" /><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" /></svg>
      Download</span>
  );
};
