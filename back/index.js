import app from './app.js';
import { conectDB } from './db.js';

conectDB();
const PORT = process.env.PORT || 4000  
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
