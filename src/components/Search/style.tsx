import styled from "styled-components";

export const Centered = styled.div`
	max-width: 100vh;
	height: calc(100vh / 5);
	margin: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	@media (max-width: 768px) {
		margin: auto 5%;
	}
`;

export const InputGroup = styled.div`
	width: 100%;
	height: calc(100vh / 5);
	overflow: hidden;
	position: relative;

	label {
		position: absolute;
		top: calc(100vh / 15);
		color: var(--second-font-color);
		font: 400 calc(100vh / 15) "poppins";
		cursor: text;
		transition: 0.25s ease;
		@media (max-width: 768px) {
			top: calc(100vh / 25);
			font-size: calc(100vh / 20);
		}
        @media (max-width: 430px) {
			font-size: calc(100vh / 25);
		}
	}

	input {
		display: block;
		width: 100%;
		padding-top: calc(100vh / 10);
		border: none;
		border-radius: 0;
		color: var(--input-color);
		background: transparent;
		font-size: calc(100vh / 30);
		transition: 0.3s ease;
		@media (max-width: 768px) {
			padding-top: calc(100vh / 15);
			font-size: calc(100vh / 40);
		}
		&:valid {
			~ label {
				top: 45px;
				font: 700 calc(100vh / 25) poppins;
				color: var(--second-font-color);
				@media (max-width: 768px) {
					top: 0;
				}
			}
		}
		&:focus {
			outline: none;
			~ label {
				top: 45px;
				font: 700 calc(100vh / 25) poppins;
				color: var(--third-font-color);
				@media (max-width: 768px) {
					top: 0;
				}
			}

			~ .bar:before {
				transform: translateX(0);
				@media (max-width: 768px) {
					transform: translateX(-1);
				}
			}
		}

		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			transition-delay: 99999999s;
			-webkit-transition-delay: 99999999s;
			-webkit-text-fill-color: var(--input-color) !important;
		}
	}

	.bar {
		background: var(--second-font-color);
		content: "";
		width: 100vh;
		height: calc(100vh / 150);
		transition: 0.3s ease;
		position: relative;
		&:before {
			content: "";
			position: absolute;
			width: 100%;
			height: 150%;
			background: var(--third-font-color);
			transform: translateX(-100%);
		}
	}

	::selection {
		background: rgba(128, 0, 255, 0.796, 0.3);
	}
`;

export const BtnArea = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2%;
	position: relative;
	z-index: 888;
`;

export const Btn = styled.button`
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
	font-size: 30px;
	font-weight: 600;
	box-shadow: rgb(255, 198, 0) -2px -2px 0px 2px, rgb(246, 84, 174) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 0px 2px 7px;
	transition: all 0.2s;

	&:hover {
		box-shadow: rgb(246, 84, 174) -2px -2px 0px 2px, rgb(255, 198, 0) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 0px 2px 7px;
		transform: scale(1.01);
	}
`;
