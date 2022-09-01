import img1 from "./images/dice-1.svg"
import img2 from "./images/dice-2.svg"
import img3 from "./images/dice-3.svg"
import img4 from "./images/dice-4.svg"
import img5 from "./images/dice-5.svg"
import img6 from "./images/dice-6.svg"

export default function Die(props) {

    const images = [img1, img2, img3, img4, img5, img6]

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        /* CSS Task! - combine die-face & die-num classes */
        <div 
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            <img 
                className={props.shake && !props.isHeld ? "shake" : "die-num"} 
                src={images[props.value - 1]} 
                alt=""
            />
        </div>
    )
}