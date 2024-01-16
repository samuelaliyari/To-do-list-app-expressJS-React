const express = require("express");
const cors = require("cors");
const { readJson, writeJson } = require("./fsUtils");



const dataPath = "./data.json"

const app = express();
app.use(cors());

app.use(express.json());


app.use((req, _, next) => {
    console.log("new REQUEST ", req.url, " ", req.method, " ", req.body);
    next()
});


app.get("/api/data", (req, res) => {
    readJson(dataPath)
        .then(data => res.json({ success: true, result: data }))
        .catch(err => {
            console.log(err)
            res.json({ success: false, error: err })
        });
});


app.post("/api/data/addnewcategory", (req, res) => {
    const newCategoryTitle = req.body.title
    const newCategoryObj = { id: Date.now(), title: newCategoryTitle, todos: [] }
    console.log(newCategoryTitle, newCategoryObj)
    readJson(dataPath).then(data => [...data, newCategoryObj]).then(newData => writeJson(dataPath, newData)).then(data => res.json({ success: true, result: data }))
        .catch(err => {
            console.log(err)
            res.json({ success: false, error: err })
        });

})

app.put("/api/data/addtask/:categoryId", (req, res) => {
    const categoryId = req.params.categoryId
    readJson(dataPath).then(data => {
        const selectedList = data.find(list => list.id.toString() === categoryId);
        const newTask = req.body
        selectedList.todos = [...selectedList.todos, newTask]
        const rawData = data.filter(list => list.id.toString() !== categoryId)
        const newData = [...rawData, selectedList]
        return newData
    }).then(newData => writeJson(dataPath, newData)).then(data => res.json({ success: true, result: data }))
        .catch(err => {
            console.log(err)
            res.json({ success: false, error: err })
        });
})


app.patch("/api/data/:categoryId/:taskId/changestat", (req, res) => {

    const categoryId = req.params.categoryId
    const taskId = req.params.taskId

    readJson(dataPath).then(data => {

        const selectedList = data.find(list => list.id.toString() === categoryId);

        const selectedTask = selectedList.todos.find(task => task.id.toString() === taskId);

        const editedTask = { ...selectedTask, status: !selectedTask.status };

        const editedtodos = selectedList.todos.map(task => {
            if (task.id.toString() === taskId) {
                return editedTask
            } else {
                return task
            }
        });

        const editedData = data.map(list => {
            if (list.id.toString() === categoryId) {
                return { ...selectedList, todos: editedtodos }
            } else {
                return list
            }
        });
        return editedData
    }).then(newData => writeJson(dataPath, newData)).then(data => res.json({ success: true, result: data }))
        .catch(err => {
            console.log(err)
            res.json({ success: false, error: err })
        });
});

app.delete("/api/data/:categoryId/:taskId/deletetask", (req, res) => {

    const categoryId = req.params.categoryId
    const taskId = req.params.taskId

    readJson(dataPath).then(data => {

        const selectedList = data.find(list => list.id.toString() === categoryId);

        const selectedTask = selectedList.todos.find(task => task.id.toString() === taskId);

        const editedtodos = selectedList.todos.filter(task => task.id.toString() !== taskId)

        console.log(editedtodos)

        const editedData = data.map(list => {
            if (list.id.toString() === categoryId) {
                return { ...selectedList, todos: editedtodos }
            } else {
                return list
            }
        });
        return editedData
    })
        .then(newData => writeJson(dataPath, newData)).then(data => res.json({ success: true, result: data }))
        .catch(err => {
            console.log(err)
            res.json({ success: false, error: err })
        });
});



app.delete("/api/data/:categoryId/deletecategory", (req, res) => {

    const categoryId = req.params.categoryId


    readJson(dataPath).then(data => {
        const editedData = data.filter(list => list.id.toString() !== categoryId);

        return editedData
    })
        .then(newData => writeJson(dataPath, newData)).then(data => res.json({ success: true, result: data }))
        .catch(err => {
            console.log(err)
            res.json({ success: false, error: err })
        });
});







app.use(express.static("public"));







app.use((_, res) => {
    res.json({
        success: false, error: "Requested url not found"
    }).status(404)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log("app RUNNIBG at " + PORT))