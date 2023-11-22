import React, { useRef } from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { Header } from '../components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Editor = () => {
  const richTextEditorRef = useRef(null);

  const downloadPdf = async () => {
    if (richTextEditorRef.current) {
      const editorContentElement = document.querySelector('.e-rte-content');
      const dpi = 300;

      // Calculate the aspect ratio of the content
      const aspectRatio = editorContentElement.offsetWidth / editorContentElement.offsetHeight;

      // Define the desired PDF width and height (e.g., 8.5x11 inches)
      const pdfWidthInches = 8.5;
      const pdfHeightInches = 11;

      // Calculate PDF dimensions based on aspect ratio while preserving page size
      let pdfWidth, pdfHeight;
      if (aspectRatio > 1) {
        // Landscape orientation
        pdfWidth = pdfWidthInches * dpi;
        pdfHeight = pdfWidth / aspectRatio;
      } else {
        // Portrait orientation
        pdfHeight = pdfHeightInches * dpi;
        pdfWidth = pdfHeight * aspectRatio;
      }

      const canvas = await html2canvas(editorContentElement, { scale: dpi / 96 });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF(aspectRatio > 1 ? 'l' : 'p', 'pt', [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      // Add new page if content doesn't fit on one page
      if (canvas.height > pdfHeight) {
        pdf.addPage([pdfWidth, pdfHeight]);
        pdf.addImage(imgData, 'JPEG', 0, -pdfHeight, pdfWidth, pdfHeight);
      }

      pdf.save('document.pdf');
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Editor" />
      <RichTextEditorComponent ref={richTextEditorRef}>
        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
      </RichTextEditorComponent>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};

export default Editor;
