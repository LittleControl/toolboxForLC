import pandas as pd
import numpy as np
import xlsxwriter

inputFile = '../unitTest/excel0.xlsx'
outPutFile = '../unitTest/result0.xlsx'

excel = pd.read_excel(inputFile)


# print(excel.columns)
# print(excel.index)

# print(excel.columns[0])
# print(excel.columns[3])

auditResult = excel.groupby([excel.columns[0], excel.columns[1]]).agg({
    excel.columns[3]: np.mean})

# format_dict = {'columnScore': '{:.2%}'}

# auditResult.style.format(format_dict)

print(type(auditResult))
# print(auditResult)


with pd.ExcelWriter(outPutFile) as writer:
    auditResult.to_excel(writer, sheet_name="Sheet0")
    workbook = writer.book
    worksheet = writer.sheets["Sheet0"]
    worksheet.set_column('A:A', 20)
    format1 = workbook.add_format()
    format1.set_align('center')
    format1.set_align('vcenter')
    format2 = workbook.add_format({'num_format': '0.00%'})
    worksheet.set_column('C:C', None, format2)
