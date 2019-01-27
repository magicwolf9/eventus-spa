import React from 'react';
import styled from 'styled-components'
import ScaleText from "react-scale-text";
import checkIconFilledSvg from './assets/check-icon-filled.svg';
import checkIconSvg from './assets/check-icon.svg'

const CheckIcon = styled.div`
    background: no-repeat url("${(props) => props.selected ? checkIconFilledSvg: checkIconSvg}");
    background-size: contain;

    width: 28px;
    height: 28px;
    right: 10px;
`;

const Container = styled.div`
    position: relative;
    width: 100px;
    height: 130px;
    padding: 10px;
    margin: 10px; 
    border-radius: 10px;
    background:
        linear-gradient(to right top, rgba(255,107,126, 0.5), rgb(255,153,98, 0.5)),
        ${props => props.imageUrl ? `center url(${props.imageUrl})` : 'none'};

    ${CheckIcon} {
        position: absolute;
    }
`;

const TextBoundary = styled.div`
    position: absolute;
    bottom: 30px;
    width: 100%;
    max-height: 40px;
    overflow-wrap: break-word;
    color: #fff;
`;

export default class EventCategory extends React.Component {
    render() {
        const {name, imageUrl = ''} = this.props.category;
        const {selected, onClick} = this.props;
        return <Container onClick={onClick} imageUrl={imageUrl}>
            {<CheckIcon selected={selected}/>}
            <TextBoundary>
                <ScaleText>
                    {name}
                </ScaleText>
            </TextBoundary>
        </Container>
    }
}