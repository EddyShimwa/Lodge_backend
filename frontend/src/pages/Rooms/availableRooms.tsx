import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchRooms } from '../../redux/slices/roomsSlice';
import { Room } from '../../types/room';
import FullScreenLoader from '../../components/loader';

export const getCurrentDate = (): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString(undefined, options);
};

const FreeRooms: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-sm dark:text-white">
        <h4 className="flex ml-7 text-xl font-bold">Available Rooms</h4>
        <p className="flex mr-6 ">{getCurrentDate()}</p>
      </div>
      <div className="block md:grid grid-cols-3 gap-2">
        {loading &&  <FullScreenLoader />}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && !error && rooms.filter((room) => room.isOccupied === false).map((room: Room) => (
          <div key={room._id} className={`border rounded-lg p-4 md:p-4 m-5 bg-[#e2e8f0] dark:bg-[#141a21f7] hover:bg-white ${room.isOccupied ? 'border-[#ef444461]' : 'border-[#159b4647]'}`}>
            <div className="flex items-center">
              <p className="text-2xl font-bold">Room {room.roomNumber}</p>
            </div>
            <div className="flex items-center justify-between mt-5 font-bold">
              <span className="text-[#2b78ff]">{room.price} Rwf</span>
              <button className={`rounded-md text-white py-1 px-5 ${room.isOccupied ? 'text-[#ef4444a6]' : 'text-green-600'}`}>
                {room.isOccupied ? 'Occupied' : 'Free'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeRooms;
