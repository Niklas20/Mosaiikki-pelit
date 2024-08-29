/**
 * Button component properties
 */
interface ButtonProps {
    className?: string;
    image?: string;
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
}
/**
 * Button component
 * 
 * @param {ButtonProps} props - Component properties
 * @param {string} props.className - CSS class name
 * @param {string} props.image - Image URL
 * @param {string} props.text - Button text
 * @param {Function} props.onClick - Click event handler
 * @param {boolean} props.disabled - Is button disabled
 * @returns {JSX.Element} Button component
 */
const Button = (props: ButtonProps) => {
    const styles = {
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: props.disabled ? 0.5 : 1,
    };

    return (
        <button
            className={props.className}
            style={styles}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.text && <span>{props.text}</span>}
        </button>
    );
};

export default Button;
