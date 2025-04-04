const fs = require('fs');
let isWriting = false;

//Funcion para abrir archivo .json, devuelve un array con los archivos leidos
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

//Funcion para escribir un archivo .json
function writeJsonFile(path,data)
{
    if(isWriting){
        return setTimeout(()=>writeJsonFile(path,data),50); //Si se esta escribiendo, vuelve a intentarlo en 50mS
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


module.exports = {openJsonFile,appendDataToFile,writeJsonFile}