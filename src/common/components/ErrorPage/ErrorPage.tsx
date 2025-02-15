import wrongDoor from '../../../assets/images/wrongDoor.webp'
import backDoor from '../../../assets/images/sticker.webp'

export const ErrorPage = () => {
    return (
        <div className="error-page">
            <div style={{ marginTop: '10%', textAlign: 'center' }}>
                <h1>Oops!</h1>
                <p>You got the wrong door, buddy!</p>
                <img style={{ paddingTop: '2%' }}
                    src={wrongDoor} alt="drujok_pirojok"
                />
                <p style={{ paddingTop: '2%', fontSize: '18px' }}>
                    Try click{' '}
                    <a href={'http://localhost:3000'} target={'_blank'}>
                        here!
                    </a>
                </p>
            </div>
        </div>
    );
}