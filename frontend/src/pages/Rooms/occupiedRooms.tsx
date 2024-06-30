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
        <div className='w-full'>
            <div className='flex justify-between items-center text-sm dark:text-white'>
                <h4 className='flex ml-7 text-xl font-bold'>Occupied Rooms</h4>
                <p className='flex mr-6 '>{getCurrentDate()}</p>
            </div>
            <div className="block md:grid grid-cols-3 gap-2">
                {roomsData.filter((room: Room) => room.status === "Occupied").map(room => (
                    <div key={room.id} className='border border-[#ef444461] rounded-lg p-4 md:p-4 m-5 bg-[#e2e8f0] dark:bg-[#141a21f7] hover:bg-white'>
                        <div className='flex items-center'>
                            <p className='text-2xl font-bold dark:text-white'>{room.name}</p>
                        </div>
                        <div className="flex items-center justify-between mt-5">
                        <span className='text-[#2b78ff] font-bold'>{room.price} Rwf</span>
                        <button className='border border-black text-[#ef4444a6] rounded-md p-1'>{room.status}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OccupiedRooms;