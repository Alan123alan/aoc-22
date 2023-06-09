const fs = require("fs");
const {cdRegex, cdOps, fileRegex, dirRegex} = require("./helpers");

const terminalOutput = fs.readFileSync("./js/day7/input.txt",{encoding:"utf-8"}).split("\r\n");
let files = [];
let dirs = [];
let paths = [];
let cwd = "";
const diskSpace = 70000000;
for(const line of terminalOutput){
    const [marker, command, argument] = line.split(" ");
    if(command == "cd"){
        cwd = cdOps(line);
        if(!paths.includes(cwd)){
            paths.push(cwd);
        }
    }
    if(fileRegex.test(line)){
        const [size, name] = line.split(" ");
        files.push({cwd, type:"file", size:parseInt(size), name});
    }else if(dirRegex.test(line)){
        const [type, name] = line.split(" ");
        dirs.push({cwd, type, name});
    }
}
let total=0;
for(let path of paths){
    let dirTotal = files
    .filter(file=>file.cwd.includes(path))
    .reduce((acc, curr)=>{
        return acc+curr.size
    }, 0);

    if(dirTotal <= 100000){
        total += dirTotal
    }
}
console.log(total)