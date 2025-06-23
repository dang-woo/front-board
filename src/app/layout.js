import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata = {
    title: "nextjs-board",
    description: "curd board",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
        <body>
        {children}
        </body>
        </html>
    );
}
