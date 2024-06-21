"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AppPage = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/"); // Redirect to the homepage
	}, [router]);

	return null;
};

export default AppPage;
