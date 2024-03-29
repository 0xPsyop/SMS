import "@/app/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Student management system",
	description: "",
};

export default function BaseAppLayout({ children }) {
	return (
		<html lang="en" className="bg-zinc-950">
			<head>
				<link
					rel="icon"
					type="image/x-icon"
					href="./../favicon.png"
					sizes="any"
				/>
			</head>
			<body>

					{children}
					<Navbar />
			
			</body>
		</html>
	);
}
