import React, { useState, useContext } from "react";
import './Home.css';
import Header from "../Header/Header";
import ExploreList from "../ExploreList/ExploreList";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import AppDownload from "../AppDownload/AppDownload";
import RecommendedProducts from "../Recommendation/Recommend";
import { StoreContext } from "../../Context/StoreContext";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h3>Something went wrong with Recommended Products.</h3>;
        }

        return this.props.children;
    }
}

const Home = () => {
    const { recommendedProducts } = useContext(StoreContext); // Access recommendedProducts from context
    const [category, setCategory] = useState("All");

    console.log("Recommended Products:", recommendedProducts);

    return (
        <div className="home" id="home">
            <Header />
            <ErrorBoundary>
                <RecommendedProducts recommendedProducts={recommendedProducts} />
            </ErrorBoundary>
            <ExploreList category={category} setCategory={setCategory} />
            <ProductDisplay category={category} />
            <AppDownload />
        </div>
    );
}

export default Home;
