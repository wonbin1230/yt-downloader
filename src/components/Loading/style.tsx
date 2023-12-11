import type { FC, ReactNode} from "react";

import styled from "styled-components";

export const LoadingDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
	min-height: 100vh;
	background-color: #c0c0c03c;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;
`;

export const LoadingText = styled.div`
    color: var(--input-color);
    font-size: 2em;
    font-weight: bold;
`;