// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwAhE4QIv-FhYIX-wEK-CpTGq-8_qd3MY",
  authDomain: "tinyml-bootcamp-storage.firebaseapp.com",
  projectId: "tinyml-bootcamp-storage",
  storageBucket: "tinyml-bootcamp-storage.appspot.com",
  messagingSenderId: "444990298754",
  appId: "1:444990298754:web:8b68afec49097483d7f29b",
  measurementId: "G-HEMF72KB0B"
};
// Initialize Firebase
const app2 = initializeApp(firebaseConfig);

import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, or } from 'firebase/firestore';

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import multer from 'multer';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import flash from 'express-flash';
import session from 'cookie-session';
import fs from 'fs';
const db = getFirestore(app2);
const upload = multer();
//firebase reference: https://firebase.google.com/docs/database/admin/save-data

const port = 3000;
const collection_name = 'tinyml-db';

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static('public'));
app.use(session({
    secret: 'siêu-bí-mật',
    resave: false,
    saveUninitialized: true,
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/stylesheets/layout.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'stylesheets', 'layout.css'));
});
app.get('/css/navbar.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'public', 'css', 'navbar.css'));
});

//=================================================================
//Routes for users page (API)
app.get('/', async (req, res) => {
    // const data = { message: 'Hello, World!' };
    checkAuthorization(req);
    res.render('./index.ejs', {urlPath: '/'});
});
app.get('/stylesheets/index.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'stylesheets', 'index.css'));
});
app.get('/css/index.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'stylesheets', 'index.css'));
});
app.get('/stylesheets/posts.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'stylesheets', 'posts.css'));
});
app.get('/stylesheets/news.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'stylesheets', 'news.css'));
});
app.get('/stylesheets/teams.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'stylesheets', 'teams.css'));
});
app.get('/stylesheets/records.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'stylesheets', 'records.css'));
});
app.get('/javascripts/posts.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'views', 'javascripts', 'posts.js'));
});
app.get('/javascripts/postsmodule.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'views', 'javascripts', 'postsmodule.js'));
});
app.get('/javascripts/news.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'views', 'javascripts', 'news.js'));
});
app.get('/javascripts/index.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'views', 'javascripts', 'index.js'));
});

app.post('/getStudentsInfo', upload.none(), (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const otherInfo = req.body.otherInfo;
    const aboutMe = req.body.aboutMe;

    const templatePath = path.join(__dirname, 'views', 'templates', 'thankyouletter_application.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    htmlTemplate = htmlTemplate.replace('${name}', fullName);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tinytensorteam@gmail.com',
            pass: 'vund qhvf rrtg vghc'
        }
    });

    let emailContent;

    if (!otherInfo || !aboutMe) {
        emailContent = `<b><strong>Application</strong></b>: No AboutMe info<br><br><strong>Sender's contact</strong>: <i>${email}</i>`;
    } else {
        emailContent = `<b><strong>Application</strong></b>: ${aboutMe}<br><br><strong>Sender's contact</strong>: <i>${email}</i><br><i>${otherInfo}</i>`;
    }

    let mailOptions = {
        to: 'tinytensorteam@gmail.com', // Receiver's email
        subject: `TinyTensor - New Application from ${fullName}`,
        html: `${emailContent}`,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        }
    };

    let mailNotify = {
        to: email, // Receiver's email
        subject: `TinyTensor - Your Application Has Been Sent To Us`,
        html: htmlTemplate,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        }
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            transporter.sendMail(mailNotify, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error sending email to the person who sends application');
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send('Email sent successfully');
                }
            });
        }
    });
});

app.post('/sendQuestion', upload.none(), (req, res) => {
    const { email, name, question } = req.body;

    const templatePath = path.join(__dirname, 'views', 'templates', 'thankyouletter.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    htmlTemplate = htmlTemplate.replace('${name}', name);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tinytensorteam@gmail.com',
            pass: 'vund qhvf rrtg vghc'
        }
    });

    const emailContent = `<b><strong>Question</strong></b>: ${question}<br><br><strong>Sender's address</strong>: <i>${email}</i>`;

    let mailOptions = {
        to: 'tinytensorteam@gmail.com', // Receiver's email
        subject: `TinyTensor - New Question from ${name}`,
        html: `${emailContent}`,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        }
    };

    let mailNotify = {
        to: email, // Receiver's email
        subject: `TinyTensor - Your Question Has Been Sent To Us`,
        html: htmlTemplate,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8'
        }
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            transporter.sendMail(mailNotify, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error sending email to the person who asks');
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send('Email sent successfully');
                }
            });
        }
    });
});

app.get('/news', async (req, res) => {
    const news = await getAll(db);
    res.render('./user/news.ejs', {news});
});

app.post('/news', async (req, res) => {
    const queryText = req.body.queryText;
    const news = await getByQuery(db, collection_name, queryText);
    res.json(news);
});

app.get('/news/News', async (req, res) => {
    const news = await getByTopic(db, collection_name, 'News');
    return res.render('./user/news.ejs', {news});
});

