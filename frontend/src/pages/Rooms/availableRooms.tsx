import { getCurrentDate } from "./allRooms";
import roomsData from '../../allRoomsData.json'
import { Room } from '../../types/room';



const FreeRooms: React.FC = () => {
    return (
      <div className='w-full'>
    <div className='flex justify-between items-center text-sm dark:text-white'>
                <h4 className='flex ml-7 text-xl font-bold'>Available Rooms</h4>
                <p className='flex mr-6 '>{getCurrentDate()}</p>
            </div>
      <div className="block md:grid grid-cols-3 gap-2">
          {roomsData.filter((room: Room) => room.status === "Free").map(room => (
              <div key={room.id} className='border border-[#159b4647]  rounded-lg p-4 md:p-4 m-5  bg-[#e2e8f0] dark:bg-[#141a21f7] hover:bg-white'>
                  <div className='flex items-center'>
                      <p className='text-2xl font-bold dark:text-white'>{room.name}</p>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                  <span className='text-[#2b78ff] font-bold'>{room.price} Rwf</span>
                  <button className='border border-black text-green-600 rounded-md text-black py-1 px-5 font-bold'>{room.status}</button>
                  </div>
              </div>
          ))}
      </div>
  </div>
    );
  };

  export default FreeRooms