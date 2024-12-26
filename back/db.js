import mongoose from 'mongoose';

export const conectDB = async() => {
try {
    await mongoose.connect('mongodb://localhost/anissatam');
    console.log('Base de datos conectada');
    
} catch (error) {
    console.log(Error);
    
} 
};