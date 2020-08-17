import React, { Component } from 'react'
// import items from './data';
import Client from './contentfull';

// Client.getEntries({
//     content_type :'beachResortRoom',
//     // order : 'sys.createdAt'
//     // order : 'fields.price' --> increase to dec
//     order : '-fields.price'
// }).then((response) => console.log(response.items))
// .catch(console.error)


const RoomContext = React.createContext();
class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };


    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: 'beachResortRoom',
                // order : 'sys.createdAt'
                // order : 'fields.price' --> increase to dec
                order: '-fields.price'
            });

            // let rooms = this.formate(items);
            let rooms = this.formate(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));

            this.setState({
                rooms,
                sortedRooms: rooms,
                featuredRooms,
                price: maxPrice,
                loading: false,
                maxPrice: maxPrice,
                maxSize: maxSize
            });
            console.log(rooms);

        } catch (error) {

        }
    }




    componentDidMount() {
        this.getData();
    }


    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    formate(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;

            let images = item.fields.images.map(image =>
                image.fields.file.url);

            let room = { ...item.fields, images, id };

            return room;
        });

        return tempItems;
    }


    handleChange = event => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name;

        // after setting the values in the state call the filterRoom Method
        this.setState({
            [name]: value
        }, this.filterRooms);

        console.log(name, value);
    }

    filterRooms = () => {
        console.log("Hello from the Filter Room")
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = this.state;

        let tempRooms = [...rooms];
        capacity = parseInt(capacity);
        price = parseInt(price);

        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        tempRooms = tempRooms.filter(room => room.capacity >= capacity);

        tempRooms = tempRooms.filter(room => room.price <= price);

        tempRooms = tempRooms.filter(room => room.size >= minSize && maxSize >= room.size)

        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === breakfast)
        }

        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === pets)
        }

        this.setState({
            sortedRooms: tempRooms
        });



    }


    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (<RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>);
    };
}

export { RoomProvider, RoomConsumer, RoomContext }

