import React from 'react';
import EventSearchPage from './pages/EventSearchPage';

const timeout = ms => new Promise(res => setTimeout(res, ms));

const Loader = ({isLoading, children}) => {
    return isLoading ? <div>Loading</div> : children
}

const Page2 = ({event, getNext}) => <div>
    {JSON.stringify(event)}

    <button onClick={getNext}>GetNext</button>
</div>

export default class Router extends React.PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            page: "PAGE_1",
            isLoadingConfig: true,
            isLoadingEvents: true,
            
            availableFilters: [],
            availableCategories: [],
            
            filters: [],
            categories: []
        }
    }

    fetchFilters = async () => {
        await timeout(2000);
        return [{
            id: 1,
            name: "date",
            inputType: "DATE"
        },
        {
            id: 2,
            name: "price",
            inputType: "PRICE"
        }];
    }

    fetchCategories = async () => {
        await timeout(2000);
        return [{
            id: 1,
            name: "value",
            imageUrl: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        },
        {
            id: 1,
            name: "value",
            imageUrl: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        }];

    }

    componentWillMount(){
        Promise.all([
            this.fetchFilters(),
            this.fetchCategories()
        ]).then(([filters, categories]) =>
            this.setState({
                availableFilters: filters,
                availableCategories: categories,
                isLoadingConfig: false
            })
        )
    }

    postSearchParams = async ({categories, filters}) => {
        await timeout(2000);
        return [{

        }];
    }

    onSubmitForm = async ({categories, filters}) => {
        this.setState({
            page: "PAGE_2",
            isLoadingEvents: true,
            categories,
            filters
        })

        const events = await this.postSearchParams({})

        this.setState({
            isLoadingEvents: false,
            events
        })
    }

    getNextEvent = () => {
        
    }

    render() {
        switch (this.state.page) {
            case 'PAGE_1':
                return <Loader isLoading={this.state.isLoadingConfig}>
                    <EventSearchPage
                        onSubmit={this.onSubmitForm}
                        categories = {this.state.availableCategories}
                        filters={this.state.availableFilters}
                    />
                </Loader>
            case 'PAGE_2':
                return <Loader isLoading={this.state.isLoadingEvents}>
                    <Page2 
                        event = {{}}
                        getNext = {()=>{}}
                    />
                </Loader>
            default:
                throw new Error('Something went wrong')
        }
    }
}