import { io } from 'socket.io-client';


const URL = "http://localhost:4545/api/products" === 'production' ? undefined : 'http://localhost:4545/api/products';
;

export const socket = io(URL, {
    autoConnect: false
  });

  const io = new Server({
    cors: {
      origin: "http://localhost:3000"
    }
  });
  
  io.listen(4545);