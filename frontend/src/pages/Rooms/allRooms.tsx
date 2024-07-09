import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchRooms, updateRoomStatus } from '../../redux/slices/roomsSlice';
import { Room } from '../../types/room';
import FullScreenLoader from '../../components/loader';

export const getCurrentDate = (): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString(undefined, options);
};

const AllRooms: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector((state: RootState) => state.rooms);
  const [hovered, setHovered] = useState<string | null>(null); // Update the type of hovered state

  const handleStatusToggle = (roomNumber: number) => {
    dispatch(updateRoomStatus(roomNumber));
  };

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch, rooms.length]); 

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-sm dark:text-white">
        <h4 className="flex ml-7 text-xl font-bold">All Rooms</h4>
        <p className="flex mr-6 ">{getCurrentDate()}</p>
      </div>
      <div className="block md:grid grid-cols-3 gap-2">
        {loading && <FullScreenLoader />}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && !error && rooms.map((room: Room) => (
          <div key={room._id} className={`border rounded-lg p-4 md:p-4 m-5 bg-[#e2e8f0] dark:bg-[#141a21f7] hover:bg-white ${room.isOccupied ? 'border-[#ef444461]' : 'border-[#159b4647]'}`}>
            <div className="flex items-center">
              <p className="text-2xl font-bold">Room {room.roomNumber}</p>
            </div>
            <div className="flex items-center justify-between mt-5 font-bold">
              <span className="text-[#2b78ff]">{room.price} Rwf</span>
              <button 
                className={`rounded-md py-1 px-5 text-white ${room.isOccupied ? 'bg-red-600' : 'bg-green-600'}`}
                title={room.isOccupied ? 'Click to mark this room as Free' : 'Click to mark this room as Occupied'}
                onMouseEnter={() => setHovered(room._id)}
                onMouseLeave={() => setHovered(null)} 
                onClick={() => handleStatusToggle(room.roomNumber)}
              >
                {hovered === room._id ? (room.isOccupied ? 'Mark as Free' : 'Mark as Occupied') : (room.isOccupied ? 'Occupied' : 'Free')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
