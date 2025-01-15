import { DocumentPreview } from "./components/DocumentPreview"
import "./app.css"
import React from "react"

const App = () => <div>
    <DocumentPreview
        documentType="image"
        width={160}
        height={105}
        url="https://imgs.search.brave.com/t2KbRIs2YECetNBjfX_-eeUBzho4MSrkA_4VrxGof7w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEy/Njk3OTk5NS9waG90/by9jcmFzaC10ZXN0/LWR1bW15LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1Ya1lI/bDMySG0wNWNUejV3/UmdHRE95eTlXZW5f/ajdxMEoxSVNSSnFa/SmQ0PQ" />
</div>
export default App;