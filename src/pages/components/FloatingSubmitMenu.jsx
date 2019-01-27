import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 92%;
    position: fixed;
    height: 40%;
    bottom: 10px;
    left: 4%;
    background: #fff;
    border: 2px solid #FF6B7E;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 25px;
    box-sizing: border-box;
`;

const Header = styled.div`
    font-weight: 600;
    color: #444;
`;


const Filters = styled.div`
    overflow-x: scroll;
`;


const FilterVariantsGroup = styled.div`
    display: flex;
    white-space: nowrap;
    margin-bottom: 5px;
`;

const FilterVariantButton = styled.div`
    height: 25px;
    border-radius: 8px;
    border: solid 2px #FF6B7E;
    padding: 3px 15px 0 15px;
    margin: 2px 2px;
    background: ${(props) => props.selected? '#FF6B7E': 'transparent'};
    color: ${(props) => props.selected? '#FFF': '#FF6B7E'};
`;

const SubmitButton = styled.button`
    height: 40px;
    margin-right: 25px;
    outline: none;

    background-color: #FF6B7E;
    color: #eee;
    border-radius: 8px;
    border: none;
    font-size: 1.1rem;
    font-weight: 500;
    &:hover, &:active, &:focus {
        background-color: #E5445A;
    }
`;

export default class FloatingSubmitMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFilters: []
        }
    }

    componentDidMount() {

        const initialState = {
            selectedFilters: {}
        };

        this.props.filters.forEach((filter) => {
            initialState[filter.group] = filter.items[0].id
        });

        this.setState(initialState);
    }

    render() {
        const {filters, onSubmit} = this.props;
        return <Container>
            <Header>Я ищу что-то: </Header>
            <Filters>
                {filters.map((filter) => {
                    return <FilterVariantsGroup id={filter.group}>
                        {filter.items.map((item) => {
                            return <FilterVariantButton selected={this.state[filter.group] === item.id}  onClick={() => {
                                this.setState({[filter.group]: item.id})
                            }} id={item.id}>{item.name}</FilterVariantButton>
                        })}
                    </FilterVariantsGroup>
                })}
            </Filters>
            <SubmitButton
                onClick={() => onSubmit(Object.getOwnPropertyNames(this.state).map((property) => this.state[property]))}>
                Поиск
            </SubmitButton>
        </Container>
    }

}