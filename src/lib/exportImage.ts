import { toPng } from "html-to-image";

interface ExportOptions {
  /** DOM id of the element to capture */
  elementId: string;
  /** Suggested download filename (without extension — `.png` is appended) */
  filenamePrefix: string;
}

/**
 * Capture a hidden DOM node to PNG and trigger a browser download.
 * Waits for fonts to settle before snapshot so Thai glyphs render correctly.
 */
export const exportElementToPng = async ({
  elementId,
  filenamePrefix,
}: ExportOptions): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`exportElementToPng: element #${elementId} not found`);
  }

  // Ensure Thai web fonts are loaded so the canvas snapshot includes them
  if (typeof document.fonts?.ready === "object") {
    await document.fonts.ready;
  }

  const dataUrl = await toPng(element, {
    quality: 1,
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#ffffff",
  });

  const stamp = new Date()
    .toISOString()
    .replace(/[-T:]/g, "")
    .slice(0, 14);
  const link = document.createElement("a");
  link.download = `${filenamePrefix}-${stamp}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
