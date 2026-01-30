const fs=require('fs');

const prompt=require('prompt-sync')();


const command=prompt("enter command(read/write/copy/delete/list)");
const Filename=prompt("enter the file name");


if(command==='write')
{
    const content=prompt("enter the content");
    fs.writeFileSync(Filename,content);
    console.log("file content is"+content);
    console.log("file is written successfully");
}

else if(command==='read')
{
    const data=fs.readFileSync(Filename,'utf8');
    console.log("file content"+data);
}

else if(command==='copy')
{
    const place=prompt("enetr the where you place your file");
    fs.copyFileSync(Filename,place);
    console.log("File copied successfully");
}
else if(command==='delete')
{
    fs.unlinkSync(Filename);
    console.log("your file deleted")
}

else 
{
console.log("invalid command");
}