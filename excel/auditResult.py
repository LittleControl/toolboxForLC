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

    align_left = {'align': 'left'}
    # 水平右对齐
    align_right = {'align': 'right'}
    # 水平居中对齐
    align_center = {'align': 'center'}

    # font_color字体颜色，可以用颜色代表的英文名称或十六进制的颜色码
    # RGB颜色值转换成十六进制颜色码网址参考：https://www.toolhelper.cn/Color/RGBToHex
    font_color = {'font_color': '#ffffff'}

    title_format_public = {
        # 背景颜色
        'bg_color': 'yellow',
        # 字体大小
        'font_size': 10,
        # 字体加粗
        'bold': True,
        # 字体名称
        'font_name': 'Microsoft Yahei',
        # 上边框,数字代表边框style，边框样式参考 https://xlsxwriter.readthedocs.io/format.html?highlight=border#set_border
        'top': 4,
        # 上边框颜色
        'top_color': 'green',
        # 下边框
        'bottom': 6,
        # 下边框颜色
        'bottom_color': '#FF0000',
        # 左边框
        'left': 0,
        # 右边框
        'right': 1,
        # 垂直居中对齐
        'valign': 'vcenter',
        # 字符缩进量
        'indent': 2
    }

    title_format_center = {}
    title_format_center.update(title_format_public)
    title_format_center.update(align_left)
    title_format_center.update({'font_size': 14})
    title_format_center = workbook.add_format(title_format_center)

    for column in auditResult:
        column_width = max(auditResult[column].astype(
            str).map(len).max(), len(column))
        col_idx = auditResult.columns.get_loc(column)
        worksheet.set_column(col_idx, col_idx, column_width)
