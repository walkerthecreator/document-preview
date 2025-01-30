import "./app.css"
import { DocumentPreview } from "./components/DocumentPreview"
import React from "react"
const App = () => <div>
    <DocumentPreview className="border" style={{ width : "400px" , height : '100px' }} documentType='pdf' url='https://bnz-nitin.s3.eu-north-1.amazonaws.com/design.pdf' /> 
</div>
export default App;