import React, { useState } from 'react';
import roomsData from '../../allRoomsData.json'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

export const getCurrentDate = (): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString(undefined, options);
};

const AllRooms: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);


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
          {roomsData.map((room) => (
            <li
              key={room.id}
              className='border border-gray-400 rounded-lg p-2 m-2 relative bg-white'
            >
              <div className='flex justify-between items-center'>
                <p className='font-bold text-lg'>{room.name}</p>
                <button
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
          <Button color="primary" autoFocus>
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

export default AllRooms;

