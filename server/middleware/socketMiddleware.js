module.exports = socketMiddleware = (socket, next) => {
    const  accessToken = socket.handshake.auth.accessToken;
    console.log(`It is from socket middleware ${accessToken}`);
    next();
}