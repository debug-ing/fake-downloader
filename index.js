const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
const { mainModule } = require('process');



async function main() {

    const file = fs.createWriteStream("file.iso");

    const request = http.get("https://releases.ubuntu.com/22.04.1/ubuntu-22.04.1-desktop-amd64.iso", function (response) {
        response.pipe(file);
        file.on("finish", async () => {
            file.close();
            console.log("Download Completed");
            await sleep(100000);
            main();
            deleteFile();
        });
    });


}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


function deleteFile() {
    fs.deleteFile("file.iso");
}
main();