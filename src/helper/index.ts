import * as pdfjsLib from "pdfjs-dist";

export interface ILoadPDF {
  file?: File;
  url?: string;
}

export const loadPdf = async ({ file, url }: ILoadPDF): Promise<pdfjsLib.PDFDocumentProxy> => {
  try {
    if (url) {
      return await pdfjsLib.getDocument(url).promise;
    } else if (file) {
      const fileBuffer = await file.arrayBuffer()
      return await pdfjsLib.getDocument(fileBuffer).promise;
    } else {
      throw new Error("No valid source provided for the PDF");
    }
  } catch (error) {
    console.error("Error loading PDF:", error);
    throw new Error("Failed to load PDF document");
  }
};

export const createThumbnail = async (page: pdfjsLib.PDFPageProxy, width: number): Promise<string> => {
  try {
    const initialViewport = page.getViewport({ scale: 0.2 });
    const scale = width / initialViewport.width;
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to get 2D canvas context");
    }

    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;

    // Render the page to the canvas
    await page.render({
      canvasContext: context,
      viewport: scaledViewport,
    }).promise;

    // Return the base64 data URL of the generated thumbnail
    return canvas.toDataURL();
  } catch (error) {
    console.error("Error creating PDF thumbnail:", error);
    throw new Error("Failed to generate PDF thumbnail");
  }
};