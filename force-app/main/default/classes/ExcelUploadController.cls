public with sharing class ExcelUploadController {
    /*@AuraEnabled
    public static void processExcelFile(Blob fileContents) {
        XSSFWorkbook workbook = new XSSFWorkbook(new ByteArrayInputStream(fileContents));
        XSSFSheet sheet = workbook.getSheetAt(0);
        XSSFRow firstRow = sheet.getRow(0);
        
        for (int i = 0; i < firstRow.getPhysicalNumberOfCells(); i++) {
            XSSFCell cell = firstRow.getCell(i);
            System.debug('Cell ' + i + ': ' + cell.toString());
        }
    }*/
}