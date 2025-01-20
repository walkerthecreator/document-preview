import React, { useEffect, useState, useMemo, JSX } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { features } from "../feature"
import { Loading } from "./Loading";
import workerUrl from "../worker/pdf.worker.min.mjs?url";

type DocumentType = "pdf" | "image" | "word";

export interface IDocumentPreview {
    style?: React.CSSProperties;
    file?: File | null;
    url?: string;
    fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    width?: number;
    height?: number;
    documentType: DocumentType;
}

// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('../worker/pdf.worker.min.mjs', import.meta.url).href;
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export const styles = {
    container: (width: number, height: number) => ({
        width,
        height,
        borderRadius: 12,
        // outline: "2px solid dodgerblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBlock: 10,
        position: "relative" as const,
    }),
};

export const DocumentPreview = ({
    url,
    file,
    fit = "cover",
    width = 300,
    height = 210,
    documentType,
    style,
}: IDocumentPreview): JSX.Element | null => {
    if (!url && !file) return null
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { generatePdfThumbnail, generateWordThumbnail } = features;

    const altText = useMemo(
        () => (documentType === "pdf" ? "PDF thumbnail" : "Image preview"),
        [documentType]
    );


    useEffect(() => {
        const loadThumbnail = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (documentType === "pdf") {
                    const documentUrl = await generatePdfThumbnail({
                        ...(file && { file }),
                        ...(url && { url }),
                        width
                    });
                    setThumbnailUrl(documentUrl);
                }
                else if (documentType === "word") {
                    if (!url) {
                        setError('Missing URL')
                        return
                    }
                    const imageData = await generateWordThumbnail({
                        url,
                        width
                    })
                    setThumbnailUrl(imageData)
                }
                else {
                    setThumbnailUrl(url!)
                }
            } catch (err) {
                setError("Failed to load preview");
            } finally {
                setIsLoading(false);
            }
        };


        loadThumbnail();
    }, [url, width, documentType]);


    if (isLoading) return <Loading width={width} height={height} documentType={documentType} />

    return (
        <div
            style={{ ...styles.container(width, height), ...style }}>
            {
                error ?
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-x-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="m8 12.5-5 5" /><path d="m3 12.5 5 5" /></svg>
                        {error}
                    </div> :
                    <>
                        <div style={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            borderRadius: 10,
                            position: "relative",
                        }}>
                            <img
                                src={thumbnailUrl}
                                alt={altText}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: fit,
                                    objectPosition: documentType === "image" ? "center center" : "top left",
                                }}
                            />
                        </div>
                    </>
            }
        </div>
    );
};
