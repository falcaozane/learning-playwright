const ExcelJS=require('exceljs');
 
async function WriteExcel(filePath,replaceText) {
 
    const searchText = 'Papaya';
 
    const workbook=new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath)
    const sheet=workbook.getWorksheet('Sheet1');
 
    const output=await ReadExcel(sheet, searchText);
 
    if (output.row === -1 || output.column === -1) {
        throw new Error(`Text "${searchText}" not found in spreadsheet`);
    }
 
 
    const cell=sheet.getCell(output.row,output.col);
    
    cell.value=replaceText;
    await workbook.xlsx.writeFile(filePath);

}
 
 
async function ReadExcel(sheet, searchText){
 
    let output ={row:-1,col:-1}
 
    sheet.eachRow((row,rowNumber)=>{
 
    row.eachCell((cell,colNumber)=>{
 
    if(cell.value === searchText){
 
        output.row = rowNumber;
        output.col= colNumber;
 
         console.log("Printing the rowNumber for a cell value: " + output.row);
         console.log("Printing the colNumber for a column value: " + output.column);
 
    }

})
 
 
 
 
 
 
 
}
 
)
return output;
}
 
WriteExcel("excel-learning.xlsx", "Ranguton");