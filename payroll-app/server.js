const express = require("express");
const app = express();
const { readFile, writeFile } = require("./modules/fileHandler");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const employees = await readFile();
    res.render("index", { employees });
});


app.get("/add", (req, res) => {
    res.render("add");
});


app.post("/add", async (req, res) => {
    const { name, department, salary } = req.body;

    if (!name || salary <= 0) {
        return res.send("Invalid Input");
    }

    const employees = await readFile();

    const newEmployee = {
        id: Date.now(),
        name,
        department,
        salary: Number(salary)
    };

    employees.push(newEmployee);
    await writeFile(employees);

    res.redirect("/");
});

// Delete Employee
app.get("/delete/:id", async (req, res) => {
    const id = Number(req.params.id);
    let employees = await readFile();

    employees = employees.filter(emp => emp.id !== id);

    await writeFile(employees);
    res.redirect("/");
});

// Edit Page
app.get("/edit/:id", async (req, res) => {
    const id = Number(req.params.id);
    const employees = await readFile();

    const employee = employees.find(emp => emp.id === id);

    res.render("edit", { employee });
});

// Update Employee
app.post("/edit/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, department, salary } = req.body;

    let employees = await readFile();

    employees = employees.map(emp => {
        if (emp.id === id) {
            return {
                id,
                name,
                department,
                salary: Number(salary)
            };
        }
        return emp;
    });

    await writeFile(employees);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
