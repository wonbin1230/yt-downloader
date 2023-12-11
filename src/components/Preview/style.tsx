import styled from "styled-components";

export const Container = styled.div`
	position: relative;
	z-index: 888;
	text-align: center;
`;

export const Video = styled.video`
	max-width: 100vw;
	@media (max-width: 430px) {
		max-width: 80vw;
	}
`;

export const Volume = styled.div`
	max-width: 20%;
	max-height: 10px;
	margin: 0 auto;
	@media (max-width: 768px) {
		margin-top: 2%;
		max-width: 50%;
	}
	@media (max-width: 430px) {
		margin-top: 2%;
		max-width: 80%;
	}

	.noUi-base {
		position: relative;
		&::before {
			content: "";
			width: 20px;
			height: 20px;
			background: url("../volume.png");
			background-size: 20px 20px;
			position: absolute;
			left: -10%;
			top: -60%;
		}
	}

	.noUi-handle {
		height: 18px;
		width: 18px;
		top: -5px;
		right: -9px;
		border-radius: 9px;

        &::before {
            display: none;
        }

        &::after {
            display: none;
        }
	}
`;

export const Slider = styled.div`
	max-width: 50%;
	margin: 0 auto;
	margin-top: 2%;
	@media (max-width: 768px) {
		max-width: 80%;
		margin-top: 10%;
	}
	@media (max-width: 430px) {
		max-width: 100%;
		margin-top: 20%;
	}

	.noUi-connect {
		background-color: #c0392b;
	}
`;

export const Center = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2%;
	position: relative;
	z-index: 888;
	@media (max-width: 430px) {
		max-width: 100%;
	}
`;

export const TypeBtn = styled.button`
	outline: none;
	border: none;
	cursor: pointer;
	font-size: 25px;
	font-weight: 400;
	color: #fff;
	padding: 8px 14px;
	margin: 0 5px;
	letter-spacing: 2px;
	text-transform: capitalize;
	box-shadow: 0 15px 10px rgba(0, 0, 0, 0.4);
	@media (max-width: 768px) {
		margin: 2% 5px;
	}
	@media (max-width: 430px) {
		margin: 5% 5px;
	}

	&:hover {
		background-color: var(--hover-color) !important;
	}
`;

export const ActionBtn = styled.button`
	display: block;
	outline: 0;
	border: 0;
	cursor: pointer;
	text-decoration: none;
	position: relative;
	color: #000;
	background: #fff;
	line-height: 30px;
	border-radius: 40px;
	padding: 20px;
	font-size: 20px;
	font-weight: 600;
	margin: 0 5% 1% 5%;
	box-shadow: rgb(255, 198, 0) -2px -2px 0px 2px, rgb(246, 84, 174) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 0px 2px 7px;
	transition: all 0.2s;
	@media (max-width: 430px) {
		font-size: 16px;
	}

	&:hover {
		box-shadow: rgb(246, 84, 174) -2px -2px 0px 2px, rgb(255, 198, 0) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 0px 2px 7px;
		transform: scale(1.01);
	}
`;
