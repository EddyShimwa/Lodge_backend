import React, { useState } from 'react';
import { useRoutes, NavLink } from 'react-router-dom';
import roomsData from '../../allRoomsData.json'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

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

const AllRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(roomsData);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const handleRoomStatus = (id: number) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id
          ? { ...room, status: room.status === 'Free' ? 'Occupied' : 'Free' }
          : room
      )
    );
    setOpenDialog(true);
    setOpenSnackbar(true);
  };

  const handleOpenDialog = (id: number) => {
    setSelectedRoom(id);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    if (selectedRoom !== null) {
      handleRoomStatus(selectedRoom);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className='w-1/2'>
      <div className='flex justify-between'>
        <h4 className='flex ml-3'>All Rooms Page</h4>
        <p className='flex mr-5'>{getCurrentDate()}</p>
      </div>

      <div>
        <ul className='w-full border'>
          {rooms.map((room) => (
            <li
              key={room.id}
              className='border border-gray-400 rounded-lg p-2 m-2 relative bg-white'
            >
              <div className='flex justify-between items-center'>
                <p className='font-bold text-lg'>{room.name}</p>
                <button
                  onClick={() => handleOpenDialog(room.id)}
                  className={
                    room.status === 'Free' ? 'bg-green-600' : 'bg-orange-400'
                  }
                >
                  {room.status}
                </button>
              </div>
              <span className='absolute bottom-0 text-xs left-1/2 transform -translate-x-1/2 text-orange-700'>
                {room.status}
              </span>
              <span className='absolute bottom-6 text-lg left-1/2 transform -translate-x-1/2'>
                {room.price} Rwf
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Change Room Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of this room?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Room status changed"
      />
    </div>
  );
};

const FreeRooms: React.FC = () => {
  return (
    <div className='w-1/2'>
      <div className='flex justify-between'>
        <h4 className='flex ml-3'>Free Rooms Page</h4>
        <p className='flex mr-5'>{getCurrentDate()}</p>
      </div>
      <div>
        <ul className='w-full border'>
          {roomsData.filter((room: Room) => room.status === "Free").map(room => (
            <li key={room.id} className='border border-gray-400 rounded-lg p-2 m-2 relative bg-white'>
              <div className='flex justify-between items-center'>
                <p className='font-bold text-lg'>{room.name}</p>
                <button className='bg-green-600'>{room.status}</button>
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

const Rooms: React.FC = () => {
  const routeResult = useRoutes([
    { path: '/free-rooms', element: <FreeRooms /> },
    { path: '/all-rooms', element: <AllRooms /> },
    { path: '/occupied-rooms', element: <OccupiedRooms /> },
  ]);

  return (
    <div className='bg-gray-200 h-screen flex flex-col items-center'>
      <nav className='border w-full flex justify-center'>
        <ul className='flex p-5'>
          <li className='px-2 md:px-5'>
            <NavLink
              to="/free-rooms"
              style={({ isActive }) => ({
                color: isActive ? 'green' : 'inherit',
                textDecoration: isActive ? 'underline' : 'none',
                textUnderlineOffset: isActive ? '0.5em' : '0',
              })}
            >
              Available Rooms
            </NavLink>
          </li>
          <li className='px-2 md:px-5'>
            <NavLink
              to="/all-rooms"
              style={({ isActive }) => ({
                color: isActive ? 'green' : 'inherit',
                textDecoration: isActive ? 'underline' : 'none',
                textUnderlineOffset: isActive ? '0.5em' : '0',
              })}
            >
              All Rooms
            </NavLink>
          </li>
          <li className='px-2 md:px-5'>
            <NavLink
              to="/occupied-rooms"
              style={({ isActive }) => ({
                color: isActive ? 'green' : 'inherit',
                textDecoration: isActive ? 'underline' : 'none',
                textUnderlineOffset: isActive ? '0.5em' : '0',
              })}
            >
              Occupied Rooms
            </NavLink>
          </li>
        </ul>
      </nav>
      {routeResult || <AllRooms />}
    </div>
  );
};

export default Rooms;