app.get('/news/Events', async (req, res) => {
    const news = await getByTopic(db, collection_name, 'Events');
    return res.render('./user/news.ejs', {news});
});

app.get('/news/Announcements', async (req, res) => {
    const news = await getByTopic(db, collection_name, 'Announcements');
    return res.render('./user/news.ejs', {news});
});

app.get('/news/:id', async (req, res) => { //news detail
    const newsData = await getById(db, req.params.id);
    const randoms = await getAll(db);
    if (newsData === undefined) {
        res.redirect('/'); //có thể trả về trang 404
    } else {
        return res.render('./user/posts-detail.ejs', {
            newsData: newsData,
            randoms: randoms,
        });
    }
});

app.get('/aboutUs', (req, res) => { 
    let urlPath = req.path
    res.render('./user/aboutUs.ejs', {urlPath});
});

app.get('/ourTeams', (req, res) => { 
    let urlPath = req.path
    res.render('./user/ourTeams.ejs', {urlPath});
});

app.get('/records', (req, res) => { 
    let urlPath = req.path
    res.render('./user/records.ejs', {urlPath});
});

//=================================================================
//Routes for admin page (API)
const codeObject = "bootcamp24";
app.get('/stylesheets/admin.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'stylesheets', 'admin.css'));
});
app.get('/javascripts/accessAdmin.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'views', 'javascripts', 'accessAdmin.js'));
});
app.get('/javascripts/adminPageScript.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'views', 'javascripts', 'adminPageScript.js'));
});

//for strict html cases
app.get('/administration/javascripts/accessAdmin.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'views', 'javascripts', 'accessAdmin.js'));
});
app.get('/administration/javascripts/adminPageScript.js', (req, res) => {
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'views', 'javascripts', 'adminPageScript.js'));
});
app.get('/administration/stylesheets/admin.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'stylesheets', 'admin.css'));
});
//

app.get('/logout', (req, res) => {
    checkAuthorization(req);
    req.session.codeChecker = false;
    res.redirect('/');
});

app.get('/preAccessAdministration', (req, res) => {
    var flashMessage = req.flash('verifyError');
    checkAuthorization(req);
    if (req.session.codeChecker === false) {
        res.render('./user/accessAdmin.ejs', {
            flashMessage: flashMessage
        });
    } else {
        res.redirect('/administration');
    }
    
});

app.post('/verifyCode', (req, res) => {
    const password = req.body.password;
    checkAuthorization(req);
    if (codeObject === password) {
        req.session.codeChecker = true;
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Incorrect secret.' });
    }
});

app.get('/administration', async (req, res) => { //trang admin
    checkAuthorization(req);
    if (req.session.codeChecker === true) {
        const jsonData = await getAll(db);
        var fMessage = req.flash('failMessage');
        var sMessage = req.flash('successMessage');
        const itemsPerPage = 5;
        const page = parseInt(req.query.page) || 1;

        const totalPages = Math.ceil(jsonData.length / itemsPerPage);
        const paginatedData = jsonData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        res.render('./admin/managePost.ejs', {
            jsonData: paginatedData,
            currentPage: page,
            itemsPerPage: itemsPerPage,
            totalPages: totalPages,
            flashMessage1: fMessage,
            flashMessage2: sMessage,
        });
    }
    else {
        authenticationErrorRedirecet(req, res);
    }
});

app.get('/administration/createBlog', (req, res) => {
    checkAuthorization(req);
    if (req.session.codeChecker == true) {
        var fMessage = req.flash('failMessage');
        var sMessage = req.flash('successMessage');
        res.render('./admin/addPost.ejs', {
            flashMessage1: fMessage,
            flashMessage2: sMessage
        });
    }
    else {
        authenticationErrorRedirecet(req, res);
    }
});

app.post('/administration/uploadBlog', async(req, res) => {
    checkAuthorization(req);
    if (req.session.codeChecker == true) {
        const title = req.body.title; //input field trong form đặt tên là 'title'
        if (!req.body.content.trim()) {
            req.flash('failMessage', 'PLEASE FILL OUT SOME CONTENT.');
            res.redirect('/administration/createBlog');
        } else {
            const content = req.body.content;
            const type = req.body.topic;
            if (type === 'News' || type === 'Events' || type === 'Announcements') {
                ; //do nothing
            } else {
                req.flash('failMessage', 'PLEASE SELECT TOPIC FOR YOUR POST.');
                res.redirect('/administration/createBlog');
            }
            const resCheck = await uploadBlog(db, title, type, content);
            if (resCheck == true) {
                req.flash('successMessage', 'SUCCESFULLY UPLOAD NEW DATA.');
                res.redirect('/administration/createBlog');
            } else {
                req.flash('failMessage', 'FAILED TO UPLOAD DATA, INTERNAL SERVER ERROR MIGHT HAVE OCCURED.');
                res.redirect('/administration/createBlog');
            }
        }
    }
    else {
        authenticationErrorRedirecet(req, res);
    }
});

