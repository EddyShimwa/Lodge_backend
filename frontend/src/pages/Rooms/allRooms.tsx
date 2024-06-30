import React from 'react';
import roomsData from '../../allRoomsData.json'
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Snackbar from '@material-ui/core/Snackbar';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import Button from '@material-ui/core/Button';
import { Room } from '../../types/room';

export const getCurrentDate = (): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString(undefined, options);
};

const AllRooms: React.FC = () => {


  return (
    <div className='w-full'>
    <div className='flex justify-between items-center text-sm dark:text-white'>
                <h4 className='flex ml-7 text-xl font-bold'>All Rooms</h4>
                <p className='flex mr-6 '>{getCurrentDate()}</p>
            </div>
    <div className="block md:grid grid-cols-3 gap-2">
        {roomsData.map((room: Room) => (
            <div key={room.id} className={`border rounded-lg p-4 md:p-4 m-5 bg-[#e2e8f0] dark:bg-[#141a21f7] hover:bg-white ${room.status === 'Free' ? 'border-[#159b4647]' : 'border-[#ef444461]'}`}>
                <div className='flex items-center'>
                    <p className='text-2xl font-bold dark:text-white'>{room.name}</p>
                </div>
                <div className="flex items-center justify-between mt-5 font-bold">
                <span className='text-[#2b78ff]'>{room.price} Rwf</span>
                <button className={`rounded-md text-white py-1 px-5 ${room.status === 'Free' ? ' text-green-600' : 'text-[#ef4444a6]'}`}>{room.status}</button>
                </div>
            </div>
        ))}
    </div>
</div>
  );
};

export default AllRooms;

