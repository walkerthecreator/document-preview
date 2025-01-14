import React from "react"


export function View({ url }: { url: string }) {
    return <a
        className='fade-up'
        style={{
            background: "#333",
            width: "25%",
            minWidth: "40px",
            padding: "4px 12px",
            color: "white",
            display: "flex",
            gap: 3,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            fontSize: 12,
            cursor: "pointer"
        }} href={url} target="_black"  >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
        View</a>
}