import { getCurrentDate } from "./allRooms";
import roomsData from '../../allRoomsData.json'



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

  export default FreeRooms