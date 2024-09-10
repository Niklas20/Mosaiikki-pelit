import React from "react";
import { useLocation } from "react-router-dom";
import { Animal } from "../../utils/types";
import Spinner from "../../components/Spinner/Spinner";

const animals1: Animal[] = [ // Kansalliseläin ja koira
    { id: 1, name: "Karhu", image: "karhu.jpg", isFinnishNational: true },
    { id: 2, name: "Hirvi", image: "hirvi.jpg", isFinnishNational: false },
    { id: 3, name: "Susi", image: "susi.jpg", isFinnishNational: false },
    { id: 4, name: "Ilves", image: "ilves.jpg", isFinnishNational: false },
    { id: 5, name: "Ahma", image: "ahma.jpg", isFinnishNational: false },
    { id: 6, name: "Suomenpystykorva", image: "suomenpystykorva.jpg", isFinnishNational: true },
    { id: 7, name: "Saksanpaimenkoira", image: "saksanpaimenkoira.jpg", isFinnishNational: false },
    { id: 8, name: "Chihuahua", image: "chihuahua.jpg", isFinnishNational: false },
    { id: 9, name: "Siperian husky", image: "siperianhusky.jpg", isFinnishNational: false },
    { id: 10, name: "Rottweiler", image: "rottweiler.jpg", isFinnishNational: false },
];

const animals2: Animal[] = [ // Kansallislintu ja kala
    { id: 1, name: "Ahven", image: "ahven.jpg", isFinnishNational: true },
    { id: 2, name: "Hauki", image: "hauki.jpg", isFinnishNational: false },
    { id: 3, name: "Kuha", image: "kuha.jpg", isFinnishNational: false },
    { id: 4, name: "Kiiski", image: "kiiski.jpg", isFinnishNational: false },
    { id: 5, name: "Lohi", image: "lohi.jpg", isFinnishNational: false },
    { id: 6, name: "Laulujoutsen", image: "laulujoutsen.jpg", isFinnishNational: true },
    { id: 7, name: "Sinitiainen", image: "sinitiainen.jpg", isFinnishNational: false },
    { id: 8, name: "Talitiainen", image: "talitiainen.jpg", isFinnishNational: false },
    { id: 9, name: "Varis", image: "varis.jpg", isFinnishNational: false },
    { id: 10, name: "Käpytikka", image: "kapytikka.jpg", isFinnishNational: false },
]

const animals3: Animal[] = [ // Kansallishyönteinen ja perhonen
    { id: 1, name: "Seitsenpistepirkko", image: "seitsenpistepirkko.jpg", isFinnishNational: true },
    { id: 2, name: "Hyttynen", image: "hyttynen.jpg", isFinnishNational: false },
    { id: 3, name: "Kärpänen", image: "karpanen.jpg", isFinnishNational: false },
    { id: 4, name: "Sudenkorento", image: "sudenkorento.jpg", isFinnishNational: false },
    { id: 5, name: "Kimalainen", image: "kimalainen.jpg", isFinnishNational: false },
    { id: 6, name: "Paatsamasinisiipi", image: "paatsamasinisiipi.jpg", isFinnishNational: true },
    { id: 7, name: "Nokkosperhonen", image: "nokkosperhonen.jpg", isFinnishNational: false },
    { id: 8, name: "Sitruunaperhonen", image: "sitruunaperhonen.jpg", isFinnishNational: false },
    { id: 9, name: "Herukkaperhonen", image: "herukkaperhonen.jpg", isFinnishNational: false },
    { id: 10, name: "Neitoperhonen", image: "neitoperhonen.jpg", isFinnishNational: false },
]

const animals4: Animal[] = [ // Kansalliskukka ja puu
    { id: 1, name: "Kielo", image: "kielo.jpg", isFinnishNational: true },
    { id: 2, name: "Ahokeltano", image: "ahokeltano.jpg", isFinnishNational: false },
    { id: 3, name: "Kissankello", image: "kissankello.jpg", isFinnishNational: false },
    { id: 4, name: "Alaskanlupiini", image: "alaskanlupiini.jpg", isFinnishNational: false },
    { id: 5, name: "Auringonkukka", image: "auringonkukka.jpg", isFinnishNational: false },
    { id: 6, name: "Rauduskoivu", image: "rauduskoivu.jpg", isFinnishNational: true },
    { id: 7, name: "Vaahtera", image: "vaahtera.jpg", isFinnishNational: false },
    { id: 8, name: "Mänty", image: "manty.jpg", isFinnishNational: false },
    { id: 9, name: "Kuusi", image: "kuusi.jpg", isFinnishNational: false },
    { id: 10, name: "Tervaleppä", image: "tervaleppa.jpg", isFinnishNational: false },
]

const GameScreen: React.FC = () => {
    const location = useLocation();
    const spinnerType = location.state?.spinnerType;

    return (
        <div className="screen">

            {spinnerType === 1 && (
                <div className="spinner1">
                    <Spinner animals={animals1} />
                </div>
            )}

            {spinnerType === 2 && (
                <div className="spinner2">
                    <Spinner animals={animals2} />
                </div>
            )}

            {spinnerType === 3 && (
                <div className="spinner3">
                    <Spinner animals={animals3} />
                </div>
            )}

            {spinnerType === 4 && (
                <div className="spinner4">
                    <Spinner animals={animals4} />
                </div>
            )}
        </div>
    );
};

export default GameScreen;