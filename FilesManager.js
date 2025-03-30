const fs = require('fs');
let isWriting = false;

function openJsonFile(path)
{
    let jsonData = [];
    
    if(fs.existsSync(path)){
        try{
            const data = fs.readFileSync(path,'utf-8');
            jsonData = JSON.parse(data);
        } catch(error)
        {
            console.error('Error al abrir el archivo: ',error);
        }
    }else{
        console.warn(`No existe el archivo ${path}. Creando uno nuevo.`);
        fs.writeFileSync(path,'[]','utf-8');
    }

    return jsonData;
}

function writeJsonFile(path,data)
{
    if(isWriting){
        return setTimeout(()=>writeJsonFile(path,data),50);
    }
        
    isWriting = true;
    fs.writeFile(path, JSON.stringify(data),(error)=>{
        isWriting = false;
        if(error)
        {
            console.error('Error al escribir el archivo:',error);
            throw error;
        }
    });
    console.log(`Archivo ${path} modificado correctamente`);
}


async function appendDataToFile(data,path) {
    try{
        await fs.appendFile(path,data);
        console.log(`Archivo ${path} modificado correctamente`);
    } catch(error){
        console.error(`Error al escribir el archivo ${path}.\nDatos:\n${data}\n`,error);
    }
}

module.exports = {openJsonFile,appendDataToFile,writeJsonFile}