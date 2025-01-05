import React, { useEffect, useState, useMemo } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { FileText, FileX2, Image } from "lucide-react";
import { features } from "../feature"

type DocumentType = "pdf" | "image" | "word" | "spreadsheet";

interface IDocumentPreview {
  file?: File | null;
  url?: string;
  width?: number;
  height?: number;
  documentType: DocumentType;
}

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('../worker/pdf.worker.min.mjs', import.meta.url).href;

const styles = {
  container: (width: number, height: number) => ({
    width,
    height,
    overflow: "hidden" as const,
    borderRadius: 12,
    outline: "2px solid dodgerblue/20",
  }),
};

export const DocumentPreview: React.FC<IDocumentPreview> = ({
  url,
  file,
  width = 300,
  height = 210,
  documentType,
}) => {
  if (!url && !file) return
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { generatePdfThumbnail, generateWordThumbnail } = features;
  console.log('starting')


  const altText = useMemo(
    () => (documentType === "pdf" ? "PDF thumbnail" : "Image preview"),
    [documentType]
  );

  useEffect(() => {
    // if (!url) return setError("No URL provided");

    console.log('starting effect')

    const loadThumbnail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (documentType === "pdf") {
          if (file) {
            const documentUrl = await generatePdfThumbnail({ file, url, width });
            setThumbnailUrl(documentUrl);
          }
        }
        else if (documentType === "word") {
          if (url) {
            const imageData = await generateWordThumbnail({ url, width })
            setThumbnailUrl(imageData)
          }
        }
        else {
          if (url)
            setThumbnailUrl(url);
        }
      } catch (err) {
        setError("Failed to load preview");
      } finally {
        setIsLoading(false);
      }
    };

    loadThumbnail();
  }, [url, width, documentType]);


  if (isLoading)
    return (
      <div style={styles.container(width, height)}>
        <span
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="mb-4">
            {documentType === "pdf" ? (
              <FileText className="w-6 h-6" />
            ) : (
              <Image className="w-6 h-6" />
            )}
          </span>
          <span>Generating preview...</span>
        </span>
      </div>
    );
  if (!thumbnailUrl) return null;

  return (
    <div
      style={{
        ...styles.container(width, height),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBlock: 10
      }}
    >{
        error ?
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
            <FileX2 width={16} height={16} />
            {error}
          </div> :

          <img
            src={thumbnailUrl}
            alt={altText}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: documentType === "image" ? "top left" : "center",
            }}
          />
      }
    </div>
  );
};
