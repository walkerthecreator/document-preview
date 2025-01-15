// import { CloudDownload } from 'lucide-react';
import { FC } from 'react';
import React from 'react';
import { downloadFileFromS3 } from '../helper/download';

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
      className='fade-up download-button'
      style={{
        background: "#333",
        width: "25%",
        minWidth: "fit",
        padding: "4px 12px",
        color: "white",
        display: "flex",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer"
    }} 
      onClick={handleDownload}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-download"><path d="M12 13v8l-4-4" /><path d="m12 21 4-4" /><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" /></svg>
      <span className='button-text'>Download</span>
    </span>
  ); ``
};
