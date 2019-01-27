import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    position: fixed;
    height: 40%;
    bottom: 0;
    background: #fff;
    border: solid 2px #afafaa;
    border-radius: 10px;
    border-left: none;
    border-right: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 25px;
`;

const Header = styled.div`
    
`;


const Filters = styled.div`
    overflow-x: scroll;
`;


const FilterVariantsGroup = styled.div`
    display: flex;
    white-space: nowrap;
`;

const FilterVariantButton = styled.div`
    height: 25px;
    border-radius: 8px;
    border: solid 2px #000;
    padding-left: 10px;
    padding-right: 10px;
    margin: 2px 2px;
`;

const SubmitButton = styled.button`
    width: calc(100vw - 50px);
    height: 40px;
`;
export default class FloatingSubmitMenu extends React.Component {

    render() {
        const {filters, onSubmit} = this.props;
        return <Container>
            <Header>Я ищу что-то: </Header>
            <Filters>
                {filters.map((filter) => {
                    return <FilterVariantsGroup id={filter.group}>
                        {filter.items.map((item) => {
                            return <FilterVariantButton id={item.id}>{item.name}</FilterVariantButton>
                        })}
                    </FilterVariantsGroup>
                })}
            </Filters>
            <SubmitButton onClick={onSubmit}>Поиск</SubmitButton>
        </Container>
    }

}