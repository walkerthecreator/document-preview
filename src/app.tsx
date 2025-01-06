import React from "react"
import "./app.css"
import { DocumentPreview } from "./components/DocumentPreview";

const App = () => {
  return <div>
    <DocumentPreview documentType='pdf' url='https://bnz-nitin.s3.eu-north-1.amazonaws.com/design.pdf' />
  </div>
}

export default App;