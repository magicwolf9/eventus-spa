import React from 'react';
import styled from 'styled-components'
import ScaleText from "react-scale-text";

const Container = styled.div`
    position: relative;
    width: 100px;
    height: 130px;
    padding: 10px;
    margin: 10px; 
    border-radius: 10px;
    background: ${props => props.imageUrl? `url(${props.imageUrl})` : 'none'};
`;

const TextBoundary = styled.div`
    position: absolute;
    bottom: 30px;
    width: 100%;
    max-height: 40px;
    overflow-wrap: break-word;
`;

export default class EventCategory extends React.Component {

    render() {
        const {id, name, imageUrl = ''} = this.props.category;
        const {selected, onClick} = this.props;
        return <Container onClick={onClick} image={imageUrl}>
            {id}
            {selected ? 'ВЫБРАНО' : 'НЕ ВЫБРАНО'}
            <TextBoundary>
                <ScaleText>
                    {name}
                </ScaleText>
            </TextBoundary>
        </Container>
    }
}