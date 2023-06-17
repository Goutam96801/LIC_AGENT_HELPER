const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const port = process.env.PORT || 3000

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

//upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    //image name
    let imagename = date.getDate() + date.getTime() + file.name;

    let storageRef = firebase.storage().ref('uploads/' + imageName);

    // Upload the file to Firebase Storage
    storageRef.put(file).then(() => {
        // Get the download URL of the uploaded image
        storageRef.getDownloadURL().then(downloadURL => {
            res.json(downloadURL);
        }).catch(error => {
            console.error('Error getting download URL', error);
            res.status(500).send('Error getting download URL');
        });
    }).catch(error => {
        console.error('Error uploading image', error);
        res.status(500).send('Error uploading image');
    });
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(initial_path, "dashboard.html"));
})

app.get("/:policy", (req, res) => {
    res.sendFile(path.join(initial_path, "policy.html"));
})

app.get("/:policy/editor", (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen(port, () => {
    console.log("running....");
})