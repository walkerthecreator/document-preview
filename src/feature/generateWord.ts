export const generateWordThumbnail = async ({ url, height = 180, width = 300 }: { url: string, width?: number, height?: number }): Promise<string> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const lines = text.split('\n').slice(0, 3);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    canvas.width = width;
    canvas.height = height;

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