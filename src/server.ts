import app from "./app";
import { AppDataSource } from "./data-source";

( async () => {
    await AppDataSource.initialize()
    .then(()=> {
        console.log("DataSource initialize!")
    }).catch((err) => { console.log(err)})

    const PORT = 3000
    app.listen(PORT, () => { 
        console.log("server running in PORT " + PORT )
    });
})();