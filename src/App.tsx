import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Content, H1 } from "./style";
import Nav from "./components/Nav";
import Loading from "./components/Loading";
import Search from "./components/Search";
import CardList from "./components/CardList";
import Preview from "./components/Preview";
import { useAppSelector, useAppDispatch } from "./hooks";
import { setCurrentYtItems } from "./slices/search";
import { setIsDarkMode } from "./slices/theme";

const App = () => {
    const dispatch = useAppDispatch();

    const { isLoading, loadingText } = useAppSelector(state => state.loadingReducer);
    const { isSearchList, isPreview } = useAppSelector(state => state.viewBoxReducer);
    const { currentPage, ytItems } = useAppSelector(state => state.searchReducer);

    const [cardPerPage, setCardPerPage] = useState<number>(8);

    const startIndex: number = (currentPage - 1) * cardPerPage;
    const endIndex: number = startIndex + cardPerPage;

    useEffect(() => {
        const localStorageIsDarkMode = localStorage.getItem("isDarkMode");
        if (localStorageIsDarkMode) {
            dispatch(setIsDarkMode(true));
        }
        else {
            dispatch(setIsDarkMode(false));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const updateCardPerPage = () => {
            if (window.innerWidth > 768) {
                setCardPerPage(8);
            }
            else if (window.innerWidth > 430 && window.innerWidth <= 768) {
                setCardPerPage(6);
            }
            else {
                setCardPerPage(2);
            }
        };
        updateCardPerPage();
        window.addEventListener("resize", updateCardPerPage);
    }, []);

    useEffect(() => {
        dispatch(setCurrentYtItems(ytItems.slice(startIndex, endIndex)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

	return (
		<>
			<Container>
                {isLoading && <Loading text={loadingText} />}
				<Nav />
				<Content>
					<H1>Youtube Downloader</H1>
					{!isSearchList && !isPreview &&
                        <Search
                            startIndex={startIndex}
                            endIndex={endIndex} />
                    }
                    {isSearchList && !isPreview &&
                        <CardList
                            startIndex={startIndex}
                            endIndex={endIndex}
                            cardPerPage={cardPerPage} />
                    }
                    {isSearchList && isPreview &&
                        <Preview />
                    }
				</Content>
			</Container>
		</>
	);
};

export default App;
