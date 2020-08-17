import React from 'react'
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
// import { RoomConsumer } from '../context';
import Loading from '../components/Loading';
import { withRoomConsumer } from '../context';

function RoomContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
        </>
    );

}

export default withRoomConsumer(RoomContainer);



//these are the two ways you can do this


// export default function RoomContainer() {
//     return (
//         <RoomConsumer>
//             {value => {

//                 console.log(value);
//                 const { loading, sortedRooms, rooms } = value;

//                 if(loading){
//                     return <Loading />
//                 }

//                 return (
//                     <div>
//                          Hello from Room Container
//                         <RoomFilter rooms={rooms}/>
//                         <RoomList rooms={sortedRooms}/>
//                     </div>
//                 );

//             }}

//         </RoomConsumer>
//     )
// }
