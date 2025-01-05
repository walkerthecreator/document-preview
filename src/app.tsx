import React, { useState } from 'react';
import { DocumentPreview } from './components/DocumentPreview';

function App() {

  const [data, setData] = useState<null | File>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files)
    if (e.target.files !== null) {
      setData(e.target.files[0])
    }
  }

  return (
    <div>
      <h1>Hello, React!</h1>
      <DocumentPreview
        // url='https://bnz-nitin.s3.eu-north-1.amazonaws.com/car.png' 
        // url='https://bnz-nitin.s3.eu-north-1.amazonaws.com/sample2.docx'
        file={data}
        height={100}
        width={180}
        documentType='pdf' />
      <input type="file" onChange={(e) => handleChange(e)} />
    </div>
  );
}

export default App;