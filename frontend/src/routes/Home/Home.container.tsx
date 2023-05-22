import {FC} from "react";
import Home from "@/routes/Home/Home.component";

const HomeContainer: FC = () => {
	window.location.replace("/dashboard");

	return <Home/>;
};

export default HomeContainer;
