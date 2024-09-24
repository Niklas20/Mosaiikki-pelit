import Confetti from 'react-confetti';

interface ConfettiComponentProps {
    showConfetti: boolean;
}

const ConfettiComponent = ({ showConfetti }: ConfettiComponentProps) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {showConfetti && (
                <Confetti
                    width={700}
                    height={1000}
                    numberOfPieces={3000}
                    gravity={0.05}
                    recycle={false}
                    colors={['#ff6100', '#ff904c', '#702e05', '#ffffff', '#ff4b00', '#ffca00']}
                />
            )}
        </div>
    );
};

export default ConfettiComponent;
