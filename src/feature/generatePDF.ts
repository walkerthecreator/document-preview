import { loadPdf, createThumbnail } from "../helper"


export const generatePdfThumbnail = async ({ file, url, width }: { file?: File; url?: string; width: number }): Promise<string> => {

  try {
    const pdf = await loadPdf({ file, url });
    const page = await pdf.getPage(1);
    const thumbnailDataUrl = await createThumbnail(page, width);

    return thumbnailDataUrl;
  } catch (error) {
    console.error("Error generating PDF thumbnail:", error);
    throw error;
  }
};