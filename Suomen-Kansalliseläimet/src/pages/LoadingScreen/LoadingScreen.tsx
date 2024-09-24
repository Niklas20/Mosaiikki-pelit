import "./LoadingScreen.css";

interface LoadingScreenProps {
    percentageLoaded: number;
}

const LoadingScreen = (props: LoadingScreenProps) => {
    const { percentageLoaded } = props;

    return (
        <div className="screen loading-screen">
            <div
                className="circular-progress"
                style={{ '--percentage': `${percentageLoaded * 3.6}deg` } as React.CSSProperties}
            ></div>
            <div className="loadingText">{percentageLoaded}%</div>
        </div>
    );
}

export default LoadingScreen;