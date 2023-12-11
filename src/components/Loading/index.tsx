import React from "react";
import { LoadingDiv, LoadingText } from "./style";
import loadingGIF from "../../assets/loading.gif";

interface IProps {
    text?: string,
}

const Loading = ({ text }: IProps) => {
	return (
		<>
			<LoadingDiv>
                <img src={loadingGIF} alt="loading..." />
                <LoadingText>
                    {text}
                </LoadingText>
			</LoadingDiv>
		</>
	);
};

export default Loading;