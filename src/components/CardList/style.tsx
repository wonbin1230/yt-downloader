import styled from "styled-components";

export const Action = styled.div`
        display: flex;
		justify-content: space-between;
		@media (max-width: 430px) {
			flex-direction: column;
		}
`;

export const SearchArea = styled.div`
    display: flex;
	align-items: baseline;
	max-width: 50%;
	@media (max-width: 430px) {
		max-width: 100%;
	}
`;

export const SearchBtn = styled.button`
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
	font-weight: 600;
	box-shadow: rgb(255, 198, 0) -2px -2px 0px 2px, rgb(246, 84, 174) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 0px 2px 7px;
	transition: all 0.2s;
    margin-left: 5%;
	font-size: 20px;
	margin-bottom: 2%;

	@media (max-width: 768px) {
		margin-left: 0;
		padding: 10px;
	}

	@media (max-width: 430px) {
		padding: 5px;
	}

    &:hover {
		box-shadow: rgb(246, 84, 174) -2px -2px 0px 2px, rgb(255, 198, 0) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 0px 2px 7px;
		transform: scale(1.01);
	}
`;

export const InputGroup = styled.div`
    width: 100%;
	height: auto;
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
	}

	input {
		display: block;
		width: 100%;
		padding-top: 0;
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

export const Center = styled.div`
    max-width: 50%;
    display: flex;
    align-items: center;
	justify-content: flex-end;
	flex-direction: column;
	margin-top: 0;
	margin-bottom: 2%;
    position: relative;
    z-index: 888;
	@media (max-width: 430px) {
		max-width: 100%;
	}

	span {
		width: 150px;
        color: var(--input-color);
	}
`;

export const PageBtn = styled.button`
    outline: none;
	border: none;
	cursor: pointer;
	font-size: 25px;
	font-weight: 400;
	color: #fff;
	background-color: #3d535f;
	padding: 8px 14px;
	margin: 0 5px;
	letter-spacing: 2px;
	text-transform: capitalize;
	box-shadow: 0 15px 10px rgba(0, 0, 0, 0.4);
	@media (max-width: 768px) {
		font-size: 20px;
		padding: 8px 5px;
		margin: 2% 5px;
	}
	@media (max-width: 430px) {
		margin: 5% 5px;
	}

	&:hover {
		background-color: var(--hover-color);
	}
`;

export const List = styled.div`
    width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	position: relative;
	z-index: 888;
	@media (max-width: 430px) {
		margin-bottom: 5%;
	}
`;

export const Card = styled.div`
    max-width: 320px;
	font-weight: bold;
	margin-top: 1%;
    border-radius: 5%;
    color: var(--input-color);
	@media(min-width: 769px) {
		transition: all 0.5s ease-out;
	}
	@media (max-width: 768px) {
		max-width: 280px;
	}
	@media (max-width: 430px) {
		max-width: 100%;
	}

    &:hover {
            background-color: var(--card-hover-color);
			box-shadow: 0 15px 10px rgba(0, 0, 0, 0.4);
			transform: scale(1.15);
            position: relative;
            z-index: 9999;
		}

	img {
		max-width: 100%;
        border-radius: 5%;
	}
`;

export const Title = styled.div`
    max-width: 100%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	-webkit-line-clamp: 2;
    padding: 0 2%;
`;