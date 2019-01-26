import React from 'react';
import EventPage from './pages/EventPage'

const timeout = ms => new Promise(res => setTimeout(res, ms));

const Loader = ({isLoading, children}) => {
    return isLoading ? <div>Loading</div> : <React.Fragment>{children}</React.Fragment>
}

const Page1 = ({onSubmit, filters, categories}) => <div>
    <button onClick={onSubmit}>
        Submit
    </button>

    {JSON.stringify(filters)}
    {JSON.stringify(categories)}
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
            categories: [],
            
            eventOffset: 0,
            events: []
        }
    }

    fetchFilters = async () => {
        await timeout(1000);
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
        await timeout(1000);
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
                ...this.state,
                availableFilters: filters,
                availableCategories: categories,
                isLoadingConfig: false
            })
        )
    }

    postSearchParams = async ({categories, filters}) => {
        await timeout(1000);
        return [{
            name: 'Конно спортивный центр',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptates vel corporis rem consequuntur eaque dignissimos dolorum ratione quae inventore? Deleniti ipsa libero provident corrupti officiis aperiam perferendis reprehenderit obcaecati!",
            redirectUrl: "google.com",
            price: "1500p",
            imageUrl: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        }];
    }

    onSubmitForm = async ({categories, filters}) => {
        this.setState({
            ...this.state,
            page: "PAGE_2",
            isLoadingEvents: true,
            categories,
            filters
        })

        const events = await this.postSearchParams({categories, filters})

        this.setState({
            ...this.state,
            isLoadingEvents: false,
            events
        })
    }

    getNextEvent = () => {
        this.setState({...this.state, eventOffset: this.state.eventOffset+1})
    }

    render() {
        switch (this.state.page) {
            case 'PAGE_1':
                return <Loader isLoading={this.state.isLoadingConfig}>
                    <Page1 
                        onSubmit={this.onSubmitForm}
                        categories = {this.state.availableCategories}
                        filters={this.state.availableFilters}
                    />
                </Loader>
            case 'PAGE_2':
                return <Loader isLoading={this.state.isLoadingEvents}>
                    <EventPage 
                        {...this.state.events[this.state.eventOffset]}
                        getNext = {this.getNextEvent}
                    />
                </Loader>
            default:
                throw new Error('Something went wrong')
        }
    }
}