import './AnimalFactModal.css';
import { useLanguage } from '../../contexts/LanguageProvider';

interface Animal {
    id: number;
    name: {
        fi: string;
        en: string;
    };
    image: string;
    isFinnishNational: boolean;
    fact: {
        fi: string;
        en: string;
    };
}

interface AnimalFactModalProps {
    animal: Animal;
    preloadedImages: Record<string, HTMLImageElement>;
    onClose: () => void;
}

const AnimalFactModal = ({ animal, onClose, preloadedImages }: AnimalFactModalProps) => {
    const { language } = useLanguage();

    if (!animal || !animal.fact || !animal.fact.en) {
        return null;
    }

    const imageKey = `${animal.image}`;
    const image = preloadedImages[imageKey];

    return (
        <div className="modal-background">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div
                    className="animal-image"
                    style={{ backgroundImage: `url(${image.src})` }}
                ></div>
                <p className="animal-fact">{animal.fact[language]}</p>
            </div>
        </div>
    );
};

export default AnimalFactModal;