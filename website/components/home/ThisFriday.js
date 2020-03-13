import { useReducer } from 'react';
import styles from './ThisFriday.module.css';

const images = [
    1,2,3,4,5,6
]

const initialState = {
    currentIndex: 0,
}

function reducer(state, action) {
    const { currentIndex } = state;
    switch (action.type) {
        case 'goto':
            return { currentIndex: action.index };
        case 'next':
            return { currentIndex: (currentIndex + 1 < images.length) ? currentIndex + 1 : currentIndex };
        case 'previous':
            return { currentIndex: (currentIndex - 1 >= 0) ? currentIndex - 1 : currentIndex };
        default:
            throw new Error();
    }
}

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentIndex } = state;
    const carouselStyle = {
        width: `${images.length * 100}%`,
        transform: `translateX(-${currentIndex * 100}vw)`,
        height: (currentIndex === 0) ? '90%' : '60%',
    };
    const carouselFooterStyle = {
        height: (currentIndex === 0) ? '10%' : '40%',
    }
    return <div className={styles.container}>
        <div className={styles.carousel}>
            <div className={styles.imageContainer} style={carouselStyle}>
                {images.map((image) => {
                    return <div className={styles.image} key={image}>{image}</div>
                })}
            </div>
            <div className={styles.carouselFooter}>
                <h1>This friday at salsa mish</h1>
                <div>
                    {images.map((val, index) => {
                        return <div className={styles.radioButton} key={`radio-button-${index}`} onClick={() => dispatch({ type: 'goto', index })}></div>
                    })}
                </div>
            </div>
            <div className={styles.social}>
                <img src="/icons/Icons-Facebook.png" alt="facebook icon" />
            </div>
            <div className={styles.date}>
                <p><span>20</span> Mar</p>
            </div>
            <div className={styles.nextArrow} onClick={() => dispatch({ type: 'next' })}></div>
            <div className={styles.previousArrow} onClick={() => dispatch({ type: 'previous' })}></div>
        </div>
    </div>
}
