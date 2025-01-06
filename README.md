# React Document Preview

A React component for rendering previews of PDF documents, Word documents, and images with thumbnail generation support.

## Installation

```bash
npm install react-document-preview
# or
yarn add react-document-preview
```

## Features

- Supports PDF, Word documents, and image previews
- Generates thumbnails for PDF and Word documents
- Customizable dimensions
- Loading states and error handling
- Download button for documents
- Responsive design

## Usage

```tsx
import { DocumentPreview } from 'react-document-preview';

function App() {
  return (
    <DocumentPreview
      url="https://example.com/document.pdf"
      width={300}
      height={210}
      documentType="pdf"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `File \| null` | `undefined` | File object for local document preview |
| `url` | `string` | `undefined` | URL of the document to preview |
| `width` | `number` | `300` | Width of the preview container |
| `height` | `number` | `210` | Height of the preview container |
| `documentType` | `"pdf" \| "image" \| "word"` | *Required* | Type of document being previewed |

## Examples

### PDF Preview

```tsx
// Preview PDF from URL
<DocumentPreview
  url="https://example.com/document.pdf"
  documentType="pdf"
/>

// Preview PDF from File object
<DocumentPreview
  file={pdfFile}
  documentType="pdf"
/>
```

### Word Document Preview

```tsx
<DocumentPreview
  url="https://example.com/document.docx"
  documentType="word"
/>
```

### Image Preview

```tsx
<DocumentPreview
  url="https://example.com/image.jpg"
  documentType="image"
/>
```

## Custom Styling

The component comes with default styling but can be customized using the `styles` object:

```tsx
const customStyles = {
  container: (width: number, height: number) => ({
    width,
    height,
    borderRadius: 12,
    outline: "2px solid dodgerblue",
    // Add your custom styles here
  }),
};
```

## Dependencies

- React 16.8+
- pdfjs-dist
- lucide-react

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Nitin Jaswal