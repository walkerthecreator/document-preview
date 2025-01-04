import React, { useEffect, useState, useMemo } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { FileText, Image } from "lucide-react";

type DocumentType = "pdf" | "image" | "word" | "spreadsheet";

interface IDocumentPreview {
  url: string;
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
    outline: "2px solid dodgerblue",
  }),
};

const generatePdfThumbnail = async (
  url: string,
  width: number
): Promise<string> => {
  try {
    // const response = await axios.get(url, { responseType: "arraybuffer" });
    // const pdfData = new Uint8Array(response.data);
    // const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;


    const pdf = await pdfjsLib.getDocument(url).promise;
    const page = await pdf.getPage(1);

    const initialViewport = page.getViewport({ scale: 0.2 });
    const scale = width / initialViewport.width;
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) throw new Error("Canvas context not available");

    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;

    await page.render({
      canvasContext: context,
      viewport: scaledViewport,
    }).promise;

    return canvas.toDataURL();
  } catch (error) {
    console.error("Error generating PDF thumbnail:", error);
    throw error;
  }
};

const generateWordThumbnail = async ({ url , height = 180 , width = 300 } : {url: string, width?: number, height?: number}): Promise<string> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const lines = text.split('\n').slice(0, 3);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");
    
    canvas.width =  width ;
    canvas.height = height ;
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    lines.forEach((line, i) => {
      ctx.fillText(line.substring(0, 40), 20, 30 + (i * 25));
    });

    return canvas.toDataURL();
  } catch (error) {
    console.error("Error generating Word thumbnail:", error);
    throw error;
  }
};

export const DocumentPreview: React.FC<IDocumentPreview> = ({
  url,
  width = 300,
  height = 210,
  documentType,
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const altText = useMemo(
    () => (documentType === "pdf" ? "PDF thumbnail" : "Image preview"),
    [documentType]
  );

  useEffect(() => {
    if (!url) return setError("No URL provided");

    const loadThumbnail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (documentType === "pdf") {
          const documentUrl = await generatePdfThumbnail(url, width);
          setThumbnailUrl(documentUrl);
        } 
        else if (documentType === "word"){
          const imageData = await generateWordThumbnail({url , width})
          setThumbnailUrl(imageData)
        }
        else {
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
  if (error) return <div>{error}</div>;
  if (!thumbnailUrl) return null;

  return (
    <div
      style={{
        ...styles.container(width, height),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
    </div>
  );
};
