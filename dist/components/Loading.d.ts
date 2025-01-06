export interface ILoading {
    documentType: "pdf" | "image" | "word";
    height: number;
    width: number;
}
export declare function Loading({ documentType, height, width }: ILoading): import("react/jsx-runtime").JSX.Element;
