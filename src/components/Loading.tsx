import React from "react"
import { FileText, Image } from "lucide-react"
import { styles } from "../components/DocumentPreview";

export interface ILoading {
    documentType: "pdf" | "image" | "word",
    height: number,
    width: number
}

export function Loading({ documentType, height, width }: ILoading) {
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
}