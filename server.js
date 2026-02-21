const express = require('express');
const cookieParser = require('cookie-parser'); // Needed to read JWT cookies
const fileHandler = require('./modules/fileHandler'); // Matches exact spelling from image
const authRoutes = require('./src/authRoutes'); 
const authMiddleware = require('./src/authmiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser()); // Initialize cookie parser
app.set('view engine', 'ejs');

// 1. Setup Auth Routes (Login/Signup - Anyone can access)
app.use('/', authRoutes);


// 2. PROTECTED ROUTES (Only logged-in users can access)

// Dashboard
app.get('/', authMiddleware, (req, res) => {
    let employees = fileHandler.read();
    res.render('index', { employees });
});

// Show Add Form
app.get('/add', authMiddleware, (req, res) => {
    res.render('add');
});

// Add Employee
app.post('/add', authMiddleware, (req, res) => {
    let employees = fileHandler.read();
    let newEmployee = {
        id: Date.now(),
        name: req.body.name,
        profileImage: req.body.profileImage || "https://randomuser.me/api/portraits/men/32.jpg", // default image if none selected
        gender: req.body.gender,
        department: req.body.department,
        salary: req.body.salary,
        startDate: req.body.startDate
    };
    employees.push(newEmployee);
    fileHandler.write(employees);
    res.redirect('/');
});

// Delete
app.get('/delete/:id', authMiddleware, (req, res) => {
    let employees = fileHandler.read();
    let newList = employees.filter(emp => emp.id != req.params.id);
    fileHandler.write(newList);
    res.redirect('/');
});

// Show Edit Form
app.get('/edit/:id', authMiddleware, (req, res) => {
    let employees = fileHandler.read();
    let employee = employees.find(emp => emp.id == req.params.id);
    if (employee) {
        res.render('edit', { employee });
    } else {
        res.redirect('/');
    }
});

// Update Employee
app.post('/edit/:id', authMiddleware, (req, res) => {
    let employees = fileHandler.read();
    let index = employees.findIndex(emp => emp.id == req.params.id);
    if (index !== -1) {
        employees[index].name = req.body.name;
        employees[index].department = req.body.department;
        employees[index].salary = req.body.salary;
        fileHandler.write(employees);
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});