import React from 'react';
import roomsData from '../../allRoomsData.json'

interface Room {
    id: number;
    name: string;
    status: string;
    price: number;
  }
  const getCurrentDate = (): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

const OccupiedRooms: React.FC = () => {
    return (
      <div className='w-1/2'>
        <div className='flex justify-between'>
          <h4 className='flex ml-3'>Occupied Rooms Page</h4>
          <p className='flex mr-5'>{getCurrentDate()}</p>
        </div>
        <div>
          <ul className='w-full border'>
            {roomsData.filter((room: Room) => room.status === "Occupied").map(room => (
              <li key={room.id} className='border border-gray-400 rounded-lg p-2 m-2 relative bg-white'>
                <div className='flex justify-between items-center'>
                  <p className='font-bold text-lg'>{room.name}</p>
                  <button className='bg-orange-400'>{room.status}</button>
                </div>
                <span className='absolute bottom-0 text-xs left-1/2 transform -translate-x-1/2 text-orange-700'>{room.status}</span>
                <span className='absolute bottom-6 text-lg left-1/2 transform -translate-x-1/2'>{room.price} Rwf</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  export default OccupiedRooms;