app.get('/administration/updateBlog/:blogId', async(req, res) => {
    checkAuthorization(req);
    if (req.session.codeChecker == true) {
        var fMessage = req.flash('failMessage');
        var sMessage = req.flash('successMessage');
        const docId = req.params.blogId;
        const data = await getById(db, docId);
        if (data != false) {
            res.render('./admin/editPost.ejs', {
                jsonData: data,
                flashMessage1: fMessage,
                flashMessage2: sMessage,
            })
        } else {
            req.flash('failMessage', 'FAILED TO FETCH DATA, CANNOT FIND SUCH DATA IN FIREBASE.');
            res.redirect('/administration');
        }
    } else {
        authenticationErrorRedirecet(req, res);
    }
});

app.post('/administration/updateBlogConfirm', async(req, res) => {
    checkAuthorization(req);
    if (req.session.codeChecker == true) {
        const changesBody = req.body;
        const docId = changesBody.blogId;
        const new_title = changesBody.title;
        const new_type = changesBody.type;
        const new_content = changesBody.content;
        if (!new_content.trim()) {
            req.flash('failMessage', 'PLEASE FILL OUT SOME CONTENT.');
            return res.redirect('/administration/updateBlog/'+docId); //return breaks vòng lặp async await
        }
        const checkUpdate = await updateBlog(db, new_title, new_type, new_content, docId);
        if (checkUpdate == true) {
            req.flash('successMessage', 'SUCCESFULLY UPDATE DATA.');
            res.redirect('/administration');
        } else {
            req.flash('failMessage', 'FAILED TO FETCH DATA, INTERNAL SERVER ERROR MIGHT HAVE OCCURED.');
            res.redirect('/administration');
        }
    } else {
        authenticationErrorRedirecet(req, res);
    }
});

app.post('/administration/deleteBlog', async(req, res) => {
    checkAuthorization(req);
    if (req.session.codeChecker == true) {
        const docId = req.body.blogId;
        if (getById(db, docId) != false) {
            const checkDelete = await deleteBlog(db, docId);
            if (checkDelete == true) {
                req.flash('successMessage', 'SUCCESFULLY DELETE DATA.');
            } else {
                req.flash('failMessage', 'FAILED TO DELETE DATA, INTERNAL SERVER ERROR MIGHT HAVE OCCURED.');
            }
            res.redirect('/administration');
        } else {
            req.flash('failMessage', 'FAILED TO UPDATE DATA, CANNOT FIND SUCH DATA IN FIREBASE.');
            res.redirect('/administration');
        }
    } else {
        authenticationErrorRedirecet(req, res);
    }
});

//=================================================================
//Methods

function authenticationErrorRedirecet(req, res) {
    req.flash('verifyError', 'Restricted access! Please contact us for permission to this site.');
    res.redirect('/preAccessAdministration');
}

function checkAuthorization(req) {
    if (req.session.codeChecker === undefined) {
        req.session.codeChecker = false;
    }
}

async function getAll(db) {
    const collections = collection(db, collection_name);
    const snapshot = await getDocs(collections);
    const res = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
    }));
    return res;
}

async function getById(db, id) {
    const docRef = doc(db, collection_name, id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        return { 
            id: docSnapshot.id, 
            data: data
        };
    } else {
        return false;
    }
}

async function getByTopic(db, collection_name, topic) {
    const collectionRef = collection(db, collection_name);
    const q = query(collectionRef, where("type", "==", topic));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const results = [];
        querySnapshot.forEach(doc => {
            results.push({
                id: doc.id,
                data: doc.data()
            });
        });
        return results;
    } else {
        return false;
    }
}

async function getByQuery(db, collection_name, searchTerm) {
    if (searchTerm.trim().length > 0) {
        const collectionRef = collection(db, collection_name);
        const qTitle = query(collectionRef, where("title", ">=", searchTerm), where("title", "<=", searchTerm + "\uf8ff")); //where title in items contains searchTerm

        const querySnapshot = await getDocs(qTitle);

        if (!querySnapshot.empty) {
            const results = [];
            querySnapshot.forEach(doc => {
                results.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            return results;
        } else {
            return false;
        }
    } else {
        return await getAll(db);
    }
}

async function uploadBlog(db, title, type, content) {
    try {
        const blogsRef = collection(db, collection_name);
        const timestamp = new Date();

        const newBlog = {
            title,
            type,
            content,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        await addDoc(blogsRef, newBlog);
        return true;
    } catch (error) {
        throw error;
    }
}

async function updateBlog(db, new_title, new_type, new_content, id) {
    try {
        const blogRef = doc(db, collection_name, id);
        await updateDoc(blogRef, {
            title: new_title,
            type: new_type,
            content: new_content,
            updatedAt: new Date(),
        });
        return true;
    } catch (error) {
        return false;
    }
}

async function deleteBlog(db, id) {
    try {
        const data = await getById(db, id);
        if (data != false) {
            await deleteDoc(doc(db, collection_name, id));
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});