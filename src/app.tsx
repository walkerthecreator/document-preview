import React from 'react';
import { DocumentPreview } from './components/DocumentPreview';

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <DocumentPreview 
      // url='https://bnz-nitin.s3.eu-north-1.amazonaws.com/car.png' 
    url='https://bnz-nitin.s3.eu-north-1.amazonaws.com/sample2.docx'
documentType='word' />
    </div>
  );
}

export default App;