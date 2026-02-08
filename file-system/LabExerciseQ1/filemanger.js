const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log("\n--- File Manager Menu ---");
  console.log("1. Read File");
  console.log("2. Write File");
  console.log("3. Copy File");
  console.log("4. Delete File");
  console.log("5. List Directory");
  console.log("6. Exit");

  rl.question("Enter your choice: ", choice => {
    switch (choice) {
      case "1":
        rl.question("Enter file path: ", path => {
          fs.readFile(path, "utf8", (err, data) => {
            if (err) console.log("Error:", err.message);
            else console.log("\nFile Content:\n" + data);
            showMenu();
          });
        });
        break;

      case "2":
        rl.question("Enter file path: ", path => {
          rl.question("Enter text: ", text => {
            fs.appendFile(path, text + "\n", err => {
              if (err) console.log("Error:", err.message);
              else console.log("Written successfully");
              showMenu();
            });
          });
        });
        break;

      case "3":
        rl.question("Source file path: ", src => {
          rl.question("Destination file path: ", dest => {
            fs.copyFile(src, dest, err => {
              if (err) console.log("Error:", err.message);
              else console.log("File copied successfully");
              showMenu();
            });
          });
        });
        break;

      case "4":
        rl.question("File path to delete: ", path => {
          fs.unlink(path, err => {
            if (err) console.log("Error:", err.message);
            else console.log("File deleted");
            showMenu();
          });
        });
        break;

      case "5":
        rl.question("Directory path: ", path => {
          fs.readdir(path, (err, files) => {
            if (err) console.log("Error:", err.message);
            else {
              console.log("\nDirectory Contents:");
              files.forEach(file => console.log(file));
            }
            showMenu();
          });
        });
        break;

      case "6":
        console.log("Exiting File Manager");
        rl.close();
        break;

      default:
        console.log("Invalid choice");
        showMenu();
    }
  });
}

showMenu();