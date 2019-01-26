import React from 'react';
import styled from 'styled-components';
import vkSvg from './assets/vk.svg'
import facebookSvg from './assets/facebook.svg'
import twitterSvg from './assets/twitter.svg'

const PrimaryButton = styled.button`
    border: none;
    outline: none;
    font-weight: 600;

    background-color: rgba(255,255,255,0.25);
    color: #eee;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;

    &:hover, &:active, &:focus {
        color: #fff;
        background-color: rgba(205,205,205,0.25);
    }
`

const SecondaryButton = styled.button`
    border: 1px solid #eee;
    outline: none;
    font-weight: 600;
    color: #eee;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background-color: transparent;
    font-size: 1rem;

    &:hover, &:active, &:focus {
        color: #fff;
        border-color: rgba(205,205,205,0.9);
    }
`

const Title = styled.div`
    font-size: 2rem;
    color: #FFF;
    font-weight: 500;
`

const Price = styled.div`
    font-size: 1.5rem;
    color: #FFF;
    font-weight: 300;
`

const Img = styled.img`
    max-height: 80px;
    max-width: 90%;

    width: auto;
    height: auto;
`

const Card = ({className, title, price, redirectUrl, imageUrl, onGoToNext, onGoToEvent}) => <div className={className}>
    <div className="header-container">
        <Title>{title}</Title>
        <Price>{price}</Price>
    </div>

    <Img src={imageUrl} alt=""/>

    <div className="button-container">
        <PrimaryButton onClick={onGoToEvent}>Пойти</PrimaryButton>
        <SecondaryButton onClick={onGoToNext}>Следующий</SecondaryButton>
    </div>
</div>

const StyledCard = styled(Card)`
    background-image: linear-gradient(to right top, #FF6B7E, #FF9962);
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    .header-container {
        display: flex;
        flex-direction: row;

        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    ${Title} {
        margin-right: 20px;
    }

    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    ${PrimaryButton} {
        margin-right: 10px;
    }

    ${Img} {
        margin-bottom: 15px;
    }
`

const PopupTitle = styled.div`
    font-weight: 600;
`

const PopupContentHolder = styled.div`
    padding: 10px 0 20px 0;
`

const VkIcon = styled.a`
    display: inline-block;
    height: 48px;
    width: 48px;

    background: url(${vkSvg});
    background-size: contain;
`;

const FacebookIcon = styled.a`
    display: inline-block;
    height: 48px;
    width: 48px;

    background: url(${facebookSvg});
    background-size: contain;
`

const TwitterIcon = styled.a`   
    display: inline-block;
    height: 48px;
    width: 48px;

    background: no-repeat url(${twitterSvg});
    background-size: contain;
`

const PopupButton = styled.a`
    border: none;
    outline: none;
    font-weight: 600;

    background-color: rgba(0,0,0,0.1);
    color: #222;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    text-decoration: none;

    &:hover, &:active, &:focus {
        color: #555;
        background-color: rgba(50,50,50,0.1);
    }
`


const ConfirmPopup = ({isActive, className, payUrl, togglePopup}) => <div className={className} onClick={togglePopup}>
    <div className="container" onClick={e => e.stopPropagation()}>
        <PopupTitle>
            Поделиться:
        </PopupTitle>
        <div className="icon-container">
            <VkIcon href={`https://vk.com/share.php?url=${payUrl}`}/>
            <FacebookIcon href={`https://www.facebook.com/sharer/sharer.php?u=${payUrl}`}/>
            <TwitterIcon href={`https://twitter.com/intent/tweet?text=${payUrl}`} />
        </div>

        <PopupTitle>
            Оплатить:
        </PopupTitle>
        <PopupContentHolder>
        <PopupButton href={payUrl}>Перейти на страницу оплаты</PopupButton>
        </PopupContentHolder>
    </div>
</div>

const StyledConfirmPopup = styled(ConfirmPopup)`
    position: absolute;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: ${props => props.isActive ? "flex" : "none"};
    background-color: rgba(0,0,0,0.65);
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .container {
        border-radius: 8px;
        background-color: #FFF;
        padding: 20px;
        min-width: 200px;
    }

    .icon-container {
        padding: 10px 0 20px 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        & > * + * {
            margin-left: 15px;
        }
    }
`;

class EventPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isPopupActive: false
        }
    }

    showPopup = () => this.setState({isPopupActive: true});

    closePopup = () => this.setState({isPopupActive: false});

    render() {
        const {className, name, description, redirectUrl, price, imageUrl} = this.props

        return <div className={className}>
            <StyledCard 
                title = {name}
                price = {price}
                redirectUrl = {redirectUrl}
                imageUrl={imageUrl}
                onGoToEvent = {this.showPopup}
            />
            <StyledConfirmPopup 
                isActive = {this.state.isPopupActive}
                payUrl={redirectUrl}
                togglePopup = {this.closePopup}
            />
            {description}
        </div>
    }
}
    

const StyledEventPage = styled(EventPage)`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    ${StyledCard} {
        margin-bottom: 10px;
    }
`

export default StyledEventPage;
