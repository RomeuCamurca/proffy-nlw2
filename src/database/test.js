const database = require('./db')
const createProffy = require('./createProffy')

database.then(async (db) => {
    // inserir dados 
    proffyValue = {
        name: "Romeu Camurça",
        avatar: "https://avatars0.githubusercontent.com/u/42971341?s=460&u=6c12ae70aea9b71f152bfb63de96c070a6fc95c2&v=4",
        whatsapp: "8897452653",
        bio: "Intrutor de instrução huehue",
    }

    classValue = {
        subject: 1,
        cost: "20",
       // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // class_id virá pelo banco de dados, após cadastramos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    
    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    //console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1 
        AND class_schedule.weekday = 0
        AND class_schedule.time_from <= 1300
        AND class_schedule.time_to > 1300;
    `)

    console.log(selectClassesSchedules)
})