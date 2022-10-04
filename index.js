const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const { mainModule } = require('process');

//https://releases.ubuntu.com/22.04.1/ubuntu-22.04.1-desktop-amd64.iso
const index = 0;
const links = [
    "https://dls.tabanmusic.com/music/2022/07/17/nohe-marof-moharam-remix(tabanmusic.com).mp3",
    "https://releases.ubuntu.com/22.04.1/ubuntu-22.04.1-desktop-amd64.iso",
    "https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-11.5.0-amd64-netinst.iso",
    "https://download.fedoraproject.org/pub/fedora/linux/releases/36/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-36-1.5.iso",
    "https://download.fedoraproject.org/pub/fedora/linux/releases/test/37_Beta/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-37_Beta-1.5.iso",
    "https://download.fedoraproject.org/pub/fedora/linux/releases/36/Workstation/aarch64/iso/Fedora-Workstation-Live-aarch64-36-1.5.iso",
    "https://download.fedoraproject.org/pub/fedora/linux/releases/test/37_Beta/Workstation/aarch64/iso/Fedora-Workstation-Live-aarch64-37_Beta-1.5.iso",
    "https://mirror.vimexx.nl/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso",
    "https://mirror.vimexx.nl/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Everything-2009.iso",
    "https://mirror.vimexx.nl/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-NetInstall-2009.iso",
    "http://nl.mirrors.clouvider.net/CentOS/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2207-02.iso",
    "http://mirror.previder.nl/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Everything-2207-02.iso"
]
// const link = "https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg";

async function main() {

    const file = fs.createWriteStream("file.iso");

    const request = http.get(links[index], function (response) {
        response.pipe(file);
        console.log("start Download " + index);
        file.on("finish", async () => {
            file.close();
            console.log("Download Completed");
            index++;
            if(index === links.length-1){
                index = 0;
            }
            await sleep(1000);
            await deleteFile();
            main();
           
        });
    });

}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


async function deleteFile() {
    
    fs.unlinkSync("file.iso");
}
main();